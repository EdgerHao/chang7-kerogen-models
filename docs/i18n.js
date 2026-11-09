/* Shared English-first localization for the model explorer and figure gallery. */
(function(){
"use strict";
const messages={
en:{
"viewer.title":"Chang 7 · Kerogen Model Explorer",
"viewer.eyebrow":"OPEN MOLECULAR STRUCTURES · CHANG 7",
"viewer.heading":"Kerogen Model Explorer",
"viewer.intro":"Five candidate molecular models · explore connectivity, conformations and heteroatoms",
"viewer.badge":"Release v0.1.0 · visualization preview",
"viewer.controls":"Display settings",
"viewer.models":"Models","viewer.compare":"Compare all five models",
"viewer.representation":"Representation","viewer.ball":"Ball & stick","viewer.stick":"Skeleton","viewer.surface":"Surface",
"viewer.hydrogens":"Hydrogens","viewer.polar":"Keep H on N/O/S","viewer.none":"Hide all H","viewer.allH":"Show all H",
"viewer.color":"Color","viewer.element":"By element","viewer.carbon":"Aromatic / nonaromatic C",
"viewer.elementNote":"C gray · H light gray · O red · N blue · S gold",
"viewer.carbonNote":"Carbon classes follow the candidate graph; nonaromatic C includes carbonyl C.",
"viewer.view":"View","viewer.reset":"Reset view","viewer.spin":"Rotate","viewer.stop":"Stop rotation","viewer.export":"Save PNG",
"viewer.help":"Drag to rotate; scroll to zoom. Click an atom to inspect its original SDF ID.",
"viewer.figures":"Figures","viewer.gallery":"ChimeraX figures & 2-D atlases →",
"viewer.files":"Files","viewer.repository":"GitHub repository ↗",
"viewer.fileNote":"Models are from public release v0.1.0. Downloads retain all atoms, bonds and source coordinates.",
"viewer.compareHeading":"Five models · same spatial scale","viewer.soloHeading":"{id} · candidate conformer",
"viewer.modelAria":"{id} three-dimensional model","viewer.heavy":"{count} heavy atoms",
"viewer.read":"Reading the structures","viewer.summaryHeading":"Same chemical graphs<br>Clearer views",
"viewer.summaryBody":"Five endpoints were built independently.<br>Views use rigid rotations without changing internal geometry.<br>Screen area is not a measure of density or maturity.",
"viewer.summaryH":"Only polar H is shown by default; downloads retain all explicit hydrogen atoms.",
"viewer.structures":"2-D chemical structures · open vector drawings",
"viewer.structureAria":"{id} two-dimensional structure","viewer.fullSvg":"Full SVG ↗","viewer.atlasPdf":"Connection-indexed atlas PDF ↗",
"viewer.aromaticC":"Aromatic C","viewer.nonaromaticC":"Nonaromatic C","viewer.aromatic":"aromatic",
"viewer.footer":"These are nonunique candidate graphs and illustrative conformers. Molecular surfaces describe these coordinate snapshots, not measured pores or wettability. Assigned Easy Rₒ values are endpoint labels. Data: CC BY 4.0 · Code: MIT · Renderer: 3Dmol.js (BSD).",
"state.loading":"Loading models…","state.rendering":"Rendering {count} models…",
"state.loaded":"Loaded {count} models. Drag to rotate; click an atom for its ID. Downloads retain the complete source coordinates and connectivity.",
"state.libraryError":"3Dmol.js did not load. Please reload the page.",
"state.updating":"Updating the view…","state.updated":"View updated. Molecular graphs and source coordinates are unchanged.",
"state.surfaceLoading":"Computing geometric surfaces of the candidate conformers…",
"state.surfaceUpdated":"View updated. Surfaces are geometric envelopes of these candidate conformers only.",
"state.reset":"Initial views restored.","state.error":"Rendering failed: {message}",
"state.atom":"{id} · {element} · atom {index} | Source SDF coordinates / Å: {coordinates}{aromatic}",
"gallery.title":"Chang 7 · Figures and Structure Atlases",
"gallery.eyebrow":"CHANG 7 · FIVE CANDIDATE MODELS",
"gallery.heading":"Kerogen models · figures and structure atlases",
"gallery.intro":"Graphical views of the public models. Three-dimensional figures use the v0.1.0 source coordinates; two-dimensional drawings represent the same candidate chemical graphs.",
"gallery.explorer":"Open the interactive explorer","gallery.platePdf":"3-D plate PDF","gallery.supplementPdf":"2-D structure preview PDF",
"gallery.a":"A · ChimeraX ball-and-stick plate",
"gallery.aNote":"Consistent orthographic projection, spatial scale, lighting and element colors. C-bound H is hidden; polar H is retained.",
"gallery.b":"B · ChimeraX skeleton plate",
"gallery.bNote":"Reduced atom occlusion reveals rings and connections. These are the same conformers as in plate A.",
"gallery.svg":"SVG layout","gallery.pdf":"PDF",
"gallery.aAlt":"Five-model ChimeraX ball-and-stick plate","gallery.bAlt":"Five-model ChimeraX skeleton plate",
"gallery.twoD":"2-D structures and connectivity inspection",
"gallery.twoDNote":"Complete drawings retain all connections; dense crosslinks still intersect in the plane. The connection-indexed atlases show local units separately. Paired L labels restore the original bonds; atom IDs match the SDF. This is a viewing convention, not chemical cleavage.",
"gallery.model":"Model","gallery.full":"Complete 2-D drawing","gallery.indexed":"Atom-indexed drawing","gallery.atlas":"Connection atlas",
"gallery.distanceNote":"Drawing bond lengths are not used for geometry analysis. SDF/SMILES remain authoritative for chemical connectivity; 3-D coordinates are illustrative candidate conformers.",
"gallery.licenses":"Models and figures: CC BY 4.0 · Website code: MIT · Model source:",
"gallery.release":"release v0.1.0",
"gallery.footer":"3-D rendering: UCSF ChimeraX 1.12; 2-D depictions: RDKit. These are nonunique candidate structures and illustrative conformers."
},
zh:{
"viewer.title":"长7 · 干酪根模型浏览器",
"viewer.eyebrow":"公开分子结构 · 长7",
"viewer.heading":"干酪根模型浏览器",
"viewer.intro":"五个候选分子模型 · 查看化学连接、空间构象与异原子",
"viewer.badge":"模型版本 v0.1.0 · 可视化预览",
"viewer.controls":"显示设置",
"viewer.models":"模型","viewer.compare":"五个模型并排比较",
"viewer.representation":"表示方式","viewer.ball":"球棍","viewer.stick":"骨架","viewer.surface":"表面",
"viewer.hydrogens":"氢原子","viewer.polar":"保留 N/O/S 上的氢","viewer.none":"隐藏全部氢","viewer.allH":"显示全部氢",
"viewer.color":"颜色","viewer.element":"按元素着色","viewer.carbon":"芳香 / 非芳香碳",
"viewer.elementNote":"深灰 C · 浅灰 H · 红 O · 蓝 N · 金 S",
"viewer.carbonNote":"碳分类来自候选化学图；非芳香碳也包括羰基碳。",
"viewer.view":"操作","viewer.reset":"重置视角","viewer.spin":"旋转","viewer.stop":"停止旋转","viewer.export":"保存 PNG",
"viewer.help":"拖动旋转，滚轮缩放。点击原子查看与原始 SDF 一致的编号。",
"viewer.figures":"图件","viewer.gallery":"ChimeraX 图件与二维图册 →",
"viewer.files":"文件","viewer.repository":"GitHub 仓库 ↗",
"viewer.fileNote":"模型来自公开版本 v0.1.0；下载文件保留完整原子、连接和源坐标。",
"viewer.compareHeading":"五个模型 · 相同空间尺度","viewer.soloHeading":"{id} · 候选构象",
"viewer.modelAria":"{id} 三维模型","viewer.heavy":"{count} 个重原子",
"viewer.read":"如何阅读结构","viewer.summaryHeading":"相同化学连接<br>更清楚的展示",
"viewer.summaryBody":"五个端点独立构建。<br>各图采用刚体旋转取景，未改变内部几何。<br>显示面积不能代替密度或成熟度判断。",
"viewer.summaryH":"默认只保留极性氢；下载文件仍包含完整的显式氢原子。",
"viewer.structures":"二维化学结构 · 点击打开矢量图",
"viewer.structureAria":"{id} 二维结构","viewer.fullSvg":"完整 SVG ↗","viewer.atlasPdf":"连接编号图册 PDF ↗",
"viewer.aromaticC":"芳香碳","viewer.nonaromaticC":"非芳香碳","viewer.aromatic":"芳香原子",
"viewer.footer":"这些结构是非唯一的候选化学图与示意构象。分子表面描述当前坐标，不代表实测孔隙或润湿性。Easy Rₒ 为指定端点标签。数据：CC BY 4.0 · 代码：MIT · 渲染：3Dmol.js（BSD）。",
"state.loading":"正在加载模型…","state.rendering":"正在绘制 {count} 个模型…",
"state.loaded":"已加载 {count} 个模型。拖动旋转，点击原子查看编号；下载文件保留完整源坐标与连接。",
"state.libraryError":"3Dmol.js 未能加载，请刷新页面。",
"state.updating":"正在更新显示…","state.updated":"显示已更新，模型连接与源坐标未改变。",
"state.surfaceLoading":"正在计算候选构象的几何表面…",
"state.surfaceUpdated":"显示已更新。表面仅表示当前候选构象的几何包络。",
"state.reset":"已恢复初始视角。","state.error":"绘制失败：{message}",
"state.atom":"{id} · {element} · 原子 {index} | SDF 原始坐标 / Å：{coordinates}{aromatic}",
"gallery.title":"长7 · 图件与结构图册",
"gallery.eyebrow":"长7 · 五个候选模型",
"gallery.heading":"干酪根模型 · 图件与结构图册",
"gallery.intro":"公开模型的图形展示。三维图使用 v0.1.0 源坐标，二维图与同一候选化学连接对应。",
"gallery.explorer":"打开五模型交互浏览器","gallery.platePdf":"三维组图 PDF","gallery.supplementPdf":"二维结构预览 PDF",
"gallery.a":"A · ChimeraX 球棍组图",
"gallery.aNote":"统一正交投影、空间尺度、光照与元素颜色；隐藏碳上氢，保留极性氢。",
"gallery.b":"B · ChimeraX 骨架组图",
"gallery.bNote":"减小原子的视觉遮挡，更容易查看芳香环与连接。与方案 A 使用相同构象。",
"gallery.svg":"SVG 版式","gallery.pdf":"PDF",
"gallery.aAlt":"五模型 ChimeraX 球棍组图","gallery.bAlt":"五模型 ChimeraX 骨架组图",
"gallery.twoD":"二维结构与连接检查",
"gallery.twoDNote":"完整图保留所有连接，复杂交联在平面上仍有交叉。连接编号图册将局部结构分开显示，用成对 L 编号恢复原始键，原子编号与 SDF 一致。这是展示约定，不表示化学裂解。",
"gallery.model":"模型","gallery.full":"完整二维图","gallery.indexed":"原子编号图","gallery.atlas":"连接图册",
"gallery.distanceNote":"绘图键长不用于几何分析。精确化学连接以 SDF/SMILES 为准，三维坐标属于候选示意构象。",
"gallery.licenses":"模型与图件：CC BY 4.0 · 页面代码：MIT · 模型来源：",
"gallery.release":"模型版本 v0.1.0",
"gallery.footer":"三维渲染：UCSF ChimeraX 1.12；二维绘图：RDKit。这些结构是非唯一候选结构与示意构象。"
}};
let language="en";
try{const saved=localStorage.getItem("chang7-language");if(saved==="en"||saved==="zh")language=saved}catch(e){}
function t(key,values={}){return (messages[language][key]||messages.en[key]||key).replace(/\{(\w+)\}/g,(_,name)=>values[name]??"")}
function apply(){
 document.documentElement.lang=language==="zh"?"zh-CN":"en";
 for(const node of document.querySelectorAll("[data-i18n]"))node.innerHTML=t(node.dataset.i18n);
 for(const node of document.querySelectorAll("[data-i18n-alt]"))node.alt=t(node.dataset.i18nAlt);
 for(const node of document.querySelectorAll("[data-i18n-aria]"))node.setAttribute("aria-label",t(node.dataset.i18nAria));
 for(const button of document.querySelectorAll("[data-language]")){
  const on=button.dataset.language===language;button.setAttribute("aria-pressed",String(on));button.classList.toggle("active",on)
 }
}
function setLanguage(lang){
 if(lang!=="en"&&lang!=="zh")return;
 language=lang;try{localStorage.setItem("chang7-language",lang)}catch(e){}
 apply();window.dispatchEvent(new CustomEvent("languagechange",{detail:{language}}))
}
window.SiteI18n={t,apply,setLanguage,get language(){return language},messages};
document.addEventListener("DOMContentLoaded",()=>{
 for(const b of document.querySelectorAll("[data-language]"))b.addEventListener("click",()=>setLanguage(b.dataset.language));
 apply();window.dispatchEvent(new CustomEvent("languagechange",{detail:{language}}))
});
})();
