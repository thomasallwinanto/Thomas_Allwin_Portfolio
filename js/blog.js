// Blog posts and rendering (plain script)
// Store blogs as objects (title + body) and render them cleanly in showBlog.
window.blogs = {
  blog7: {
    title: 'Spontane Jam-Sessions am Klavier: Thomas, Luca und Jakob begeistern',
    body: `
      <div class="blog-figure">
        <img class="blog-image" src="https://harburg-aktuell.de/images/article_new/2025/2025-09/250918Playthepiano.JPG" alt="Thomas Allwin, Luca Luzi und Jakob Riediger bei ihrer Jam-Session am Klavier" loading="lazy" decoding="async" width="720" height="360" onerror="this.onerror=null;this.src='assets/profile.jpg';this.style.opacity=0.7;" />
        <div class="blog-image-credit">
          <a href="https://harburg-aktuell.de/news/vermischtes/spontane-jam-sessions-im-binnenhafen-thomas,-luca-und-jakob-begeistern-das-publikum.html" target="_blank" rel="noopener">Source: harburg-aktuell.de</a>
        </div>
      </div>

      <p>Harburg – Noch bis Ende September stehen in Harburg zehn kunstvoll gestaltete Klaviere zum Spielen bereit. Unter dem Motto „Play the Piano" bringt Harburg-Marketing zum dritten Mal die Harburger City und den Binnenhafen zum Klingen.</p>

      <p>Wer jetzt denkt, dass vor allem Kinder auf den Instrumenten herumklimpern, der irrt gewaltig: Viele Hobby-Musiker sorgen mit Spontan-Konzerten für staunende Gesichter und noch größere Ohren.</p>

      <p>So auch die drei passionierten Blues-Musiker Thomas Allwin, Luca Luzi und Jakob Riediger. Das Trio kommt bei gutem Wetter regelmäßig vorbei, um die Möglichkeit für spontane Jam-Sessions zu nutzen. Vorzugsweise nehmen die drei das Klavier am gelben Kran in Beschlag, das der Künstler Tabby gestaltet hat.</p>

      <p>Kennengelernt haben sich die beiden TU-Studenten und der Museumspädagoge Jakob Riediger in einem Proberaum der TUHH. „Jetzt im Sommer und Herbst machen wir unsere Jamsessions bei gutem Wetter draußen. Wir sind also keine Band aber nutzen die Möglichkeiten, die es in Harburg gibt", sagt Jakob Riediger.</p>

      <p>Und da sind derzeit auch die Klaviere erste Wahl: Solange die Klaviere noch stehen, sind wir oft am Nachmittag an den Klavieren im Hafen. Im Winter kann man uns im Trio oder Solo auf Open-Stage Events in der Lämmertwiete antreffen.</p>

      <p>„Es macht einfach riesigen Spaß draußen an einem richtigen Klavier zu spielen. Und gerade in einer Gruppe macht es noch mehr Spaß", sagen die drei und fügen hinzu: „Man merkt auch schnell, was für ein Magnet die Klaviere sind. Man lernt schnell neue Menschen kennen, die auch das eine oder andere Stück spielen können, mit uns zusammen jammen wollen, oder es einfach genießen, an einem sonnigen Tag Livemusik zu hören."</p>

      <p>Bei gutem Wetter kann man sie in den nächsten Tagen bestimmt noch einmal live am Klavier am Kran erleben.</p>

      <p><a href="https://harburg-aktuell.de/news/vermischtes/spontane-jam-sessions-im-binnenhafen-thomas,-luca-und-jakob-begeistern-das-publikum.html" target="_blank" rel="noopener">Original Article: harburg-aktuell.de</a></p>
    `
  },
  blog3: {
    title: 'Dune',
    body: '<p>Might be one of the greatest sci-fi movies of the 21st century. I want to write more. But later</p>'
  },
  
  blog5: {
    title: 'Rust, Dust and Snow : True Detective',
    body: `
      <p>I recently rewatched True Detective S1. It follows two detectives Rust Cohle, played by Matthew McConaughey, and Marty Hart, played by Woody Harrelson. Right after I finished S1, I went on to watch the latest season. S4, named True Detective: Night Country, starring Jodie Foster as Detective Danvers and Kali Reis as Officer Navarro.</p>
      <div class="blog-figure">
        <img class="blog-image" src="assets/true-detective.jpg" alt="True Detective still" loading="lazy" decoding="async" width="720" height="360" onerror="this.onerror=null;this.src='assets/profile.jpg';this.style.opacity=0.7;" />
        <div class="blog-image-credit">
          <a href="https://www.escapistmagazine.com/all-major-actors-cast-list-for-true-detective-season-4/" target="_blank" rel="noopener">Source: escapistmagazine.com</a>
        </div>
      </div>

      <p>S4 and S1 share many similarities. Two detectives who are polar opposites, who don’t get along, trying to find a killer in a place that feels like “a memory of a town, and the memory is fading” (I had to mention it here).</p>

      <p>When you watch S1 and try to relate to the protagonists, most people would probably connect more with Marty than the “Tax Man.” He has his flaws and he is vulnerable to the simple pleasures of life. At the same time, you wish you were Rust Cohle. Stoic, delivering nihilistic monologues, and being “edgy” (Hart’s words, not mine). The script is solid, the acting is amazing, the characters are complex, and the soundtracks are subtle yet intense. It might be one of the best shows I’ve ever watched.</p>

      <p>Now, coming to S4. Jodie Foster and Kali Reis take on similar “opposites” roles. Foster’s character has a strange psychological relation with the Beatles. The song "Twist and Shout" triggers memories of her late son, and the show brings it up multiple times through a melancholic version of the song. It comes across as unbearable, unnecessary, and cringe-worthy. She is also battles to manage her relationship with adopted daughter and her subordinate.</p>

      <p>Reis plays a demoted officer after a past case went south. She struggles with hallucinations, an identity crisis, relationship with her sister and her boyfriend. The case itself they are trying to solve is somehow interconnected with these personal struggles, societal problems, racism, environmental issues, propagandas and other such trending events. The connections feel forced and too woke.</p>

      <p>The season is full of loose ends, incomplete storylines, unanswered questions, and moments that just make you go, “Why?”. It also tries too hard to lure in fans of S1 by introducing Travis Cohle (Rust’s father), the spiral logo, callbacks like “time is a flat circle,” and other references to death and fate.</p>

      <p>Overall, I would rate this season the same number as its order. A Four. I really hope the next installment is better and avoids cheap tricks like bringing in legacy characters, recycled quotes, or even remotely try to relate it with the original season.</p>
    `
  }
  ,
  blog6: {
    title: 'Moral Blindness in High Plains Drifter',
    body: `
      <p>I love westerns; I love watching westerns and I love the simplicity, the stoicism, and the mysteriousness in these westerns. After a hiatus from the said genre, I recently watched Clint Eastwood’s 1973 classic, High Plains Drifter. The story and script are quite similar to most of the classic western films. To name a few, Pale Rider and Unforgiven are similar to this. Seven Samurai, Shane and Django (The 1966 film. Not to be confused with Tarantino’s Django Unchained).</p>

      <div class="blog-figure">
        <img class="blog-image" src="assets/high-plains-drifter.jpg" alt="High Plains Drifter still" loading="lazy" decoding="async" width="720" height="360" onerror="this.onerror=null;this.src='assets/profile.jpg';this.style.opacity=0.7;" />
        <div class="blog-image-credit">
          <a href="https://onceuponatimeinawestern.com/high-plains-drifter-1973/" target="_blank" rel="noopener">Source: onceuponatimeinawestern.com</a>
        </div>
      </div>

      <p>The plot is simple. A gunslinger enters a town, people ask for his assistance to get rid of the people who bother the town, usually outlaws or smugglers; he helps them, and then leaves. It is predictable, non-convoluted, and simple. But that is not why I am writing this.</p>

      <p>I have watched a few films, and usually, these protagonists are morally right; when I say right, the only trouble they cause is to the antagonists, with some light hostility towards the citizens of the town. But in High Plains Drifter, it is broken in the first few minutes of the movie. When Callie Travers, played by Marianna Hill, insults him by throwing his cigar and calling him "whiskey breath," the gunslinger drags her to the barn and rapes her. The scene cuts to a disturbing scene of the town’s dwarf staring at the act with lustful eyes.</p>

      <p>Later, while the town council members decide to ask the stranger's assistance, Callie Travers causes a commotion and questions the council whether they are going to let him get away with the act he just committed. One of the councilmen then makes the following statement, “When you run across a man who is used to having his own way, you let him have it until he goes too far.” Callie says, “Just what do you consider going too far? Isn’t forcible rape in broad daylight a misdemeanour in this town?" The councilmen then proceeds to justify the act of not punishing him by saying, "There's too much at stake to throw away on hysterics now."</p>

      <p>The film then focuses on the stranger’s demands after he is “appointed” as the new saviour of the town. The unsettling part in these scenes or this film is not the pale acting or the obvious voice dubbing or the violence. Well, violence and gore play a crucial role in western films (referring to “that” scene from Bone Tomahawk), and it is almost mundane to see it in these films. Right after Callie Travers is shut down, the narrative of the story forgets about that incident. And the film buries it even deeper by showing The Stranger’s cool, masculine demeanour, his skills operating his signature Single Action Army revolver chambered in .45 Long Colt, his role as the town’s saviour. By the mid of the movie, it is barely acknowledged as we are buried deep in the romanticization of this spaghetti western genre. It was disappointing and uncomfortable to remember that this pivotal scene is almost erased by the end of the movie.</p>

      <p>Clint Eastwood’s thought process in choosing to include these scenes or choosing to take this direction in this script is still a mystery to me. Was his objective to make us, the audience, notice it and then forget it, just like how the people did in the movie? Or was his objective to provoke us? Or does he think it was a bold move to put it in the film? High Plains Drifter might be one of the first films I’ve watched where a such a brutal crime occurs without any consequences and worse, forgotten about it in mere moments. It’s always in the back of my head when watching it. Just like Duncan’s ghost.</p>
    `
  }
};

// Map human-friendly slugs to blog keys so we can support /blog/slug URLs
window.blogSlugs = {
  'jam-sessions-harburg': 'blog7',
  'true-detective': 'blog5',
  'high-plains-drifter': 'blog6',
  'dune': 'blog3'
};

// Reverse map for getting slug from key
window.blogKeyToSlug = {
  'blog7': 'jam-sessions-harburg',
  'blog5': 'true-detective',
  'blog6': 'high-plains-drifter',
  'blog3': 'dune'
};

window.showBlog = function(blogKey, updateUrl = true){
  const blogContent = document.getElementById('blog-content');
  if(!blogContent) return;
  
  // Resolve slug to blog key if needed
  const resolvedKey = (window.blogSlugs && window.blogSlugs[blogKey]) || blogKey;
  
  // Toggle: if the same blog is already open, close it
  if (blogContent.dataset.open === resolvedKey) {
    blogContent.innerHTML = '';
    blogContent.style.display = 'none';
    delete blogContent.dataset.open;
    // remove active state from blog project blocks
    document.querySelectorAll('#blog .project-block').forEach(b => b.classList.remove('active'));
    // Update URL to remove sub-route
    if (updateUrl && window.clearSubRoute) window.clearSubRoute('blog');
    return;
  }

  const post = window.blogs && window.blogs[resolvedKey];
  if(!post){
    blogContent.innerHTML = '<p>Post not found.</p>';
    blogContent.style.display = 'block';
    blogContent.dataset.open = '';
    return;
  }

  // Open the requested blog and mark it as open
  blogContent.dataset.open = resolvedKey;
  // set active state on the selected blog block
  document.querySelectorAll('#blog .project-block').forEach(block=>{
    const onclick = block.getAttribute('onclick') || '';
    block.classList.toggle('active', onclick.includes(`'${resolvedKey}'`));
  });
  blogContent.innerHTML = '';
  const h3 = document.createElement('h3');
  h3.textContent = post.title;
  blogContent.appendChild(h3);

  // Insert the body (may contain markup) into a container element
  const bodyContainer = document.createElement('div');
  bodyContainer.innerHTML = post.body || '';
  blogContent.appendChild(bodyContainer);

  blogContent.style.display = 'block';
  blogContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
  
  // Update URL with sub-route (use human-readable slug)
  if (updateUrl && window.updateSubRoute) {
    const urlSlug = (window.blogKeyToSlug && window.blogKeyToSlug[resolvedKey]) || resolvedKey;
    window.updateSubRoute('blog', urlSlug);
  }
};
