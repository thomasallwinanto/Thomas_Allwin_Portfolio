// Blog posts and rendering (plain script)
// Store blogs as objects (title + body) and render them cleanly in showBlog.
window.blogs = {
  blog1: {
    title: 'How I started coding. and AI',
    body: '<p>I began my coding by modding games. I wouldnt say coding to be exact. But yes, I did change a lot of things from the source code of a game. It started from small characters to making new maps in game till the games crashed. It got a lot more interesting when you go through the game files. Exploration and realise there is a lot more to customise and change things. I was never a coder, nor did I have an interest in it. But I was curious on how things worked, how can I change it, how can I make it better or more fun. The standard size of a game I was modding was 4.16 GB (Yes, I still rememeber it). I was so into it that I didnt notice that the game size was increasing exponentially everytime I introduced a new feature, mod or other things. To a point the game was almost 3 times the original size. One fine day, the game crashed. So did the PC, and that was a halt. I did try fixing it on my own, but it was gone. I didnt want to ask my parents for help or money because I know they would get angry. So that was it. By the time I got into Engineering, I realised i should have asked for a laptop or a better PC because coding was essential in every field. I was more into hardwares and it could have been good. I am not as expert as others when it comes to coding, I can maanage. But at the same time, I extensively use AI to teach myself and sometimes assist in coding. I do not use it in creative fields. It is just for technical fields. I do realise the trade-offs and compensation for using AI and every prompt. So I tend to be mindful and try to retain what I learn from every outcome of a prompt so that I can do it myself the next time. I am currently trying to learn ROS, re-learn c,cpp, python. I take assistance from copilots and other sources. But not for long. I have watched enough movies and read enough books to understand the implications of AI. We do not want an entity like skynet. At the same time, We should look more into the commandments of the orange catholic bible and read about the Butlerian Jihad(It is a war against thinking machines and I will write more about it in Dune blog). I might have derailed from the path of talking about coding to AI. But thats pretty much it. Hoping to learn, explore and apply it often.</p>'
  },
  blog3: {
    title: 'Dune',
    body: '<p>Might be one of the greatest sci-fi movies of the 21st century. I want to write more. But later</p>'
  },
  blog4: {
    title: 'Learning the Guitar',
    body: '<p>I was gifted a guitar when I was 14 years old. I took lessons for a few weeks but eventually taught myself because my guitar teacher was teaching us to play simple songs. It was a very slow process and I realised it was more of his business interest to go slow. Now that I revisit those classes, I realise I was wasting my time. I did find another guitar teacher who did direct me the right way. Unfortunately, He had other plans and left Bangalore. The only motivation for a student to learn should be just pure interest and passion. Not compensating for the fees paid. I did stumble for a while figuring out which direction to go to, who should I be listening to, where and what can I play. I think that is a journey by itself. I went from listening to EDMs, Dubstep, Pop songs from an old walkman, and then headed towards a path to 70s, 80s rock. By 22, I was entirely into blues. I realised that blues was my true calling. I picked a lot faster in techniques and theory(not as good as classical musicians ofcourse) by listening and learning it on youtube. I played "Layla" by Eric Clapton almost everyday until I perfected the riff, it was a good practice track. I later came across and interview where John Mayer asks us not to learn on his songs called "Gravity". It was a profound realisation that when you learn a song to play to on the guitar, you are learning how to play that song. You are not learning how to play the guitar. Every since that, I always try to go a bit deeper like scales, modes, rhythm, and other techniques. The song is just the tip of the iceberg. There is a lot more. The foundation(Will write about this Novel later), should be strong. But again, that is a cardinal rule for everything. I later hit a saturation region where my playing style was quite repetetive, I am still in the same region and I am trying to get out from it. I have been exploring new genres, new playing techniques and new equipments to break out of this region. But again, priorities. I will be out of this soon.</p>'
  }
  ,
  blog5: {
    title: 'True Detective',
    body: '<p>I recently rewatched True Detective S1. It follows two detectives Rust Cohle, played by Matthew McConaughey, and Marty Hart, played by Woody Harrelson. Right after I finished S1, I went on to watch the latest season. S4, named "True Detective Night Country", starring Jodie Foster as Detective Danvers and Kali Reis as Officer Navarro. I plan to write more about on why S4 feels so bland, pale and unbearable. S4 and S1 have a lot of similarities. Two detectives who are polar opposites, who do not get along with each other try to find the killer in a place that is like a “memory of a town and the memory is fading”. (I had to put in there). When you watch S1 and try to relate to the two protagonists, My guess would be that most of them might relate to Marty than the “Tax Man”. He has his flaws and is vulnerable to easy, simple pleasures of life. At the same time, you wish you were Rust Cohle. You wish you were stoic, giving out nihilistic monologues and be “edgy”. (Hart’s words. Not mine). Afte The script is solid, the acting is amazing, complex characters, and subtle intense sound tracks. It might be one of the best shows I have watched. Now coming to S4, We see Jodie Foster and Kali Reis taking up similar roles. Jodie foster has a weird obsession and relationship with the beatles. The song “Twist and Shout” triggers certain memories she had with her husband and dead son. They bring this up multiple times during the series by playing a melancholic version of the song. It is unbearable, unnecessary and cringe-worthy. Kali Reis plays the role of a demoted police officer after a case from the past goes wrong. She has her own problems like hallucinations, identity crisis and her mentally challenged sister. The entire case surrounds around these personal problems and they try hard to connect it with the main case. They are so many loose ends, incomplete story lines, unanswered questions and things which make you go “Why?”. The shows try to lure in fans from S1 by introducing Travis Cohle (Rust Cohle’s dad), The spiral logo, “time is a flat circle”, death comes for all and more. Overall, I would rate this show the same number as the season. A Four. I really hope the next season is better, and I hope they do not make it to lure the original fans by doing cheap stunts by bringing in legacy characters, quotes or even remotely try to relate it with the original season.</p>'
  }
};

window.showBlog = function(blogKey){
  const blogContent = document.getElementById('blog-content');
  if(!blogContent) return;
  // Toggle: if the same blog is already open, close it
  if (blogContent.dataset.open === blogKey) {
    blogContent.innerHTML = '';
    blogContent.style.display = 'none';
    delete blogContent.dataset.open;
  // remove active state from blog project blocks
  document.querySelectorAll('#blog .project-block').forEach(b => b.classList.remove('active'));
    return;
  }

  const post = window.blogs && window.blogs[blogKey];
  if(!post){
    blogContent.innerHTML = '<p>Post not found.</p>';
    blogContent.style.display = 'block';
    blogContent.dataset.open = '';
    return;
  }

  // Open the requested blog and mark it as open
  blogContent.dataset.open = blogKey;
  // set active state on the selected blog block
  document.querySelectorAll('#blog .project-block').forEach(block=>{
    const onclick = block.getAttribute('onclick') || '';
    block.classList.toggle('active', onclick.includes(`'${blogKey}'`));
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
};
