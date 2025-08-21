// Blog posts and rendering (plain script)
window.blogs = {
  blog1: "<h3>How I started coding</h3><p>I began my coding by modding games like GTA SA, It started from small characters to making new maps in game till the games crashed.</p>",
  blog2: "<h3>Lessons from my first project</h3><p>Alwyas keep a backup.</p>",
  blog3: "<h3>Dune</h3><p>Might be one of the greatest sci-fi movies of the 21st century.I want to write more. But later</p>"
};

window.showBlog = function(blogKey){
  const blogContent=document.getElementById('blog-content');
  if(!blogContent) return;
  blogContent.innerHTML=window.blogs[blogKey];
  blogContent.style.display='block';
  blogContent.scrollIntoView({behavior:'smooth', block:'start'});
};
