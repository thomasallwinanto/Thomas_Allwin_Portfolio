// Stuff I Love data & rendering (plain script)
window.loveStuff = {
  books: [
    "The Da Vinci Code","The Name of the Rose","Industrial Society and Its Future","Dune","Dune Messiah","Children of Dune","God Emperor of Dune","Fahrenheit 451","Crime and Punishment","Once Upon a Time in Hollywood"
  ],
  movies: [
    "Inglourious Basterds\t9","Nayakan\t9","The Thing\t9","The Good, the Bad and the Ugly\t9","Ratatouille\t9","Saving Private Ryan\t9","Dune\t9","Star Wars: Episode V - The Empire Strikes Back\t9","Man From Earth\t9","GoodFellas\t9","the social network\t9","The Godfather Part II\t9"
  ],
  music: [
    "Stevie Ray Vaughan","Eric Clapton","Jimi Hendrix","JJ Cale","Radiohead","Thom Yorke","John Mayer","Kurt Cobain","Chris Cornell","Nirvana","Hans Zimmer","Derek and the Dominos","Cream","Agam","Lucky Ali"
  ]
};

// Helper: slugify a string for element IDs
function slugify(str){
  return String(str).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
}

// Helper: get a Wikipedia thumbnail for a given title (uses REST summary API)
async function fetchWikiThumb(title){
  const endpoint = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  try{
    const res = await fetch(endpoint, { headers: { 'Accept': 'application/json' } });
    if(!res.ok) return null;
    const data = await res.json();
    if(data && data.thumbnail && data.thumbnail.source) return data.thumbnail.source;
    return null;
  }catch(e){ return null; }
}

// Some ambiguous artist names benefit from explicit Wikipedia titles
const wikiTitleOverrides = {
  'Cream': 'Cream (band)',
  'Nirvana': 'Nirvana (band)',
  'Agam': 'Agam (band)'
};

window.showLove = function(category){
  const list=document.getElementById('love-list');
  const images=document.getElementById('love-images');
  if(!list||!images) return;
  document.querySelectorAll('.love-categories .project-block').forEach(block=>{
    const cat=block.getAttribute('data-category');
    block.classList.toggle('active', cat===category);
  });
  const items=window.loveStuff[category];
  list.innerHTML='';
  let imgHtml='';
  if(category==='books'){
    const bookImages={
      'The Da Vinci Code':'https://m.media-amazon.com/images/I/4182WHOHqUL._SY445_SX342_.jpg',
      'The Name of the Rose':'https://m.media-amazon.com/images/I/51kkGmOoqQL._SY445_SX342_.jpg',
      'Industrial Society and Its Future':'https://m.media-amazon.com/images/I/41ySrRF+tXL._SY445_SX342_.jpg',
      'Dune':'https://m.media-amazon.com/images/I/41qSPS2EDdL._SY445_SX342_.jpg',
      'Dune Messiah':'https://m.media-amazon.com/images/I/41NUm1sYjLL._SY445_SX342_.jpg',
      'Children of Dune':'https://m.media-amazon.com/images/I/41GzZqH3cjL._SY445_SX342_.jpg',
      'God Emperor of Dune':'https://m.media-amazon.com/images/I/41i-YhzQ0tL._SY445_SX342_.jpg',
      'Fahrenheit 451':'https://m.media-amazon.com/images/I/71OFqSRFDgL.jpg',
      'Crime and Punishment':'https://m.media-amazon.com/images/I/41c99G44teL._SY445_SX342_.jpg',
      'Once Upon a Time in Hollywood':'https://m.media-amazon.com/images/I/81b4luHhI6S._SX385_.jpg'
    };
  imgHtml=items.map(item=>{ const src=bookImages[item]||'https://via.placeholder.com/70x100?text=No+Image'; return `<div class='love-item love-item--portrait'><img src='${src}' alt='${item}'><div class='love-caption' title='${item}'>${item}</div></div>`; }).join('');
  } else if(category==='movies') {
    // Display like books: poster thumbnail + title caption
    const movieTitles = items.map(item => {
      const match = item.match(/^(.*?)(?:\t|\s{2,})([0-9.]+)?$/);
      return match ? match[1].trim() : item.trim();
    });

    // Known ambiguous titles mapping to specific Wikipedia pages
    const wikiMovieTitleOverrides = {
      'The Thing': 'The Thing (1982 film)',
      'Ratatouille': 'Ratatouille (film)',
      'Nayakan': 'Nayakan (1987 film)',
      'Star Wars: Episode V - The Empire Strikes Back': 'The Empire Strikes Back',
      'Man From Earth': 'The Man from Earth',
      'GoodFellas': 'Goodfellas',
      'the social network': 'The Social Network',
      'Dune': 'Dune (2021 film)'
    };

    imgHtml = movieTitles.map(title => {
      const id = `movie-img-${slugify(title)}`;
      const placeholder = 'https://via.placeholder.com/70x100.png?text=%20';
      return `<div class='love-item love-item--portrait'>
        <img id='${id}' src='${placeholder}' alt='${title}'>
        <div class='love-caption' title='${title}'>${title}</div>
      </div>`;
    }).join('');

    // Hydrate thumbnails asynchronously with Wikipedia posters
    setTimeout(() => {
      movieTitles.forEach(async (title) => {
        const el = document.getElementById(`movie-img-${slugify(title)}`);
        if(!el) return;
        let query = wikiMovieTitleOverrides[title] || title;
        let url = await fetchWikiThumb(query);
        // Try common film disambiguation if not found
        if(!url) url = await fetchWikiThumb(`${title} (film)`);
        if(url){ el.src = url; el.style.background = '#fff'; }
      });
    }, 0);

  } else if(category==='music') {
    // Build placeholders first, then hydrate with fetched thumbnails
    imgHtml = items.map(item => {
      const id = `music-img-${slugify(item)}`;
      const placeholder = 'https://via.placeholder.com/140x140.png?text=%20';
      return `<div class='love-item love-item--square'>
        <img id='${id}' src='${placeholder}' alt='${item}' style='border-radius:50%;'>
        <div class='love-caption' title='${item}'>${item}</div>
      </div>`;
    }).join('');
    // After render, fetch thumbnails asynchronously
    setTimeout(() => {
      items.forEach(async (item) => {
        const id = `music-img-${slugify(item)}`;
        const el = document.getElementById(id);
        if(!el) return;
        const title = wikiTitleOverrides[item] || item;
        let url = await fetchWikiThumb(title);
        // Fallback: try with "(musician)" if a solo artist with no image
        if(!url && !/(band\)|band$)/i.test(title)){
          url = await fetchWikiThumb(`${title} (musician)`);
        }
        if(url){ el.src = url; el.style.background = '#fff'; }
      });
    }, 0);
  }
  images.innerHTML=imgHtml;
};
