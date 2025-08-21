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
    imgHtml=items.map(item=>{ const src=bookImages[item]||'https://via.placeholder.com/70x100?text=No+Image'; return `<div style='text-align:center;'><img src='${src}' alt='${item}' style='width:70px; height:100px; object-fit:cover; background:#fff;'><div style='font-size:0.9rem; margin-top:0.3rem;'>${item}</div></div>`; }).join('');
  } else if(category==='movies') {
    imgHtml = `<div style='width:100%; text-align:center; margin-bottom:1rem;'><a href='https://boxd.it/6ycaP' target='_blank' style='color:#00bcd4; font-size:1rem; text-decoration:underline;'>See more movies on my Letterboxd</a></div>`;
    imgHtml += `<ul style='list-style:none; padding:0; margin:0; text-align:left;'>` + items.map(item=>{ const match=item.match(/^(.*?)(?:\t|\s{2,})([0-9.]+)?$/); const name=match? match[1].trim(): item.trim(); return `<li class='love-list-item' style='font-size:0.98rem; margin-bottom:0.4rem; color:#111;'>${name}</li>`; }).join('') + `</ul>`;
  } else if(category==='music') {
    const musicImages={};
    imgHtml=items.map(item=>{ const src=musicImages[item]||'https://via.placeholder.com/70x70?text=No+Image'; return `<div class='love-list-item' style='text-align:center;'><img src='${src}' alt='${item}' style='width:70px; height:70px; object-fit:cover; background:#fff; border-radius:50%;'><div style='font-size:0.9rem; margin-top:0.3rem;'>${item}</div></div>`; }).join('');
  }
  images.innerHTML=imgHtml;
};
