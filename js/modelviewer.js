// 3D model viewer logic (plain script)
window.initModelViewer = function(){
  const modelViewer=document.getElementById('main-model-viewer');
  if(!modelViewer) return;
  const prevBtn=document.getElementById('prev-model');
  const nextBtn=document.getElementById('next-model');
  const modelFiles=["BAC.glb","DEBRIS.glb","Death_Stranding.glb","PYRAMID.glb","Project_frame.glb","THE SHIP.glb","VFP.glb","For_Anna.glb"];
  const githubBase="https://raw.githubusercontent.com/thomasallwinanto/Imaginary_Axis_files/main/";
  let currentModelIdx=0; let scriptLoaded=false; let modelInitialized=false;
  function ensureScript(){
    return new Promise((resolve)=>{
      if(scriptLoaded){ resolve(); return; }
      const script=document.createElement('script'); script.type='module'; script.src='https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
      script.onload=()=>{ scriptLoaded=true; resolve(); };
      document.head.appendChild(script);
    });
  }
  function updateModel(idx){ currentModelIdx=idx; modelViewer.src=githubBase+modelFiles[idx]; const fb=document.getElementById('model-fallback'); if(fb) fb.style.display='none'; }
  function initOnce(){ if(modelInitialized) return; modelInitialized=true; updateModel(0); }
  if(prevBtn) prevBtn.addEventListener('click',()=>{ const idx=(currentModelIdx-1+modelFiles.length)%modelFiles.length; updateModel(idx); });
  if(nextBtn) nextBtn.addEventListener('click',()=>{ const idx=(currentModelIdx+1)%modelFiles.length; updateModel(idx); });
  // Defer heavy loader until section becomes visible to user
  const section=document.getElementById('art-3d');
  const observer=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ ensureScript().then(initOnce); observer.disconnect(); }
    });
  }, { root:null, threshold:0.1 });
  if(section) observer.observe(section);
};
