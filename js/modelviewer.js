// 3D model viewer logic (plain script)
window.initModelViewer = function(){
  const modelViewer=document.getElementById('main-model-viewer');
  if(!modelViewer) return;
  const prevBtn=document.getElementById('prev-model');
  const nextBtn=document.getElementById('next-model');
  const modelFiles=["BAC.glb","DEBRIS.glb","Death_Stranding.glb","PYRAMID.glb","Project_frame.glb","THE SHIP.glb","VFP.glb"];
  const githubBase="https://raw.githubusercontent.com/thomasallwinanto/Imaginary_Axis_files/main/";
  let currentModelIdx=0;
  function updateModel(idx){ currentModelIdx=idx; modelViewer.src=githubBase+modelFiles[idx]; const fb=document.getElementById('model-fallback'); if(fb) fb.style.display='none'; }
  if(prevBtn) prevBtn.addEventListener('click',()=>{ const idx=(currentModelIdx-1+modelFiles.length)%modelFiles.length; updateModel(idx); });
  if(nextBtn) nextBtn.addEventListener('click',()=>{ const idx=(currentModelIdx+1)%modelFiles.length; updateModel(idx); });
  updateModel(0);
  const script=document.createElement('script'); script.type='module'; script.src='https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js'; document.head.appendChild(script);
};
