"use strict";
const palette={C:"#515a65",H:"#e0e4e9",O:"#de4c45",N:"#356fc4",S:"#d5a529"};
let instances=[],representation="ball",isSpinning=false,generation=0;
let statusState={key:"state.loading",values:{}};
const data=window.KEROGEN_MODELS||[];
const el=id=>document.getElementById(id);
const t=(key,values)=>window.SiteI18n.t(key,values);
function formulaHTML(s){return s.replace(/(\d+)/g,"<sub>$1</sub>")}
function elementStyle(ball=true){let out={};for(const [e,c] of Object.entries(palette)){out[e]=c}return out}
function visibleIds(rec){
 const h=el("hydrogens").value;
 return rec.topology.atoms.filter(a=>a.element!=="H"||h==="all"||(h==="polar"&&rec.polarHydrogens.includes(a.atom_id-1))).map(a=>a.atom_id-1)
}
function poseSdf(rec){
 const rows=rec.sdf.split("\n");
 // V2000 preserves original atom order and all explicit bonds.
 const n=rec.topology.atoms.length;
 if(!rows[3].includes("V2000"))return rec.sdf;
 for(let i=0;i<n;i++){
  const a=rec.topology.atoms[i],p=[a.x_angstrom-rec.center[0],a.y_angstrom-rec.center[1],a.z_angstrom-rec.center[2]];
  const q=rec.rotation.map(r=>r.reduce((s,v,j)=>s+v*p[j],0));
  rows[4+i]=q.map(v=>v.toFixed(4).padStart(10)).join("")+rows[4+i].slice(30);
 }
 return rows.join("\n")
}

function showStatus(){
 const values={...statusState.values};
 if(values.aromaticFlag!==undefined)values.aromatic=values.aromaticFlag?" · "+t("viewer.aromatic"):"";
 el("status").textContent=t(statusState.key,values)
}
function setStatus(key,values={}){statusState={key,values};showStatus()}
function updateLegend(){
 const carbon=el("coloring").value==="carbon";
 const items=carbon?[[t("viewer.aromaticC"),"#274e70"],[t("viewer.nonaromaticC"),"#d28a3e"],["O",palette.O],["N",palette.N],["S",palette.S]]:Object.entries(palette);
 el("legend").innerHTML=items.map(([k,c])=>'<span><i class="dot" style="background:'+c+'"></i>'+k+'</span>').join("");
 el("color-note").textContent=t(carbon?"viewer.carbonNote":"viewer.elementNote");
}
function structureLinks(){
 el("structures").innerHTML=data.map(r=>'<div><a href="structures/'+r.id+'.svg" target="_blank"><img loading="lazy" alt="'+t("viewer.structureAria",{id:r.id})+'" src="structures/'+r.id+'.svg">'+r.id+' · '+t("viewer.fullSvg")+'</a><br><a href="atlas/'+r.id+'-connection-atlas.pdf" target="_blank">'+t("viewer.atlasPdf")+'</a></div>').join("")
}
function localizeView(){
 window.SiteI18n.apply();
 const all=el("model").value==="all";
 el("heading").textContent=t(all?"viewer.compareHeading":"viewer.soloHeading",{id:el("model").value});
 el("spin").textContent=t(isSpinning?"viewer.stop":"viewer.spin");
 for(const node of document.querySelectorAll("[data-heavy]"))node.textContent=t("viewer.heavy",{count:node.dataset.heavy});
 for(const entry of instances)el("view-"+entry.rec.id).setAttribute("aria-label",t("viewer.modelAria",{id:entry.rec.id}));
 updateLegend();structureLinks();showStatus()
}
async function rebuild(){
 const token=++generation;
 for(const e of instances){
  e.v.spin(false);e.v.clear();
  const canvas=e.v.getCanvas(),gl=canvas.getContext("webgl2")||canvas.getContext("webgl");
  if(gl){const ext=gl.getExtension("WEBGL_lose_context");if(ext)ext.loseContext()}
 }
 instances=[];isSpinning=false;window.KEROGEN_READY=false;
 const selected=el("model").value,all=selected==="all";
 const list=all?data:data.filter(r=>r.id===selected);
 el("grid").classList.toggle("solo",!all);
 el("grid").innerHTML=list.map(r=>'<article class="card"><div class="cardhead"><span class="name">'+r.id+'</span><span class="endpoint">Easy Rₒ '+r.metadata.assigned_Easy_Ro_percent.toFixed(1)+'%</span></div><div class="formula">'+formulaHTML(r.metadata.formula)+'</div><div class="molecule" id="view-'+r.id+'"></div><div class="cardfoot"><span data-heavy="'+r.metadata.heavy_atoms+'">'+t("viewer.heavy",{count:r.metadata.heavy_atoms})+'</span><a download href="models/'+r.id+'/model.sdf">SDF ↓</a></div></article>').join("");
 if(all)el("grid").insertAdjacentHTML("beforeend",'<article class="card summarycard"><span class="label" data-i18n="viewer.read">'+t("viewer.read")+'</span><h3 data-i18n="viewer.summaryHeading">'+t("viewer.summaryHeading")+'</h3><div class="rule"></div><p data-i18n="viewer.summaryBody">'+t("viewer.summaryBody")+'</p><p data-i18n="viewer.summaryH">'+t("viewer.summaryH")+'</p></article>');
 if(!window.$3Dmol){setStatus("state.libraryError");return}
 setStatus("state.rendering",{count:list.length});localizeView();
 for(const rec of list){
  const v=$3Dmol.createViewer(el("view-"+rec.id),{backgroundColor:"#ffffff",antialias:true});
  const m=v.addModel(poseSdf(rec),"sdf",{keepH:true});
  const e={v,m,rec};instances.push(e);
  el("view-"+rec.id).setAttribute("aria-label",t("viewer.modelAria",{id:rec.id}));
  v.setViewStyle({style:"outline",color:"#33414b",width:.012});
  v.setClickable({},true,function(atom){
   v.removeAllLabels();v.addLabel(rec.id+" · "+atom.elem+" "+(atom.index+1),{position:atom,backgroundColor:"#172b3a",fontColor:"white",fontSize:12,borderRadius:3});v.render();
   const source=rec.topology.atoms[atom.index];
   setStatus("state.atom",{id:rec.id,element:atom.elem,index:atom.index+1,
    coordinates:[source.x_angstrom,source.y_angstrom,source.z_angstrom].map(x=>x.toFixed(4)).join(" , "),aromaticFlag:source.aromatic})
  });
  await styleView(e,token);if(token!==generation)return;setScale(e,all)
 }
 setStatus("state.loaded",{count:list.length});window.KEROGEN_READY=true
}
el("model").addEventListener("change",()=>rebuild().catch(e=>setStatus("state.error",{message:e.message})));
for(const id of["hydrogens","coloring"])el(id).addEventListener("change",async()=>{
 const token=++generation;updateLegend();setStatus("state.updating");
 await Promise.all(instances.map(e=>styleView(e,token)));if(token===generation)setStatus("state.updated")
});
for(const btn of el("styles").querySelectorAll("button"))btn.addEventListener("click",async()=>{
 representation=btn.dataset.style;for(const b of el("styles").querySelectorAll("button"))b.classList.toggle("active",b===btn);
 const token=++generation;setStatus(representation==="surface"?"state.surfaceLoading":"state.updating");
 await Promise.all(instances.map(e=>styleView(e,token)));if(token===generation)setStatus(representation==="surface"?"state.surfaceUpdated":"state.updated")
});
el("reset").addEventListener("click",()=>{for(const e of instances){e.v.removeAllLabels();e.v.setView(e.initialView);e.v.render()}setStatus("state.reset")});
el("spin").addEventListener("click",()=>{isSpinning=!isSpinning;for(const e of instances)e.v.spin(isSpinning?"y":false,.5);el("spin").textContent=t(isSpinning?"viewer.stop":"viewer.spin")});
window.addEventListener("languagechange",localizeView);
window.addEventListener("resize",()=>{for(const e of instances)e.v.resize()});
async function styleView(entry,token){
 const {v,m,rec}=entry,ids=visibleIds(rec);
 v.removeAllSurfaces();m.setStyle({},{});
 const base={stick:{radius:representation==="stick"?.13:.115,colorscheme:elementStyle()}};
 if(representation==="ball")base.sphere={scale:.22,colorscheme:elementStyle()};
 if(representation==="surface"){base.stick.radius=.08}
 m.setStyle({index:ids},base);
 if(el("coloring").value==="carbon"){
  for(const [indices,color]of [[rec.aromaticCarbon,"#274e70"],[rec.aliphaticCarbon,"#d28a3e"]]){
   const s={stick:{radius:base.stick.radius,color}};
   if(representation==="ball")s.sphere={scale:.22,color};
   m.setStyle({index:indices},s)
  }
 }
 if(representation==="ball"){
  for(const elem of ["O","N","S"])m.setStyle({elem},{stick:{radius:.115,color:palette[elem]},sphere:{scale:.29,color:palette[elem]}})
 }
 if(representation==="surface"){
  await v.addSurface($3Dmol.SurfaceType.VDW,{opacity:.33,color:"#b8c7cf"},{index:ids});
  if(token!==generation)return
 }
 v.render()
}
function setScale(entry,all){
 const {v}=entry;v.zoomTo({});v.setProjection("orthographic");
 if(all){
  // fit one common model extent to every equal-sized comparison viewport
  const aspect=v.getCanvas().clientWidth/v.getCanvas().clientHeight;
  const commonView=v.getView();commonView[3]=150-50*Math.max(1,aspect/1.12);v.setView(commonView)
 }else v.zoom(1.25);
 v.render();entry.initialView=v.getView()
}
el("export").addEventListener("click",async()=>{
 const cols=instances.length>1?3:1,cellW=900,cellH=830,rows=Math.ceil(instances.length/cols);
 const canvas=document.createElement("canvas");canvas.width=cols*cellW;canvas.height=rows*cellH;
 const c=canvas.getContext("2d");c.fillStyle="white";c.fillRect(0,0,canvas.width,canvas.height);
 for(let i=0;i<instances.length;i++){
  const e=instances[i],im=new Image();im.src=e.v.pngURI();await im.decode();
  const x=(i%cols)*cellW,y=Math.floor(i/cols)*cellH;
  c.fillStyle="#172b3a";c.font="28px sans-serif";c.fillText(e.rec.id+"   Easy Ro "+e.rec.metadata.assigned_Easy_Ro_percent.toFixed(1)+"%",x+25,y+42);
  c.drawImage(im,x,y+70,cellW,cellH-95)
 }
 const a=document.createElement("a");a.href=canvas.toDataURL("image/png");a.download="chang7-models-view.png";a.click()
});

rebuild().catch(e=>{setStatus("state.error",{message:e.message});console.error(e)});
