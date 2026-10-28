// ---------- guided tour: walks through the graph, then hands it over ----------
(function(){
if(new URLSearchParams(location.search).get("embed")) return;
const $=s=>document.querySelector(s);
const B=[
 {s:"b0",cap:'<span class="type t-e">Expected route</span>',h:"A refugee crosses a border and stays",body:"Most refugees arrive, stay 12 months or more and become foreign-born foreign citizens in the resident population. Here IRRS and IMTM agree: the refugee is an international migrant.",cases:[],cite:"IRRS para 84 · IMTM para 34"},
 {s:"b1",cap:'<span class="fw fw-imtm">IMTM · Immigrants</span><span class="type t-3">Type 3</span>',h:"International migrants, but recorded for another reason",body:"These refugees are international migrants, so they nest. The reason IMTM records is not protection, so they disappear from any count of humanitarian migration.",cases:[
   ["11","t-3","Refugee sur place","A student has lived in the country for three years when war breaks out at home and is recognised as a refugee.","IRRS 80 · IMTM 34, Box 1","c",1],
   ["12","t-3","Refugee-like, on a visa or free movement","A man fled threats but entered on a three-year work visa and never applied for asylum.","IRRS 92.4 · IMTM 17","p"],
   ["13","t-3","Reunified family member","A woman joins her refugee husband on a family reunification visa.","IRRS 94.3 · IMTM 17","c"]]},
 {s:"b2",cap:'<span class="fw fw-imtm">IMTM · Native-born foreign citizens</span><span class="type t-1">Type 1</span>',h:"In the immigrant stock without ever migrating",body:"IMTM counts everyone without citizenship in its immigrant stock. Refugees born in the country of asylum land here although they never crossed a border.<br><br><span class=\"type t-add\">Our addition</span> The box <b>No international migration</b> now appears on the graph. It sits outside the IMTM framework on purpose: IMTM has no category for residents who never changed country, yet births in exile, status changes and returns within 12 months all pass through it.",cases:[
   ["1","t-1","Born in exile, derivative status","A girl is born to recognised refugees in a country that gives no citizenship at birth and receives refugee status through her parents.","IRRS 60, 90 · IMTM 25, 53","c",1],
   ["3","t-1","Born under other protection","A child born to parents with subsidiary or temporary protection receives the same status, not citizenship.","IRRS 90, 92.3 · IMTM 57","p"],
   ["2","t-1","Born here, facing removal","A man born to migrant parents loses his residence right at 18, faces removal to his parents' country and claims asylum.","IRRS 90, 92.2 · IMTM 53","p"],
   ["4","t-1","Born in exile, status ceases, stays","Refugee status ends after peace returns to the parents' country; he stays without citizenship.","IRRS 67, 94.4 · IMTM 25","p"]]},
 {s:"b3",cap:'<span class="fw fw-imtm">IMTM · Native-born citizens</span><span class="type t-1">Type 1</span>',h:"Refugees and refugee background outside the immigrant stock",body:"Citizens born in the country are not in the immigrant stock at all, but some of them are refugees or have a refugee background.",cases:[
   ["5","t-1","Palestine refugee with host citizenship","A Palestine refugee under UNRWA's mandate, born in the host country and a citizen from birth.","IRRS 78, 90 · IMTM 25","c"],
   ["6","t-1","Child of refugees, citizen at birth","A boy born to refugee parents where citizenship comes with birthplace: refugee background, not a refugee.","IRRS 59, 94.2 · IMTM 25","c"],
   ["7","t-1","Born in exile, later naturalised","A refugee born in the country of asylum naturalises at 18 and leaves the immigrant stock.","IRRS 94.1 · IMTM 58-61","p"],
   ["8","t-1","Returnee away less than 12 months","A man's asylum claim abroad is rejected and he is back after six months: he never left the resident population.","IRRS 97.2 · IMTM Fig. 2","p"]]},
 {s:"b4",cap:'<span class="fw fw-imtm">IMTM · Foreign-born citizens</span><span class="type t-4">Type 4</span>',h:"Returnees who arrive for the first time",body:"IRRS defines home as the country of former habitual residence, which can be the parents' country.",cases:[
   ["15","t-4","Child born in exile 'returns'","A boy born in a refugee camp abroad, with refugee status, repatriates with his parents to a country he has never lived in: an IRRS returnee, an IMTM first-time immigrant.","IRRS 95, 97.1 · IMTM 25","p"]]},
 {s:"b5",cap:'<span class="fw fw-imtm">IMTM · Returned migrants</span><span class="type t-4">Type 4</span>',h:"In the flow, not in the stock",body:"Refugees who come home after a year or more are returned migrants in the immigration flow, but as native-born citizens they never appear in the immigrant stock.",cases:[
   ["14","t-4","Refugee returns after years abroad","A man returns home after eight years as a refugee abroad.","IRRS 97.1, 109 · IMTM 25, 27","c",1]]},
 {s:"b6",cap:'<span class="fw fw-imtm">IMTM · Temporary population</span><span class="type t-2">Type 2</span>',h:"Refugees who are not yet migrants",body:"IRRS has no duration rule; IMTM needs 12 months. Until then, asylum seekers and new arrivals are temporary population. They become migrants by elapsed time alone.",cases:[
   ["9","t-2","Recent asylum seeker","A man filed his claim four months ago and does not yet know whether he can stay.","IRRS 85, 92.2 · IMTM 30, 33","c",1],
   ["10","t-2","New prima facie or temporary protection arrival","A family arrived two months ago with a group recognised prima facie.","IRRS 55, 92.3 · IMTM 30, 33","c"]]},
 {s:"b7",cap:'<span class="type t-1">Result</span>',h:"Most refugee categories include people who never migrated",body:"Of the 14 IRRS categories, 12 include common or plausible cases of residents who never changed country of residence. Only the refugee-like and reunified family categories always arrive as international migrants. The two recommendations are consistent: IRRS para 80 and IMTM para 53 both say so. The assumption that every refugee is a migrant is what fails.",cases:[],cite:"IRRS paras 77, 80 · IMTM paras 34, 53"}
];
const C=[
 {s:"c0",cap:'<span class="type t-e">Expected route</span>',h:"An IDP who stays inside the country",body:"Displaced, but still usually resident in the country: no international migration in IMTM, and IRIS agrees. Nationality does not matter.",cases:[],cite:"IRIS paras 102, 116 · IMTM para 25"},
 {s:"c1",cap:'<span class="fw fw-imtm">IMTM · Residents temporarily abroad</span><span class="type t-2">Type 2</span>',h:"Crossed a border, still an IDP",body:"IRIS keeps people in the IDP stock if they come back within 12 months without a new residence abroad. IMTM agrees they never left the resident population, but nobody counts the border crossing.",cases:[
   ["D3","t-2","Back within 12 months","After an attack a family shelters across the border for five months and comes back, but cannot return home.","IRIS 75, 117 · IMTM 23, Fig. 2","c",1]]},
 {s:"c2",cap:'<span class="fw fw-imtm">IMTM · Emigrants</span><span class="type t-5">Type 5</span>',h:"The real misalignment: claiming asylum abroad",body:"Until a new country of residence is established, the same person can be an IDP at home and an asylum seeker abroad. IRIS, IRRS and IMTM each have a rule; none settles the overlap.",cases:[
   ["D7","t-5","IDP claims asylum abroad","An IDP crosses the border and files an asylum claim; for months she has no established residence there.","IRIS 98-99, 117 · IRRS 92.2 · IMTM 33","c",1],
   ["16","t-5","Rejected and back within 12 months","An IDP's claim abroad is rejected and she is home after five months: an IDP under IRIS para 117 and an IRRS returnee.","IRIS 86, 117 · IRRS 97.2","p"]],
  aligned:"Aligned: IDPs who settle abroad for 12 months or more leave the IDP stock by emigration, exactly as IMTM counts them (D6, D8; IRIS 83, 84, 98)."},
 {s:"c3",cap:'<span class="fw fw-imtm">IMTM · Returned migrants</span><span class="type t-4">Type 4</span>',h:"Back home, but not an IDP",body:"People who lived abroad for a year or more and come back are returned migrants. IRIS does not count them as IDPs, even when they cannot reach their home, unless they are displaced again.",cases:[
   ["D9","t-4","Returned refugee who cannot go home","A refugee repatriates after six years but cannot reach her village and lives in a camp near the capital.","IRIS 86 · IRRS 97.1 · IMTM 27","c",1],
   ["D10","t-4","Disaster-displaced, back after 12+ months","After an earthquake a man lives abroad for 18 months, comes back, and finds his town destroyed.","IRIS 88, 89 · IMTM 27","p"],
   ["D4","t-4","Back after 12+ months, displaced again","A returned migrant is forced from his home again by a flood: an IDP again from that moment.","IRIS 89 · IMTM 27","p"]]},
 {s:"c4",cap:'<span class="fw fw-imtm">IMTM · Immigrants</span><span class="type t-3">Type 3</span>',h:"International migrants who become IDPs",body:"Because nationality is irrelevant for IRIS, foreign residents displaced inside the country are IDPs and international migrants at once, with work or family recorded as the reason for migration.",cases:[
   ["D1","t-3","Immigrant first, IDP later","A foreign worker who has lived in the country for ten years loses his home in an earthquake.","IRIS 102 · IMTM 17, 25","c",1],
   ["D2","t-4","Stateless IDP born in the country","A stateless man born in the country is displaced by flooding: never migrated, yet in the immigrant stock.","IRIS 102 · IMTM 25, 53","p"]]}
];
const D=[
 {s:"d0",cap:'<span class="type t-e">Expected route</span>',h:"Displaced to another district",body:"An IDP who moves across a civil division boundary is also an internal migrant: usually resident in one division, previously in another.",cases:[],cite:"IRIS para 115 · P&R para 5.64"},
 {s:"d1",cap:'<span class="fw fw-pr">P&amp;R · Moves within the division</span><span class="type t-1">Type 1</span>',h:"Displaced, but not an internal migrant",body:"IRIS counts any forced move from the dwelling. The census does not count moves inside a civil division as migration. How many IDPs fall here depends on how small the divisions are.",cases:[
   ["P1","t-1","Displaced within the same district","After a landslide a family moves to an evacuation shelter two kilometres away, in the same municipality.","IRIS 115 · P&R 5.64, 5.69-5.70","c",1]]},
 {s:"d2",cap:'<span class="fw fw-pr">P&amp;R · Non-migrants</span><span class="type t-2">Type 2</span>',h:"IDPs the reference-date question cannot see",body:"The census often asks where people lived one or five years ago. IDPs who returned home within that period, or who were displaced before it, look like people who never moved.",cases:[
   ["P2+","t-2","Protracted IDPs","A family displaced seven years ago still lives in the camp: residence five years ago and today are the same place.","IRIS 81 · P&R 5.77-5.78","c",1],
   ["P2","t-2","Returned home within the period","A family displaced three years ago is back in its village but still lacks housing and documents.","IRIS 75 · P&R 5.77","c"],
   ["P7","t-2","IDP-related child born after the reference date","Neither migrant nor IDP; the census treats young children separately.","IRIS 78 · P&R 5.81","p"]]},
 {s:"d3",cap:'<span class="fw fw-pr">P&amp;R · Internal migrants</span><span class="type t-3">Type 3</span>',h:"Internal migrants who are not IDPs",body:"Only the census question on reason for change of residence, with its forced displacement option, separates these people from IDPs.",cases:[
   ["P6","t-3","Voluntary movers and joining relatives","A young woman moves to the capital for work, or joins displaced relatives from another province.","IRIS 80 · P&R 5.64, 5.82-5.84","c",1],
   ["P5","t-3","IDP-related child moving home","A girl born in the displacement camp moves home with her parents at six: a lifetime internal migrant.","IRIS 78 · P&R 5.65","p"],
   ["d6","t-3","IDPs who have overcome vulnerabilities","Locally integrated or settled elsewhere: no longer IDPs, still internal migrants.","IRIS 81 · P&R 5.64","c"]]},
 {s:"d4",cap:'<span class="fw fw-pr">P&amp;R · Last move and moves from abroad</span><span class="type t-4">Type 4</span>',h:"Counted, but differently",body:"The same return looks like no move on the reference-date question and like an internal move on the last-move question. A short stay abroad can turn an IDP into an apparent international arrival.",cases:[
   ["P3","t-4","Return counted as an internal move","The returned family is counted as internal migrants into their home district, because their last move came from the camp.","IRIS 75 · P&R 5.72-5.75","c",1],
   ["P4","t-4","Short stay abroad recorded as from abroad","An IDP sheltered abroad for four months, then came back to another district: previous residence recorded as a foreign country.","IRIS 117 · P&R 5.75, 5.77","p"]]},
 {s:"d5",cap:'<span class="fw fw-pr">P&amp;R · Not yet usual residents</span><span class="type t-2">Type 2</span>',h:"Too recent to count where they are",body:"Usual residence needs six or twelve months, or the intention to stay. People who intend to return home, as many IDPs do, may be counted at the address they fled. IRIS counts them from day one.",cases:[
   ["N","t-2","Recently displaced","A family arrived in the camp two months ago and expects to go home: the census may still place them in their home district.","IRIS 75 · P&R 2.51, 5.55","c",1]]}
];

const G={irrs:()=>({svg:$("#flow"),N:node,LK:LINKS,main:true}),A:()=>({svg:$("#flowA"),N:FLOWA.N,LK:FLOWA.LK,F:FLOWA}),B:()=>({svg:$("#flowB"),N:FLOWB.N,LK:FLOWB.LK,F:FLOWB})};
const TAB={irrs:"residents",A:"temporary",B:"temporary"};
const NS="http://www.w3.org/2000/svg";
const RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
const cache=new Map();
function items(g){
  if(cache.has(g.svg)) return cache.get(g.svg);
  const xs=c=>Object.values(g.N).filter(n=>n.col===c&&n.x!=null).map(n=>n.x);
  const bL=Math.min(...xs("m"))-30,bR=Math.min(...xs("c"))-40,out=[];
  const walk=el=>{[...el.children].forEach(ch=>{ if(ch.id==="spot"||ch.tagName==="defs"||ch.tagName==="title") return;
    const cl=ch.getAttribute("class")||"";
    if(/\b(route|hit)\b/.test(cl)||cl.includes("pillG")){out.push([ch,"links"]);return;}
    if(cl.includes("sqG")){out.push([ch,"sq"]);return;}
    if(ch.tagName==="g"&&!cl.includes("node")&&ch.children.length&&[...ch.children].some(k=>/route|hit|pillG|node|sqG/.test(k.getAttribute("class")||""))){walk(ch);return;}
    let b;try{b=ch.getBBox();}catch(e){return;} if(!b.width&&!b.height) return;
    const cx=b.x+b.width/2; out.push([ch,cx<bL?"L":cx<bR?"M":"R"]);
    if(ch.tagName==="g"&&cl.includes("node")) ch.querySelectorAll(".sqG").forEach(s=>out.push([s,"sq"]));});};
  walk(g.svg); cache.set(g.svg,out); return out;}
function build(g,cats){items(g).forEach(([e,k])=>{const on=!cats||cats.includes(k);e.style.transition="opacity .6s ease, transform .6s ease";e.style.transformBox="fill-box";e.style.opacity=on?"":"0";e.style.transform=on||RM?"":"translateX(-14px)";e.style.pointerEvents=on?"":"none";});}
const hitOf=(g,l)=>[...g.svg.querySelectorAll(".hit")].find(h=>h.getAttribute("d")===l.el.getAttribute("d"));
function hide(g,ids){
  g.svg.querySelectorAll("[data-thid]").forEach(e=>{e.style.display="";e.removeAttribute("data-thid");});
  const off=e=>{if(e){e.style.display="none";e.setAttribute("data-thid","1");}};
  Object.entries(g.N).forEach(([id,n])=>{if(ids.includes(id)) off(n.g);});
  g.LK.forEach((l,li)=>{if(ids.includes(l.k)||ids.includes(l.m)||ids.includes(l.c)){off(l.el);off(hitOf(g,l));if(g.main) g.svg.querySelectorAll(`[data-li="${li}"]`).forEach(off);}});
  if(g.main&&ids.includes("NON")) g.svg.querySelectorAll("text").forEach(t=>{if(t.textContent==="OUTSIDE THE IMTM FRAMEWORK") off(t);});}
const casesOf=(g,l)=>g.main?l.rs.map(r=>r.case):l.cs;
function show(g,ids){
  const ls=g.LK.filter(l=>casesOf(g,l).some(c=>ids.includes(c))),any=ls.length>0;
  g.LK.forEach(l=>{l.el.classList.toggle("dim",any&&!ls.includes(l));l.el.classList.toggle("hi",any&&ls.includes(l));});
  if(g.main){g.svg.querySelectorAll(".sqG").forEach(s=>s.classList.toggle("dimq",any&&!ls.includes(LINKS[+s.dataset.li])));
    const t=new Set(any?ls.flatMap(l=>[l.k,l.m,l.c]):[]);Object.values(node).forEach(n=>n.g&&n.g.classList.toggle("touch",t.has(n.id)));}
  if(any) ls.forEach(l=>l.el.parentNode.insertBefore(l.el,l.el.parentNode.querySelector(".hit")));
  // flowing animation: new routes draw themselves in, then particles run along them
  g.svg.querySelectorAll(".flowov").forEach(o=>o.remove());
  if(!RM) ls.forEach((l,i)=>{ if(l.el.style.display==="none") return; const wasOn=l.__on; drawIn(l.el,wasOn?0:i*60);
    const ov=document.createElementNS(NS,"path"); ov.setAttribute("d",l.el.getAttribute("d")); ov.setAttribute("class","flowov"); ov.style.animationDelay=(-(i%7)*0.17)+"s"; l.el.after(ov);});
  g.LK.forEach(l=>l.__on=ls.includes(l));
  g.svg.querySelectorAll(".pillG").forEach(p=>{const on=any&&ids.includes(p.dataset.case);p.classList.toggle("faded",any&&!on);p.classList.toggle("on",on);});
  document.body.classList.toggle("show-rare",T.rare0||ls.some(l=>l.rare));}
function drawIn(el,delay){ if(el.__drawn&&!delay&&el.__on) return; let L; try{L=el.getTotalLength();}catch(e){return;}
  el.style.transition="none"; el.style.strokeDasharray=L; el.style.strokeDashoffset=L; el.getBoundingClientRect();
  setTimeout(()=>{el.style.transition="stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)"; el.style.strokeDashoffset=0;},delay||0);
  clearTimeout(el.__t); el.__t=setTimeout(()=>{el.style.strokeDasharray="";el.style.strokeDashoffset="";el.style.transition="";},(delay||0)+1050);}
function hl(g,li){g.LK.forEach((l,i)=>l.el.classList.toggle("hov",i===li));g.svg.classList.toggle("hovering",li!=null);
  if(li!=null){const l=g.LK[li];l.el.parentNode.insertBefore(l.el,l.el.parentNode.querySelector(".hit"));}}
function focus(g,tg){
  let sp=g.svg.querySelector("#spot"); const vb=g.svg.viewBox.baseVal;
  const els=[]; (tg||[]).forEach(t=>{if(t.startsWith("node:")){const n=g.N[t.slice(5)];if(n&&n.g) els.push(n.g);} else if(t.startsWith("nth:")){const [,sel,i]=t.split("|");const e=g.svg.querySelectorAll(sel)[+i];if(e) els.push(e);}});
  let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9; els.forEach(e=>{const b=e.getBBox();if(!b.width&&!b.height)return;x0=Math.min(x0,b.x);y0=Math.min(y0,b.y);x1=Math.max(x1,b.x+b.width);y1=Math.max(y1,b.y+b.height);});
  if(x0>x1){ if(sp){sp.style.opacity="0"; const s=sp; setTimeout(()=>{if(s.style.opacity==="0") s.remove();},500);} return null; }
  x0-=10;y0-=10;x1+=10;y1+=10; const to=[x0,y0,x1,y1];
  if(!sp){ sp=document.createElementNS(NS,"g"); sp.id="spot"; sp.setAttribute("pointer-events","none"); sp.style.transition="opacity .5s ease"; sp.style.opacity="0";
    const pa=document.createElementNS(NS,"path"); pa.setAttribute("fill-rule","evenodd"); pa.setAttribute("style","fill:var(--bg);opacity:.8"); sp.appendChild(pa);
    const r=document.createElementNS(NS,"rect"); r.setAttribute("rx",12); r.setAttribute("style","fill:none;stroke:var(--ink);stroke-width:2.5"); sp.appendChild(r);
    sp.__box=[vb.x,vb.y,vb.x+vb.width,vb.y+vb.height]; }
  g.svg.appendChild(sp); requestAnimationFrame(()=>sp.style.opacity="1");
  const from=sp.__box.slice(), t0=performance.now(), D=RM?0:650, ease=k=>k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;
  const paint=b=>{const [a,b2,c,d]=b; sp.firstChild.setAttribute("d",`M${vb.x-50},${vb.y-50}h${vb.width+100}v${vb.height+100}h${-vb.width-100}z M${a},${b2}v${d-b2}h${c-a}v${b2-d}z`);
    const r=sp.lastChild; r.setAttribute("x",a);r.setAttribute("y",b2);r.setAttribute("width",c-a);r.setAttribute("height",d-b2); sp.__box=b;};
  cancelAnimationFrame(sp.__raf);
  const tick=now=>{const k=D?Math.min(1,(now-t0)/D):1, e=ease(k); paint(from.map((v,i)=>v+(to[i]-v)*e)); if(k<1) sp.__raf=requestAnimationFrame(tick);};
  sp.__raf=requestAnimationFrame(tick);
  return {y:y0};}
function routesFor(g,id){
  const rows=[]; g.LK.forEach((l,li)=>{ if(l.el.style.display==="none") return;
    if(g.main){l.rs.filter(r=>r.case===id).forEach(r=>{const cat=CATS.find(c=>c.id===l.k);rows.push({li,path:`${l.k} ${cat?cat.l:""} → ${(MIDLAB[l.m]||[l.m])[0]} → ${CELLS.find(c=>c.id===l.c).l}`,ex:r.ex,rule:r.t,cite:r.ref,lk:r.lk,rare:l.rare});});}
    else if(l.cs.includes(id)) rows.push({li,path:`${l.k} ${g.N[l.k].l} → ${g.N[l.m].l} → ${g.N[l.c].l}`,rare:l.rare});});
  return rows;}

// ---------- steps ----------
const ALIAS={"P2+":"P2"};
const tb=(cls,t)=>`<span class="tbadge ${cls}">${t}</span>`;
const ADD=tb("tt-add","Our addition");
const fix=h=>h.replace(/class="type t-(e|\d|add)"/g,(m,k)=>`class="tbadge tt-${k}"`).replace(/class="fw fw-(\w+)"/g,'class="tbadge tfw tfw-$1"');
const S=[];
const step=o=>S.push(o);
const fromArr=(arr,ch,g,extra)=>arr.forEach(st=>{const exp=st.s.endsWith("0");
  step(Object.assign({ch,g,cap:fix(st.cap),h:st.h,body:fix(st.body),cite:st.cite,aligned:st.aligned,
    cases:exp?[{n:{b0:"E",c0:"DE",d0:"PE"}[st.s],t:"e",h:"Expected route",ex:"",exp:true}]:st.cases.map(([n,t,h,ex,cite,lk,top])=>({n,t:t.replace("t-",""),h,ex,cite,lk,top}))},extra[st.s]||{}));});

const RN=["NON"];
step({ch:"How to read",g:"irrs",build:["L"],focus:["nth:|.band-irrs|0"],cap:tb("tfw tfw-irrs","IRRS 2018 · Figure 3.1"),h:"Left: the refugee recommendations, as published",
  body:`<p>Three groups, split exactly as in IRRS Figure 3.1: <b>a</b> persons in need of international protection (a1 to a4, with refugees, complementary and temporary protection under a3), <b>b</b> persons with a refugee background, <b>c</b> persons returned after seeking protection abroad.</p><p>IRRS has no duration rule: a person enters by arrival, birth or a change of status. The codes a1 to c4 follow every route.</p>`,cite:"IRRS Figure 3.1, paras 88-97, 101"});
step({ch:"How to read",g:"irrs",build:["L","M"],hide:RN,focus:["nth:|.band-imtm|0"],cap:tb("tfw tfw-imtm","IMTM 2025 · Figure 2"),h:"Middle: what kind of stay was it?",
  body:`<p>IMTM sorts arrivals by duration. <b>Immigrants</b> change their country of residence. <b>Returned migrants</b> are previous residents back after 12 months or more. <b>Temporary mobility</b> stays below the 12-month rule.</p><p>The dashed arrow is IMTM para 33: an asylum seeker whose stay passes the minimum duration becomes a new resident.</p>`,cite:"IMTM Figure 2, paras 16-17, 27, 30, 33"});
step({ch:"How to read",g:"irrs",build:["L","M","R","sq"],hide:RN,focus:["node:NBC","node:FBC","node:NBFC","node:FBFC"],cap:tb("tfw tfw-imtm","IMTM 2025 · Figure 6"),h:"Right: where the person ends up",
  body:`<p>The resident population by birthplace and citizenship. The three dashed groups form the IMTM immigrant stock: born abroad <b>or</b> a foreign citizen.</p><p>${ADD} The small squares are IRRS codes. Each square is one route landing in that group, so you can read off which refugee categories end up where.</p>`,cite:"IMTM Figure 6, paras 25, 52-53"});
step({ch:"How to read",g:"irrs",build:["L","M","R","sq"],hide:RN,focus:["node:TMP","node:TEMP"],cap:ADD,h:"Temporary stays have their own destination",
  body:`<p><b>Temporary population</b>: present in the country, not yet resident. Temporary mobility lands here until the 12-month rule is met. IMTM shows it in Figure 2, not in Figure 6, so we added it beside the resident groups.</p>`,cite:"IMTM Figure 2, paras 30, 33"});
step({ch:"How to read",g:"irrs",hide:RN,cap:tb("tt-add","Reading the routes"),h:"Each line is a route, each pill a case",
  body:`<p>A route runs from an IRRS category, through the type of stay, to a resident group. <b>Colour</b> is the type of case, <b>thickness</b> the number of cases on the route, and the <b>numbered pills</b> are the cases.</p><p>From here on, the routes light up one type at a time, starting with the expected case. The notes on the graph are the same short descriptions you get when you hover a line.</p>`});
step({ch:"Refugees",g:"irrs",hide:RN,cap:tb("tt-add","Paper and proposed wording"),h:"Is every refugee an international migrant?",
  body:`<p><span class="tlab">Paper</span> "A refugee may not be an international migrant (IRRS versus IMTM)": mismatches or nesting issues, where a population "may be classified in more than one, does not neatly nest within or sits outside the existing frameworks".</p><p><span class="tlab tlab-p">Proposed</span> a <b>non-nested case</b> wherever one population does not sit inside the other, in five types: 1 never moved, 2 not yet or not visible, 3 migrant for a different reason, 4 counted differently, 5 misalignment. Only type 5 is left unsettled by the recommendations.</p>`,cite:"IRRS paras 77, 80 · IMTM paras 34, 53"});
const pick=(arr,ord)=>ord.map(k=>arr.find(x=>x.s===k));
fromArr(pick(B,["b0","b2","b3","b6","b1","b4","b5","b7"]),"Refugees","irrs",{b0:{hide:RN}});
step({ch:"IDPs abroad",g:"A",build:["L"],focus:["nth:|.band-iris|0"],cap:tb("tfw tfw-iris","IRIS 2020 · Figures 3.1, 3.2"),h:"IDPs: the same graph, IRIS on the left",
  body:`<p>The IDP stock (locations of displacement, return, other settlement) and IDP-related children follow IRIS Figure 3.1.</p><p>${ADD} The three cross-border groups of IRIS Figure 3.2 (para 82) sit below, outside the IDP stock.</p><p><span class="tlab">Paper</span> no dedicated section; touched on under temporal coherence. <span class="tlab tlab-p">Proposed</span> What happens when an IDP crosses a border?</p>`,cite:"IRIS Figures 3.1, 3.2; paras 75, 80-82"});
step({ch:"IDPs abroad",g:"A",build:["L","M","R"],focus:["node:EMI","node:ABR"],cap:ADD,h:"People who leave the country",
  body:`<p><b>Previous residents (emigrants)</b> and <b>Resident in another country</b>: IDPs who settle abroad leave the IDP stock by emigration (IRIS paras 98-99). Only two Figure 6 groups appear, as IDPs are usually citizens.</p>`,cite:"IRIS paras 98-99, 117 · IMTM paras 23, 26"});
fromArr(pick(C,["c0","c1","c4","c3","c2"]),"IDPs abroad","A",{});
step({ch:"IDPs at home",g:"B",build:["L","M"],focus:["nth:|.band-iris|1"],cap:ADD,h:"Census side: what move happened?",
  body:`<p>IRIS records displacement, not the type of move; the census records moves, not displacement. To join them we added a middle column on the move itself: to another civil division, within the same division, back home, or no move. Each option comes from IRIS paras 75 and 115.</p><p><span class="tlab">Paper</span> "An IDP may not be an internal migrant (IRIS versus P&amp;R Rev.4)". <span class="tlab tlab-p">Proposed</span> Is every IDP an internal migrant?</p>`,cite:"IRIS paras 75, 115"});
step({ch:"IDPs at home",g:"B",focus:["nth:|.band-pr|0"],cap:tb("tfw tfw-pr","P&amp;R Rev. 4"),h:"Right: the census classification",
  body:`<p>P&amp;R has no figure for internal migration, so the three outcomes are derived from its paragraphs: <b>internal migrant</b> (para 5.64), <b>move within the division</b>, which is not migration (para 5.64), and <b>non-migrant</b> by birth or reference date (paras 5.72-5.81).</p><p>${ADD} Voluntary internal movers, outside IRIS, reach the same census boxes.</p>`,cite:"P&amp;R Rev. 4 (draft Aug 2024), paras 5.64-5.84"});
fromArr(pick(D,["d0","d1","d2","d5","d3","d4"]),"IDPs at home","B",{});

// ---------- scrollytelling layer ----------
const T={rare0:false};
const TL={e:"Expected",1:"Type 1 · never moved",2:"Type 2 · not yet or not visible",3:"Type 3 · migrant, different reason",4:"Type 4 · counted differently",5:"Type 5 · misalignment"};
const stage=document.getElementById("stage"), stepsEl=document.getElementById("steps"), co=document.getElementById("callouts");
// move the three graphs into the sticky stage
const SV={irrs:$("#flow"),A:$("#flowA"),B:$("#flowB")};
document.getElementById("temporary").hidden=false;
Object.entries(SV).forEach(([k,s])=>{s.style.minWidth="0";s.style.width="100%";s.style.height="100%";s.dataset.g=k;stage.insertBefore(s,co);});
document.querySelector(".wrap").hidden=true;
// steps
stepsEl.innerHTML=S.map((s,i)=>{
  const cases=(s.cases||[]).filter(c=>!c.exp);
  return `<section class="sstep" data-i="${i}"><div class="scard">
   ${i===0||S[i-1].ch!==s.ch?`<span class="schap">${s.ch}</span>`:""}
   <div class="tcap">${s.cap||""}</div><h2>${s.h}</h2><div class="ttext">${/^\s*</.test(s.body)?s.body:`<p>${s.body}</p>`}</div>
   ${cases.length?`<div class="scases">${cases.map(c=>`<div class="scase tt-${c.t}" data-id="${ALIAS[c.n]||c.n}"><span class="tnum">${c.n}</span><div><b>${c.h}</b>${c.top?` ${tb("ttop","Most impactful")}`:""}${c.lk?` ${tb("tlk",({c:"Common",p:"Plausible",r:"Rare"})[c.lk])}`:""}<p class="tcite">${c.cite||""}</p></div></div>`).join("")}</div>`:""}
   ${s.aligned?`<p class="taligned">${s.aligned}</p>`:""}${s.cite?`<p class="tcite">${s.cite}</p>`:""}
  </div></section>`;}).join("");
let cur=-1,gk=null,g=null;
function applyS(i){ if(i===cur) return; cur=i; const s=S[i];
  stepsEl.querySelectorAll(".sstep").forEach(el=>el.classList.toggle("on",+el.dataset.i===i));
  if(gk!==s.g){ if(g){build(g,null);hide(g,[]);focus(g,[]);show(g,[]);}
    Object.entries(SV).forEach(([k,sv])=>{sv.style.display=k===s.g?"":"none";}); gk=s.g; g=G[s.g](); stage.dataset.g=s.g; }
  build(g,s.build||null); hide(g,s.hide||[]); show(g,stepIds(s)); focus(g,s.focus);
  document.querySelector(".sghead").innerHTML={irrs:"Refugees · IRRS → IMTM",A:"IDPs crossing a border · IRIS → IMTM",B:"IDPs inside the country · IRIS → census (P&amp;R Rev. 4)"}[s.g];
  clearTimeout(applyS.t); co.innerHTML=""; applyS.t=setTimeout(()=>callouts(s),RM?0:650);
}
const stepIds=s=>(s.cases||[]).map(c=>ALIAS[c.n]||c.n);
// notes pinned on the graph: the short description you get on hover
function callouts(s){
  co.innerHTML=""; if(innerWidth<900) return;
  const cases=(s.cases||[]); if(!cases.length) return;
  const sr=stage.getBoundingClientRect(), M=g.svg.getScreenCTM(); if(!M) return;
  const toScr=(x,y)=>{const p=new DOMPoint(x,y).matrixTransform(M);return [p.x-sr.left,p.y-sr.top];};
  const notes=[];
  cases.forEach(c=>{const id=ALIAS[c.n]||c.n;
    const ls=g.LK.filter(l=>(g.main?l.rs.map(r=>r.case):l.cs).includes(id)&&l.el.style.display!=="none"&&!(l.rare&&!document.body.classList.contains("show-rare")));
    if(!ls.length) return;
    let ax,ay;
    const pill=[...g.svg.querySelectorAll(`.pillG[data-case="${id}"]`)].find(p=>p.style.display!=="none"&&getComputedStyle(p).display!=="none");
    if(pill&&!c.exp){const b=pill.getBBox();[ax,ay]=toScr(b.x+b.width,b.y+b.height/2);}
    else {const l=ls[0],L=l.el.getTotalLength(),p=l.el.getPointAtLength(L*0.62);[ax,ay]=toScr(p.x,p.y);}
    let desc=c.ex; if(c.exp){const r=routesFor(g,id)[0]; desc=r&&r.ex?r.ex:"";}
    notes.push({c,ax,ay,desc,n:ls.length});});
  // lay out: cards in a column beside the anchors, pushed apart vertically
  const W=250; notes.sort((a,b)=>a.ay-b.ay);
  const svgR=g.svg.getBoundingClientRect();
  let lastBottom=8;
  const svgNS="http://www.w3.org/2000/svg", lines=document.createElementNS(svgNS,"svg"); lines.setAttribute("class","colines"); co.appendChild(lines);
  notes.forEach((nt,k)=>{
    const card=document.createElement("div"); card.className="callout tt-"+nt.c.t; card.style.width=W+"px";
    card.innerHTML=`<div class="cohead"><span class="tnum">${nt.c.exp?"E":nt.c.n}</span><b>${nt.c.exp?"Expected route":nt.c.h}</b></div><p>${nt.desc}</p><span class="cot">${TL[nt.c.t]||""}${nt.n>1?` · ${nt.n} routes`:""}</span>`;
    co.appendChild(card); const h=card.offsetHeight;
    let x=nt.ax+28; if(x+W>sr.width-8) x=Math.max(8,nt.ax-28-W);
    let y=Math.max(nt.ay-h/2,lastBottom+8); if(y+h>sr.height-8) y=Math.max(8,sr.height-8-h);
    lastBottom=y+h; card.style.left=x+"px"; card.style.top=y+"px"; card.style.animationDelay=(k*90)+"ms";
    const ln=document.createElementNS(svgNS,"path"); const cx=x>nt.ax?x:x+W, cy=y+Math.min(22,h/2);
    ln.setAttribute("d",`M${nt.ax},${nt.ay} C${(nt.ax+cx)/2},${nt.ay} ${(nt.ax+cx)/2},${cy} ${cx},${cy}`); ln.style.animationDelay=(k*90)+"ms"; lines.appendChild(ln);
    const dot=document.createElementNS(svgNS,"circle"); dot.setAttribute("cx",nt.ax); dot.setAttribute("cy",nt.ay); dot.setAttribute("r",4); lines.appendChild(dot);
    card.addEventListener("mouseenter",()=>show(g,[ALIAS[nt.c.n]||nt.c.n])); card.addEventListener("mouseleave",()=>show(g,stepIds(S[cur])));
  });
}
stepsEl.querySelectorAll(".scase").forEach(el=>{el.addEventListener("mouseenter",()=>{if(g) show(g,[el.dataset.id]);});el.addEventListener("mouseleave",()=>{if(g&&cur>=0) show(g,stepIds(S[cur]));});});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting) applyS(+e.target.dataset.i);}),{rootMargin:"-45% 0px -45% 0px"});
stepsEl.querySelectorAll(".sstep").forEach(el=>io.observe(el));
addEventListener("resize",()=>{if(cur>=0) callouts(S[cur]);});
requestAnimationFrame(()=>applyS(0));
})();
