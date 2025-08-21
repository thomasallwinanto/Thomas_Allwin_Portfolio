// Navigation and theme toggle (plain script version)
(function(){
  function showSection(sectionId){
    const sections=document.querySelectorAll('section');
    sections.forEach(sec=>sec.style.display='none');
    const target=document.getElementById(sectionId); if(target) target.style.display='';
    document.querySelectorAll('.nav-btn').forEach(btn=>{
      const match=btn.getAttribute('onclick') && btn.getAttribute('onclick').match(/showSection\(['"]([\w-]+)['"]\)/);
      btn.classList.toggle('active', match && match[1]===sectionId);
    });
  }
  function initNavigation(){ showSection('home'); }
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
