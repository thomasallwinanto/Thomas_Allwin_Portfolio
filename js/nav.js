// Navigation, routing, and theme toggle (plain script version)
(function(){
  // Valid section IDs for routing
  const validSections = ['home', 'about', 'academic-projects', 'personal-projects', 'art-3d', 'blog', 'stuff-i-love', 'contact'];
  
  // Password-protected sections
  const protectedSections = ['about', 'academic-projects'];
  const PROTECTED_PASSWORD = '&£IDHJSIJDNIQJSN';
  const SESSION_KEY = 'portfolio_protected_unlocked';
  
  // Pending section to show after password unlock
  let pendingSection = null;
  let pendingSubItem = null;
  
  function isUnlocked() {
    return sessionStorage.getItem(SESSION_KEY) === 'true';
  }
  
  function showPasswordModal(sectionId, subItem) {
    pendingSection = sectionId;
    pendingSubItem = subItem;
    const modal = document.getElementById('password-modal');
    const input = document.getElementById('password-input');
    const error = document.getElementById('password-error');
    if (modal) {
      modal.style.display = 'flex';
      if (input) {
        input.value = '';
        input.focus();
      }
      if (error) error.textContent = '';
    }
  }
  
  function hidePasswordModal() {
    const modal = document.getElementById('password-modal');
    if (modal) modal.style.display = 'none';
    pendingSection = null;
    pendingSubItem = null;
  }
  
  function initPasswordModal() {
    const form = document.getElementById('password-form');
    const cancelBtn = document.getElementById('password-cancel');
    const backdrop = document.querySelector('.password-modal-backdrop');
    const input = document.getElementById('password-input');
    const error = document.getElementById('password-error');
    
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (input && input.value === PROTECTED_PASSWORD) {
          sessionStorage.setItem(SESSION_KEY, 'true');
          hidePasswordModal();
          if (pendingSection) {
            showSectionInternal(pendingSection, true, pendingSubItem);
          }
        } else {
          if (error) error.textContent = 'Incorrect password';
          if (input) input.select();
        }
      });
    }
    
    if (cancelBtn) {
      cancelBtn.addEventListener('click', hidePasswordModal);
    }
    
    if (backdrop) {
      backdrop.addEventListener('click', hidePasswordModal);
    }
  }
  
  // Initialize modal on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPasswordModal);
  } else {
    initPasswordModal();
  }
  
  // Sections that support sub-routes
  const sectionsWithSubRoutes = {
    'blog': true,
    'academic-projects': true,
    'personal-projects': true,
    'stuff-i-love': true
  };

  function getBasePath() {
    // Get the base path for the site (handles deployment in subdirectories)
    const base = document.querySelector('base');
    if (base) return base.getAttribute('href').replace(/\/$/, '');
    return '';
  }

  function buildPath(section, subItem) {
    const basePath = getBasePath();
    if (section === 'home' && !subItem) {
      return basePath || '/';
    }
    let path = basePath + '/' + section;
    if (subItem) {
      path += '/' + subItem;
    }
    return path;
  }

  // Internal function to actually show the section (called after password check)
  function showSectionInternal(sectionId, updateUrl = true, subItem = null){
    const sections=document.querySelectorAll('section');
    sections.forEach(sec=>sec.style.display='none');
    const target=document.getElementById(sectionId); if(target) target.style.display='';
    document.querySelectorAll('.nav-btn').forEach(btn=>{
      const match=btn.getAttribute('onclick') && btn.getAttribute('onclick').match(/showSection\(['"]([\w-]+)['"]\)/);
      btn.classList.toggle('active', match && match[1]===sectionId);
    });
    
    // Update URL for routing (unless navigating from popstate)
    if (updateUrl) {
      const newPath = buildPath(sectionId, subItem);
      if (window.location.pathname !== newPath) {
        history.pushState({ section: sectionId, subItem: subItem }, '', newPath);
      }
    }
    
    // Scroll to top when changing sections (only if no subItem, as subItem will scroll to its content)
    if (!subItem) {
      window.scrollTo(0, 0);
    }
  }

  function showSection(sectionId, updateUrl = true, subItem = null){
    // Validate section ID, default to 'home' if invalid
    if (!validSections.includes(sectionId)) {
      sectionId = 'home';
    }
    
    // Check password for protected sections
    if (protectedSections.includes(sectionId) && !isUnlocked()) {
      showPasswordModal(sectionId, subItem);
      return; // Don't show section until password is entered
    }
    
    showSectionInternal(sectionId, updateUrl, subItem);
  }

  // Update URL for sub-item navigation without changing section
  function updateSubRoute(section, subItem, replace = false) {
    const newPath = buildPath(section, subItem);
    const state = { section: section, subItem: subItem };
    if (replace) {
      history.replaceState(state, '', newPath);
    } else if (window.location.pathname !== newPath) {
      history.pushState(state, '', newPath);
    }
  }

  // Clear sub-route (go back to section root)
  function clearSubRoute(section) {
    updateSubRoute(section, null);
  }

  function parseCurrentPath() {
    const basePath = getBasePath();
    let pathname = window.location.pathname;
    
    // Remove base path if present
    if (basePath && pathname.startsWith(basePath)) {
      pathname = pathname.slice(basePath.length);
    }
    
    // Remove leading/trailing slashes and split
    const parts = pathname.replace(/^\/|\/$/g, '').split('/').filter(Boolean);
    
    const section = parts[0] || 'home';
    const subItem = parts[1] || null;
    
    return { section, subItem };
  }

  function getPathSection() {
    const { section } = parseCurrentPath();
    return validSections.includes(section) ? section : 'home';
  }

  // Open sub-item based on section and key
  function openSubItem(section, subItem) {
    if (!subItem) return;
    
    // Use setTimeout to ensure DOM is ready after section switch
    setTimeout(() => {
      switch(section) {
        case 'blog':
          if (window.showBlog) window.showBlog(subItem, false);
          break;
        case 'academic-projects':
          if (window.showAcademicProject) window.showAcademicProject(subItem, false);
          break;
        case 'personal-projects':
          if (window.showProject) window.showProject(subItem, false);
          break;
        case 'stuff-i-love':
          if (window.showLove) window.showLove(subItem, false);
          break;
      }
    }, 50);
  }

  function initNavigation(){
    const { section, subItem } = parseCurrentPath();
    const validSection = validSections.includes(section) ? section : 'home';
    
    // Navigate to section based on URL path
    showSection(validSection, false, subItem);
    
    // Replace initial state
    const initialPath = buildPath(validSection, subItem);
    history.replaceState({ section: validSection, subItem: subItem }, '', initialPath);
    
    // Open sub-item if specified in URL
    if (subItem && sectionsWithSubRoutes[validSection]) {
      openSubItem(validSection, subItem);
    }
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', (event) => {
      if (event.state) {
        const { section: stateSection, subItem: stateSubItem } = event.state;
        const validStateSection = validSections.includes(stateSection) ? stateSection : 'home';
        showSection(validStateSection, false, stateSubItem);
        
        // Handle sub-item navigation
        if (stateSubItem && sectionsWithSubRoutes[validStateSection]) {
          openSubItem(validStateSection, stateSubItem);
        } else {
          // Close any open sub-items when navigating back to section root
          closeAllSubItems(validStateSection);
        }
      } else {
        const { section, subItem } = parseCurrentPath();
        const validSection = validSections.includes(section) ? section : 'home';
        showSection(validSection, false, subItem);
        if (subItem) {
          openSubItem(validSection, subItem);
        }
      }
    });
  }

  // Close all open sub-items in a section
  function closeAllSubItems(section) {
    setTimeout(() => {
      switch(section) {
        case 'blog':
          const blogContent = document.getElementById('blog-content');
          if (blogContent && blogContent.dataset.open) {
            blogContent.innerHTML = '';
            blogContent.style.display = 'none';
            delete blogContent.dataset.open;
            document.querySelectorAll('#blog .project-block').forEach(b => b.classList.remove('active'));
          }
          break;
        case 'academic-projects':
          const academicDetails = document.getElementById('academic-project-details');
          if (academicDetails && academicDetails.dataset.open) {
            academicDetails.innerHTML = '';
            academicDetails.style.display = 'none';
            delete academicDetails.dataset.open;
            document.querySelectorAll('#academic-projects .project-block').forEach(b => b.classList.remove('active'));
          }
          break;
        case 'personal-projects':
          const projectDetails = document.getElementById('project-details');
          if (projectDetails && projectDetails.dataset.open) {
            projectDetails.innerHTML = '';
            projectDetails.style.display = 'none';
            delete projectDetails.dataset.open;
            document.querySelectorAll('#personal-projects .project-block').forEach(b => b.classList.remove('active'));
          }
          break;
        case 'stuff-i-love':
          const loveList = document.getElementById('love-list');
          const loveImages = document.getElementById('love-images');
          if (loveImages && loveImages.dataset.open) {
            loveImages.innerHTML = '';
            loveImages.style.display = 'none';
            delete loveImages.dataset.open;
            if (loveList) { loveList.innerHTML = ''; loveList.style.display = 'none'; }
            document.querySelectorAll('.love-categories .project-block').forEach(b => b.classList.remove('active'));
          }
          break;
      }
    }, 10);
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
  window.updateSubRoute=updateSubRoute;
  window.clearSubRoute=clearSubRoute;
  window.initNavigation=initNavigation;
  window.initThemeToggle=initThemeToggle;
})();
