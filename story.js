// ---------- story walk-through: one step per screen, the graph built from cards ----------
(function(){
if(new URLSearchParams(location.search).get("embed")) return;
const $=s=>document.querySelector(s), NS="http://www.w3.org/2000/svg";
const RM=matchMedia("(prefers-reduced-motion: reduce)").matches, EASE="cubic-bezier(.2,0,.1,1)";

// steps: g graph, build columns shown (L, M, R, sq, links), hide node ids, focus (col:L|M|R, node:id, gate, frame),
// exp expected-route case, cap source badges, h title, body paragraphs (the first is the caption), cases [n, id, type, title, example, paragraphs]
const STEPS=[
 {g:"irrs",build:"L",focus:"col:L",lane:"cover:irrs",cap:["IRRS 2018 · Figure 3.1"],h:"Left: the IRRS framework",body:["Three groups, as in IRRS Figure 3.1: <b>a</b> in need of international protection, <b>b</b> with a refugee background, <b>c</b> returned after seeking protection abroad.","IRRS has no duration rule: a person enters by arrival, birth or a change of status. The codes a1 to c4 follow every route."]},
 {g:"irrs",build:"L,M",hide:"NON",focus:"col:M,gate",lane:"cover:imtm",cap:["IMTM 2025 · Figure 2"],h:"Middle: what kind of stay was it?",body:["IMTM sorts arrivals by duration. <b>Immigrants</b> change their country of residence. <b>Returned migrants</b> are previous residents back after 12 months or more. <b>Temporary mobility</b> stays below the 12-month rule.","The dashed arrow is IMTM para 33: an asylum seeker whose stay passes the minimum duration becomes a new resident."]},
 {g:"irrs",build:"L,M,R,sq",hide:"NON",focus:"node:NBC,node:FBC,node:NBFC,node:FBFC,frame",lane:"cover:imtm",cap:["IMTM 2025 · Figure 6"],h:"Right: where the person ends up",body:["The resident population by birthplace and citizenship. The three dashed groups form the IMTM immigrant stock: born abroad <b>or</b> a foreign citizen.","<span>Addition for overview</span> The small squares are IRRS codes. Each square is one route landing in that group, so you can read off which refugee categories end up where."]},
 {g:"irrs",build:"L,M,R,sq",hide:"NON",focus:"node:TMP,node:TEMP",cap:["Addition for overview"],h:"Temporary stays have their own destination",body:["<b>Temporary population</b>: present in the country, not yet resident. Temporary mobility lands here until the 12-month rule is met. IMTM shows it in Figure 2, not in Figure 6, so we added it beside the resident groups."]},
 {g:"irrs",hide:"NON",legend:1,tour:1,cap:["Reading the routes"],h:"Each line is a route, each number a case",body:["Each line runs from an IRRS category, through the type of stay, to a resident group. <b>Colour</b> is the type of case, <b>thickness</b> the number of cases, and the <b>numbered tags</b> are the cases.","From here on, the routes light up one type at a time, starting with the expected case. The notes on the graph are the same short descriptions you get when you hover a line."]},
 {g:"irrs",hide:"NON",legend:1,lane:"types",cap:["Paper and proposed wording"],h:"Is every refugee an international migrant?",body:["The paper asks whether refugees always nest inside international migrants. The next eight steps show where they don't.","<span>Paper</span> \"A refugee may not be an international migrant (IRRS versus IMTM)\": mismatches or nesting issues, where a population \"may be classified in more than one, does not neatly nest within or sits outside the existing frameworks\".","<span>Proposed</span> a <b>non-nested case</b> wherever one population does not sit inside the other, in five types: 1 never moved, 2 not yet or not visible, 3 migrant for a different reason, 4 counted differently, 5 misalignment. Only type 5 is left unsettled by the recommendations."]},
 {g:"irrs",hide:"NON",exp:"E",cap:[],bridge:"Start with the route everyone expects.",h:"A refugee crosses a border and stays",body:["Most refugees arrive, stay 12 months or more and become foreign-born foreign citizens in the resident population. Here IRRS and IMTM agree: the refugee is an international migrant."]},
 {g:"irrs",cap:["IMTM · Native-born foreign citizens"],bridge:"The first surprise: refugees who never crossed a border.",h:"In the IRRS refugee stock without ever moving",body:["Refugees born in the country of asylum are in the IRRS refugee stock, but they never crossed a border. IMTM does not count them as international migrants: they did not come in as international arrivals.","<span>Addition for overview</span> The box <b>No international migration</b> now appears on the graph. It shows inflows from the population already in the country: births in exile, status changes and returns within 12 months go straight to a resident group without anyone changing country. IMTM has no box for these inflows, so it sits outside the IMTM framework."],cases:[["1","1","1","Born in exile, derivative status","A girl is born to recognised refugees in a country that gives no citizenship at birth and receives refugee status through her parents.","IRRS 60, 90 · IMTM 25, 53"],
   ["3","3","1","Born under other protection","A child born to parents with subsidiary or temporary protection receives the same status, not citizenship.","IRRS 90, 92.3 · IMTM 57"],
   ["2","2","1","Born here, facing removal","A man born to migrant parents loses his residence right at 18, faces removal to his parents' country and claims asylum.","IRRS 90, 92.2 · IMTM 53"],
   ["4","4","1","Born in exile, status ceases, stays","Refugee status ends after peace returns to the parents' country; he stays without citizenship.","IRRS 67, 94.4 · IMTM 25"]]},
 {g:"irrs",cap:["IMTM · Native-born citizens"],bridge:"Some of them are not in the immigrant stock at all.",h:"Refugees and refugee background outside the immigrant stock",body:["Citizens born in the country are not in the immigrant stock at all, but some of them are refugees or have a refugee background."],cases:[["5","5","1","Palestine refugee with host citizenship","A Palestine refugee under UNRWA's mandate, born in the host country and a citizen from birth.","IRRS 78, 90 · IMTM 25"],
   ["6","6","1","Child of refugees, citizen at birth","A boy born to refugee parents where citizenship comes with birthplace: refugee background, not a refugee.","IRRS 59, 94.2 · IMTM 25"],
   ["7","7","1","Born in exile, later naturalised","A refugee born in the country of asylum naturalises at 18 and leaves the immigrant stock.","IRRS 94.1 · IMTM 58-61"],
   ["8","8","1","Returnee away less than 12 months","A man's asylum claim abroad is rejected and he is back after six months: he never left the resident population.","IRRS 97.2 · IMTM Fig. 2"]]},
 {g:"irrs",cap:["IMTM · Temporary population"],bridge:"Others did cross, but too recently to count as migrants.",h:"Refugees in temporary mobility, not yet migrants",body:["IRRS has no duration rule; IMTM needs 12 months. Until then, asylum seekers and new arrivals are temporary population. They become migrants by elapsed time alone."],cases:[["9","9","2","Recent asylum seeker","A man filed his claim four months ago and does not yet know whether he can stay.","IRRS 85, 92.2 · IMTM 30, 33"],
   ["10","10","2","New prima facie or temporary protection arrival","A family arrived two months ago with a group recognised prima facie.","IRRS 55, 92.3 · IMTM 30, 33"]]},
 {g:"irrs",cap:["IMTM · Immigrants"],bridge:"Then refugees who are counted as migrants, for another reason.",h:"International migrants, but recorded for another reason",body:["These refugees are international migrants, so they nest. The reason IMTM records is not protection, so they disappear from any count of humanitarian migration."],cases:[["11","11","3","Refugee sur place","A student has lived in the country for three years and is already part of the resident population when war breaks out at home and he is recognised as a refugee.","IRRS 80 · IMTM 34, Box 1"],
   ["12","12","3","Refugee-like, on a visa or free movement","A man fled threats but entered on a three-year work visa and never applied for asylum.","IRRS 92.4 · IMTM 17"]]},
 {g:"irrs",cap:["IMTM · Foreign-born citizens"],bridge:"Returns can be counted differently too.",h:"Returnees who arrive for the first time",body:["IRRS defines home as the country of former habitual residence, which can be the parents' country, so a child born in exile can 'return' to a country they have never lived in."],cases:[["15","15","4","Child born in exile 'returns'","A boy born in a refugee camp abroad, with refugee status, repatriates with his parents to a country he has never lived in: an IRRS returnee, an IMTM first-time immigrant.","IRRS 95, 97.1 · IMTM 25"]]},
 {g:"irrs",cap:["IMTM · Returned migrants"],bridge:"And a return home can show up in one count but not the other.",h:"In the flow, not in the stock",body:["Refugees who come home after a year or more are returned migrants in the immigration flow, but as native-born citizens they never appear in the immigrant stock."],cases:[["14","14","4","Refugee returns after years abroad","A man returns home after eight years as a refugee abroad.","IRRS 97.1, 109 · IMTM 25, 27"]]},
 {g:"irrs",cap:["Result"],bridge:"Stepping back: the whole refugee graph again, every route at once.",h:"Most refugee categories include people who never migrated",body:["12 of the 14 IRRS categories include people who never changed country. The recommendations agree (IRRS para 80, IMTM para 53); the assumption that every refugee is a migrant is what fails.","Only the refugee-like and reunified family categories always arrive as international migrants."]},
 {g:"A",build:"L",focus:"col:L",lane:"cover:iris",cap:["IRIS 2020 · Figure 3.1"],bridge:"Now the same question for IDPs, with IRIS on the left.",h:"IDPs: the same graph, IRIS on the left",body:["The IDP stock (locations of displacement, return, other settlement) and IDP-related children follow IRIS Figure 3.1.","The cross-border groups of IRIS Figure 3.2 are left out here: they fall under the refugee recommendations (IRRS)."]},
 {g:"A",build:"L,M,R",focus:"node:EMI,node:ABR",cap:["Addition for overview"],bridge:"On this graph people can also leave the country.",h:"People who leave the country",body:["IDPs who settle abroad leave the IDP stock by emigration (IRIS paras 98-99). We added the two Figure 6 groups they land in; most IDPs are citizens."]},
 {g:"A",exp:"DE",cap:[],bridge:"First, where the two recommendations agree.",h:"Where IRIS and IMTM agree",body:["An IDP who stays inside the country is no international migrant, and IRIS agrees. Once IDPs cross a border, the two line up when they settle abroad: they leave the IDP stock by emigration."]},
 {g:"A",cap:["IMTM · Residents temporarily abroad"],bridge:"Crossing a border does not always end displacement.",h:"Crossed a border, still an IDP",body:["IRIS keeps people in the IDP stock if they come back within 12 months without a new residence abroad. IMTM agrees they never left the resident population, but nobody counts the border crossing."],cases:[["D3","D3","2","Back within 12 months","After an attack a family shelters across the border for five months without applying for international protection, and comes back, but cannot return home.","IRIS 75, 117 · IMTM 23, Fig. 2"]]},
 {g:"A",cap:["IMTM · Returned migrants"],bridge:"A long stay abroad changes how a return is counted.",h:"Back home, but not an IDP",body:["People who lived abroad for a year or more and come back are returned migrants. IRIS does not count them as IDPs, even when they cannot reach their home, unless they are displaced again."],cases:[["D4","D4","4","Back after 12+ months, displaced again","A returned migrant is forced from his home again by a flood: an IDP again from that moment.","IRIS 89 · IMTM 27"]]},
 {g:"A",cap:["IMTM · Emigrants"],bridge:"And one overlap the recommendations do not settle.",h:"The real misalignment: claiming asylum abroad",body:["Until a new country of residence is established, the same person can be an IDP at home and an asylum seeker abroad. IRIS, IRRS and IMTM each have a rule; none settles the overlap."],cases:[["D7","D7","5","IDP claims asylum abroad","An IDP crosses the border and files an asylum claim; for months she has no established residence there.","IRIS 98-99, 117 · IRRS 92.2 · IMTM 33"]]},
 {g:"B",build:"L,M",focus:"col:M",lane:"cover:iris",cap:["Addition for overview"],bridge:"Last, IDPs who stay inside the country, against the census.",h:"Middle: what move happened?",body:["IRIS records displacement; the census records moves. To join them we added a middle column on the move itself, taken from IRIS paras 75 and 115.","The four moves: to another civil division, within the same division, back home, or no move.","<span>Paper</span> \"An IDP may not be an internal migrant (IRIS versus P&amp;R Rev.4)\". <span>Proposed</span> Is every IDP an internal migrant?"]},
 {g:"B",focus:"col:R",lane:"cover:pr",cap:["P&amp;R Rev. 4"],h:"Right: the census classification",body:["P&amp;R has no figure for internal migration, so the three outcomes are derived from its paragraphs: <b>internal migrant</b> (para 5.64), <b>move within the division</b>, which is not migration (para 5.64), and <b>non-migrant</b> by birth or reference date (paras 5.72-5.81).","<span>Addition for overview</span> Voluntary internal movers, outside IRIS, reach the same census boxes."]},
 {g:"B",exp:"PE",cap:[],bridge:"Again, the expected route first.",h:"Displaced to another district",body:["An IDP who moves across a civil division boundary is also an internal migrant: usually resident in one division, previously in another."]},
 {g:"B",cap:["P&amp;R · Moves within the division"],bridge:"But not every displacement is a migration.",h:"Displaced, but not an internal migrant",body:["IRIS counts any forced move from the dwelling. The census does not count moves inside a civil division as migration. How many IDPs fall here depends on how small the divisions are."],cases:[["P1","P1","1","Displaced within the same district","After a landslide a family moves to an evacuation shelter two kilometres away, in the same municipality.","IRIS 115 · P&R 5.64, 5.69-5.70"]]},
 {g:"B",cap:["P&amp;R · Non-migrants"],bridge:"Some IDPs the census question cannot see.",h:"IDPs the reference-date question cannot see",body:["The census often asks where people lived one or five years ago. IDPs who returned home within that period, or who were displaced before it, look like people who never moved."],cases:[["P2+","P2","2","Protracted IDPs","A family displaced seven years ago still lives in the camp: residence five years ago and today are the same place.","IRIS 81 · P&R 5.77-5.78"],
   ["P2","P2","2","Returned home within the period","A family displaced three years ago is back in its village but still lacks housing and documents.","IRIS 75 · P&R 5.77"],
   ["P7","P7","2","IDP-related child born after the reference date","Neither migrant nor IDP; the census treats young children separately.","IRIS 78 · P&R 5.81"]]},
 {g:"B",cap:["P&amp;R · Not yet usual residents"],bridge:"Others are too recent to count where they are.",h:"Too recent to count where they are",body:["Usual residence needs six or twelve months, or the intention to stay. People who intend to return home, as many IDPs do, may be counted at the address they fled. IRIS counts them from day one."],cases:[["N","N","2","Recently displaced","A family arrived in the camp two months ago and expects to go home: the census may still place them in their home district.","IRIS 75 · P&R 2.51, 5.55"]]},
 {g:"B",cap:["P&amp;R · Internal migrants"],bridge:"And some internal migrants are not IDPs at all.",h:"Internal migrants who are not IDPs",body:["Only the census question on reason for change of residence, with its forced displacement option, separates these people from IDPs."],cases:[["P6","P6","3","Voluntary movers and joining relatives","A young woman moves to the capital for work, or joins displaced relatives from another province.","IRIS 80 · P&R 5.64, 5.82-5.84"],
   ["P5","P5","3","IDP-related child moving home","A girl born in the displacement camp moves home with her parents at six: a lifetime internal migrant.","IRIS 78 · P&R 5.65"],
   ["d6","d6","3","IDPs who have overcome vulnerabilities","Locally integrated or settled elsewhere: no longer IDPs, still internal migrants.","IRIS 81 · P&R 5.64"]]},
 {g:"B",cap:["P&amp;R · Last move and moves from abroad"],bridge:"Finally, the same return can be counted two ways.",h:"Counted, but differently",body:["The same return looks like no move on the reference-date question and like an internal move on the last-move question. A short stay abroad can turn an IDP into an apparent international arrival."],cases:[["P3","P3","4","Return counted as an internal move","The returned family is counted as internal migrants into their home district, because their last move came from the camp.","IRIS 75 · P&R 5.72-5.75"],
   ["P4","P4","4","Short stay abroad recorded as from abroad","An IDP sheltered abroad for four months, then came back to another district: previous residence recorded as a foreign country.","IRIS 117 · P&R 5.75, 5.77"]]}
];

// chapters: the first five steps introduce the graph, then one chapter per graph
const CH=(()=>{const o=[["Introduction","The three columns of the graph"],["Refugees","IRRS → IMTM"],["IDPs abroad","IRIS → IMTM"],["IDPs at home","IRIS → census (P&R Rev. 4)"]].map(([label,sub])=>({label,sub,start:-1,count:0}));
  STEPS.forEach((s,i)=>{const c=o[i<5?0:s.g==="irrs"?1:s.g==="A"?2:3]; if(c.start<0) c.start=i; c.count++;}); return o;})();
const TITLES={irrs:"Refugees · IRRS → IMTM",A:"IDPs crossing a border · IRIS → IMTM",B:"IDPs inside the country · IRIS → census (P&R Rev. 4)"};
const TT={e:"Expected route",1:"Type 1 · Never moved",2:"Type 2 · Temporary or not yet counted",3:"Type 3 · Migrant for a different reason",4:"Type 4 · Counted differently",5:"Type 5 · Misalignment"};
// what each type means, shown beside the legend
const TD={e:"Both recommendations agree: the person changed country (or civil division) and is counted as a migrant.",
 1:"In the refugee or IDP population, but no change of country or civil division as migration counts it: born in exile, a status change in place, a move within the same division.",
 2:"They moved, but the count does not see it yet: a stay under the 12-month residence rule, a return within the census reference period, or too recent to be a usual resident.",
 3:"Counted as a migrant, but the reason recorded is work, study or family, not protection.",
 4:"Both recommendations count the person, but in different groups, or in the flow and not the stock.",
 5:"The rules overlap and the recommendations do not settle which one applies."};
const TC={e:"var(--v-prot)",1:"var(--v-never)",2:"var(--v-temp)",3:"var(--v-other)",4:"var(--v-ret)",5:"var(--strong)"};
const HD={
 irrs:[["IRRS 2018 · FIG. 3.1","Refugee and refugee related populations","var(--irrs-ink)"],["IMTM 2025 · FIG. 2","Type of stay","var(--imtm)"],["IMTM 2025 · FIG. 2 AND 6","Present population","var(--imtm)"]],
 A:[["IRIS 2020 · FIG. 3.1","IDP stock and IDP-related populations","var(--iris)"],["IMTM 2025 · FIG. 2","Type of stay","var(--imtm)"],["IMTM 2025 · FIG. 2 AND 6","Present population","var(--imtm)"]],
 B:[["IRIS 2020 · FIG. 3.1","Framework for internal displacement","var(--iris)"],["IRIS 2020 · PARAS 75, 115","What move happened?","var(--iris)"],["P&R REV. 4 · PARAS 5.64-5.84","Census classification","var(--pr)"]]};
// expected-route notes: a3i always first, b2 never (its expected route is a side case)
const EXP_SKIP=["b2"], EXP_FIRST=["a3i"];
const tc=t=>TC[String(t).toLowerCase()]||TC.e;
const srcCls=c=>c==="Addition for overview"?"sadd":/^IRRS/.test(c)?"srcb srcb-irrs":/^IMTM/.test(c)?"srcb srcb-imtm":/^IRIS/.test(c)?"srcb srcb-iris":/^P&/.test(c)?"srcb srcb-pr":"srcb srcb-plain";

// ---------- one model per graph, read from crosswalk.js ----------
function model(key){
  if(key==="irrs"){
    const nL=(f,id)=>LINKS.filter(l=>l[f]===id).length;
    const groups=["a","b","c"].map(g=>({key:g,label:GFULL[g]+(g==="b"?" (draft mapping)":""),bg:"var(--irrs)",fg:"#fff",border:"none",items:[]}));
    CATS.forEach(c=>{const gr=groups.find(x=>x.key===c.g);
      if(c.id==="a3i") gr.items.push({head:true,text:"3. Persons with determined protection status"});
      const sub=["a3i","a3ii","a3iii"].includes(c.id);
      gr.items.push({node:true,id:c.id,name:c.l,indent:sub?18:0,grow:(0.7+nL("k",c.id)*0.22).toFixed(2),nl:nL("k",c.id),border:"1px solid transparent",codeColor:"var(--irrs-ink)",codeBg:"var(--irrs-soft)"});});
    groups.forEach(g=>{g.grow=g.items.reduce((a,it)=>a+(it.node?+it.grow:0.45),0).toFixed(2);});
    const mids=["NON","RET","IMM","TMP"].map(id=>{const m=MID.find(x=>x.id===id)||{};
      return {id,name:MIDLAB[id][0],sub:MIDLAB[id][1],caption:id==="NON",color:id==="NON"?"var(--v-never)":"var(--strong)",
        border:id==="NON"?"1.5px dashed var(--v-never)":m.k==="tmp"?"1.5px dashed #9aa6ba":"1px solid transparent",grow:(1+nL("m",id)*0.1).toFixed(2)};});
    const cells=["NBC","FBC","NBFC","FBFC"].map(id=>{const c=CELLS.find(x=>x.id===id),fc=c.k==="fc";
      return {id,row:fc?"FOREIGN CITIZENS":"CITIZENS",name:c.l,stock:c.stock?"in immigrant stock":"not in immigrant stock",stockColor:c.stock?"var(--strong)":"var(--muted)",
        bg:fc?"#e8f0fa":"#f9f1e7",border:c.stock?"1.5px dashed rgba(20,35,76,.55)":"1px solid transparent",
        chips:LINKS.map((l,i)=>({l,i})).filter(o=>o.l.c===id).map(o=>({code:o.l.k,li:o.i,color:tc(o.l.t)}))};});
    const T=CELLS.find(x=>x.id==="TEMP");
    const links=LINKS.map((l,i)=>({i,k:l.k,m:l.m,c:l.c,t:String(l.t).toLowerCase(),cases:[...new Set(l.rs.map(r=>r.case))],rs:l.rs,rare:!!l.rare,w:2+l.rs.length*1.3}));
    return {key,groups,mids,cells,temp:{name:T.l,sub:T.s},links,lanes:{FBC:"top",FBFC:"bot"},arr:["RET","IMM","TMP"],dep:null,
      cols:"minmax(0,1.4fr) minmax(64px,.5fr) minmax(0,1fr) minmax(56px,.42fr) minmax(0,1.2fr)",grid:true};
  }
  // the IRIS Fig. 3.2 groups outside the IDP stock fall under IRRS, so the story leaves them out
  const F=key==="A"?FLOWA:FLOWB, out=key==="A"?(F.left.find(g=>g.g==="x")||{items:[]}).items.map(([id])=>id):[];
  const FLK=F.LK.filter(l=>!out.includes(l.k)), nL=(f,id)=>FLK.filter(l=>l[f]===id).length;
  const groups=F.left.filter(g=>!(key==="A"&&g.g==="x")).map(g=>({key:g.g,label:g.gl,bg:g.g==="x"?"#fff":"var(--iris)",fg:g.g==="x"?"var(--muted)":"#fff",border:g.g==="x"?"1.5px dashed var(--line-strong)":"none",
    items:g.items.map(([id,l])=>({node:true,id,name:l,indent:0,grow:(0.7+nL("k",id)*0.22).toFixed(2),nl:nL("k",id),border:g.g==="x"?"1.5px dashed var(--line-strong)":"1px solid transparent",codeColor:"var(--iris)",codeBg:"var(--iris-soft)"}))}));
  groups.forEach(g=>{g.grow=g.items.reduce((a,it)=>a+ +it.grow,0).toFixed(2);});
  const mids=F.mid.map(m=>{const non=m.id==="NON"&&F.other==="IMTM";
    return {id:m.id,name:m.l,sub:m.s,caption:non,color:non?"var(--v-never)":"var(--strong)",border:non?"1.5px dashed var(--v-never)":m.k==="tmp"?"1.5px dashed #9aa6ba":"1px solid transparent",grow:(1+nL("m",m.id)*0.12).toFixed(2)};});
  const rights=F.right.map(r=>({id:r.id,name:r.l,sub:r.s,
    qs:r.q?[[0,0],[1,0],[0,1],[1,1]].map(([a,b])=>a===r.q[0]&&b===r.q[1]?(b?"#8db8e3":"#e3c3a0"):"#fff"):null,
    bg:r.q?(r.q[1]?"#e8f0fa":"#f9f1e7"):"#fff",
    border:r.k==="tmp"?"1.5px dashed #9aa6ba":(r.s&&/^in /.test(r.s))?"1.5px dashed rgba(20,35,76,.55)":"1px solid transparent",grow:(1+nL("c",r.id)*0.1).toFixed(2)}));
  const links=F.LK.map((l,i)=>({l,i})).filter(o=>!out.includes(o.l.k)).map(({l,i})=>({i,k:l.k,m:l.m,c:l.c,t:String(l.t).toLowerCase(),cases:[...new Set(l.cs)],rare:!!l.rare,w:2+l.cs.length*1.5}));
  return {key,groups,mids,rights,links,lanes:{},F,arr:key==="A"?["RET","IMM"]:null,dep:key==="A"?["EMI"]:null,
    cols:key==="A"?"minmax(0,1.4fr) minmax(64px,.5fr) minmax(0,1fr) minmax(64px,.5fr) minmax(0,1fr)":"minmax(0,1.4fr) minmax(56px,.45fr) minmax(0,1fr) minmax(56px,.45fr) minmax(0,1fr)",grid:false};
}
function caseInfo(id){
  const M=MS[gk];
  if(M.key==="irrs"){const n=NEST.find(x=>x.id===id); return n?{t:String(n.t).toLowerCase(),h:id==="E"?"Expected route":n.h,ex:n.ex}:{t:"e",h:"Expected route",ex:""};}
  const c=M.F.cases[id]; return c?{t:String(c.t).toLowerCase(),h:c.h,ex:c.ex,refs:c.refs}:{t:"e",h:id,ex:""};
}

// ---------- page elements ----------
const stage=$("#stage"), colsEl=$("#cols"), gatesEl=$("#gates"), svg=$("#routes"), pillsEl=$("#pills"), notesEl=$("#notes"), hov=$("#hov"), tip=$("#tip");
const stepsEl=$("#steps");
stepsEl.innerHTML=STEPS.map((s,i)=>`<section class="sstep" data-i="${i}" aria-label="Step ${i+1}"><div class="sr"><h3>${s.h}</h3>${s.body.map(p=>`<p>${p}</p>`).join("")}</div></section>`).join("");
const steps=STEPS.map((s,i)=>{const cases=s.exp?[{n:s.exp,id:s.exp,t:"e",h:"Expected route",ex:"",exp:true}]:(s.cases||[]).map(([n,id,t,h,ex,cite])=>({n,id,t,h,ex,cite}));
  const sp=v=>v?v.split(","):null;
  return {...s,i,el:stepsEl.children[i],build:sp(s.build),hide:sp(s.hide)||[],focus:sp(s.focus)||[],cases,ids:cases.map(c=>c.id)};});
const chOf=i=>CH.findIndex(c=>i>=c.start&&i<c.start+c.count);
$("#heroCh").innerHTML=CH.map((c,k)=>`<button type="button" data-go="${c.start}"><span class="k"><span>0${k+1}</span><span>${c.count} steps</span></span><span class="t">${c.label}</span><span class="d">${c.sub}</span></button>`).join("");
$("#navCh").innerHTML=CH.map((c,k)=>`<button type="button" data-go="${c.start}" title="${c.label}" style="flex:${c.count} 1 auto"><span class="l">0${k+1} · ${c.label}</span><span class="bar"><i></i></span></button>`).join("");
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>go(+b.dataset.go)));
$("#prev").addEventListener("click",()=>go(cur-1));
$("#next").addEventListener("click",()=>go(cur+1));
function navUpdate(){
  [...$("#navCh").children].forEach((b,k)=>{const c=CH[k],done=cur>=c.start+c.count,on=cur>=c.start&&!done;
    b.classList.toggle("on",on); b.querySelector("i").style.width=(cur<c.start?0:done?100:(cur-c.start+1)/c.count*100)+"%";});
  $("#counter").textContent=String(cur+1).padStart(2,"0")+" / "+steps.length;
}

// ---------- the stage: three columns of cards ----------
let MS=null, gk=null, compact=false, built={L:false,M:false,R:false}, cur=-1, pending=null, LK=null, R=null, gX=null, sqOn=true, tourT=[], coT=0;
function renderStage(){
  const M=MS[gk], cp=compact, letter=cp&&M.key==="irrs";
  stage.classList.toggle("compact",cp);
  colsEl.style.gridTemplateColumns=M.cols+(cp?" 220px":" 268px");
  const nTop=M.grid?M.links.filter(l=>l.c==="FBC").length:0, nBot=M.grid?M.links.filter(l=>l.c==="FBFC").length:0;
  const heads=HD[gk].map((h,i)=>`<div class="hd" data-hd="${"LMR"[i]}" style="grid-column:${1+i*2}"><span class="n">${i+1}</span><div><span class="e" style="color:${h[2]}">${h[0]}</span><span class="t">${h[1]}</span></div></div>`).join("");
  const L=`<div class="col colL" data-colk="L">${M.groups.map(g=>`<div class="gr" style="flex:${g.grow} 1 auto">
    <div class="grbox${letter?" letter":""}" data-group="${g.key}" style="background:${g.bg};border:${g.border};color:${g.fg}">${letter?g.key:g.label}</div>
    <div class="gritems">${g.items.map(it=>it.head?`<div class="grhead">${it.text}</div>`:
      `<div class="cat" data-node="${it.id}" style="flex:${it.grow} 1 auto;min-height:${Math.max(cp?16:26,6+it.nl*(cp?6:7))}px;margin-left:${it.indent}px;border:${it.border}"><span class="code" style="color:${it.codeColor};background:${it.codeBg}">${it.id}</span><span class="nm">${it.name}</span></div>`).join("")}</div></div>`).join("")}</div>`;
  const Mc=`<div class="col colM" data-colk="M">${M.mids.map(m=>`<div class="mid" style="flex:${m.grow} 1 auto">${m.caption?`<span class="mcap" data-cap="${m.id}">OUTSIDE THE IMTM FRAMEWORK</span>`:""}
    <div class="box" data-node="${m.id}" style="border:${m.border}"><span class="nm" style="color:${m.color}">${m.name}</span><span class="sub">${m.sub}</span></div></div>`).join("")}</div>`;
  const Rc=M.grid?`<div class="col colR" data-colk="R"><div class="res" data-frame="res" style="padding-bottom:${10+nBot*4}px"><span class="res-lab">Resident population · IMTM Fig. 6</span>
      <div class="res-hd" style="margin-bottom:${8+nTop*4}px"><span>BORN IN COUNTRY</span><span>BORN OUTSIDE</span></div>
      <div class="cells">${M.cells.map(c=>`<div class="cell" data-node="${c.id}" style="background:${c.bg};border:${c.border}"><span class="row">${c.row}</span><span class="nm">${c.name}</span><span class="stock" style="color:${c.stockColor}">${c.stock}</span>
        <div class="chips">${c.chips.map(q=>`<span data-li="${q.li}" style="background:${q.color}">${q.code}</span>`).join("")}</div></div>`).join("")}</div></div>
      <div class="box temp" data-node="TEMP"><span class="nm" style="color:var(--strong)">${M.temp.name}</span><span class="sub">${M.temp.sub}</span></div></div>`
    :`<div class="col colR list" data-colk="R">${M.rights.map(r=>`<div class="rbox" data-node="${r.id}" style="flex:${r.grow} 1 0;background:${r.bg};border:${r.border}">${r.qs?`<div class="quad">${r.qs.map(b=>`<span style="background:${b}"></span>`).join("")}</div>`:""}<div><span class="nm">${r.name}</span><span class="sub">${r.sub}</span></div></div>`).join("")}</div>`;
  colsEl.innerHTML=heads+L+Mc+Rc+`<div class="lane" id="lane"></div>`;
  colsEl.querySelectorAll(".col,.lane").forEach(c=>{c.style.paddingTop=gk==="A"?"30px":"6px";});
  colsEl.querySelectorAll("[data-node]").forEach(e=>{e.addEventListener("mouseenter",()=>nodeHover(e.dataset.node,true));e.addEventListener("mouseleave",()=>nodeHover(e.dataset.node,false));});
  $("#gtitle").textContent=TITLES[gk];
  setBuilt(built);
}
function setBuilt(b){built=b; ["L","M","R"].forEach(k=>{const v=b[k]?"1":"0"; const c=colsEl.querySelector(`[data-colk="${k}"]`),h=colsEl.querySelector(`[data-hd="${k}"]`); if(c) c.style.opacity=v; if(h) h.style.opacity=v;});}
// a column taller than the stage is scaled down as a whole, so the text keeps its size relative to the cards
function fitCols(){
  colsEl.querySelectorAll("[data-colk]").forEach(c=>{
    c.style.transform=""; c.style.height=""; c.style.width="";
    const avail=c.clientHeight, need=c.scrollHeight;
    if(need>avail+1&&avail>0){const z=Math.max(0.5,avail/need);
      c.style.height=need+"px"; c.style.width=(100/z).toFixed(3)+"%"; c.style.transformOrigin="0 0"; c.style.transform="scale("+z.toFixed(4)+")";}});
}
let rl=0,rlT=0;
function relayout(){cancelAnimationFrame(rl); clearTimeout(rlT); let done=false; const run=()=>{if(done) return; done=true; afterLayout();};
  rl=requestAnimationFrame(()=>{rl=requestAnimationFrame(run);}); rlT=setTimeout(run,120);}
function afterLayout(){
  if(!MS) return;
  fitCols();
  try{drawRoutes();}catch(e){console.error("drawRoutes",e);}
  if(pending!=null){const i=pending; pending=null; cur=-1; applyS(i);}
  else if(cur>=0) paint(steps[cur],false);
}
const bz=(p,t)=>{const [x0,y0,x1,y1,x2,y2,x3,y3]=p,u=1-t; return [u*u*u*x0+3*u*u*t*x1+3*u*t*t*x2+t*t*t*x3,u*u*u*y0+3*u*u*t*y1+3*u*t*t*y2+t*t*t*y3];};

// ---------- routes: drawn between the cards after layout ----------
function drawRoutes(){
  const M=MS[gk], sr=stage.getBoundingClientRect(); R={};
  colsEl.querySelectorAll("[data-node]").forEach(e=>{e.style.opacity="";e.style.outline="";e.style.visibility="";
    const b=e.getBoundingClientRect(); R[e.dataset.node]={x0:b.left-sr.left,y0:b.top-sr.top,x1:b.right-sr.left,y1:b.bottom-sr.top,el:e};});
  colsEl.querySelectorAll("[data-group],[data-frame],[data-cap]").forEach(e=>{e.style.opacity="";e.style.visibility="";});
  const col=k=>{const e=colsEl.querySelector(`[data-colk="${k}"]`); if(!e) return null; const b=e.getBoundingClientRect(); return {x0:b.left-sr.left,x1:b.right-sr.left,y0:b.top-sr.top,y1:b.bottom-sr.top};};
  const CL=col("L"), CM=col("M"), CR=col("R");
  svg.innerHTML=""; pillsEl.innerHTML=""; gatesEl.innerHTML="";
  svg.setAttribute("width",stage.clientWidth); svg.setAttribute("height",stage.clientHeight);
  const gR=document.createElementNS(NS,"g"), gH=document.createElementNS(NS,"g"); gX=document.createElementNS(NS,"g");
  svg.append(gR,gX,gH);
  const cy=id=>(R[id].y0+R[id].y1)/2;
  const L=M.links.filter(l=>R[l.k]&&R[l.m]&&R[l.c]);
  // ports spread over each card's height, sorted to reduce crossings
  const ports=(id,ls,kf)=>{const r=R[id],s=[...ls].sort((a,b)=>kf(a)-kf(b)),m=new Map(),h=r.y1-r.y0; s.forEach((l,i)=>m.set(l,r.y0+5+(i+0.5)*(h-10)/s.length)); return m;};
  const pK=new Map(), pMi=new Map(), pMo=new Map(), pC=new Map();
  Object.keys(R).forEach(id=>{const ls=L.filter(l=>l.k===id); if(ls.length) ports(id,ls,l=>cy(l.m)*1000+cy(l.c)).forEach((v,l)=>pK.set(l,v));});
  Object.keys(R).forEach(id=>{const ls=L.filter(l=>l.m===id); if(!ls.length) return;
    ports(id,ls,l=>pK.get(l)).forEach((v,l)=>pMi.set(l,v)); ports(id,ls,l=>cy(l.c)*1000+pK.get(l)).forEach((v,l)=>pMo.set(l,v));});
  Object.keys(R).forEach(id=>{if(M.lanes[id]) return; const ls=L.filter(l=>l.c===id); if(ls.length) ports(id,ls,l=>pMo.get(l)).forEach((v,l)=>pC.set(l,v));});
  // FB-C and FB-FC are entered from lanes above and below the cells
  const lane=new Map();
  Object.entries(M.lanes).forEach(([id,side])=>{const n=R[id]; if(!n) return; const top=side==="top",dir=top?1:-1;
    const ls=L.filter(l=>l.c===id).sort((a,b)=>dir*(pMo.get(a)-pMo.get(b))),k=ls.length,w=n.x1-n.x0;
    ls.forEach((l,i)=>lane.set(l,{px:n.x1-14-i*(w-28)/Math.max(k-1,1),yL:top?n.y0-8-(k-1-i)*4:n.y1+8+(k-1-i)*4,top}));});
  const gate=(ids,c0,c1,label,name)=>{
    if(!ids||!c0||!c1) return null; const rs=ids.map(i=>R[i]).filter(Boolean); if(!rs.length) return null;
    const gap=c1.x0-c0.x1, gw=Math.max(60,Math.min(92,gap*0.72)), x=(c0.x1+c1.x0)/2-gw/2, y=Math.max(4,Math.min(...rs.map(r=>r.y0))-8), y1=Math.min(stage.clientHeight-4,Math.max(...rs.map(r=>r.y1))+8);
    const d=document.createElement("div"); d.className="gate"; d.dataset.gate=name;
    Object.assign(d.style,{left:x+"px",top:y+"px",width:gw+"px",height:(y1-y)+"px"});
    d.innerHTML=`<span>${label}</span>`; gatesEl.appendChild(d); return {x0:x,x1:x+gw,y0:y,y1,cx:x+gw/2};};
  const GA=gate(M.arr,CL,CM,"International<br>arrivals","arrivals"), GD=gate(M.dep,CM,CR,"International<br>departures","departures");
  if(GA&&GD){
    const top=(CM?CM.y0:30)+14, p=document.createElementNS(NS,"path");
    p.setAttribute("d",`M${GD.cx},${GD.y0} V${top+8} Q${GD.cx},${top} ${GD.cx-8},${top} H${GA.cx+8} Q${GA.cx},${top} ${GA.cx},${top+8} V${GA.y0-2}`);
    p.setAttribute("style","fill:none;stroke:var(--imtm);stroke-opacity:.6;stroke-width:1.5;stroke-dasharray:5 4"); p.dataset.loop=1; gX.appendChild(p);
    const lb=document.createElement("div"); lb.className="loop-lab"; lb.dataset.loop=1; lb.style.left=(GA.cx+GD.cx)/2+"px"; lb.style.top=top+"px";
    lb.textContent="RETURN · PEOPLE WHO LEFT COME BACK AS INTERNATIONAL ARRIVALS"; pillsEl.appendChild(lb);
  }
  const frame=colsEl.querySelector('[data-frame="res"]'), fx0=frame?frame.getBoundingClientRect().left-sr.left:0;
  L.forEach(l=>{
    const ax=R[l.k].x1, ay=pK.get(l), bx=R[l.m].x0, by=pMi.get(l), mx=R[l.m].x1, mo=pMo.get(l);
    const ga=GA&&M.arr.includes(l.m)?GA.x0:bx, m1=(ax+ga)/2;
    let d=`M${ax},${ay} C${m1},${ay} ${m1},${by} ${ga},${by} L${bx},${by} L${mx},${mo}`;
    const ex=GD&&M.dep.includes(l.m)?GD.x1:mx; if(ex!==mx) d+=` L${ex},${mo}`;
    if(lane.has(l)){const Ln=lane.get(l),gx=fx0+3,m2=(ex+gx)/2,n=R[l.c],ey=Ln.top?n.y0:n.y1,s6=Ln.top?6:-6;
      d+=` C${m2},${mo} ${m2},${Ln.yL} ${gx},${Ln.yL} L${Ln.px-6},${Ln.yL} Q${Ln.px},${Ln.yL} ${Ln.px},${Ln.yL+s6} L${Ln.px},${ey}`;}
    else {const dx=R[l.c].x0, dy=pC.get(l), m2=(ex+dx)/2; d+=` C${m2},${mo} ${m2},${dy} ${dx},${dy}`;}
    const p=document.createElementNS(NS,"path"); p.setAttribute("d",d); p.dataset.li=l.i;
    p.setAttribute("style",`fill:none;stroke:${TC[l.t]||TC.e};stroke-width:${l.w}px;stroke-opacity:.38;stroke-linecap:round;stroke-linejoin:round;transition:stroke-opacity .35s ${EASE},stroke-width .3s ${EASE}`);
    gR.appendChild(p);
    const hit=document.createElementNS(NS,"path"); hit.setAttribute("d",d); hit.setAttribute("style","fill:none;stroke:transparent;stroke-width:16px;pointer-events:stroke;cursor:pointer");
    gH.appendChild(hit);
    l.el=p; l.hit=hit; l.pts=[ax,ay,m1,ay,m1,by,ga,by]; l.pills=[]; l.pillLink=null;
    hit.addEventListener("mouseenter",e=>routeHover(l,e)); hit.addEventListener("mousemove",placeTip); hit.addEventListener("mouseleave",routeLeave);
    l.pillIds=M.key==="irrs"?l.cases.filter(c=>c!=="E"):l.cases;
  });
  // case tags near the start of each route, pushed apart so none overlap
  const items=[];
  L.forEach(l=>{if(!l.pillIds.length) return; const [px,py]=bz(l.pts,0.1);
    const ws=l.pillIds.map(id=>12+id.length*7), tot=ws.reduce((a,b)=>a+b,0)+(l.pillIds.length-1)*3;
    items.push({l,x:px-4,y:py,w:tot,ws});});
  const yMin=CL?CL.y0+9:9, yMax=CL?CL.y1-9:stage.clientHeight-9;
  for(let it=0;it<12;it++){let moved=false; items.sort((a,b)=>a.y-b.y);
    for(let i=0;i<items.length;i++) for(let j=i+1;j<items.length;j++){const a=items[i],b=items[j];
      if(a.x>b.x+b.w+2||b.x>a.x+a.w+2) continue; const d=b.y-a.y; if(d>=20) continue;
      const push=(20-d)/2+0.5; a.y-=push; b.y+=push; moved=true;}
    items.forEach(p=>{p.y=Math.max(yMin,Math.min(yMax,p.y));}); if(!moved) break;}
  items.forEach(P=>{const l=P.l; let x=P.x; const [qx,qy]=bz(l.pts,0.1);
    if(Math.abs(P.y-qy)>3){const lk=document.createElementNS(NS,"path"); lk.setAttribute("d",`M${qx},${qy} L${x+2},${P.y}`); lk.setAttribute("style","fill:none;stroke:var(--imtm-line);stroke-width:1;stroke-dasharray:2 2"); gX.appendChild(lk); l.pillLink=lk;}
    l.pillIds.forEach((id,j)=>{const info=caseInfo(id), pe=document.createElement("div"), col=TC[info.t]||TC.e;
      pe.className="pill"; pe.dataset.case=id; pe.style.cssText=`left:${x}px;top:${P.y-9}px;min-width:${P.ws[j]}px;background:${col}`;
      pe.textContent=id; pillsEl.appendChild(pe); l.pills.push(pe); x+=P.ws[j]+3;
      pe.addEventListener("mouseenter",()=>trace(id,col)); pe.addEventListener("mouseleave",()=>untrace());});});
  LK=L;
}

// ---------- applying a step ----------
function applyS(i){
  if(!steps[i]||i===cur) return;
  cur=i; const s=steps[i]; navUpdate();
  tourT.forEach(clearTimeout); tourT=[]; clearTimeout(coT); notesEl.innerHTML="";
  if(s.g!==gk){gk=s.g; pending=i; cur=-1; built={L:false,M:false,R:false}; renderStage(); relayout(); cur=i; navUpdate(); return;}
  paint(s,true); caption(s);
}
// paragraph numbers in the text get the same hover as on the crosswalk (refHTML and PARAS come from crosswalk.js)
const linkRefs=h=>h.replace(/\b(IRRS|IMTM|IRIS|P&amp;R|P&R)( paras?)? (\d+(?:\.\d+)*[a-z]?(?:-\d+(?:\.\d+)*)?(?:, \d+(?:\.\d+)*[a-z]?(?:-\d+(?:\.\d+)*)?)*)/g,
  (m,src,pp,nums)=>{const k=src.replace("&amp;","&"); return src+(pp||"")+" "+refHTML(k+" "+nums).slice(k.length+1);});
function caption(s){
  const c=CH[chOf(s.i)];
  $("#eyebrow").textContent=c.label+" · "+String(s.i-c.start+1).padStart(2,"0")+" / "+String(c.count).padStart(2,"0");
  $("#caps").innerHTML=s.cap.map(x=>`<span class="${srcCls(x)}">${x}</span>`).join("");
  const types=s.legend?["e","1","2","3","4","5"]:[...new Set(s.cases.map(c=>String(c.t)))];
  $("#types").innerHTML=types.map(t=>`<span class="ty" data-ty="${t}" style="background:${TC[t]}">${TT[t]||t}</span>`).join("");
  const hd=$("#head"), ld=$("#lead"), br=$("#bridge"); hd.textContent=s.h; br.textContent=s.bridge||"";
  ld.innerHTML=s.body[0]?`<p>${linkRefs(s.body[0].replace(/<span>/g,'<span class="sadd">'))}</p>`:"";
  if(!RM){br.animate([{opacity:0},{opacity:1}],{duration:420,easing:EASE});
    hd.animate([{opacity:0,transform:"translateY(6px)"},{opacity:1,transform:"none"}],{duration:360,easing:EASE});
    ld.animate([{opacity:0,transform:"translateY(4px)"},{opacity:1,transform:"none"}],{duration:320,easing:EASE});}
}
function paint(s,anim){
  if(!LK) return;
  const b=s.build, on=k=>!b||b.includes(k), nb={L:on("L"),M:on("M"),R:on("R")};
  if(anim&&!RM) ["L","M","R"].forEach(k=>{if(nb[k]&&!built[k]) reveal(k);});
  setBuilt(nb);
  const linksOn=on("links"); sqOn=on("sq");
  [svg,pillsEl].forEach(e=>{e.style.transition=`opacity .5s ${EASE}`; e.style.opacity=linksOn?"1":"0";});
  const gA=gatesEl.querySelector('[data-gate="arrivals"]'), gD=gatesEl.querySelector('[data-gate="departures"]');
  if(gA) gA.style.opacity=nb.M?"1":"0"; if(gD) gD.style.opacity=nb.R?"1":"0";
  document.querySelectorAll("#pills [data-loop],#routes [data-loop]").forEach(e=>{e.style.opacity=nb.R?"1":"0";});
  const hid=new Set(s.hide);
  colsEl.querySelectorAll("[data-node]").forEach(e=>{e.style.visibility=hid.has(e.dataset.node)?"hidden":"";});
  colsEl.querySelectorAll("[data-cap]").forEach(e=>{e.style.visibility=hid.has(e.dataset.cap)?"hidden":"";});
  LK.forEach(l=>{l.hidden=hid.has(l.k)||hid.has(l.m)||hid.has(l.c);});
  if(s.exp) s.ids=[...new Set(LK.filter(l=>l.t==="e").flatMap(l=>l.cases))];
  laneFill(s);
  show(s.ids,anim);
  focusOn(s.focus);
  clearTimeout(coT);
  coT=setTimeout(()=>{callouts(s); if(s.tour) legendTour(s);},RM?0:(anim?520:60));
}
// first reveal of a column: groups slide in, then the cards one by one
function reveal(k){
  const c=colsEl.querySelector(`[data-colk="${k}"]`); if(!c) return;
  if(k==="L"){
    c.querySelectorAll("[data-group]").forEach((e,i)=>e.animate([{opacity:0,transform:"translateX(-12px)"},{opacity:1,transform:"none"}],{duration:420,delay:120+i*120,easing:EASE,fill:"backwards"}));
    c.querySelectorAll("[data-node]").forEach((e,i)=>e.animate([{opacity:0,transform:"translateX(-10px)"},{opacity:1,transform:"none"}],{duration:380,delay:480+i*45,easing:EASE,fill:"backwards"}));
  } else {
    c.querySelectorAll("[data-node],[data-frame]").forEach((e,i)=>e.animate([{opacity:0,transform:"translateY(10px)"},{opacity:1,transform:"none"}],{duration:420,delay:160+i*70,easing:EASE,fill:"backwards"}));
    const g=gatesEl.querySelector(k==="M"?'[data-gate="arrivals"]':'[data-gate="departures"]');
    if(g) g.animate([{opacity:0,transform:"scaleY(.85)"},{opacity:1,transform:"none"}],{duration:520,delay:80,easing:EASE,fill:"backwards"});
  }
}
function show(ids,anim){
  const any=ids.length>0, lit=LK.filter(l=>!l.hidden&&l.cases.some(c=>ids.includes(c)));
  paintLinks(lit,any,lit.some(l=>l.rare),anim);
  LK.forEach(l=>{l.pills.forEach(p=>{p.style.opacity=any&&!ids.includes(p.dataset.case)?".14":"1";}); if(l.pillLink) l.pillLink.style.opacity=any&&!l.pillIds.some(c=>ids.includes(c))?".14":"1";});
}
function paintLinks(lit,any,showRare,anim){
  const set=new Set(lit), touched=new Set(); lit.forEach(l=>[l.k,l.m,l.c].forEach(n=>touched.add(n)));
  LK.forEach(l=>{const on=set.has(l), vis=!l.hidden&&(!l.rare||showRare);
    l.el.style.display=vis?"":"none"; l.hit.style.display=vis?"":"none"; l.pills.forEach(p=>{p.style.display=vis?"grid":"none";});
    l.el.style.strokeOpacity=on?"0.95":any?"0.08":"0.38"; l.el.style.strokeWidth=(l.w+(on?1.6:0))+"px";
    if(on) l.el.parentNode.appendChild(l.el);});
  colsEl.querySelectorAll(".chips [data-li]").forEach(e=>{const l=LK.find(q=>q.i===+e.dataset.li);
    e.style.transition=`opacity .3s ${EASE}`; e.style.opacity=!sqOn?"0":any&&!(l&&set.has(l))?".22":"1";});
  colsEl.querySelectorAll("[data-node]").forEach(e=>{if(e.__tr) return; const t=touched.has(e.dataset.node); e.style.outline=t?"2px solid var(--strong)":""; e.style.outlineOffset="1px";});
  gX.querySelectorAll(".flowov").forEach(o=>o.remove());
  // lit routes draw themselves in, then one white pulse runs along each, once
  if(anim&&!RM) lit.forEach((l,i)=>{
    if(l.el.style.display==="none") return; let L; try{L=l.el.getTotalLength();}catch(e){return;}
    l.el.animate([{strokeDasharray:`${L} ${L}`,strokeDashoffset:L},{strokeDasharray:`${L} ${L}`,strokeDashoffset:0}],{duration:900,delay:i*60,easing:"cubic-bezier(.4,0,.2,1)",fill:"backwards"});
    const ov=document.createElementNS(NS,"path"); ov.setAttribute("d",l.el.getAttribute("d")); ov.setAttribute("class","flowov");
    ov.setAttribute("style",`fill:none;stroke:#fff;stroke-opacity:.95;stroke-width:2.6;stroke-linecap:round;stroke-dasharray:22 ${L+60};stroke-dashoffset:22;pointer-events:none`); gX.appendChild(ov);
    const a=ov.animate([{strokeDashoffset:22},{strokeDashoffset:-(L+4)}],{duration:1200,delay:i*60+900,easing:"cubic-bezier(.4,0,.2,1)",fill:"forwards"}); a.onfinish=()=>ov.remove();
  });
}
// focus: col:L|M|R, node:<id>, gate, frame; everything else fades to .2
function focusOn(tokens){
  const keepC=new Set(), keepN=new Set(); let keepFrame=false, keepGate=false;
  tokens.forEach(t=>{if(t.startsWith("node:")) keepN.add(t.slice(5)); else if(t.startsWith("col:")) keepC.add(t.slice(4)); else if(t==="gate") keepGate=true; else if(t==="frame") keepFrame=true;});
  const anyF=keepC.size||keepN.size||keepFrame||keepGate;
  colsEl.querySelectorAll("[data-node],[data-group],[data-frame]").forEach(e=>{
    if(!anyF){e.style.opacity=""; return;}
    const c=e.closest("[data-colk]"), ck=c?c.dataset.colk:"", inFrame=!!e.closest('[data-frame="res"]');
    const keep=keepC.has(ck)||(e.dataset.node&&keepN.has(e.dataset.node))||(keepFrame&&(inFrame||e.dataset.frame))||(e.dataset.frame&&[...keepN].some(n=>["NBC","FBC","NBFC","FBFC"].includes(n)));
    e.style.transition=`opacity .45s ${EASE}, outline-color .2s`; e.style.opacity=keep?"":"0.2";});
  const gA=gatesEl.querySelector('[data-gate="arrivals"]');
  if(gA&&anyF&&built.M) gA.style.opacity=keepGate||keepC.has("M")?"1":"0.2";
}

// ---------- hovers ----------
const numHtml=(id,t)=>`<span class="num" style="background:${TC[t]||TC.e}">${id}</span>`;
function nodeName(id){const r=R&&R[id]; if(!r) return id; const s=r.el.querySelector(".nm"); return (s?s.textContent:id).trim();}
function routeHover(l,e){
  paintLinks([l],true,l.rare,false);
  LK.forEach(q=>q.pills.forEach(p=>{p.style.opacity=q===l?"1":".14";}));
  const rows=MS[gk].key==="irrs"?l.rs.map(r=>({id:r.case,...caseInfo(r.case),ex:r.ex,ref:r.ref})):l.cases.map(id=>({id,...caseInfo(id),ref:caseInfo(id).refs}));
  tip.innerHTML=`<span class="path">${l.k} → ${nodeName(l.m)} → ${nodeName(l.c)}</span>`+rows.slice(0,4).map(r=>`<div class="r">${numHtml(r.id,r.t)}<div><b>${r.h}</b>${r.ex?`<i>${r.ex}</i>`:""}${r.ref?`<small>${refHTML(r.ref)}</small>`:""}</div></div>`).join("");
  tip.style.display="block"; placeTip(e);
}
function placeTip(e){if(tip.style.display==="none") return; const sr=stage.getBoundingClientRect();
  let x=e.clientX-sr.left+16, y=e.clientY-sr.top+14; const w=tip.offsetWidth, h=tip.offsetHeight;
  if(x+w>sr.width-8) x=e.clientX-sr.left-w-16; if(y+h>sr.height-8) y=Math.max(8,sr.height-8-h);
  tip.style.left=x+"px"; tip.style.top=y+"px";}
function routeLeave(){tip.style.display="none"; restore();}
function restore(){if(cur>=0&&steps[cur]&&LK) show(steps[cur].ids,false);}
function nodeHover(id,on){
  if(!LK) return;
  if(!on){hov.style.display="none"; restore(); return;}
  const ls=LK.filter(l=>!l.hidden&&(l.k===id||l.m===id||l.c===id));
  paintLinks(ls,true,ls.some(l=>l.rare),false);
  const ids=[...new Set(ls.flatMap(l=>l.cases))];
  LK.forEach(q=>q.pills.forEach(p=>{p.style.opacity=ls.includes(q)?"1":".14";}));
  const r=R[id], SW=stage.clientWidth, SH=stage.clientHeight;
  hov.innerHTML=`<b>${nodeName(id)}</b><div class="hb"><span class="cnt">${ls.length} ${ls.length===1?"route":"routes"} · ${ids.length} ${ids.length===1?"case":"cases"}</span><div>${ids.map(c=>numHtml(c,caseInfo(c).t)).join("")}</div></div>`;
  hov.style.display="block"; const bw=hov.offsetWidth, bh=hov.offsetHeight;
  let x=r.x1+12; if(x+bw>SW-8) x=r.x0-12-bw; x=Math.max(8,x);
  hov.style.left=x+"px"; hov.style.top=Math.min(Math.max(8,(r.y0+r.y1)/2-bh/2),SH-8-bh)+"px";
}
// trace a case: a dot travels each of its routes, touched cards get an outline, the destination a ring
function trace(id,color){
  untrace(true); show([id],false);
  const ls=LK.filter(l=>!l.hidden&&l.cases.includes(id)&&l.el.style.display!=="none");
  const lay=document.createElementNS(NS,"g"); lay.dataset.trace=1; svg.appendChild(lay);
  const ends=new Set(); ls.forEach(l=>[l.k,l.m,l.c].forEach(n=>ends.add(n)));
  ends.forEach(n=>{const r=R[n]; if(r){r.el.style.outline=`2.5px solid ${color}`; r.el.__tr=1;}});
  ls.forEach((l,i)=>{
    const p=l.el, L=p.getTotalLength(), dest=R[l.c];
    const dot=document.createElementNS(NS,"circle"); dot.setAttribute("r",6); dot.setAttribute("style",`fill:${color};stroke:#fff;stroke-width:2.5`); lay.appendChild(dot);
    const t0=performance.now()+i*120, D=RM?0:1100;
    const tick=now=>{if(!dot.isConnected) return; const k=D?Math.max(0,Math.min(1,(now-t0)/D)):1, e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2, pt=p.getPointAtLength(L*e);
      dot.setAttribute("cx",pt.x); dot.setAttribute("cy",pt.y); if(k<1) requestAnimationFrame(tick);};
    requestAnimationFrame(tick);
    if(dest) setTimeout(()=>{if(dot.isConnected){dest.el.style.boxShadow=`0 0 0 4px #fff, 0 0 0 6px ${color}`; dest.el.__ring=1;}},D+i*120);
  });
}
function untrace(keep){
  svg.querySelectorAll("[data-trace]").forEach(e=>e.remove());
  if(R) Object.values(R).forEach(r=>{if(r.el.__ring){r.el.style.boxShadow=""; r.el.__ring=0;} if(r.el.__tr){r.el.style.outline=""; r.el.__tr=0;}});
  if(!keep) restore();
}

// ---------- notes pinned on the graph ----------
function anchorOf(id){
  const sr=stage.getBoundingClientRect();
  const p=[...pillsEl.querySelectorAll(`[data-case="${id}"]`)].find(x=>x.style.display!=="none"); if(p){const b=p.getBoundingClientRect(); return [b.right-sr.left,b.top-sr.top+b.height/2];}
  const l=LK.find(q=>!q.hidden&&q.cases.includes(id)&&q.el.style.display!=="none"); if(!l) return null;
  const P=l.el.getPointAtLength(l.el.getTotalLength()*0.62); return [P.x,P.y];
}
function lineSvg(){const s=document.createElementNS(NS,"svg"); s.setAttribute("style","position:absolute;inset:0;width:100%;height:100%;overflow:visible"); notesEl.appendChild(s); return s;}
// notes sit in the lane on the right, so the cards of the graph stay readable; a leader line runs back to the route
function laneBox(){const sr=stage.getBoundingClientRect(), l=$("#lane"); if(!l) return {x:stage.clientWidth-268,w:260}; const b=l.getBoundingClientRect(); return {x:b.left-sr.left,w:b.width};}
function stack(notes,SH){
  const GAP=12; notes.sort((a,b)=>a.ay-b.ay);
  notes.forEach((n,k)=>{n.y=Math.max(10,n.ay-n.h/2); if(k) n.y=Math.max(n.y,notes[k-1].y+notes[k-1].h+GAP);});
  for(let k=notes.length-1;k>=0;k--){const lim=k===notes.length-1?SH-10:notes[k+1].y-GAP; if(notes[k].y+notes[k].h>lim) notes[k].y=lim-notes[k].h;}
  for(let k=0;k<notes.length;k++){const lim=k===0?10:notes[k-1].y+notes[k-1].h+GAP; if(notes[k].y<lim) notes[k].y=lim;}
}
function placeNotes(notes,lines,stroke){
  const SH=stage.clientHeight, L=laneBox(), fits=()=>notes.reduce((t,n)=>t+n.h+12,0)<=SH-12;
  notes.forEach(n=>{n.card.style.width=L.w+"px"; n.h=n.card.offsetHeight;});
  if(!fits()){notes.forEach(n=>{n.card.classList.add("tight"); n.h=n.card.offsetHeight;});}
  // still too tall: a second column just left of the lane
  const cols=fits()?[notes]:[notes.filter((_,k)=>k%2===0),notes.filter((_,k)=>k%2===1)];
  cols.forEach((arr,ci)=>{stack(arr,SH); arr.forEach(n=>{n.x=ci?L.x-L.w-12:L.x;});});
  notes.forEach((n,k)=>{
    n.card.style.left=n.x+"px"; n.card.style.top=n.y+"px";
    const cy=n.y+Math.min(22,n.h/2), cx=n.x, mx=(n.ax+cx)/2, ln=document.createElementNS(NS,"path");
    ln.setAttribute("d",`M${n.ax},${n.ay} C${mx},${n.ay} ${mx},${cy} ${cx},${cy}`);
    ln.setAttribute("style",`fill:none;stroke:${stroke};stroke-width:1.3;stroke-opacity:.8;stroke-dasharray:2000;stroke-dashoffset:2000;animation:codraw .7s ${EASE} forwards;animation-delay:${k*90}ms`); lines.appendChild(ln);
    const dot=document.createElementNS(NS,"circle"); dot.setAttribute("cx",n.ax); dot.setAttribute("cy",n.ay); dot.setAttribute("r",4.5); dot.setAttribute("style",`fill:${stroke};stroke:#fff;stroke-width:2`); lines.appendChild(dot);
  });
}
function callouts(s){
  notesEl.innerHTML=""; if(!LK) return;
  const cases=s.cases; if(!cases.length) return;
  if(cases.length===1&&cases[0].exp){expNote(cases[0]); return;}
  const notes=[];
  cases.forEach(c=>{const ls=LK.filter(l=>l.cases.includes(c.id)&&l.el.style.display!=="none"); if(!ls.length) return;
    const a=anchorOf(c.id); if(!a) return; notes.push({c,ax:a[0],ay:a[1],n:ls.length});});
  if(!notes.length) return;
  const lines=lineSvg();
  notes.forEach((nt,k)=>{
    const col=TC[nt.c.t]||"var(--ink)", card=document.createElement("div"); card.className="note"; card.style.animationDelay=k*90+"ms";
    card.innerHTML=`<div class="nh">${numHtml(nt.c.n,nt.c.t)}<b>${nt.c.h}</b></div>${nt.c.ex?`<p>${nt.c.ex}</p>`:""}${nt.n>1?`<span class="rt">${nt.n} routes</span>`:""}${nt.c.cite?`<span class="ct">${refHTML(nt.c.cite)}</span>`:""}`;
    notesEl.appendChild(card); nt.card=card;
    card.addEventListener("mouseenter",()=>trace(nt.c.id,col)); card.addEventListener("mouseleave",()=>untrace());});
  placeNotes(notes,lines,"var(--strong)");
}
function expRows(id){
  const M=MS[gk]; let rows=[];
  if(M.key==="irrs"){const seen=new Set(); LK.forEach(l=>{if(l.hidden||l.rare||!l.cases.includes(id)) return; l.rs.filter(r=>r.case===id).forEach(r=>{
    if(!r.ex||seen.has(r.ex)||EXP_SKIP.includes(l.k)) return; seen.add(r.ex); const c=CATS.find(q=>q.id===l.k); rows.push({l,code:l.k,h:c?c.l:l.k,ex:r.ex,cite:r.ref});});});}
  else Object.entries(M.F.cases).forEach(([k,c])=>{if(String(c.t).toLowerCase()!=="e"||(M.F.caseIds&&!M.F.caseIds.includes(k))) return; const l=LK.find(q=>q.cases.includes(k)&&!q.rare); if(l) rows.push({l,code:k,h:c.h,ex:c.ex,cite:c.refs});});
  const used=new Set(); return rows.filter(r=>!used.has(r.l)&&used.add(r.l));
}
// expected route: up to three green notes, one per route, in the lane
function expNote(c){
  let rows=expRows(c.id);
  if(rows.length>3){const pri=rows.filter(r=>EXP_FIRST.includes(r.code)).slice(0,1), rest=rows.filter(r=>!pri.includes(r)), need=3-pri.length;
    const idx=need>=3?[0,Math.floor((rest.length-1)/2),rest.length-1]:need===2?[0,rest.length-1]:[0]; rows=[...pri,...[...new Set(idx)].map(i=>rest[i]).filter(Boolean)];}
  if(!rows.length) return;
  const lines=lineSvg();
  const notes=rows.map((r,k)=>{
    const P=r.l.el.getPointAtLength(r.l.el.getTotalLength()*0.86), card=document.createElement("div"); card.className="note exp"; card.style.animationDelay=k*110+"ms";
    card.innerHTML=`<div class="nh">${numHtml("E","e")}<span class="code">${r.code}</span><b>${r.h}</b></div><p>${r.ex}</p>${r.cite?`<span class="ct">${refHTML(r.cite)}</span>`:""}`;
    notesEl.appendChild(card);
    card.addEventListener("mouseenter",()=>paintLinks([r.l],true,false,false)); card.addEventListener("mouseleave",restore);
    return {ax:P.x,ay:P.y,card};
  });
  placeNotes(notes,lines,"var(--v-prot)");
}
// legend tour: expected, then types 1 to 5; each gets a line from its pill to one of its routes and a short definition in the lane
const typeCard=(t,on)=>`<div class="tydef${on?" on":""}" data-tyd="${t}"><span class="ty" style="background:${TC[t]}">${TT[t]}</span><p>${TD[t]}</p></div>`;
function laneTypes(active){const l=$("#lane"); if(l) l.innerHTML=`<div class="tylist">${["e","1","2","3","4","5"].map(t=>typeCard(t,active==null||active===t)).join("")}</div>`;}
function legendTour(s){
  const order=["e","1","2","3","4","5"], STEP=RM?0:3200;
  const pillOp=on=>document.querySelectorAll("#types [data-ty]").forEach(p=>{p.style.opacity=on==null||on===p.dataset.ty?"1":".3";});
  const run=k=>{
    if(steps[cur]!==s) return; notesEl.innerHTML="";
    if(k>=order.length){pillOp(null); laneTypes(null); show([],false); return;}
    const t=order[k], ls=LK.filter(l=>l.t===t&&!l.hidden&&!l.rare); pillOp(t); laneTypes(t);
    if(!ls.length){tourT.push(setTimeout(()=>run(k+1),300)); return;}
    paintLinks(ls,true,false,true);
    const ids=new Set(ls.flatMap(l=>l.cases)); LK.forEach(q=>q.pills.forEach(p=>{p.style.opacity=ids.has(p.dataset.case)?"1":".14";}));
    requestAnimationFrame(()=>{
      const pill=document.querySelector(`#types [data-ty="${t}"]`); if(!pill) return;
      const sr=stage.getBoundingClientRect(), pr=pill.getBoundingClientRect(), px=pr.left+pr.width/2-sr.left;
      const l=ls.slice().sort((a,b)=>b.cases.length-a.cases.length)[0], P=l.el.getPointAtLength(l.el.getTotalLength()*0.32), col=TC[t];
      const sv=lineSvg(), path=document.createElementNS(NS,"path"); path.setAttribute("d",`M${px},0 C${px},${P.y*0.6} ${P.x},${P.y*0.4} ${P.x},${P.y}`);
      path.setAttribute("style",`fill:none;stroke:${col};stroke-width:1.6;stroke-dasharray:900;stroke-dashoffset:900;animation:codraw .6s ${EASE} forwards`); sv.appendChild(path);
      const dot=document.createElementNS(NS,"circle"); dot.setAttribute("cx",P.x); dot.setAttribute("cy",P.y); dot.setAttribute("r",5); dot.setAttribute("style",`fill:${col};stroke:#fff;stroke-width:2`); sv.appendChild(dot);
    });
    tourT.push(setTimeout(()=>run(k+1),STEP));
  };
  run(0);
}
const COVERS={irrs:["International Recommendations on Refugee Statistics","IRRS · EGRISS, 2018"],iris:["International Recommendations on Internally Displaced Persons Statistics","IRIS · EGRISS, 2020"],
 imtm:["Recommendations on Statistics of International Migration and Temporary Mobility","IMTM · UN Statistical Commission, 2025"],pr:["Principles and Recommendations for Population and Housing Censuses, Revision 4","P&R Rev. 4 · United Nations"]};
function laneFill(s){
  const l=$("#lane"); if(!l) return;
  if(s.lane&&s.lane.startsWith("cover:")){const k=s.lane.slice(6),c=COVERS[k]; l.innerHTML=`<figure class="cover"><img src="covers/${k}.jpg" alt="Cover of ${c[0]}"><figcaption><b>${c[0]}</b><span>${c[1]}</span></figcaption></figure>`;}
  else if(s.lane==="types"||s.tour) laneTypes(null);
  else l.innerHTML="";
}

// ---------- scrolling: one step per screen ----------
let navLock=0, stT=0, scrRaf=0;
function pickStep(){
  if(navLock>performance.now()) return;
  const mid=innerHeight*0.5, i=steps.findIndex(s=>{const r=s.el.getBoundingClientRect(); return r.top<=mid&&r.bottom>mid;});
  if(i<0||i===cur) return;
  clearTimeout(stT); stT=setTimeout(()=>applyS(i),60);
}
function go(i){i=Math.max(0,Math.min(steps.length-1,i)); navLock=performance.now()+900; clearTimeout(stT); applyS(i); jump(i);}
function jump(i){const r=steps[i].el.getBoundingClientRect(); scrollTo({top:scrollY+r.top,behavior:RM?"auto":"smooth"});}
addEventListener("scroll",()=>{if(scrRaf) return; scrRaf=requestAnimationFrame(()=>{scrRaf=0; pickStep();});},{passive:true});
addEventListener("scrollend",pickStep);
addEventListener("keydown",e=>{
  if(e.target.closest&&e.target.closest("input,textarea,select,[contenteditable]")) return;
  const r=stage.getBoundingClientRect(); if(r.bottom<80||r.top>innerHeight-80) return;
  const fwd=["ArrowDown","ArrowRight","PageDown"," "].includes(e.key), back=["ArrowUp","ArrowLeft","PageUp"].includes(e.key);
  if(!fwd&&!back) return; e.preventDefault();
  const i=Math.max(0,cur)+(fwd?1:-1);
  if(i>=steps.length){scrollTo({top:scrollY+$(".send").getBoundingClientRect().top,behavior:RM?"auto":"smooth"}); return;}
  if(i<0){scrollTo({top:0,behavior:RM?"auto":"smooth"}); return;}
  go(i);
});
new ResizeObserver(()=>{clearTimeout(stage.__t); stage.__t=setTimeout(()=>{
  if(!MS) return; const c=stage.clientWidth<1050;
  if(c!==compact){compact=c; renderStage();} relayout();},90);}).observe(stage);

// ---------- start ----------
MS={irrs:model("irrs"),A:model("A"),B:model("B")};
compact=stage.clientWidth<1050;
applyS(0);
})();
