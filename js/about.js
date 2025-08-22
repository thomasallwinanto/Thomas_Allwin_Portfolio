// About section facts by year (plain script)
window.yearFacts = {
  1999: "Born in 1999. The journey begins!",
  2000: "I started exploring the world around me.",
  2001: "Fall of the Twin Towers in New York.",
  2002: "Did my kindergarten and started school in Bangalore",
  2003: "Lower Kindergarten in Bangalore.",
  2004: "I rhink I started learning to read and write in detail",
  2005: "Changed my school and started class 1",
  2006: "Was doing class 2 but had to move to Chennai.",
  2007: "Something was coming up, I could feel it.",
  2008: "The 2008 financial crisis and housing crisis affected many globally.",
  2009: "Became interested in technology and the internet.",
  2010: "Got my first computer and started playing games.",
  2011: "The Arab Spring began, changing the political landscape.",
  2012: "The Mayan calendar predicted the end of the world.",
  2013: "The rise of social media platforms like Instagram.",
  2014: "Had my first crush in school",
  2015: "Had my second crush in school and then I changed my school again to do class 11.",
  2016: "Got my first smart phone. It was an HCL.",
  2017: "The rise of cryptocurrencies like Bitcoin. But I didn't know about it. I graduated High School and started college.",
  2018: "I was pursuing my Bachelors in Electrical and Electronics Engineering and also gave my first Navy exam.",
  2019: "Someguy from China ate a bat and the world went into a pandemic.",
  2020: "Worked on my academic projects, art projects in lockdown, gained a lot of knowledge and weight",
  2021: "I graduated from college and started working at Bosch.",
  2022: "No significant updates. Just working and living life.",
  2023: "Went fine the first half, but the second half was a bit rough, complex and difficult.",
  2024: "I left my job, friends, family and everything I had connection to and moved to Germany to pursue my Masters in MEMS.",
  2025: "I turned 26 this year and I am still figuring things out. But I am happy with my life choices so far."
};

window.initAbout = function(){
  let last=window.yearFacts[1999];
  for(let y=1999;y<=2025;y++){ if(!window.yearFacts[y]) window.yearFacts[y]=last; else last=window.yearFacts[y]; }
  const yearSlider=document.getElementById('year-slider');
  if(!yearSlider) return;
  const yearLabel=document.getElementById('year-label');
  const aboutFact=document.getElementById('about-fact');
  const aboutArrow=document.getElementById('about-arrow');
  const aboutBack=document.getElementById('about-back');
  function update(year){ yearLabel.textContent=year; aboutFact.textContent=window.yearFacts[year]; }
  yearSlider.addEventListener('input',()=> update(parseInt(yearSlider.value)));
  aboutArrow.addEventListener('click',()=>{ let y=parseInt(yearSlider.value); y = y>1999? y-1:2025; yearSlider.value=y; update(y); });
  aboutBack.addEventListener('click',()=>{ let y=parseInt(yearSlider.value); y = y<2025? y+1:1999; yearSlider.value=y; update(y); });
  update(yearSlider.value);
};

// Initialize collapsible behavior for Professional Experience
window.initCvExperience = function(){
  function wireSection(sectionId, contentSelector){
    const section = document.getElementById(sectionId);
    if(!section) return;
    const items = section.querySelectorAll('.cv-item');
    items.forEach(item => {
      const header = item.querySelector('.cv-item-header');
      const content = item.querySelector(contentSelector);
      if(!header || !content) return;
      // Start collapsed
      item.classList.remove('expanded');
      // Toggle on click/keyboard
      header.setAttribute('role','button');
      header.setAttribute('tabindex','0');
      header.setAttribute('aria-expanded','false');
      const toggle = () => {
        const expanded = item.classList.toggle('expanded');
        header.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      };
      header.addEventListener('click', toggle);
      header.addEventListener('keypress', (e)=>{ if(e.key==='Enter' || e.key===' ') { e.preventDefault(); toggle(); }});
    });
  // Auto-expand the first item by default
  const first = section.querySelector('.cv-item');
  if(first){ first.classList.add('expanded'); const h = first.querySelector('.cv-item-header'); if(h) h.setAttribute('aria-expanded','true'); }
  }

  // Professional Experience: toggle bullet lists
  wireSection('cv-experience', '.cv-bullets');
  // Organisations: toggle note
  wireSection('cv-organisations', '.cv-note');
};
