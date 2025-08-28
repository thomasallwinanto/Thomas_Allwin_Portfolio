// Academic & Personal projects (plain script)
window.academicProjects = {
  twoWire: {
    title: 'Two Wire AC Distribution System',
    period: '01/2021 – 07/2021',
    points: [
      'Designed a low-cost two-wire AC distribution system enabling isolated power extension for domestic households.',
      'Addressed excessive energy losses and high billing caused by conventional distribution methods.',
      'Implemented solutions for overheating and cooling inefficiencies to enhance reliability and energy efficiency by 20%.'
    ]
  },
  transformer: {
    title: 'Transformer Failure Notifier',
    period: '01/2020 – 06/2020',
    points: [
      'Developed a GSM-based wireless notification system using Arduino Uno to alert grid authorities of transformer failures.',
      'Enabled real-time fault location detection with transformer ID tagging, reducing downtime by 30% and manual tracing.',
      'Proposed future scope for fault-type classification using extended sensor modules.'
    ]
  },
  isolated: {
    title: 'Isolated Extension Supply',
    period: '01/2019 – 06/2019',
    points: [
      'Engineered a novel device for safe handling of live AC wires by converting Phase/Neutral to 2-phase input.',
      'Eliminated electrocution risk by isolating ground paths and redesigning current flow through phase-phase methodology.',
      'Enabled live testing and operation of appliances without traditional neutral connections.'
    ]
  }
};

window.personalProjects = {
  portfolio: {
    title: 'Personal Portfolio Website',
    desc: 'This website. I know, the project in a project. I used github copilot, VS code and other softwares to build this site. I am still learning and exploring this domain and figuring out ways to optimise this site, finding cleaner, healthier ways to code. Need to explore react and much more... :)'
  },
  guild: {
    title: 'Guild and Company',
    desc: "I'm part of a collaborative music and creative project in Hamburg where we explore Blues plus 70s and 80s rock. I personally tilt towards the blues, drawing inspiration from Eric Clapton and Stevie Ray Vaughan. I play a Telecaster strung with 10 gauge strings because I find it versatile, simple, and clean, and I'm currently experimenting with wah pedals to play a few tracks and learn more. Follow us on IG: <a href='https://www.instagram.com/theguild_band/' target='_blank' style='color:#00bcd4; text-decoration:underline;'>@theguild_band</a>.",
    images: ['assets/tom_guitar.jpg','assets/guild.jpg']
  },
  imaginary: {
    title: 'Imaginary Axis',
    desc: "My 3D art project created during lockdown using Paint 3D. See more in the <a href='#' onclick=\"showSection('art-3d'); return false;\" style='color:#00bcd4; text-decoration:underline;'>Art Projects</a> section."
  },
  architecture: {
    title: 'Architecture',
    desc: "Planned, designed and constructed a house in Kerala, India using self‑learned tools (Paint, Unreal Engine & open source). Completed concept + plan set in a month; available on request. It's not much but it's honest work.",
    images: ['assets/House_1.jpg','assets/House_2.jpg','assets/House_3.jpg','assets/House_4.jpg']
  }
};

window.showAcademicProject = function(key){
  const data=window.academicProjects[key];
  if(!data) return;
  const container=document.getElementById('academic-project-details');
  if(!container) return;
  // Toggle: close if the same project is already open
  if(container.dataset.open === key){
    container.innerHTML = '';
    container.style.display = 'none';
    delete container.dataset.open;
    return;
  }
  container.dataset.open = key;
  const list=data.points.map(p=>`<li>${p}</li>`).join('');
  container.innerHTML=`<h3 style='margin:0 0 0.4rem 0;'>${data.title}</h3><ul class='project-detail-desc' style='margin:0 0 0.6rem 1.1rem; padding:0; list-style:disc; line-height:1.45;'>${list}</ul>`;
  container.style.display='block';
  container.scrollIntoView({behavior:'smooth', block:'start'});
}
window.showProject = function(key){
  const details=window.personalProjects[key];
  if(!details) return;
  const container=document.getElementById('project-details');
  if(!container) return;
  // Toggle: close if the same project is already open
  if(container.dataset.open === key){
    container.innerHTML = '';
    container.style.display = 'none';
    delete container.dataset.open;
    return;
  }
  container.dataset.open = key;
  const imgHtml=(details.images||[]).map(img=>{
    if(key==='guild'||key==='architecture') return `<img src='${img}' loading='lazy' decoding='async' alt='' style='max-width:100%; height:auto; margin:0.5rem;'>`;
    return `<img src='${img}' loading='lazy' decoding='async' alt='' style='width:120px; height:auto; margin:0.5rem;'>`;
  }).join('');
  let bodyHtml='';
  if(details.points){
    bodyHtml=`<ul class='project-detail-desc' style='font-size:1.02rem; line-height:1.5; margin:0.4rem 0 0.8rem 1.1rem; padding:0; list-style:disc;'>${details.points.map(p=>`<li style='margin-bottom:0.35rem;'>${p}</li>`).join('')}</ul>`;
  } else if(details.desc){
    bodyHtml=`<p class='project-detail-desc' style='font-size:1.05rem; line-height:1.5; margin:0.4rem 0 0.8rem;'>${details.desc}</p>`;
  }
  container.innerHTML=`<h3 style='margin-top:0;'>${details.title}</h3>${bodyHtml}<div style='display:flex; gap:0.8rem; flex-wrap:wrap;'>${imgHtml}</div>`;
  container.style.display='block';
  container.scrollIntoView({behavior:'smooth', block:'start'});
}
