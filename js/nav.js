// Navigation, routing, and theme toggle (plain script version)
(function(){
  // Valid section IDs for routing
  const validSections = ['home', 'about', 'academic-projects', 'personal-projects', 'art-3d', 'blog', 'stuff-i-love', 'contact'];
  
  // Map paths to section IDs (path without leading slash)
  const pathToSection = {
    '': 'home',
    'home': 'home',
    'about': 'about',
    'academic-projects': 'academic-projects',
    'personal-projects': 'personal-projects',
    'art-3d': 'art-3d',
    'blog': 'blog',
    'stuff-i-love': 'stuff-i-love',
    'contact': 'contact'
  };

  function getBasePath() {
    // Get the base path for the site (handles deployment in subdirectories)
    const base = document.querySelector('base');
    if (base) return base.getAttribute('href').replace(/\/$/, '');
    return '';
  }

  function showSection(sectionId, updateUrl = true){
    // Validate section ID, default to 'home' if invalid
    if (!validSections.includes(sectionId)) {
      sectionId = 'home';
    }
    
    const sections=document.querySelectorAll('section');
    sections.forEach(sec=>sec.style.display='none');
    const target=document.getElementById(sectionId); if(target) target.style.display='';
    document.querySelectorAll('.nav-btn').forEach(btn=>{
      const match=btn.getAttribute('onclick') && btn.getAttribute('onclick').match(/showSection\(['"]([\w-]+)['"]\)/);
      btn.classList.toggle('active', match && match[1]===sectionId);
    });
    
    // Update URL for routing (unless navigating from popstate)
    if (updateUrl) {
      const basePath = getBasePath();
      const newPath = sectionId === 'home' ? (basePath || '/') : basePath + '/' + sectionId;
      if (window.location.pathname !== newPath) {
        history.pushState({ section: sectionId }, '', newPath);
      }
    }
    
    // Scroll to top when changing sections
    window.scrollTo(0, 0);
  }

  function getPathSection() {
    const basePath = getBasePath();
    let pathname = window.location.pathname;
    
    // Remove base path if present
    if (basePath && pathname.startsWith(basePath)) {
      pathname = pathname.slice(basePath.length);
    }
    
    // Remove leading/trailing slashes and get the path segment
    const path = pathname.replace(/^\/|\/$/g, '');
    
    return pathToSection[path] || 'home';
  }

  function initNavigation(){
    // Navigate to section based on URL path, or default to 'home'
    const initialSection = getPathSection();
    showSection(initialSection, false);
    
    // Replace initial state so back button works correctly
    const basePath = getBasePath();
    const initialPath = initialSection === 'home' ? (basePath || '/') : basePath + '/' + initialSection;
    history.replaceState({ section: initialSection }, '', initialPath);
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', (event) => {
      if (event.state && event.state.section) {
        showSection(event.state.section, false);
      } else {
        showSection(getPathSection(), false);
      }
    });
  }

  function initThemeToggle(){
    const toggleBtn=document.getElementById('theme-toggle');
    if(!toggleBtn) return;
    function applyIcon(isDark){
      toggleBtn.innerHTML=isDark?'☀️':'🌙';
      toggleBtn.setAttribute('aria-label', isDark? 'Switch to light mode':'Switch to dark mode');
      toggleBtn.setAttribute('title', isDark? 'Light mode':'Dark mode');
    }
    const stored=localStorage.getItem('site-theme');
    if(stored==='dark'){ document.body.classList.add('dark-mode'); applyIcon(true);} else {applyIcon(false);} 
    toggleBtn.addEventListener('click',()=>{
      const isDark=document.body.classList.toggle('dark-mode');
      localStorage.setItem('site-theme', isDark? 'dark':'light');
      applyIcon(isDark);
    });
  }
  // expose globally
  window.showSection=showSection;
  window.initNavigation=initNavigation;
  window.initThemeToggle=initThemeToggle;
})();
