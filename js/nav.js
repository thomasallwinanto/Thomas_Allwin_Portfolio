// Navigation, routing, and theme toggle (plain script version)
(function(){
  // Valid section IDs for routing
  const validSections = ['home', 'about', 'academic-projects', 'personal-projects', 'art-3d', 'blog', 'stuff-i-love', 'contact'];

  function showSection(sectionId, updateHash = true){
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
    
    // Update URL hash for routing (unless navigating from popstate)
    if (updateHash && window.location.hash !== '#' + sectionId) {
      history.pushState({ section: sectionId }, '', '#' + sectionId);
    }
    
    // Scroll to top when changing sections
    window.scrollTo(0, 0);
  }

  function getHashSection() {
    const hash = window.location.hash.slice(1); // Remove '#'
    return validSections.includes(hash) ? hash : 'home';
  }

  function initNavigation(){
    // Navigate to section based on URL hash, or default to 'home'
    const initialSection = getHashSection();
    showSection(initialSection, false);
    
    // Replace initial state so back button works correctly
    history.replaceState({ section: initialSection }, '', '#' + initialSection);
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', (event) => {
      if (event.state && event.state.section) {
        showSection(event.state.section, false);
      } else {
        showSection(getHashSection(), false);
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
