// Main initializer (plain script)
window.addEventListener('DOMContentLoaded', () => {
  if(window.initNavigation) window.initNavigation();
  if(window.initThemeToggle) window.initThemeToggle();
  if(window.initAbout) window.initAbout();
  if(window.initModelViewer) window.initModelViewer();
  // project/blog/love handlers already globally exposed through their definitions
});
