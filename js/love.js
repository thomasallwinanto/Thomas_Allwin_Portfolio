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
  ,
  cooking: [
    "Sourdough Starter & Bread",
    "Ratatouille (vegetable techniques)",
    "Beef Wellington",
    "Pasta Carbonara",
    "Sushi Rolling",
    "Fermentation: Kombucha & Sauerkraut",
    "Chocolate Tempering"
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
  // Toggle: if same category is open, close it
  if(images.dataset.open === category){
    images.innerHTML = '';
    list.innerHTML = '';
    images.style.display = 'none';
    list.style.display = 'none';
    delete images.dataset.open;
    document.querySelectorAll('.love-categories .project-block').forEach(block=> block.classList.remove('active'));
    return;
  }
  images.dataset.open = category;
  document.querySelectorAll('.love-categories .project-block').forEach(block=>{
    const cat=block.getAttribute('data-category');
    block.classList.toggle('active', cat===category);
  });
  const items=window.loveStuff[category];
  list.innerHTML='';
  let imgHtml='';
  if(category==='books'){
    // Render like movies: placeholder poster thumbnails + captions, then hydrate via Wikipedia
    const bookTitles = items.map(i => i.trim());
    imgHtml = bookTitles.map(title => {
      const id = `book-img-${slugify(title)}`;
      const placeholder = 'https://via.placeholder.com/70x100.png?text=%20';
      return `<div class='love-item love-item--portrait'>\n  <img id='${id}' src='${placeholder}' loading='lazy' decoding='async' alt='${title}'>\n        <div class='love-caption' title='${title}'>${title}</div>\n      </div>`;
    }).join('');

    // Hydrate thumbnails asynchronously with likely book covers from Wikipedia
    setTimeout(() => {
      bookTitles.forEach(async (title) => {
        const el = document.getElementById(`book-img-${slugify(title)}`);
        if(!el) return;
        let url = await fetchWikiThumb(title);
        // Try common disambiguations for books
        if(!url) url = await fetchWikiThumb(`${title} (novel)`);
        if(!url) url = await fetchWikiThumb(`${title} (book)`);
        if(url){ el.src = url; el.style.background = '#fff'; }
      });
    }, 0);

    // Place thumbnails inside the same flexible wrapper used for movies
    const header = '';
    imgHtml = header + `<div style='display:flex; gap:0.96rem; flex-wrap:wrap; justify-content:center; margin-top:0.6rem;'>${imgHtml}</div>`;
    if(list){ list.innerHTML = ''; list.style.display = 'none'; }
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
  <img id='${id}' src='${placeholder}' loading='lazy' decoding='async' alt='${title}'>
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
  // Place Letterboxd heading above thumbnails; username is a clickable link
  const header = `<p class='love-desc'>More movies on my letterboxd <a href='https://letterboxd.com/thomasallwin/' target='_blank' rel='noopener'>thomasallwin</a></p>`;
  imgHtml = header + `<div style='display:flex; gap:0.96rem; flex-wrap:wrap; justify-content:center; margin-top:0.6rem;'>${imgHtml}</div>`;
  if(list){ list.innerHTML = ''; list.style.display = 'none'; }

  } else if(category==='music') {
    // Render like movies: poster-style thumbnails with captions, then hydrate from Wikipedia
    const musicTitles = items.map(i => i.trim());
    imgHtml = musicTitles.map(title => {
      const id = `music-img-${slugify(title)}`;
      const placeholder = 'https://via.placeholder.com/70x100.png?text=%20';
      return `<div class='love-item love-item--portrait'>\n  <img id='${id}' src='${placeholder}' loading='lazy' decoding='async' alt='${title}'>\n        <div class='love-caption' title='${title}'>${title}</div>\n      </div>`;
    }).join('');

    // Hydrate thumbnails asynchronously
    setTimeout(() => {
      musicTitles.forEach(async (title) => {
        const el = document.getElementById(`music-img-${slugify(title)}`);
        if(!el) return;
        const query = wikiTitleOverrides[title] || title;
        let url = await fetchWikiThumb(query);
        // Fallbacks for musicians/bands
        if(!url && !/(band\)|band$)/i.test(query)){
          url = await fetchWikiThumb(`${query} (musician)`);
        }
        if(!url && /(band\)|band$)/i.test(query)){
          url = await fetchWikiThumb(`${query} (band)`);
        }
        if(url){ el.src = url; el.style.background = '#fff'; }
      });
    }, 0);

    const header = '';
    imgHtml = header + `<div style='display:flex; gap:0.96rem; flex-wrap:wrap; justify-content:center; margin-top:0.6rem;'>${imgHtml}</div>`;
    if(list){ list.innerHTML = ''; list.style.display = 'none'; }
  } else if(category==='cooking') {
    // Very simple: directly render the photos from assets/cooking/ so they appear without any server or manifest.
    const files = [
      'assets/cooking/IMG-20250828-WA0006.jpg',
      'assets/cooking/IMG-20250828-WA0008.jpg',
      'assets/cooking/IMG-20250828-WA0011.jpg',
      'assets/cooking/IMG-20250828-WA0012.jpg',
      'assets/cooking/IMG-20250828-WA0013.jpg',
      'assets/cooking/IMG-20250828-WA0014.jpg',
      'assets/cooking/IMG-20250828-WA0015.jpg',
      'assets/cooking/IMG-20250828-WA0018.jpg',
      'assets/cooking/IMG-20250828-WA0019.jpg',
      'assets/cooking/IMG-20250828-WA0021.jpg',
      'assets/cooking/IMG-20250828-WA0023.jpg',
      'assets/cooking/IMG-20250828-WA0024.jpg',
      'assets/cooking/IMG-20250828-WA0025.jpg',
      'assets/cooking/IMG-20250828-WA0028.jpg',
      'assets/cooking/IMG-20250828-WA0032.jpg',
      'assets/cooking/IMG-20250828-WA0033.jpg',
      'assets/cooking/IMG-20250828-WA0034.jpg',
      'assets/cooking/IMG-20250828-WA0035.jpg',
      'assets/cooking/IMG-20250828-WA0036.jpg',
      'assets/cooking/IMG-20250828-WA0037.jpg',
      'assets/cooking/IMG-20250828-WA0038.jpg',
      'assets/cooking/IMG-20250828-WA0039.jpg',
      'assets/cooking/IMG-20250828-WA0042.jpg',
      'assets/cooking/IMG-20250828-WA0043.jpg',
      'assets/cooking/IMG-20250828-WA0044.jpg',
      'assets/cooking/IMG-20250828-WA0045.jpg',
      'assets/cooking/IMG-20250828-WA0047.jpg',
      'assets/cooking/IMG-20250828-WA0049.jpg',
      'assets/cooking/IMG-20250828-WA0052.jpg',
      'assets/cooking/IMG-20250828-WA0054.jpg',
      'assets/cooking/IMG-20250828-WA0057.jpg',
      'assets/cooking/IMG-20250828-WA0063.jpg',
      'assets/cooking/IMG-20250828-WA0064.jpg',
      'assets/cooking/IMG-20250828-WA0065.jpg',
      'assets/cooking/IMG-20250828-WA0067.jpg',
      'assets/cooking/IMG-20250828-WA0068.jpg'
    ];
  const html = files.map(src => `<div class='cooking-tile'><img src='${src}' loading='lazy' decoding='async' alt=''></div>`).join('');
  const quote = `<p class='cooking-quote'>&ldquo;Cooking is a craft, I like to think, and a good cook is a craftsman - not an artist.&rdquo;<br>&ndash; Anthony Bourdain</p>`;
  imgHtml = quote + `<div class='cooking-grid'>${html}</div>`;
  }
  images.innerHTML=imgHtml;
  images.style.display = 'block';
};
