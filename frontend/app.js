// ─── COLOR UTILS ───────────────────────────────
function h2r(h){return[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)]}
function r2h(r,g,b){return'#'+[r,g,b].map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('')}
function darken(h,a){const[r,g,b]=h2r(h);return r2h(r-a*2.1,g-a*2.1,b-a*1.8)}
function lighten(h,a){const[r,g,b]=h2r(h);return r2h(r+a*2,g+a*2,b+a*1.6)}
function blend(h1,h2,t){const[r1,g1,b1]=h2r(h1);const[r2,g2,b2]=h2r(h2);return r2h(r1*(1-t)+r2*t,g1*(1-t)+g2*t,b1*(1-t)+b2*t)}

// ─── SVG GENERATORS ────────────────────────────
let _sid=0; function uid(){return 'k'+(++_sid);}
function mkDefs(id,b,a,e){
  const bh=lighten(b,52),bm=lighten(b,22),bd=darken(b,36),bdd=darken(b,58);
  return`<defs>
<radialGradient id="bg${id}" cx="34%" cy="26%" r="74%"><stop offset="0%" stop-color="${bh}"/><stop offset="18%" stop-color="${bm}"/><stop offset="52%" stop-color="${b}"/><stop offset="80%" stop-color="${bd}"/><stop offset="100%" stop-color="${bdd}"/></radialGradient>
<radialGradient id="br${id}" cx="72%" cy="78%" r="52%"><stop offset="0%" stop-color="${blend(b,'#ffffff',0.18)}" stop-opacity=".28"/><stop offset="100%" stop-color="${b}" stop-opacity="0"/></radialGradient>
<radialGradient id="ag${id}" cx="36%" cy="28%" r="70%"><stop offset="0%" stop-color="${lighten(a,38)}"/><stop offset="55%" stop-color="${a}"/><stop offset="100%" stop-color="${darken(a,28)}"/></radialGradient>
<radialGradient id="eg${id}" cx="35%" cy="30%" r="66%"><stop offset="0%" stop-color="${lighten(e,30)}"/><stop offset="55%" stop-color="${e}"/><stop offset="100%" stop-color="${darken(e,25)}"/></radialGradient>
<radialGradient id="ear${id}" cx="50%" cy="65%" r="58%"><stop offset="0%" stop-color="#ffd0cc"/><stop offset="65%" stop-color="#f0a0a0"/><stop offset="100%" stop-color="#d07070"/></radialGradient>
<radialGradient id="nse${id}" cx="40%" cy="35%" r="62%"><stop offset="0%" stop-color="#ff9ebb"/><stop offset="100%" stop-color="#d05080"/></radialGradient>
<filter id="sh${id}"><feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.4"/></filter>
<filter id="gf${id}"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>`;
}
function eyeLayer(x,y,rx,ry,id){return`<ellipse cx="${x}" cy="${y}" rx="${rx+3}" ry="${ry+3.5}" fill="#120600"/><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="url(#eg${id})"/><ellipse cx="${x}" cy="${y}" rx="${rx*.6}" ry="${ry*.75}" fill="#0e0600" opacity=".85"/><ellipse cx="${x-rx*.3}" cy="${y-ry*.3}" rx="${rx*.32}" ry="${ry*.28}" fill="rgba(255,255,255,.9)"/><ellipse cx="${x+rx*.25}" cy="${y+ry*.22}" rx="${rx*.14}" ry="${ry*.12}" fill="rgba(255,255,255,.5)"/>`;}
function mrkSVG(mk,b){const dk=darken(b,22);if(mk==='spots')return`<circle cx="84" cy="72" r="7.5" fill="${dk}" opacity=".4"/><circle cx="118" cy="80" r="5.5" fill="${dk}" opacity=".35"/><circle cx="96" cy="150" r="9" fill="${dk}" opacity=".3"/>`;if(mk==='stripes')return`<path d="M68,58 Q77,60 86,56" stroke="${dk}" stroke-width="3.5" fill="none" opacity=".45" stroke-linecap="round"/><path d="M114,58 Q122,60 130,56" stroke="${dk}" stroke-width="3.5" fill="none" opacity=".45" stroke-linecap="round"/>`;if(mk==='stars')return`<path d="M82,66 l2.5,6 6,0 -5,3.5 2,6 -5.5,-3.5 -5.5,3.5 2,-6 -5,-3.5 6,0 Z" fill="${dk}" opacity=".42"/>`;if(mk==='hearts')return`<path d="M84,66 Q84,62 88,64 Q92,62 92,66 Q92,70 84,76 Q76,70 76,66 Q76,62 80,64 Q84,62 84,66Z" fill="${dk}" opacity=".32" transform="scale(.72) translate(34,26)"/>`;return'';}
function accSVG(ac){if(ac==='bow')return`<path d="M86,43 Q80,30 69,35 Q75,44 86,43Z" fill="#f85ea0" opacity=".9"/><path d="M114,43 Q120,30 131,35 Q125,44 114,43Z" fill="#f85ea0" opacity=".9"/><circle cx="100" cy="42" r="6.5" fill="#ff9ec4" stroke="#f85ea0" stroke-width="1"/>`;if(ac==='crown')return`<path d="M70,50 L76,28 L87,42 L100,20 L113,42 L124,28 L130,50 Z" fill="#f0c030" stroke="#c89010" stroke-width="1.5"/><circle cx="100" cy="24" r="4.5" fill="#e03040"/><circle cx="76" cy="30" r="3.5" fill="#3080e0"/><circle cx="124" cy="30" r="3.5" fill="#3080e0"/>`;if(ac==='glasses')return`<circle cx="80" cy="88" r="14" fill="none" stroke="#a07040" stroke-width="3" opacity=".8"/><circle cx="120" cy="88" r="14" fill="none" stroke="#a07040" stroke-width="3" opacity=".8"/><line x1="94" y1="88" x2="106" y2="88" stroke="#a07040" stroke-width="2.5" opacity=".8"/>`;if(ac==='hat')return`<ellipse cx="100" cy="50" rx="38" ry="7.5" fill="#1e1208" stroke="#3a2010" stroke-width="1.5"/><rect x="72" y="16" width="56" height="36" rx="7" fill="#1e1208" stroke="#3a2010" stroke-width="1.5"/>`;if(ac==='scarf')return`<path d="M54,135 Q100,127 146,135 Q146,149 130,151 Q100,144 70,151 Q54,149 54,135Z" fill="#d02840" opacity=".88"/>`;return'';}
const SVGS={
cat:(c,id)=>{const b=c.body||'#d06030',a=c.accent||'#f0b080',e=c.eye||'#20a0a0';return`<svg viewBox="0 0 200 232" xmlns="http://www.w3.org/2000/svg">${mkDefs(id,b,a,e)}<ellipse cx="100" cy="228" rx="58" ry="9" fill="rgba(0,0,0,0.22)"/><path d="M150,190 C175,162 180,134 163,117 C150,104 136,117 140,142" stroke="${darken(b,40)}" stroke-width="19" fill="none" stroke-linecap="round"/><path d="M150,190 C175,162 180,134 163,117 C150,104 136,117 140,142" stroke="url(#bg${id})" stroke-width="11" fill="none" stroke-linecap="round"/><ellipse cx="100" cy="172" rx="57" ry="53" fill="url(#bg${id})" filter="url(#sh${id})"/><ellipse cx="100" cy="172" rx="57" ry="53" fill="url(#br${id})"/><ellipse cx="100" cy="158" rx="30" ry="24" fill="url(#ag${id})"/><ellipse cx="76" cy="148" rx="18" ry="13" fill="rgba(255,255,255,0.12)" transform="rotate(-14,76,148)"/><circle cx="100" cy="92" r="54" fill="url(#bg${id})" filter="url(#sh${id})"/><circle cx="100" cy="92" r="54" fill="url(#br${id})"/><polygon points="60,52 47,14 78,47" fill="${darken(b,32)}"/><polygon points="140,52 153,14 122,47" fill="${darken(b,32)}"/><polygon points="63,50 54,22 76,46" fill="url(#ear${id})" opacity=".85"/><polygon points="137,50 146,22 124,46" fill="url(#ear${id})" opacity=".85"/><circle cx="76" cy="102" r="12" fill="${lighten(a,12)}" opacity=".28"/><circle cx="124" cy="102" r="12" fill="${lighten(a,12)}" opacity=".28"/>${eyeLayer(80,90,12,14,id)}${eyeLayer(120,90,12,14,id)}<path d="M97,108 L103,108 L100,113 Z" fill="url(#nse${id})"/><path d="M100,113 Q96,118 92,116" fill="none" stroke="${darken(b,40)}" stroke-width="1.8" stroke-linecap="round"/><path d="M100,113 Q104,118 108,116" fill="none" stroke="${darken(b,40)}" stroke-width="1.8" stroke-linecap="round"/><line x1="52" y1="102" x2="80" y2="108" stroke="rgba(255,245,232,.82)" stroke-width="1.3"/><line x1="52" y1="108" x2="80" y2="109" stroke="rgba(255,245,232,.82)" stroke-width="1.3"/><line x1="120" y1="108" x2="148" y2="102" stroke="rgba(255,245,232,.82)" stroke-width="1.3"/><line x1="120" y1="109" x2="148" y2="108" stroke="rgba(255,245,232,.82)" stroke-width="1.3"/><ellipse cx="78" cy="72" rx="20" ry="13" fill="rgba(255,255,255,.22)" transform="rotate(-18,78,72)"/>${mrkSVG(c.marking||'none',b)}${accSVG(c.accessory||'none')}<ellipse cx="74" cy="217" rx="18" ry="11" fill="url(#bg${id})"/><ellipse cx="126" cy="217" rx="18" ry="11" fill="url(#bg${id})"/></svg>`;},
dog:(c,id)=>{const b=c.body||'#c09030',a=c.accent||'#f8e8b0',e=c.eye||'#3a2010';return`<svg viewBox="0 0 200 232" xmlns="http://www.w3.org/2000/svg">${mkDefs(id,b,a,e)}<ellipse cx="100" cy="228" rx="58" ry="9" fill="rgba(0,0,0,0.22)"/><path d="M156,160 C172,138 168,118 158,112 C150,108 144,118 148,134" stroke="${darken(b,32)}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M156,160 C172,138 168,118 158,112 C150,108 144,118 148,134" stroke="${lighten(b,20)}" stroke-width="7" fill="none" stroke-linecap="round"/><ellipse cx="100" cy="173" rx="59" ry="54" fill="url(#bg${id})" filter="url(#sh${id})"/><ellipse cx="100" cy="173" rx="59" ry="54" fill="url(#br${id})"/><ellipse cx="100" cy="158" rx="32" ry="26" fill="url(#ag${id})"/><circle cx="100" cy="90" r="55" fill="url(#bg${id})" filter="url(#sh${id})"/><circle cx="100" cy="90" r="55" fill="url(#br${id})"/><ellipse cx="60" cy="105" rx="19" ry="33" fill="url(#bg${id})" transform="rotate(16,60,105)"/><ellipse cx="60" cy="107" rx="12" ry="27" fill="${darken(b,28)}" opacity=".35" transform="rotate(16,60,107)"/><ellipse cx="140" cy="105" rx="19" ry="33" fill="url(#bg${id})" transform="rotate(-16,140,105)"/><ellipse cx="140" cy="107" rx="12" ry="27" fill="${darken(b,28)}" opacity=".35" transform="rotate(-16,140,107)"/><ellipse cx="100" cy="108" rx="22" ry="18" fill="url(#ag${id})"/><ellipse cx="100" cy="104" rx="14" ry="10" fill="${lighten(a,18)}" opacity=".6"/>${eyeLayer(80,88,11,13,id)}${eyeLayer(120,88,11,13,id)}<circle cx="68" cy="100" r="11" fill="#f87060" opacity=".22"/><circle cx="132" cy="100" r="11" fill="#f87060" opacity=".22"/><ellipse cx="100" cy="105" rx="9" ry="7" fill="#1a0e00"/><ellipse cx="97" cy="103.5" rx="2.5" ry="2" fill="rgba(255,255,255,.35)"/><path d="M96,113 Q100,120 104,113" fill="none" stroke="${darken(b,38)}" stroke-width="2" stroke-linecap="round"/><ellipse cx="100" cy="118" rx="8" ry="6" fill="#e06050"/><ellipse cx="78" cy="72" rx="20" ry="13" fill="rgba(255,255,255,.2)" transform="rotate(-16,78,72)"/>${mrkSVG(c.marking||'none',b)}${accSVG(c.accessory||'none')}<ellipse cx="74" cy="218" rx="19" ry="12" fill="url(#bg${id})"/><ellipse cx="126" cy="218" rx="19" ry="12" fill="url(#bg${id})"/></svg>`;},
rabbit:(c,id)=>{const b=c.body||'#e0d8d0',a=c.accent||'#f8f0e8',e=c.eye||'#c03060';return`<svg viewBox="0 0 200 242" xmlns="http://www.w3.org/2000/svg">${mkDefs(id,b,a,e)}<ellipse cx="100" cy="238" rx="55" ry="9" fill="rgba(0,0,0,0.18)"/><ellipse cx="72" cy="74" rx="17" ry="50" fill="url(#bg${id})" filter="url(#sh${id})"/><ellipse cx="72" cy="74" rx="17" ry="50" fill="url(#br${id})"/><ellipse cx="72" cy="78" rx="9" ry="42" fill="url(#ear${id})" opacity=".8"/><ellipse cx="128" cy="74" rx="17" ry="50" fill="url(#bg${id})" filter="url(#sh${id})"/><ellipse cx="128" cy="74" rx="17" ry="50" fill="url(#br${id})"/><ellipse cx="128" cy="78" rx="9" ry="42" fill="url(#ear${id})" opacity=".8"/><ellipse cx="100" cy="172" rx="58" ry="55" fill="url(#bg${id})" filter="url(#sh${id})"/><ellipse cx="100" cy="172" rx="58" ry="55" fill="url(#br${id})"/><ellipse cx="100" cy="162" rx="36" ry="30" fill="url(#ag${id})"/><circle cx="154" cy="195" r="20" fill="${lighten(b,20)}"/><circle cx="154" cy="195" r="14" fill="${lighten(b,35)}"/><circle cx="150" cy="191" r="6" fill="rgba(255,255,255,.65)"/><circle cx="100" cy="102" r="53" fill="url(#bg${id})" filter="url(#sh${id})"/><circle cx="100" cy="102" r="53" fill="url(#br${id})"/><circle cx="72" cy="112" r="10" fill="#f87080" opacity=".2"/><circle cx="128" cy="112" r="10" fill="#f87080" opacity=".2"/>${eyeLayer(80,98,12,14,id)}${eyeLayer(120,98,12,14,id)}<circle cx="100" cy="115" r="5.5" fill="url(#nse${id})"/><line x1="100" y1="119" x2="95" y2="124" stroke="${darken(b,40)}" stroke-width="1.5" opacity=".6" stroke-linecap="round"/><line x1="100" y1="119" x2="105" y2="124" stroke="${darken(b,40)}" stroke-width="1.5" opacity=".6" stroke-linecap="round"/><line x1="60" y1="112" x2="84" y2="116" stroke="rgba(255,255,255,.72)" stroke-width="1.2"/><line x1="116" y1="116" x2="140" y2="112" stroke="rgba(255,255,255,.72)" stroke-width="1.2"/><ellipse cx="80" cy="84" rx="19" ry="13" fill="rgba(255,255,255,.24)" transform="rotate(-17,80,84)"/>${mrkSVG(c.marking||'none',b)}${accSVG(c.accessory||'none')}<ellipse cx="76" cy="224" rx="20" ry="12" fill="url(#bg${id})"/><ellipse cx="124" cy="224" rx="20" ry="12" fill="url(#bg${id})"/></svg>`;},
dragon:(c,id)=>{const b=c.body||'#5828b8',a=c.accent||'#b878ff',e=c.eye||'#30ffd0';return`<svg viewBox="0 0 200 232" xmlns="http://www.w3.org/2000/svg">${mkDefs(id,b,a,e)}<ellipse cx="100" cy="228" rx="53" ry="8" fill="rgba(0,0,0,0.28)"/><path d="M46,104 Q8,72 12,40 Q18,18 34,28 Q28,55 50,78 Z" fill="${darken(b,38)}" opacity=".9"/><path d="M154,104 Q192,72 188,40 Q182,18 166,28 Q172,55 150,78 Z" fill="${darken(b,38)}" opacity=".9"/><ellipse cx="100" cy="173" rx="55" ry="52" fill="url(#bg${id})" filter="url(#sh${id})"/><ellipse cx="100" cy="173" rx="55" ry="52" fill="url(#br${id})"/><ellipse cx="100" cy="162" rx="28" ry="22" fill="${lighten(b,18)}" opacity=".38"/><path d="M82,130 L78,112 L86,126 Z" fill="${darken(b,22)}"/><path d="M100,125 L96,106 L104,122 Z" fill="${darken(b,22)}"/><path d="M118,130 L122,112 L114,126 Z" fill="${darken(b,22)}"/><circle cx="100" cy="91" r="52" fill="url(#bg${id})" filter="url(#sh${id})"/><circle cx="100" cy="91" r="52" fill="url(#br${id})"/><path d="M76,48 L68,18 L82,44 Z" fill="${b}" stroke="${darken(b,25)}" stroke-width="1"/><path d="M124,48 L132,18 L118,44 Z" fill="${b}" stroke="${darken(b,25)}" stroke-width="1"/><ellipse cx="80" cy="88" rx="16" ry="18" fill="${darken(b,50)}"/><ellipse cx="120" cy="88" rx="16" ry="18" fill="${darken(b,50)}"/><ellipse cx="80" cy="88" rx="13" ry="15" fill="url(#eg${id})" filter="url(#gf${id})"/><ellipse cx="120" cy="88" rx="13" ry="15" fill="url(#eg${id})" filter="url(#gf${id})"/><ellipse cx="80" cy="89" rx="6" ry="10" fill="${darken(e,30)}"/><ellipse cx="120" cy="89" rx="6" ry="10" fill="${darken(e,30)}"/><ellipse cx="76" cy="84" rx="4.5" ry="4" fill="rgba(255,255,255,.9)"/><ellipse cx="116" cy="84" rx="4.5" ry="4" fill="rgba(255,255,255,.9)"/><ellipse cx="100" cy="112" rx="16" ry="10" fill="${blend(b,a,.4)}"/><ellipse cx="97" cy="110" rx="4" ry="3.5" fill="${darken(b,30)}" opacity=".7"/><ellipse cx="103" cy="110" rx="4" ry="3.5" fill="${darken(b,30)}" opacity=".7"/><path d="M90,118 Q100,124 110,118" fill="none" stroke="${darken(b,35)}" stroke-width="2" stroke-linecap="round"/><ellipse cx="78" cy="73" rx="19" ry="12" fill="rgba(255,255,255,.16)" transform="rotate(-17,78,73)"/>${mrkSVG(c.marking||'none',b)}${accSVG(c.accessory||'none')}<ellipse cx="74" cy="218" rx="16" ry="10" fill="url(#bg${id})"/><ellipse cx="126" cy="218" rx="16" ry="10" fill="url(#bg${id})"/></svg>`;},
fox:(c,id)=>{const b=c.body||'#c83808',a=c.accent||'#f8ede0',e=c.eye||'#2a1200';return`<svg viewBox="0 0 200 232" xmlns="http://www.w3.org/2000/svg">${mkDefs(id,b,a,e)}<ellipse cx="100" cy="228" rx="56" ry="9" fill="rgba(0,0,0,0.2)"/><path d="M148,186 C173,158 182,126 165,108 C151,93 136,108 141,134" stroke="${darken(b,40)}" stroke-width="22" fill="none" stroke-linecap="round"/><path d="M148,186 C173,158 182,126 165,108 C151,93 136,108 141,134" stroke="url(#bg${id})" stroke-width="13" fill="none" stroke-linecap="round"/><ellipse cx="162" cy="110" rx="14" ry="11" fill="${lighten(a,10)}" opacity=".9" transform="rotate(-30,162,110)"/><ellipse cx="162" cy="110" rx="9" ry="7" fill="white" opacity=".75" transform="rotate(-30,162,110)"/><ellipse cx="100" cy="172" rx="57" ry="53" fill="url(#bg${id})" filter="url(#sh${id})"/><ellipse cx="100" cy="172" rx="57" ry="53" fill="url(#br${id})"/><ellipse cx="100" cy="162" rx="32" ry="26" fill="url(#ag${id})"/><circle cx="100" cy="90" r="52" fill="url(#bg${id})" filter="url(#sh${id})"/><circle cx="100" cy="90" r="52" fill="url(#br${id})"/><polygon points="62,52 46,8 84,46" fill="${darken(b,30)}"/><polygon points="138,52 154,8 116,46" fill="${darken(b,30)}"/><polygon points="65,50 52,16 82,45" fill="${lighten(a,8)}" opacity=".85"/><polygon points="135,50 148,16 118,45" fill="${lighten(a,8)}" opacity=".85"/><ellipse cx="100" cy="104" rx="30" ry="22" fill="url(#ag${id})"/><ellipse cx="80" cy="85" rx="16" ry="13" fill="${darken(b,20)}" opacity=".38"/><ellipse cx="120" cy="85" rx="16" ry="13" fill="${darken(b,20)}" opacity=".38"/><ellipse cx="80" cy="86" rx="13" ry="13.5" fill="#120600" transform="rotate(-6,80,86)"/><ellipse cx="120" cy="86" rx="13" ry="13.5" fill="#120600" transform="rotate(6,120,86)"/><ellipse cx="80" cy="86" rx="9" ry="9.5" fill="url(#eg${id})" transform="rotate(-6,80,86)"/><ellipse cx="120" cy="86" rx="9" ry="9.5" fill="url(#eg${id})" transform="rotate(6,120,86)"/><ellipse cx="75" cy="81" rx="4" ry="3.5" fill="rgba(255,255,255,.88)"/><ellipse cx="115" cy="81" rx="4" ry="3.5" fill="rgba(255,255,255,.88)"/><ellipse cx="100" cy="108" rx="7" ry="5.5" fill="#1a0800"/><path d="M94,112 Q100,118 106,112" fill="none" stroke="${darken(b,38)}" stroke-width="1.8" stroke-linecap="round"/><line x1="54" y1="102" x2="80" y2="108" stroke="rgba(255,248,240,.8)" stroke-width="1.3"/><line x1="120" y1="108" x2="146" y2="102" stroke="rgba(255,248,240,.8)" stroke-width="1.3"/><ellipse cx="79" cy="72" rx="20" ry="13" fill="rgba(255,255,255,.2)" transform="rotate(-18,79,72)"/>${mrkSVG(c.marking||'none',b)}${accSVG(c.accessory||'none')}<ellipse cx="74" cy="217" rx="18" ry="11" fill="url(#bg${id})"/><ellipse cx="126" cy="217" rx="18" ry="11" fill="url(#bg${id})"/></svg>`;}
};
function getSVG(type,custom,ns){const id=ns||uid();return SVGS[type]?SVGS[type](custom||{},id):'';}

// ─── WORLD BACKGROUNDS ─────────────────────────
const WORLDS={
'Enchanted Forest':`<svg viewBox="0 0 400 700" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#030812"/><stop offset="40%" stop-color="#050e1e"/><stop offset="70%" stop-color="#0a1a18"/><stop offset="100%" stop-color="#081410"/></linearGradient><radialGradient id="m" cx="72%" cy="18%" r="18%"><stop offset="0%" stop-color="#e8f8e0"/><stop offset="40%" stop-color="#d0e8a8" stop-opacity=".8"/><stop offset="100%" stop-color="#d0e8a8" stop-opacity="0"/></radialGradient></defs><rect width="400" height="700" fill="url(#s)"/><rect width="400" height="700" fill="url(#m)"/><circle cx="290" cy="110" r="38" fill="#e8f8e0" opacity=".92"/><circle cx="298" cy="104" r="17" fill="#0a1a18" opacity=".72"/><circle cx="28" cy="38" r="1.3" fill="#c0f0e0" opacity=".8"/><circle cx="60" cy="22" r="1.5" fill="white" opacity=".85"/><circle cx="100" cy="52" r="1" fill="#c0f0e0"/><circle cx="148" cy="28" r="1.4" fill="white" opacity=".9"/><circle cx="200" cy="18" r="1.1" fill="white" opacity=".75"/><circle cx="232" cy="48" r=".9" fill="#c0f0e0"/><circle cx="338" cy="58" r="1.3" fill="white" opacity=".85"/><circle cx="378" cy="32" r="1" fill="#e0f8f0"/><path d="M-20,680 L-20,300 Q0,250 20,300 Q30,220 50,280 Q60,200 80,270 Q90,180 110,260 Q120,150 140,240 Q155,120 170,230 Q180,100 200,210 Q210,90 220,200 Q235,110 255,230 Q265,160 280,260 Q295,140 310,270 Q320,190 340,290 Q350,210 370,300 Q380,230 400,290 L400,680 Z" fill="#040e06"/><path d="M-20,680 L-20,380 Q15,320 40,375 Q70,295 100,360 Q130,280 160,350 Q190,268 220,345 Q250,272 280,352 Q310,278 340,358 Q370,290 400,360 L400,680 Z" fill="#0a1a0c"/><path d="M-20,680 L-20,440 Q25,390 55,442 Q88,362 118,428 Q150,355 180,422 Q212,358 242,425 Q274,360 305,428 Q338,362 368,432 L400,422 L400,680 Z" fill="#0e220e"/><ellipse cx="56" cy="540" rx="24" ry="14" fill="#40e890" opacity=".6"/><ellipse cx="56" cy="540" rx="14" ry="6" fill="#80ffc0" opacity=".45"/><rect x="51" y="540" width="10" height="30" rx="5" fill="#208050"/><ellipse cx="314" cy="562" rx="20" ry="12" fill="#a0e840" opacity=".6"/><rect x="309" y="562" width="10" height="26" rx="5" fill="#208050"/><ellipse cx="162" cy="572" rx="18" ry="10" fill="#40e890" opacity=".6"/><rect x="157" y="572" width="10" height="22" rx="5" fill="#208050"/><ellipse cx="230" cy="555" rx="16" ry="9" fill="#60f8a0" opacity=".5"/><rect x="225" y="555" width="10" height="20" rx="5" fill="#208050"/><circle cx="80" cy="452" r="2.5" fill="#c0ff80" opacity=".7"/><circle cx="122" cy="412" r="2" fill="#d0ff90" opacity=".65"/><circle cx="192" cy="442" r="2.5" fill="#b0ff70" opacity=".75"/><circle cx="252" cy="422" r="2" fill="#c0ff80" opacity=".65"/><circle cx="322" cy="458" r="2.2" fill="#d0ff90" opacity=".7"/><circle cx="362" cy="432" r="1.8" fill="#c0ff80" opacity=".65"/><circle cx="58" cy="488" r="1.8" fill="#c0ff80" opacity=".55"/><circle cx="290" cy="475" r="2" fill="#a0ff60" opacity=".6"/><ellipse cx="200" cy="660" rx="230" ry="48" fill="#0a2818" opacity=".88"/><ellipse cx="200" cy="680" rx="260" ry="42" fill="#0c3020" opacity=".75"/></svg>`,
'Crystal Ocean':`<svg viewBox="0 0 400 700" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#88c8f0"/><stop offset="16%" stop-color="#4aaad8"/><stop offset="42%" stop-color="#1878b0"/><stop offset="72%" stop-color="#0a4880"/><stop offset="100%" stop-color="#061838"/></linearGradient><radialGradient id="sun" cx="22%" cy="12%" r="22%"><stop offset="0%" stop-color="#fff8e0" stop-opacity=".9"/><stop offset="40%" stop-color="#f8d860" stop-opacity=".55"/><stop offset="100%" stop-color="#f8d860" stop-opacity="0"/></radialGradient></defs><rect width="400" height="700" fill="url(#s)"/><rect width="400" height="700" fill="url(#sun)"/><circle cx="95" cy="72" r="44" fill="#fff0c0" opacity=".86"/><circle cx="95" cy="72" r="28" fill="#ffe880"/><path d="M0,180 Q50,155 100,175 Q150,195 200,172 Q250,149 300,170 Q350,191 400,168 L400,185 Q350,208 300,188 Q250,168 200,190 Q150,212 100,190 Q50,168 0,192 Z" fill="rgba(255,255,255,0.48)"/><path d="M0,198 Q60,182 120,197 Q180,213 240,195 Q300,177 360,193 L400,188 Q360,210 300,198 Q240,210 180,216 Q120,222 60,206 Q30,200 0,212 Z" fill="rgba(200,230,255,0.32)"/><path d="M120,185 L78,510" stroke="rgba(255,255,255,0.07)" stroke-width="20" stroke-linecap="round"/><path d="M185,180 L205,525" stroke="rgba(255,255,255,0.09)" stroke-width="24" stroke-linecap="round"/><path d="M265,183 L326,515" stroke="rgba(255,255,255,0.07)" stroke-width="18" stroke-linecap="round"/><path d="M22,625 L22,530 M22,560 L2,528 M22,550 L38,517 M22,540 L12,512" stroke="#e85060" stroke-width="5.5" fill="none" stroke-linecap="round"/><path d="M382,615 L382,520 M382,555 L360,518 M382,545 L398,515" stroke="#ff8860" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M158,652 L158,572 M158,604 L138,570 M158,593 L173,562 M158,584 L148,556" stroke="#a040e0" stroke-width="4.5" fill="none" stroke-linecap="round"/><path d="M252,642 L252,568 M252,600 L234,568 M252,590 L266,560" stroke="#f08040" stroke-width="4.5" fill="none" stroke-linecap="round"/><path d="M310,658 L310,580 M310,612 L292,578 M310,600 L326,572" stroke="#40c0a0" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="82" cy="360" rx="23" ry="17" fill="#40c0ff" opacity=".38"/><path d="M74,377 Q75,412 73,422" stroke="#40c0ff" stroke-width="1.8" opacity=".45" fill="none"/><path d="M82,377 Q82,416 82,428" stroke="#40c0ff" stroke-width="1.8" opacity=".45" fill="none"/><path d="M90,377 Q88,410 90,420" stroke="#40c0ff" stroke-width="1.8" opacity=".45" fill="none"/><ellipse cx="322" cy="278" rx="19" ry="14" fill="#c080ff" opacity=".38"/><path d="M315,292 Q316,322 314,332" stroke="#c080ff" stroke-width="1.5" opacity=".4" fill="none"/><path d="M322,292 Q322,326 322,336" stroke="#c080ff" stroke-width="1.5" opacity=".4" fill="none"/><ellipse cx="200" cy="430" rx="21" ry="16" fill="#80e0ff" opacity=".3"/><path d="M192,446 Q193,476 191,485" stroke="#80e0ff" stroke-width="1.5" opacity=".35" fill="none"/><path d="M200,446 Q200,478 200,488" stroke="#80e0ff" stroke-width="1.5" opacity=".35" fill="none"/><circle cx="60" cy="295" r="5" fill="none" stroke="rgba(200,240,255,.45)" stroke-width="1.6"/><circle cx="62" cy="248" r="4" fill="none" stroke="rgba(200,240,255,.38)" stroke-width="1.5"/><circle cx="58" cy="208" r="3" fill="none" stroke="rgba(200,240,255,.3)" stroke-width="1.2"/><circle cx="305" cy="318" r="6" fill="none" stroke="rgba(200,240,255,.38)" stroke-width="1.5"/><circle cx="302" cy="268" r="4" fill="none" stroke="rgba(200,240,255,.3)" stroke-width="1.2"/><path d="M142,308 L162,316 L160,308 L162,300 Z" fill="rgba(200,240,255,.28)"/><path d="M272,388 L294,397 L292,388 L294,380 Z" fill="rgba(200,240,255,.22)"/><rect y="640" width="400" height="60" fill="#1a4860"/><path d="M0,640 Q100,625 200,640 Q300,655 400,638 L400,700 L0,700 Z" fill="#204068"/></svg>`,
'Starlit Galaxy':`<svg viewBox="0 0 400 700" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="s" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stop-color="#020108"/><stop offset="40%" stop-color="#080418"/><stop offset="80%" stop-color="#100824"/><stop offset="100%" stop-color="#060210"/></linearGradient><radialGradient id="n1" cx="30%" cy="25%" r="45%"><stop offset="0%" stop-color="#8020c0" stop-opacity=".22"/><stop offset="100%" stop-color="#8020c0" stop-opacity="0"/></radialGradient><radialGradient id="n2" cx="75%" cy="60%" r="40%"><stop offset="0%" stop-color="#0040d0" stop-opacity=".2"/><stop offset="100%" stop-color="#0040d0" stop-opacity="0"/></radialGradient><radialGradient id="n3" cx="55%" cy="40%" r="30%"><stop offset="0%" stop-color="#e04060" stop-opacity=".13"/><stop offset="100%" stop-color="#e04060" stop-opacity="0"/></radialGradient></defs><rect width="400" height="700" fill="url(#s)"/><rect width="400" height="700" fill="url(#n1)"/><rect width="400" height="700" fill="url(#n2)"/><rect width="400" height="700" fill="url(#n3)"/><ellipse cx="320" cy="350" rx="180" ry="500" fill="rgba(255,255,255,0.028)" transform="rotate(-35,320,350)"/><ellipse cx="280" cy="350" rx="100" ry="480" fill="rgba(200,200,255,0.022)" transform="rotate(-35,280,350)"/><circle cx="15" cy="22" r="1.4" fill="white" opacity=".9"/><circle cx="38" cy="58" r=".9" fill="white" opacity=".8"/><circle cx="65" cy="18" r="1.2" fill="#d0e0ff" opacity=".85"/><circle cx="88" cy="75" r="1.6" fill="white" opacity=".9"/><circle cx="112" cy="34" r="1" fill="#ffe0c0" opacity=".8"/><circle cx="158" cy="14" r="1.3" fill="#c0d8ff" opacity=".85"/><circle cx="180" cy="60" r="1.5" fill="white" opacity=".9"/><circle cx="228" cy="90" r="1.1" fill="#ffd0e0" opacity=".8"/><circle cx="252" cy="42" r="1.4" fill="white" opacity=".9"/><circle cx="322" cy="65" r="1.6" fill="#ffe8c0" opacity=".9"/><circle cx="372" cy="85" r="1.1" fill="white" opacity=".85"/><circle cx="390" cy="25" r="1.3" fill="#c0e0ff" opacity=".8"/><circle cx="55" cy="115" r="1.5" fill="#d0e0ff" opacity=".85"/><circle cx="102" cy="128" r="1.3" fill="white" opacity=".9"/><circle cx="195" cy="142" r="1.4" fill="white" opacity=".85"/><circle cx="285" cy="138" r="1.2" fill="#d0c0ff" opacity=".85"/><circle cx="335" cy="158" r="1.5" fill="white" opacity=".9"/><circle cx="25" cy="200" r="1.1" fill="white" opacity=".8"/><circle cx="78" cy="185" r=".9" fill="white" opacity=".75"/><circle cx="145" cy="205" r="1" fill="#ffe0d0" opacity=".8"/><circle cx="240" cy="215" r="1.3" fill="white" opacity=".85"/><circle cx="368" cy="195" r=".8" fill="white" opacity=".75"/><circle cx="320" cy="180" r="55" fill="#c08030" opacity=".72"/><ellipse cx="310" cy="172" rx="55" ry="55" fill="#d09040" opacity=".55"/><circle cx="302" cy="162" r="22" fill="#805020" opacity=".55"/><ellipse cx="320" cy="180" rx="82" ry="19" fill="none" stroke="#c08030" stroke-width="6" opacity=".42" transform="rotate(-15,320,180)"/><ellipse cx="320" cy="180" rx="72" ry="16" fill="none" stroke="#d09840" stroke-width="3" opacity=".28" transform="rotate(-15,320,180)"/><circle cx="320" cy="180" r="72" fill="rgba(200,128,48,0.06)"/><circle cx="50" cy="100" r="24" fill="#e8e8f0" opacity=".85"/><circle cx="44" cy="96" r="9" fill="#d0d0e0" opacity=".6"/><circle cx="57" cy="108" r="6" fill="#c8c8e0" opacity=".4"/><path d="M50,310 L122,248" stroke="white" stroke-width="1.5" opacity=".6" stroke-linecap="round"/><path d="M50,310 L82,278" stroke="white" stroke-width="2.5" opacity=".8" stroke-linecap="round"/><path d="M0,555 Q200,525 400,548" stroke="rgba(200,200,200,0.06)" stroke-width="45" fill="none"/></svg>`,
'Ancient Mountains':`<svg viewBox="0 0 400 700" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#060214"/><stop offset="22%" stop-color="#160626"/><stop offset="48%" stop-color="#280e36"/><stop offset="72%" stop-color="#501828"/><stop offset="88%" stop-color="#c83818"/><stop offset="100%" stop-color="#e06018"/></linearGradient><radialGradient id="su" cx="84%" cy="78%" r="32%"><stop offset="0%" stop-color="#fff0a0" stop-opacity=".9"/><stop offset="28%" stop-color="#ffb030" stop-opacity=".65"/><stop offset="65%" stop-color="#e06010" stop-opacity=".25"/><stop offset="100%" stop-color="#e06010" stop-opacity="0"/></radialGradient></defs><rect width="400" height="700" fill="url(#s)"/><rect width="400" height="700" fill="url(#su)"/><circle cx="25" cy="35" r="1.3" fill="white" opacity=".8"/><circle cx="60" cy="18" r=".9" fill="white" opacity=".7"/><circle cx="95" cy="45" r="1.1" fill="white" opacity=".75"/><circle cx="132" cy="22" r="1.4" fill="white" opacity=".8"/><circle cx="168" cy="54" r=".8" fill="white" opacity=".7"/><circle cx="212" cy="28" r="1.2" fill="white" opacity=".75"/><circle cx="252" cy="50" r="1" fill="white" opacity=".8"/><circle cx="292" cy="20" r="1.3" fill="white" opacity=".7"/><path d="M-20,580 Q40,345 100,425 Q142,295 182,385 Q222,265 262,378 Q302,265 342,378 Q378,296 420,365 L420,600 L-20,600 Z" fill="#120820" opacity=".95"/><path d="M-20,600 Q32,405 72,482 Q112,366 152,462 Q192,355 232,448 Q268,356 302,452 Q338,362 372,462 L420,462 L420,618 L-20,618 Z" fill="#1c1030"/><path d="M100,425 Q115,398 130,420" fill="#e8e8f0" opacity=".7"/><path d="M182,385 Q196,358 210,382" fill="#e8e8f0" opacity=".72"/><path d="M262,378 Q276,350 290,375" fill="#e8e8f0" opacity=".68"/><path d="M342,378 Q354,354 366,376" fill="#e8e8f0" opacity=".65"/><path d="M-20,658 Q32,495 76,565 Q122,465 167,545 Q208,455 244,535 Q282,455 318,540 Q354,462 392,548 L420,540 L420,685 L-20,685 Z" fill="#0e0606"/><path d="M76,565 Q90,538 104,560" fill="#f0f0f8" opacity=".88"/><path d="M167,545 Q180,520 194,542" fill="#f0f0f8" opacity=".85"/><path d="M244,535 Q256,512 268,532" fill="#f0f0f8" opacity=".82"/><path d="M318,540 Q329,516 342,537" fill="#f0f0f8" opacity=".8"/><path d="M-20,660 Q2,632 18,655 Q30,626 46,650 Q58,620 74,645 Q86,616 102,640 Q116,612 132,636 L140,660 L-20,660 Z" fill="#0c1c08"/><path d="M268,648 Q286,618 302,640 Q318,610 334,635 Q348,608 364,632 Q376,610 390,633 L400,650 L268,658 Z" fill="#0c1c08"/><ellipse cx="338" cy="542" rx="95" ry="38" fill="#ff8020" opacity=".18"/><path d="M82,356 Q94,346 102,356 Q110,346 122,356 Q110,366 102,360 Q94,366 82,356 Z" fill="#080412" opacity=".6"/><path d="M272,284 Q282,274 290,284 Q298,274 310,284 Q298,295 290,288 Q282,295 272,284 Z" fill="#080412" opacity=".55"/></svg>`,
'Neon City':`<svg viewBox="0 0 400 700" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#010106"/><stop offset="40%" stop-color="#04020e"/><stop offset="70%" stop-color="#070415"/><stop offset="100%" stop-color="#0b051e"/></linearGradient><filter id="ng"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><rect width="400" height="700" fill="url(#s)"/><ellipse cx="200" cy="620" rx="290" ry="160" fill="#1808a0" opacity=".28"/><ellipse cx="95" cy="598" rx="170" ry="130" fill="#780098" opacity=".16"/><ellipse cx="305" cy="608" rx="150" ry="120" fill="#0098d8" opacity=".16"/><circle cx="30" cy="30" r=".9" fill="white" opacity=".4"/><circle cx="80" cy="18" r=".8" fill="white" opacity=".35"/><circle cx="140" cy="40" r="1" fill="white" opacity=".4"/><circle cx="200" cy="22" r=".8" fill="white" opacity=".35"/><circle cx="350" cy="30" r=".9" fill="white" opacity=".4"/><rect x="0" y="340" width="42" height="360" fill="#080612" rx="2"/><rect x="8" y="298" width="26" height="52" rx="2" fill="#080612"/><rect x="38" y="258" width="57" height="444" fill="#0a0816" rx="2"/><rect x="48" y="228" width="36" height="46" rx="2" fill="#0a0816"/><rect x="90" y="298" width="46" height="402" fill="#080612" rx="2"/><rect x="98" y="268" width="28" height="40" rx="2" fill="#080612"/><rect x="135" y="378" width="38" height="322" fill="#0a0816" rx="2"/><rect x="170" y="318" width="56" height="382" fill="#080612" rx="2"/><rect x="180" y="288" width="35" height="40" rx="2" fill="#080612"/><rect x="222" y="348" width="42" height="352" fill="#0a0816" rx="2"/><rect x="260" y="278" width="50" height="422" fill="#080612" rx="2"/><rect x="268" y="248" width="32" height="42" rx="2" fill="#080612"/><rect x="308" y="328" width="44" height="372" fill="#0a0816" rx="2"/><rect x="350" y="358" width="50" height="342" fill="#080612" rx="2"/><!-- Cyan neons --><rect x="12" y="348" width="28" height="4" rx="2" fill="#00f8f8" opacity=".95" filter="url(#ng)"/><rect x="50" y="286" width="32" height="5" rx="2.5" fill="#00f0f8" opacity=".88" filter="url(#ng)"/><rect x="94" y="318" width="26" height="4" rx="2" fill="#00f8e0" opacity=".9" filter="url(#ng)"/><!-- Magenta neons --><rect x="144" y="408" width="22" height="4" rx="2" fill="#f000e0" opacity=".92" filter="url(#ng)"/><rect x="172" y="338" width="40" height="5" rx="2.5" fill="#e800d0" opacity=".88" filter="url(#ng)"/><rect x="226" y="368" width="26" height="4" rx="2" fill="#f000c0" opacity=".9" filter="url(#ng)"/><!-- Yellow neons --><rect x="265" y="298" width="30" height="4" rx="2" fill="#f8e000" opacity=".9" filter="url(#ng)"/><rect x="312" y="348" width="24" height="4" rx="2" fill="#f0d000" opacity=".88" filter="url(#ng)"/><!-- Green neons --><rect x="358" y="388" width="22" height="4" rx="2" fill="#00f060" opacity=".9" filter="url(#ng)"/><!-- Windows --><rect x="5" y="388" width="7" height="6" rx="1" fill="#ffee80" opacity=".6"/><rect x="15" y="388" width="7" height="6" rx="1" fill="#ffee80" opacity=".5"/><rect x="5" y="401" width="7" height="6" rx="1" fill="#80d0ff" opacity=".55"/><rect x="25" y="395" width="6" height="5" rx="1" fill="#ffee80" opacity=".45"/><rect x="55" y="318" width="8" height="6" rx="1" fill="#ffee80" opacity=".55"/><rect x="66" y="318" width="8" height="6" rx="1" fill="#ffee80" opacity=".5"/><rect x="55" y="332" width="8" height="6" rx="1" fill="#c0e0ff" opacity=".5"/><rect x="66" y="332" width="8" height="6" rx="1" fill="#ffee80" opacity=".45"/><rect x="100" y="338" width="7" height="5" rx="1" fill="#ffee80" opacity=".55"/><rect x="110" y="338" width="7" height="5" rx="1" fill="#80d0ff" opacity=".5"/><rect x="176" y="358" width="8" height="6" rx="1" fill="#ffee80" opacity=".6"/><rect x="186" y="358" width="8" height="6" rx="1" fill="#ffee80" opacity=".5"/><rect x="176" y="372" width="8" height="6" rx="1" fill="#c0e0ff" opacity=".5"/><rect x="268" y="298" width="8" height="6" rx="1" fill="#ffee80" opacity=".55"/><rect x="278" y="298" width="8" height="6" rx="1" fill="#80d0ff" opacity=".5"/><rect x="268" y="312" width="8" height="6" rx="1" fill="#ffee80" opacity=".45"/><rect x="316" y="366" width="7" height="5" rx="1" fill="#ffee80" opacity=".55"/><rect x="326" y="366" width="7" height="5" rx="1" fill="#c0e0ff" opacity=".5"/><rect x="360" y="404" width="7" height="5" rx="1" fill="#c0e0ff" opacity=".5"/><rect x="0" y="590" width="400" height="110" fill="#060510"/><rect x="0" y="595" width="400" height="2" fill="rgba(255,255,255,0.08)"/><rect x="28" y="598" width="85" height="4" rx="2" fill="#00f8f8" opacity=".18"/><rect x="198" y="600" width="65" height="3" rx="1.5" fill="#f000e0" opacity=".16"/><rect x="282" y="597" width="52" height="3" rx="1.5" fill="#f8e000" opacity=".18"/><line x1="80" y1="592" x2="80" y2="540" stroke="#304060" stroke-width="3.5"/><ellipse cx="80" cy="540" rx="13" ry="6" fill="#80c0ff" opacity=".72" filter="url(#ng)"/><line x1="312" y1="592" x2="312" y2="548" stroke="#304060" stroke-width="3.5"/><ellipse cx="312" cy="548" rx="13" ry="6" fill="#80c0ff" opacity=".72" filter="url(#ng)"/></svg>`,
'Mystic Desert':`<svg viewBox="0 0 400 700" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#06021a"/><stop offset="18%" stop-color="#1a0828"/><stop offset="42%" stop-color="#480e1e"/><stop offset="65%" stop-color="#9e2e14"/><stop offset="82%" stop-color="#d85c0e"/><stop offset="100%" stop-color="#e8700e"/></linearGradient><radialGradient id="su" cx="78%" cy="90%" r="36%"><stop offset="0%" stop-color="#fff0a0" stop-opacity=".92"/><stop offset="22%" stop-color="#ffb030" stop-opacity=".7"/><stop offset="58%" stop-color="#e06010" stop-opacity=".28"/><stop offset="100%" stop-color="#e06010" stop-opacity="0"/></radialGradient></defs><rect width="400" height="700" fill="url(#s)"/><rect width="400" height="700" fill="url(#su)"/><circle cx="60" cy="78" r="34" fill="#f8e0d0" opacity=".88"/><circle cx="52" cy="72" r="15" fill="#e8c8b8" opacity=".62"/><circle cx="66" cy="88" r="10" fill="#e0c0a8" opacity=".4"/><circle cx="20" cy="30" r="1.2" fill="white" opacity=".85"/><circle cx="55" cy="15" r=".9" fill="white" opacity=".8"/><circle cx="92" cy="40" r="1.1" fill="white" opacity=".75"/><circle cx="128" cy="20" r="1.4" fill="#ffd0c0" opacity=".82"/><circle cx="165" cy="50" r=".8" fill="white" opacity=".78"/><circle cx="202" cy="18" r="1.2" fill="white" opacity=".82"/><circle cx="245" cy="42" r="1" fill="white" opacity=".78"/><circle cx="282" cy="25" r="1.3" fill="white" opacity=".82"/><circle cx="325" cy="48" r=".9" fill="white" opacity=".75"/><circle cx="365" cy="22" r="1.1" fill="white" opacity=".8"/><path d="M-20,545 Q62,442 142,514 Q202,452 262,512 Q322,442 422,522 L422,700 L-20,700 Z" fill="#602010"/><path d="M-20,605 Q82,512 162,572 Q232,502 312,562 Q362,512 422,560 L422,700 L-20,700 Z" fill="#8a3010"/><path d="M-20,662 Q72,592 152,642 Q222,582 302,632 Q358,592 422,628 L422,700 L-20,700 Z" fill="#a84020"/><rect x="0" y="682" width="400" height="18" fill="#c05020"/><path d="M282,488 L312,406 L342,488 Z" fill="#3e1606" opacity=".82"/><path d="M332,498 L356,428 L380,498 Z" fill="#3e1606" opacity=".78"/><rect x="35" y="475" width="11" height="82" rx="5.5" fill="#1a3608"/><ellipse cx="40.5" cy="494" rx="16" ry="13" fill="#1a3608"/><rect x="26" y="490" width="30" height="5.5" rx="2.7" fill="#1a3608"/><rect x="147" y="465" width="11" height="94" rx="5.5" fill="#183008"/><ellipse cx="152.5" cy="482" rx="16" ry="13" fill="#183008"/><rect x="138" y="478" width="30" height="5.5" rx="2.7" fill="#183008"/><rect x="344" y="482" width="10" height="78" rx="5" fill="#1a3608"/><ellipse cx="349" cy="500" rx="14" ry="11" fill="#1a3608"/><path d="M100,502 Q106,494 112,502 Q118,494 124,502" stroke="rgba(255,160,60,0.14)" stroke-width="1.5" fill="none"/><path d="M222,512 Q228,503 234,512 Q240,503 246,512" stroke="rgba(255,160,60,0.12)" stroke-width="1.5" fill="none"/><path d="M305,496 Q310,488 316,496 Q321,488 327,496" stroke="rgba(255,160,60,0.13)" stroke-width="1.5" fill="none"/><circle cx="82" cy="652" r="1.6" fill="rgba(255,200,100,.32)"/><circle cx="205" cy="662" r="1.3" fill="rgba(255,200,100,.28)"/><circle cx="325" cy="648" r="1.6" fill="rgba(255,200,100,.3)"/><circle cx="155" cy="658" r="1.1" fill="rgba(255,200,100,.25)"/></svg>`
};

function setBackground(pet){
  const world=pet.homeWorld||'Enchanted Forest';
  const sc=document.getElementById('scene');
  sc.innerHTML=WORLDS[world]||WORLDS['Enchanted Forest'];
  sc.style.opacity='.75';
}

// ─── CANVAS ACTION ANIMATIONS ──────────────────
const actCv=document.getElementById('actfx');
const actCx=actCv.getContext('2d');
let _actId=null;
function resizeActCv(){actCv.width=innerWidth;actCv.height=innerHeight;}
resizeActCv();addEventListener('resize',resizeActCv);

function getPetPos(){
  const el=document.getElementById('pet3d');
  if(!el)return{x:innerWidth/2,y:innerHeight/2};
  const r=el.getBoundingClientRect();
  return{x:r.left+r.width/2,y:r.top+r.height/2};
}
function easeOut3(t){return 1-Math.pow(1-t,3);}
function easeIn2(t){return t*t;}

function runAnim(type,sub){
  resizeActCv();
  actCv.style.display='block';
  if(_actId)cancelAnimationFrame(_actId);
  const st=Date.now();
  const dur=type==='sleep'?2800:type==='play'?2400:2000;
  const pos=getPetPos();
  function frame(){
    const t=Math.min((Date.now()-st)/dur,1);
    actCx.clearRect(0,0,actCv.width,actCv.height);
    if(type==='feed')drawFeed(t,pos,sub||'apple');
    if(type==='play')drawPlay(t,pos,sub||'ball');
    if(type==='sleep')drawSleep(t,pos);
    if(type==='train')drawTrain(t,pos);
    if(t<1)_actId=requestAnimationFrame(frame);
    else{actCv.style.display='none';actCx.clearRect(0,0,actCv.width,actCv.height);}
  }
  _actId=requestAnimationFrame(frame);
}

function drawFeed(t,{x:px,y:py},foodType){
  // Bowl appears right in front of pet (below pet center)
  const bx=px,by=py+88;
  const ba=Math.min(t*5,1);
  actCx.save();actCx.globalAlpha=ba;
  // Bowl base shadow
  actCx.beginPath();actCx.ellipse(bx,by+30,50,11,0,0,Math.PI*2);actCx.fillStyle='rgba(0,0,0,0.3)';actCx.fill();
  // Bowl bottom
  actCx.beginPath();actCx.ellipse(bx,by+19,50,14,0,0,Math.PI*2);actCx.fillStyle='#7a4010';actCx.fill();
  // Bowl body
  actCx.beginPath();actCx.moveTo(bx-50,by);actCx.arc(bx,by,50,Math.PI,0,false);actCx.lineTo(bx-50,by+19);actCx.ellipse(bx,by+19,50,14,0,Math.PI,0,false);actCx.closePath();
  const bg=actCx.createLinearGradient(bx-50,by-50,bx+50,by+50);
  bg.addColorStop(0,'#d89050');bg.addColorStop(.5,'#a85830');bg.addColorStop(1,'#803a12');
  actCx.fillStyle=bg;actCx.fill();
  actCx.beginPath();actCx.ellipse(bx,by,50,14,0,0,Math.PI*2);actCx.strokeStyle='#e8a060';actCx.lineWidth=3;actCx.stroke();
  if(t>0.4){const fa=Math.min((t-0.4)*3.5,1);actCx.globalAlpha=fa*ba;actCx.beginPath();actCx.ellipse(bx,by+5,35,9,0,0,Math.PI*2);actCx.fillStyle='#b85030';actCx.fill();actCx.beginPath();actCx.ellipse(bx,by+2,24,6,0,0,Math.PI*2);actCx.fillStyle='#d87050';actCx.fill();}
  actCx.restore();
  // Food falls from above pet toward bowl
  if(foodType==='apple')drawAppleFall(t,px,py,bx,by);
  else if(foodType==='chicken')drawChickenFall(t,px,py,bx,by);
  else drawFishFall(t,px,py,bx,by);
  // Steam
  if(t>0.65){for(let i=0;i<3;i++){const st2=t-0.65-i*.07;if(st2<0)continue;const sa=Math.max(0,0.45-st2*.6);actCx.save();actCx.globalAlpha=sa;actCx.beginPath();actCx.arc(bx+(i-1)*16,by-st2*68,5+st2*9,0,Math.PI*2);actCx.fillStyle='rgba(255,255,255,0.4)';actCx.fill();actCx.restore();}}
}

function drawAppleFall(t,px,py,bx,by){
  const ft=Math.min(easeOut3(t*2.1),1);
  const fy=(py-55)+(by-14-(py-55))*ft;
  const al=ft<0.85?1:Math.max(0,1-(ft-0.85)/0.15);if(al<=0)return;
  actCx.save();actCx.globalAlpha=al;
  const r=24;
  const ag=actCx.createRadialGradient(bx-r*.3,fy-r*.3,r*.08,bx,fy,r);
  ag.addColorStop(0,'#ff8888');ag.addColorStop(.4,'#e02828');ag.addColorStop(1,'#8a0808');
  actCx.beginPath();actCx.arc(bx,fy,r,0,Math.PI*2);actCx.fillStyle=ag;actCx.fill();
  actCx.beginPath();actCx.ellipse(bx-r*.28,fy-r*.24,r*.28,r*.18,0,0,Math.PI*2);actCx.fillStyle='rgba(255,255,255,.46)';actCx.fill();
  actCx.beginPath();actCx.arc(bx,fy-r+3,4,0,Math.PI*2);actCx.fillStyle='#9a1010';actCx.fill();
  actCx.beginPath();actCx.moveTo(bx,fy-r+2);actCx.lineTo(bx+3,fy-r-11);actCx.strokeStyle='#3a1a00';actCx.lineWidth=2.5;actCx.stroke();
  actCx.beginPath();actCx.moveTo(bx+3,fy-r-11);actCx.quadraticCurveTo(bx+18,fy-r-21,bx+14,fy-r-9);actCx.quadraticCurveTo(bx+8,fy-r-7,bx+3,fy-r-11);actCx.fillStyle='#38a018';actCx.fill();
  actCx.restore();
}

function drawChickenFall(t,px,py,bx,by){
  const ft=Math.min(easeOut3(t*2.1),1);
  const fy=(py-55)+(by-14-(py-55))*ft;
  const al=ft<0.85?1:Math.max(0,1-(ft-0.85)/0.15);if(al<=0)return;
  actCx.save();actCx.globalAlpha=al;
  actCx.translate(bx,fy);actCx.rotate(0.45);
  // Handle/bone
  actCx.beginPath();actCx.rect(-4,8,8,24);actCx.fillStyle='#f0e8d0';actCx.fill();
  actCx.beginPath();actCx.arc(0,34,7,0,Math.PI*2);actCx.fillStyle='#e8e0c0';actCx.fill();
  // Meat body
  const mg=actCx.createRadialGradient(-5,-6,3,0,0,20);
  mg.addColorStop(0,'#f8c080');mg.addColorStop(.4,'#d07030');mg.addColorStop(1,'#9a3e10');
  actCx.beginPath();actCx.ellipse(0,0,20,18,0,0,Math.PI*2);actCx.fillStyle=mg;actCx.fill();
  actCx.beginPath();actCx.ellipse(-6,-7,8,5,-0.3,0,Math.PI*2);actCx.fillStyle='rgba(255,210,120,.55)';actCx.fill();
  actCx.strokeStyle='rgba(100,40,0,0.3)';actCx.lineWidth=2;
  actCx.beginPath();actCx.moveTo(-12,-3);actCx.lineTo(12,4);actCx.stroke();
  actCx.beginPath();actCx.moveTo(-10,5);actCx.lineTo(10,11);actCx.stroke();
  actCx.restore();
}

function drawFishFall(t,px,py,bx,by){
  const ft=Math.min(easeOut3(t*2.1),1);
  const fy=(py-55)+(by-14-(py-55))*ft;
  const al=ft<0.85?1:Math.max(0,1-(ft-0.85)/0.15);if(al<=0)return;
  actCx.save();actCx.globalAlpha=al;actCx.translate(bx,fy);
  const fg=actCx.createLinearGradient(-22,-8,22,8);
  fg.addColorStop(0,'#70d0f8');fg.addColorStop(.5,'#2898d8');fg.addColorStop(1,'#0858a8');
  actCx.beginPath();actCx.moveTo(-22,0);actCx.bezierCurveTo(-22,-13,12,-13,22,0);actCx.bezierCurveTo(12,13,-22,13,-22,0);actCx.fillStyle=fg;actCx.fill();
  actCx.beginPath();actCx.moveTo(-22,0);actCx.lineTo(-36,-13);actCx.lineTo(-36,13);actCx.closePath();actCx.fillStyle='#1878b0';actCx.fill();
  actCx.strokeStyle='rgba(0,70,140,0.28)';actCx.lineWidth=1;
  [-12,-4,4,12].forEach(i=>{actCx.beginPath();actCx.arc(i,0,7,Math.PI*.2,Math.PI*.8);actCx.stroke();});
  actCx.beginPath();actCx.arc(15,-3,4.5,0,Math.PI*2);actCx.fillStyle='#fff';actCx.fill();
  actCx.beginPath();actCx.arc(15.5,-3,2.8,0,Math.PI*2);actCx.fillStyle='#1a1a1a';actCx.fill();
  actCx.beginPath();actCx.arc(16,-4,1.1,0,Math.PI*2);actCx.fillStyle='#fff';actCx.fill();
  actCx.beginPath();actCx.ellipse(2,-5,8,4,-0.3,0,Math.PI*2);actCx.fillStyle='rgba(255,255,255,0.4)';actCx.fill();
  actCx.restore();
}

function drawPlay(t,{x:px,y:py},playType){
  const orbitR=Math.min(innerWidth,innerHeight)*0.16;
  const speed=playType==='frisbee'?3.2:4.2;
  const angle=t*Math.PI*speed;
  const orbitX=orbitR*Math.min(t*3.5,1);
  const orbitY=orbitR*0.38*Math.min(t*3.5,1);

  if(playType==='frisbee'){
    const fx=px+Math.cos(angle)*orbitX;
    const fy=py-22+Math.sin(angle)*orbitY;
    // Ground shadow
    actCx.save();actCx.globalAlpha=.12;actCx.beginPath();actCx.ellipse(fx,py+82,18,5,0,0,Math.PI*2);actCx.fillStyle='#000';actCx.fill();actCx.restore();
    // Frisbee (perspective tilt)
    actCx.save();actCx.translate(fx,fy);actCx.rotate(angle*1.6);
    const tilt=0.28+Math.abs(Math.sin(angle))*.14;actCx.scale(1,tilt);
    const fdg=actCx.createRadialGradient(-8,-4,2,0,0,26);
    fdg.addColorStop(0,'#a0e0ff');fdg.addColorStop(.5,'#2090e0');fdg.addColorStop(1,'#0040a0');
    actCx.beginPath();actCx.arc(0,0,26,0,Math.PI*2);actCx.fillStyle=fdg;actCx.fill();
    actCx.beginPath();actCx.arc(0,0,26,0,Math.PI*2);actCx.strokeStyle='rgba(255,255,255,.52)';actCx.lineWidth=3;actCx.stroke();
    actCx.beginPath();actCx.arc(0,0,14,0,Math.PI*2);actCx.strokeStyle='rgba(255,255,255,.28)';actCx.lineWidth=2;actCx.stroke();
    actCx.beginPath();actCx.ellipse(-8,-8,9,5,-0.4,0,Math.PI*2);actCx.fillStyle='rgba(255,255,255,.42)';actCx.fill();
    actCx.restore();
    // Sparkle trail
    for(let i=1;i<=3;i++){const ta=angle-i*.18;const tx=px+Math.cos(ta)*orbitX;const ty=py-22+Math.sin(ta)*orbitY;actCx.save();actCx.globalAlpha=0.22/i;actCx.beginPath();actCx.arc(tx,ty,5-i,0,Math.PI*2);actCx.fillStyle='#80c0ff';actCx.fill();actCx.restore();}
    // Spark when near pet
    const dist=Math.sqrt((fx-px)**2+(fy-py)**2);
    if(dist<50){const sa=(50-dist)/50;actCx.save();actCx.globalAlpha=sa*.7;for(let i=0;i<5;i++){const a=i*Math.PI*2/5+angle;actCx.beginPath();actCx.moveTo(px+Math.cos(a)*18,py+Math.sin(a)*18);actCx.lineTo(px+Math.cos(a)*35,py+Math.sin(a)*35);actCx.strokeStyle='#80c8ff';actCx.lineWidth=2;actCx.stroke();}actCx.restore();}

  } else {
    // Ball orbits around pet with bounce
    const bx=px+Math.cos(angle)*orbitX;
    const bounce=Math.abs(Math.sin(angle*2))*32;
    const by=py-16+Math.sin(angle)*orbitY-bounce;
    const rot=t*Math.PI*14;
    // Shadow on "ground"
    actCx.save();actCx.globalAlpha=.18*Math.max(0.2,1-bounce/32);actCx.beginPath();actCx.ellipse(bx,py+82,20,5,0,0,Math.PI*2);actCx.fillStyle='#000';actCx.fill();actCx.restore();
    // Trail
    for(let i=1;i<=4;i++){const ta=angle-i*.14;const tx=px+Math.cos(ta)*orbitX;const tb=Math.abs(Math.sin(ta*2))*32;const ty=py-16+Math.sin(ta)*orbitY-tb;actCx.save();actCx.globalAlpha=0.06/i;actCx.beginPath();actCx.arc(tx,ty,22,0,Math.PI*2);actCx.fillStyle='#e84060';actCx.fill();actCx.restore();}
    // Ball
    actCx.save();actCx.translate(bx,by);actCx.rotate(rot);
    const bg=actCx.createRadialGradient(-8,-8,3,0,0,22);
    bg.addColorStop(0,'#ffa0a8');bg.addColorStop(.35,'#e84060');bg.addColorStop(1,'#a01030');
    actCx.beginPath();actCx.arc(0,0,22,0,Math.PI*2);actCx.fillStyle=bg;actCx.fill();
    actCx.strokeStyle='rgba(140,8,24,.35)';actCx.lineWidth=2;
    actCx.beginPath();actCx.moveTo(-18,0);actCx.lineTo(18,0);actCx.stroke();
    actCx.beginPath();actCx.moveTo(0,-18);actCx.lineTo(0,18);actCx.stroke();
    actCx.beginPath();actCx.ellipse(-7,-7,7,5,0,0,Math.PI*2);actCx.fillStyle='rgba(255,255,255,.42)';actCx.fill();
    actCx.restore();
    // Spark flash when ball is near pet
    const dist=Math.sqrt((bx-px)**2+(by-py)**2);
    if(dist<52){const sa=(52-dist)/52;actCx.save();actCx.globalAlpha=sa*.8;for(let i=0;i<6;i++){const a=i*Math.PI/3+angle;actCx.beginPath();actCx.moveTo(px+Math.cos(a)*18,py+Math.sin(a)*18);actCx.lineTo(px+Math.cos(a)*38,py+Math.sin(a)*38);actCx.strokeStyle='#ffe060';actCx.lineWidth=2.5;actCx.stroke();}actCx.restore();}
    // Bounce ring on ground impact
    if(bounce<4&&t>0.1){actCx.save();actCx.globalAlpha=.35;actCx.beginPath();actCx.ellipse(bx,py+80,42,10,0,0,Math.PI*2);actCx.strokeStyle='#e84060';actCx.lineWidth=2;actCx.stroke();actCx.restore();}
  }

  if(playType==='rope'){
    // Rope swings in an arc near pet
    const swing=Math.sin(t*Math.PI*5)*60*Math.min(t*4,1);
    const rx=px+swing,ry=py-30-Math.abs(Math.sin(t*Math.PI*5))*28;
    // Rope segments
    actCx.save();
    const pts=[];for(let i=0;i<=12;i++){const a=i/12;const wx=px+swing*a;const wy=py-30+Math.sin(a*Math.PI)*(-40-Math.abs(swing)*.18);pts.push([wx,wy]);}
    actCx.beginPath();actCx.moveTo(pts[0][0],pts[0][1]);
    pts.slice(1).forEach(([x,y])=>actCx.lineTo(x,y));
    actCx.strokeStyle='#c8a060';actCx.lineWidth=6;actCx.lineCap='round';actCx.lineJoin='round';actCx.stroke();
    actCx.strokeStyle='rgba(255,200,100,.45)';actCx.lineWidth=3;actCx.stroke();
    // Knots
    for(let i=2;i<=10;i+=2){const[kx,ky]=pts[i];actCx.beginPath();actCx.arc(kx,ky,5,0,Math.PI*2);actCx.fillStyle='#a07840';actCx.fill();actCx.beginPath();actCx.arc(kx,ky,3,0,Math.PI*2);actCx.fillStyle='#e0c080';actCx.fill();}
    // End handles
    actCx.beginPath();actCx.arc(pts[0][0],pts[0][1],9,0,Math.PI*2);actCx.fillStyle='#e05020';actCx.fill();
    actCx.beginPath();actCx.arc(pts[12][0],pts[12][1],9,0,Math.PI*2);actCx.fillStyle='#e05020';actCx.fill();
    // Star sparks when swinging fast
    if(Math.abs(swing)>42){const sa=Math.min((Math.abs(swing)-42)/18,1)*.7;actCx.globalAlpha=sa;for(let i=0;i<4;i++){const a=i*Math.PI/2+t*8;actCx.beginPath();actCx.arc(rx+Math.cos(a)*18,ry+Math.sin(a)*18,3,0,Math.PI*2);actCx.fillStyle='#ffe060';actCx.fill();}}
    actCx.restore();
  }
}

function drawSleep(t,{x:px,y:py}){
  const W=actCv.width;
  // Dark overlay fades in
  actCx.save();actCx.globalAlpha=Math.min(t*1.4,.52);actCx.fillStyle='#02010c';actCx.fillRect(0,0,W,actCv.height);actCx.restore();
  // Moon slides in from right
  const mx=W-95-(1-Math.min(easeOut3(t*2),1))*(W*.45);const my=108;
  actCx.save();actCx.globalAlpha=Math.min(t*2.5,.93);
  // Glow
  const mg=actCx.createRadialGradient(mx,my,12,mx,my,78);mg.addColorStop(0,'rgba(255,240,190,.22)');mg.addColorStop(1,'rgba(255,240,190,0)');actCx.beginPath();actCx.arc(mx,my,78,0,Math.PI*2);actCx.fillStyle=mg;actCx.fill();
  // Moon body
  const moonG=actCx.createRadialGradient(mx-12,my-12,5,mx,my,50);moonG.addColorStop(0,'#fff8e0');moonG.addColorStop(.55,'#f0e090');moonG.addColorStop(1,'#d0b840');actCx.beginPath();actCx.arc(mx,my,50,0,Math.PI*2);actCx.fillStyle=moonG;actCx.fill();
  // Crescent bite
  actCx.beginPath();actCx.arc(mx+36,my-18,40,0,Math.PI*2);actCx.fillStyle='#02010c';actCx.fill();
  // Craters
  actCx.globalAlpha*=.5;actCx.fillStyle='#d0a830';
  [{cx:-14,cy:10,r:7},{cx:-22,cy:-8,r:5},{cx:-5,cy:18,r:4}].forEach(({cx,cy,r})=>{actCx.beginPath();actCx.arc(mx+cx,my+cy,r,0,Math.PI*2);actCx.fill();});
  actCx.restore();
  // Stars twinkling in
  [[W*.12,85],[W*.28,62],[W*.44,88],[W*.62,55],[W*.18,140],[W*.52,140]].forEach(([sx,sy],i)=>{
    const sa=Math.max(0,Math.min((t-i*.09)*3,.85))*(.5+.5*Math.sin(t*5+i));
    actCx.save();actCx.globalAlpha=sa;actCx.fillStyle='#fff8e0';
    actCx.beginPath();actCx.arc(sx,sy,2.2+i*.3,0,Math.PI*2);actCx.fill();
    actCx.restore();
  });
  // ZZZ rising from pet
  if(t>0.32){
    const zt=(t-.32)/.68;
    ['Z','z','z'].forEach((ch,i)=>{
      const fa=Math.max(0,zt-i*.12)/(1-i*.12);const al=fa*(1-Math.pow(Math.max(fa-.62,0)/.38,2));if(al<=0)return;
      const zy=py-55-fa*105-i*26;const zx=px+58+i*20;const sz=34-i*9;
      actCx.save();actCx.globalAlpha=Math.max(0,al);
      actCx.font=`bold ${sz}px DM Sans,sans-serif`;actCx.fillStyle='#a0c8ff';actCx.shadowColor='#60a0ff';actCx.shadowBlur=12;
      actCx.fillText(ch,zx,zy);actCx.restore();
    });
  }
}

function drawTrain(t,{x:px,y:py}){
  const W=actCv.width;
  // Flash
  if(t<.2){actCx.save();actCx.globalAlpha=(0.2-t)/.2*.38;actCx.fillStyle='#fff8c0';actCx.fillRect(0,0,W,actCv.height);actCx.restore();}
  // Lightning bolt
  const lt=Math.min(t*4,1);
  const lx=px+18,ly=py-115;
  actCx.save();actCx.globalAlpha=lt<.5?lt*2:(1-lt)*2;
  if(actCx.globalAlpha>0.01){
    actCx.shadowColor='#ffe060';actCx.shadowBlur=28;
    const lg=actCx.createLinearGradient(lx,ly,lx,ly+155);lg.addColorStop(0,'#fff8a0');lg.addColorStop(.5,'#ffe040');lg.addColorStop(1,'#f09010');
    actCx.fillStyle=lg;actCx.beginPath();
    actCx.moveTo(lx+24,ly);actCx.lineTo(lx-13,ly+68);actCx.lineTo(lx+18,ly+68);actCx.lineTo(lx-24,ly+155);actCx.lineTo(lx+5,ly+82);actCx.lineTo(lx-18,ly+82);actCx.closePath();actCx.fill();
    actCx.globalAlpha*=.28;actCx.strokeStyle='#ffffc0';actCx.lineWidth=12;actCx.stroke();
  }
  actCx.restore();
  // Energy rings
  for(let i=0;i<4;i++){
    const rt=Math.max(0,t-i*.14);if(rt<=0||rt>.68)continue;
    actCx.save();actCx.globalAlpha=(1-rt/.68)*.48;actCx.strokeStyle=`hsl(${48+i*14},100%,${58+i*5}%)`;actCx.lineWidth=3-i*.35;
    actCx.beginPath();actCx.arc(px,py,rt*148+18,0,Math.PI*2);actCx.stroke();actCx.restore();
  }
  // Sparks
  [[lx-48,ly+28],[lx+55,ly+45],[lx-24,ly+112],[lx+34,ly+120]].forEach(([sx,sy],i)=>{
    const st=Math.max(0,t-.12-i*.06);if(st<=0||st>.58)return;
    actCx.save();actCx.globalAlpha=(.58-st)/.58;actCx.fillStyle='#ffe060';actCx.shadowColor='#ffe060';actCx.shadowBlur=12;
    actCx.translate(sx,sy);actCx.beginPath();
    for(let j=0;j<4;j++){const a=j*Math.PI/2;const r=j%2===0?13:5;actCx.lineTo(Math.cos(a)*r,Math.sin(a)*r);}
    actCx.closePath();actCx.fill();actCx.restore();
  });
}

function lightenC(h,a){const[r,g,b]=h2r(h);return`rgb(${Math.min(255,r+a)},${Math.min(255,g+a)},${Math.min(255,b+a)})`;}
function darkenC(h,a){const[r,g,b]=h2r(h);return`rgb(${Math.max(0,r-a)},${Math.max(0,g-a)},${Math.max(0,b-a)})`;}

// ─── TAP EFFECT ────────────────────────────────
function tapEffect(){
  const el=document.getElementById('pet3d');if(!el)return;
  const rc=el.getBoundingClientRect();const cx=rc.left+rc.width*.5,cy=rc.top+rc.height*.42;
  const rip=document.createElement('div');
  rip.style.cssText=`position:fixed;left:${cx}px;top:${cy}px;width:20px;height:20px;border:3px solid var(--acc2);border-radius:50%;transform:translate(-50%,-50%);pointer-events:none;z-index:700;animation:kripple .72s ease-out forwards`;
  document.body.appendChild(rip);setTimeout(()=>rip.remove(),750);
  const glw=document.createElement('div');
  glw.style.cssText=`position:fixed;left:${cx}px;top:${cy}px;width:40px;height:40px;background:radial-gradient(circle,rgba(255,179,71,.6),transparent 70%);border-radius:50%;transform:translate(-50%,-50%);pointer-events:none;z-index:699;animation:kglow .68s ease-out forwards`;
  document.body.appendChild(glw);setTimeout(()=>glw.remove(),680);
  for(let i=0;i<8;i++){const d=i*12;const ray=document.createElement('div');ray.style.cssText=`position:fixed;left:${cx}px;top:${cy}px;width:3px;height:0;background:linear-gradient(to top,var(--acc2),transparent);border-radius:2px;transform-origin:50% 100%;transform:translate(-50%,-100%) rotate(${i*45}deg);pointer-events:none;z-index:700;animation:kray .55s ease-out ${d}ms forwards`;document.body.appendChild(ray);setTimeout(()=>ray.remove(),600+d);}
  const syms=['💖','✨','🌟','💛','💫'];const sym=document.createElement('div');sym.style.cssText=`position:fixed;left:${cx}px;top:${cy}px;font-size:24px;pointer-events:none;z-index:701;animation:kheart .92s ease-out forwards`;sym.textContent=syms[Math.floor(Math.random()*5)];document.body.appendChild(sym);setTimeout(()=>sym.remove(),950);
}

// ─── TALK INTRO ────────────────────────────────
let _tioMode='normal',_tioTimer=null;

function openTalkIntro(mode){
  if(!S.pet)return;
  _tioMode=mode;
  const overlay=document.getElementById('talk-intro');
  const petEl=document.getElementById('tio-pet');
  const textEl=document.getElementById('tio-text');
  const goBtn=document.getElementById('tio-go');
  const eye=document.getElementById('tio-eyebrow');
  petEl.innerHTML=getSVG(S.pet.type,S.pet.custom,uid());
  textEl.textContent='';
  goBtn.style.display='none';
  eye.textContent=mode==='study'?'📚 Study session starting...':mode==='emotional'?'💛 Your companion is here for you...':'Your companion is calling...';
  overlay.classList.add('show');
  clearInterval(_tioTimer);
  const greets={
    normal:[`Hey ${S.user.name||'you'}! *tail wag* I'm SO happy to see you! What's on your mind today?`,`*perks up excitedly* Oh!! You're here, ${S.user.name||'friend'}! I've been waiting! Tell me everything! 💖`,`${S.user.name||'Hi'}!! *jumps happily* You have no idea how much I missed you! What's going on? 🌟`],
    study:[`*adjusts imaginary glasses* Study time! I'm ready, ${S.user.name||'friend'}! What are we mastering today? 📚`,`*pulls out tiny notebook* A scholar approaches! ${S.user.name||'Let\'s'} make learning magical today! What's the subject?`],
    emotional:[`*moves closer gently* Hey ${S.user.name||'you'}... I'm right here. No judgment, just ears. What's on your heart? 💛`,`*sits beside you quietly* ${S.user.name||'Hi'}... I noticed you chose this. I'm here. Take all the time you need. 🌸`]
  };
  const opts=greets[mode]||greets.normal;
  const txt=opts[Math.floor(Math.random()*opts.length)];
  let i=0;
  setTimeout(()=>{
    _tioTimer=setInterval(()=>{
      textEl.textContent=txt.slice(0,++i);
      if(i>=txt.length){clearInterval(_tioTimer);setTimeout(()=>{goBtn.style.display='';},380);}
    },26);
  },550);
}

function closeTalkIntro(){
  clearInterval(_tioTimer);
  document.getElementById('talk-intro').classList.remove('show');
}

function goToChat(){
  closeTalkIntro();
  setTimeout(()=>openChat(_tioMode),100);
}

// ─── DATA ──────────────────────────────────────
const PETS={cat:{name:'Cat',lore:'Ancient guardians of moonlight. Cats sense what others cannot — they hold memories in their eyes and purr the world into balance.'},dog:{name:'Dog',lore:'Born from starlight and loyalty. Dogs carry the universe\'s warmth and see only the best in every soul they meet.'},rabbit:{name:'Rabbit',lore:'Swift messengers between worlds. Rabbits carry luck in their footsteps, dream in colour, and dance at midnight when no one watches.'},dragon:{name:'Dragon',lore:'Forged in ancient volcanoes. Dragons hold the wisdom of ten thousand years — their flame reveals hidden truths.'},fox:{name:'Fox',lore:'Tricksters of the spirit world. Foxes walk between shadow and light, dancing in riddles and dreaming in colours unseen.'}};
const USER_AVATARS=['🧑','👩','👨','🧒','👦','👧','🧓','🧑‍💻','👩‍🎨','👨‍🚀','🧑‍🎤','🦸','🧙','🧝','🧚','👻','🐺','🦊','🐱','🐸','🐧','🦁','🐼','🦄','🤖','👾','🌟','🔥','⚡','🌈','💫','✨'];
const BODY_COLORS=['#d06030','#c09030','#e0d8d0','#5828b8','#c83808','#1e7040','#7040a8','#208080','#904020'];
const ACCENT_COLORS=['#f0b080','#f8e8b0','#f8f0e8','#b878ff','#f8ede0','#70c898','#c0a0e8','#60d0d0','#e0b068'];
const EYE_COLORS=['#20a0a0','#3a2010','#c03060','#30ffd0','#2a1200','#3060e0','#70c030','#d06018','#8040c8'];
const MARKINGS=['none','spots','stripes','stars','hearts'];
const ACCESSORIES=['none','bow','crown','glasses','hat','scarf'];
const TRAITS=[{id:'playful',name:'Playful',icon:'🎪',desc:'Loves games & fun'},{id:'wise',name:'Wise',icon:'🦉',desc:'Thoughtful & deep'},{id:'mischievous',name:'Mischievous',icon:'😈',desc:'Cheeky & unpredictable'},{id:'gentle',name:'Gentle',icon:'🌸',desc:'Calm & nurturing'},{id:'bold',name:'Bold',icon:'🦁',desc:'Brave & confident'},{id:'curious',name:'Curious',icon:'🔭',desc:'Always exploring'},{id:'loyal',name:'Loyal',icon:'🛡️',desc:'Fiercely devoted'},{id:'dramatic',name:'Dramatic',icon:'🎭',desc:'Expressive & vivid'}];
const EVO_RULES=[{key:'feedCount',n:8,label:'🍽️ Foodie',desc:'well-nourished'},{key:'playCount',n:10,label:'⚡ High Energy',desc:'bursting with play'},{key:'talkCount',n:15,label:'💬 Eloquent',desc:'deeply expressive'},{key:'trainCount',n:8,label:'🏆 Disciplined',desc:'focused and goal-oriented'},{key:'tapCount',n:20,label:'💖 Affectionate',desc:'physically expressive'},{key:'studyCount',n:6,label:'🎓 Scholar',desc:'intellectually curious'},{key:'eCount',n:6,label:'🌟 Empathic',desc:'emotionally intelligent'}];
const BOND_LEVELS=[{level:0,label:'Strangers',pts:0},{level:1,label:'Acquainted',pts:5},{level:2,label:'Friendly',pts:15},{level:3,label:'Friends',pts:30},{level:4,label:'Close',pts:50},{level:5,label:'Bonded',pts:75},{level:6,label:'Trusted',pts:110},{level:7,label:'Soulmates',pts:160},{level:8,label:'Inseparable',pts:220},{level:9,label:'Eternal Bond',pts:300}];
const FX_STATS={feed:{hap:12,eng:6,hun:28,bond:2},play:{hap:22,eng:-18,hun:-6,bond:3},sleep:{hap:6,eng:34,hun:-4,bond:1},train:{hap:8,eng:-22,hun:-10,bond:2}};
const MOOD_MSGS={ecstatic:["I'm SO happy! ✨","Best day EVER!!!","Heart is overflowing! 💖"],happy:["Life is so good! ☀️","Feeling wonderful~","Everything's perfect 🌸"],content:["Just enjoying the moment...","Peaceful and content 😊","All is well~"],hungry:["Feed me... please? 🍎","My tummy is SO empty!","Starving!! 😫 Feed me!!"],tired:["Too tired... 😪","Can't keep my eyes open...","Please let me sleep 💤"],bored:["Want to play? 🎮","Let's do something!","Getting restless..."],sad:["I miss you when you're away...","A little lonely 💙","Need some attention~"]};

// ─── STATE ─────────────────────────────────────
const SKEY='kira_v5';
let S={user:{name:'',avatar:'🧑'},design:{type:'cat',color:'#f08030',name:'',traits:[],spiritWord:'',homeWorld:'Enchanted Forest',bornTime:'dusk',custom:{body:'#d06030',accent:'#f0b080',eye:'#20a0a0',marking:'none',accessory:'none'}},pet:null};
let chatMode='normal',currentUser=null;
function save(){try{localStorage.setItem(SKEY,JSON.stringify(S));}catch(e){}}
function load(){try{const d=localStorage.getItem(SKEY);if(d)S={...S,...JSON.parse(d)};}catch(e){}}
let supa=null;
async function initSupa(){try{const r=await fetch('http://localhost:3000/api/config');const cfg=await r.json();if(cfg.supabaseUrl&&cfg.supabaseKey){supa=window.supabase.createClient(cfg.supabaseUrl,cfg.supabaseKey);const{data:{session}}=await supa.auth.getSession();if(session)await afterAuth(session.user);}}catch(e){}}
async function savePetCloud(){if(!supa||!currentUser||!S.pet)return;try{await supa.from('pets').upsert({user_id:currentUser.id,data:S.pet,updated_at:new Date().toISOString()});}catch(e){}}
async function loadPetCloud(){if(!supa||!currentUser)return null;try{const{data}=await supa.from('pets').select('data').eq('user_id',currentUser.id).single();return data?.data||null;}catch(e){return null;}}
async function saveProfileCloud(n,a){if(!supa||!currentUser)return;try{await supa.from('profiles').upsert({id:currentUser.id,name:n,avatar:a});}catch(e){}}
async function loadProfileCloud(){if(!supa||!currentUser)return null;try{const{data}=await supa.from('profiles').select('name,avatar').eq('id',currentUser.id).single();return data;}catch(e){return null;}}
async function afterAuth(user){currentUser=user;const p=await loadProfileCloud();if(p){S.user.name=p.name;S.user.avatar=p.avatar||'🧑';}const pd=await loadPetCloud();if(pd)S.pet=pd;save();}

function showScreen(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById('screen-'+id).classList.add('active');}

// ─── AUTH ──────────────────────────────────────
let selAvatar='🧑';
function switchAuthTab(tab){['signin','signup'].forEach(t=>{document.getElementById('tab-'+t).classList.toggle('active',t===tab);document.getElementById('form-'+t).classList.toggle('hidden',t!==tab);});}
function initAvatarGrid(){document.getElementById('av-grid').innerHTML=USER_AVATARS.map(a=>`<div class="av-btn ${a===selAvatar?'sel':''}" onclick="pickAv('${a}')">${a}</div>`).join('');}
function pickAv(a){selAvatar=a;document.querySelectorAll('.av-btn').forEach(b=>b.classList.toggle('sel',b.textContent===a));}
async function doSignUp(){
  const name=document.getElementById('su-name').value.trim(),email=document.getElementById('su-email').value.trim(),pass=document.getElementById('su-pass').value;
  if(!name){toast('⚠️ Enter your name');return;}if(!email||!pass){toast('⚠️ Enter email and password');return;}if(pass.length<6){toast('⚠️ Password needs 6+ chars');return;}
  if(!supa){S.user={name,avatar:selAvatar};save();if(S.pet){applyColor(S.pet.color);renderMain();showScreen('main');}else{showScreen('design');initDesign();}return;}
  const{data,error}=await supa.auth.signUp({email,password:pass});if(error){toast('❌ '+error.message);return;}
  currentUser=data.user;S.user={name,avatar:selAvatar};await saveProfileCloud(name,selAvatar);save();toast('✅ Account created!');
  if(S.pet){applyColor(S.pet.color);renderMain();showScreen('main');}else{showScreen('design');initDesign();}
}
async function doSignIn(){
  const email=document.getElementById('si-email').value.trim(),pass=document.getElementById('si-pass').value;
  if(!email||!pass){toast('⚠️ Enter email and password');return;}if(!supa){toast('⚠️ Use Sign Up for demo mode');return;}
  const{data,error}=await supa.auth.signInWithPassword({email,password:pass});if(error){toast('❌ '+error.message);return;}
  await afterAuth(data.user);if(S.pet){applyColor(S.pet.color);renderMain();showScreen('main');}else{showScreen('design');initDesign();}
}
async function doLogout(){if(supa)await supa.auth.signOut();currentUser=null;S={...S,pet:null,user:{name:'',avatar:'🧑'}};localStorage.removeItem(SKEY);closeMod();showScreen('auth');toast('👋 Signed out');}

// ─── DESIGN ────────────────────────────────────
function initDesign(){
  document.getElementById('ptgrid').innerHTML=Object.entries(PETS).map(([id,p])=>`<div class="ptcard" id="ptc-${id}" onclick="selType('${id}')"><div class="ptcard-svg">${getSVG(id,{},uid())}</div><span class="ptname">${p.name}</span></div>`).join('');
  document.getElementById('cgrid').innerHTML=BODY_COLORS.slice(0,6).map(c=>`<div class="cswatch" id="cs-${c.slice(1)}" style="background:${c}" onclick="selAura('${c}')"></div>`).join('');
  document.getElementById('trgrid').innerHTML=TRAITS.map(t=>`<div class="trcard" id="tc-${t.id}" onclick="selTrait('${t.id}')"><span class="trico">${t.icon}</span><div><div class="trname">${t.name}</div><div class="trdesc">${t.desc}</div></div></div>`).join('');
  buildDesignPers();
  S.design={...S.design,type:'cat',color:'#f08030',name:'',traits:[]};
  selType('cat');selAura('#f08030');
}
function buildDesignPers(){
  const c=S.design.custom;
  document.getElementById('dbc').innerHTML=BODY_COLORS.map(col=>`<div class="cswatch ${col===c.body?'sel':''}" style="background:${col}" onclick="dPick('body','${col}')"></div>`).join('');
  document.getElementById('dac').innerHTML=ACCENT_COLORS.map(col=>`<div class="cswatch ${col===c.accent?'sel':''}" style="background:${col}" onclick="dPick('accent','${col}')"></div>`).join('');
  document.getElementById('deye').innerHTML=EYE_COLORS.map(col=>`<div class="cswatch ${col===c.eye?'sel':''}" style="background:${col};width:32px;height:32px" onclick="dPick('eye','${col}')"></div>`).join('');
  document.getElementById('dmrk').innerHTML=MARKINGS.map(m=>`<div class="opt-btn ${m===c.marking?'sel':''}" onclick="dPick('marking','${m}')">${m==='none'?'None':m[0].toUpperCase()+m.slice(1)}</div>`).join('');
  document.getElementById('dacc').innerHTML=ACCESSORIES.map(a=>`<div class="opt-btn ${a===c.accessory?'sel':''}" onclick="dPick('accessory','${a}')">${a==='none'?'None':a[0].toUpperCase()+a.slice(1)}</div>`).join('');
}
// Design step picker — uses design-specific grid IDs (dbc, dac, etc.)
function dPick(field,val){
  S.design.custom[field]=val;
  updSelD(field,val);
  const pv=document.getElementById('dpv-svg');if(pv)pv.innerHTML=getSVG(S.design.type,S.design.custom,uid());
}
function updSelD(field,val){
  const map={body:'dbc',accent:'dac',eye:'deye',marking:'dmrk',accessory:'dacc'};
  const gid=map[field];if(!gid)return;
  document.querySelectorAll(`#${gid} .cswatch,#${gid} .opt-btn`).forEach(el=>{
    const isMatch=el.style.background===val||el.style.background===`rgb(${h2r(val).join(', ')})`||el.textContent.toLowerCase()===val||(val==='none'&&el.textContent==='None');
    el.classList.toggle('sel',isMatch);
  });
}
function selType(id){S.design.type=id;document.querySelectorAll('.ptcard').forEach(c=>c.classList.remove('sel'));document.getElementById('ptc-'+id)?.classList.add('sel');document.getElementById('ptlore').textContent=PETS[id].lore;}
function selAura(hex){S.design.color=hex;applyColor(hex);document.querySelectorAll('#cgrid .cswatch').forEach(s=>s.classList.remove('sel'));document.getElementById('cs-'+hex.slice(1))?.classList.add('sel');}
function applyColor(hex){const[r,g,b]=h2r(hex);document.documentElement.style.setProperty('--acc',hex);document.documentElement.style.setProperty('--acc2',lighten(hex,22));document.documentElement.style.setProperty('--glow',`rgba(${r},${g},${b},0.3)`);}
function selTrait(id){const idx=S.design.traits.indexOf(id);if(idx>-1){S.design.traits.splice(idx,1);document.getElementById('tc-'+id)?.classList.remove('sel');}else if(S.design.traits.length<3){S.design.traits.push(id);document.getElementById('tc-'+id)?.classList.add('sel');}else{toast('⚠️ Max 3 traits');return;}document.querySelectorAll('.trcard').forEach(c=>{c.classList.toggle('dis',!S.design.traits.includes(c.id.replace('tc-',''))&&S.design.traits.length>=3);});document.getElementById('trc').textContent=`${S.design.traits.length} / 3`;document.getElementById('cbtn').disabled=S.design.traits.length<3;}
function goStep(n){
  if(n===1&&!S.design.type){toast('⚠️ Choose a companion');return;}
  if(n===2){const nm=document.getElementById('pname').value.trim();if(!nm){toast('⚠️ Give your companion a name');return;}S.design.name=nm;S.design.spiritWord=document.getElementById('spiritword').value.trim();S.design.homeWorld=document.getElementById('homeworld').value;S.design.bornTime=document.getElementById('borntime').value;}
  if(n===3&&S.design.traits.length<3){toast('⚠️ Select 3 traits first');return;}
  if(n===3){const nm=document.getElementById('pname').value.trim();if(nm)S.design.name=nm;document.getElementById('dpv-name').textContent=S.design.name||'?';document.getElementById('dpv-svg').innerHTML=getSVG(S.design.type,S.design.custom,uid());}
  document.querySelectorAll('.dstep').forEach(s=>s.classList.remove('active'));document.getElementById('ds'+n).classList.add('active');
  document.querySelectorAll('.sdot').forEach((d,i)=>{d.classList.remove('active','done');if(i<n)d.classList.add('done');if(i===n)d.classList.add('active');});
}
function createPet(){
  const now=Date.now();
  S.pet={name:S.design.name,type:S.design.type,color:S.design.color,custom:{...S.design.custom},baseTraits:[...S.design.traits],evolvedTraits:[],spiritWord:S.design.spiritWord,homeWorld:S.design.homeWorld,bornTime:S.design.bornTime,stats:{hap:72,eng:80,hun:65},bond:{pts:0,level:0},beh:{feedCount:0,playCount:0,talkCount:0,trainCount:0,tapCount:0,studyCount:0,eCount:0},mem:{convos:[],milestones:[],lastInter:now},born:now,lastDecay:now};
  addMile(`🎉 ${S.pet.name} was summoned!`);addBond(5);applyColor(S.design.color);renderMain();showScreen('main');save();savePetCloud();
  setTimeout(()=>toast(`✨ Welcome, ${S.pet.name}!`),400);
}

// ─── EDIT PET — event-delegation, data-val attributes (no hex-compare bugs) ─
function showEditPet(){
  if(!S.pet)return;
  // Working copy stored on the modal element itself (avoids any global-null race)
  const ec={...S.pet.custom};

  function row(label,field,items){
    const cells=items.map(({val,display,color})=>{
      const isSel=val===ec[field];
      if(color){
        return `<div class="cswatch${isSel?' sel':''}" style="background:${color}" data-field="${field}" data-val="${val}" title="${val}"></div>`;
      }
      return `<div class="opt-btn${isSel?' sel':''}" data-field="${field}" data-val="${val}">${display}</div>`;
    }).join('');
    const isSmall=field==='eye';
    return `<div><div class="pers-sec-t">${label}</div><div class="${isSmall?'mkgrid':'cgrid'}" data-grid="${field}">${cells}</div></div>`;
  }

  const html=`
    <div class="mo-title">✏️ Customize ${S.pet.name}</div>
    <div class="personalize-wrap">
      <div class="pers-preview">
        <div style="width:190px;height:208px" id="epv"></div>
        <div style="font-family:var(--fd);font-style:italic;font-size:var(--fb1);color:var(--acc2);text-align:center;margin-top:6px">${S.pet.name}</div>
      </div>
      <div class="pers-controls">
        ${row('🎨 Body','body',BODY_COLORS.map(c=>({val:c,color:c})))}
        ${row('✨ Accent','accent',ACCENT_COLORS.map(c=>({val:c,color:c})))}
        ${row('👁️ Eyes','eye',EYE_COLORS.map(c=>({val:c,color:c})))}
        ${row('🖌️ Markings','marking',MARKINGS.map(m=>({val:m,display:m==='none'?'None':m[0].toUpperCase()+m.slice(1)})))}
        ${row('👑 Accessory','accessory',ACCESSORIES.map(a=>({val:a,display:a==='none'?'None':a[0].toUpperCase()+a.slice(1)})))}
      </div>
    </div>
    <button class="btn btn-p" style="width:100%;font-size:var(--fb1);padding:16px" id="edit-apply-btn">✦ Apply Changes</button>`;

  showMod(html);

  // Render initial preview
  const pvEl=document.getElementById('epv');
  if(pvEl) pvEl.innerHTML=getSVG(S.pet.type,ec,uid());

  // Single event listener — handles ALL picker clicks + apply button
  const modal=document.getElementById('modal');
  modal.addEventListener('click',function(e){
    // Apply button
    if(e.target.id==='edit-apply-btn'||e.target.closest('#edit-apply-btn')){
      S.pet.custom={...ec};
      const el=document.getElementById('pet3d');
      if(el) el.innerHTML=getSVG(S.pet.type,S.pet.custom,uid());
      save(); savePetCloud(); closeMod(); toast('✨ Appearance updated!');
      return;
    }
    // Swatch / option button
    const sw=e.target.closest('[data-field][data-val]');
    if(!sw) return;
    const field=sw.dataset.field, val=sw.dataset.val;
    ec[field]=val;
    // Highlight selected in that grid
    const grid=modal.querySelector(`[data-grid="${field}"]`);
    if(grid) grid.querySelectorAll('[data-field]').forEach(el=>el.classList.toggle('sel',el.dataset.val===val));
    // Refresh preview
    const pv=document.getElementById('epv');
    if(pv) pv.innerHTML=getSVG(S.pet.type,ec,uid());
  });
}

// ─── PET ENGINE ────────────────────────────────
function decay(){if(!S.pet)return;const m=(Date.now()-S.pet.lastDecay)/60000;if(m<1)return;const d=Math.floor(m);S.pet.stats.hap=clamp(S.pet.stats.hap-d*.5);S.pet.stats.eng=clamp(S.pet.stats.eng-d*.3);S.pet.stats.hun=clamp(S.pet.stats.hun-d*.8);S.pet.lastDecay=Date.now();save();}
function clamp(v){return Math.min(100,Math.max(0,v));}
function checkGates(a){if(a==='play'&&S.pet.stats.eng<15){setBubble("I'm too tired to play 😪 Let me sleep first...");toast('😴 Too tired!');return false;}if(a==='feed'&&S.pet.stats.hun>90){setBubble("I'm already full! 😊 Maybe later?");return false;}return true;}
// ─── FOOD + PLAY PICKERS ──────────────────────
const FOOD_OPTS=[
  {id:'apple',emoji:'🍎',name:'Apple',desc:'+28 Hunger\n+10 Happy',hun:28,hap:10,eng:2},
  {id:'chicken',emoji:'🍗',name:'Chicken',desc:'+18 Hunger\n+14 Energy',hun:18,hap:6,eng:14},
  {id:'fish',emoji:'🐟',name:'Fish',desc:'+22 Hunger\n+8 Happy',hun:22,hap:8,eng:4}
];
const PLAY_OPTS=[
  {id:'ball',emoji:'⚽',name:'Ball',desc:'+22 Happy\n-15 Energy'},
  {id:'frisbee',emoji:'🥏',name:'Frisbee',desc:'+25 Happy\n-18 Energy'},
  {id:'rope',emoji:'🪢',name:'Rope',desc:'+20 Happy\n-12 Energy'}
];

function showActionPicker(type){
  hidePicker();
  const petEl=document.getElementById('pet3d');if(!petEl)return;
  const r=petEl.getBoundingClientRect();
  const cx=r.left+r.width/2,cy=r.top;
  const items=type==='feed'?FOOD_OPTS:PLAY_OPTS;
  const title=type==='feed'?'What shall we eat?':'How shall we play?';
  const picker=document.getElementById('action-picker');
  picker.style.display='block';
  const pw=316;
  let left=cx-pw/2;
  left=Math.max(10,Math.min(left,window.innerWidth-pw-10));
  let top=cy-240;top=Math.max(80,Math.min(top,window.innerHeight-280));
  picker.style.cssText=`display:block;position:fixed;left:${left}px;top:${top}px;width:${pw}px;z-index:300;`;
  picker.innerHTML=`<div class="picker-inner">
    <div class="picker-title">${title}</div>
    <div class="picker-row">${items.map(it=>`<div class="pick-item" onclick="execPickerAction('${type}','${it.id}')"><div class="pick-emoji">${it.emoji}</div><div class="pick-name">${it.name}</div><div class="pick-desc">${it.desc}</div></div>`).join('')}</div>
    <button class="pick-cancel" onclick="hidePicker()">Not now</button>
  </div>`;
  setTimeout(()=>document.addEventListener('click',_closePickerOuter,{capture:true,once:true}),120);
}
function _closePickerOuter(e){
  const p=document.getElementById('action-picker');
  if(p&&p.contains(e.target)){setTimeout(()=>document.addEventListener('click',_closePickerOuter,{capture:true,once:true}),180);}
  else hidePicker();
}
function hidePicker(){
  const p=document.getElementById('action-picker');
  if(p){p.style.display='none';p.innerHTML='';}
  document.removeEventListener('click',_closePickerOuter,{capture:true});
}
function execPickerAction(type,itemId){
  hidePicker();
  if(type==='feed'){
    const food=FOOD_OPTS.find(f=>f.id===itemId);if(!food||!S.pet||!checkGates('feed'))return;
    S.pet.stats.hap=clamp(S.pet.stats.hap+food.hap);S.pet.stats.eng=clamp(S.pet.stats.eng+food.eng);S.pet.stats.hun=clamp(S.pet.stats.hun+food.hun);
    addBond(FX_STATS.feed.bond);S.pet.beh.feedCount++;checkMiles('feed');checkEvo();
    setBubble(['Yummy!! 😋','Thank you! *licks lips*','More please? '+food.emoji][Math.floor(Math.random()*3)]);
    runAnim('feed',itemId);animatePet();updateStats();updateActionBtns();save();savePetCloud();
    toast('Fed '+S.pet.name+' with '+food.name+'!');
  } else if(type==='play'){
    const play=PLAY_OPTS.find(p=>p.id===itemId);if(!play||!S.pet||!checkGates('play'))return;
    S.pet.stats.hap=clamp(S.pet.stats.hap+FX_STATS.play.hap);S.pet.stats.eng=clamp(S.pet.stats.eng+FX_STATS.play.eng);S.pet.stats.hun=clamp(S.pet.stats.hun+FX_STATS.play.hun);
    addBond(FX_STATS.play.bond);S.pet.beh.playCount++;checkMiles('play');checkEvo();
    setBubble(['SO fun!! 🎮','*zooms excitedly*','Wheee!! '+play.emoji][Math.floor(Math.random()*3)]);
    runAnim('play',itemId);animatePet();updateStats();updateActionBtns();save();savePetCloud();
    toast('Played with '+S.pet.name+'!');
  }
}

// ─── BOND LEVEL VISUAL UPGRADES ─────────────
function renderBondFx(level){
  const wrap=document.getElementById('bond-fx-wrap');if(!wrap)return;
  wrap.innerHTML='';wrap.style.animation='';
  if(level<3)return;
  // Level 3+: floating emoji around pet
  const syms=['💖','✨','💕','🌟'];
  const cnt=Math.min(level-2,4);
  for(let i=0;i<cnt;i++){
    const el=document.createElement('div');
    el.style.cssText=`position:absolute;font-size:${14+i*2}px;animation:bondFloat${Math.min(i,3)} ${2.4+i*.42}s ease-in-out infinite;animation-delay:${i*.55}s;left:${[14,76,7,80][i]}%;bottom:${[36,50,60,30][i]}%;pointer-events:none;`;
    el.textContent=syms[i];wrap.appendChild(el);
  }
  // Level 5+: gold halo
  if(level>=5){const halo=document.createElement('div');halo.className='bond-halo';wrap.appendChild(halo);}
  // Level 7+: crown
  if(level>=7){const cr=document.createElement('div');cr.style.cssText=`position:absolute;top:5%;left:50%;font-size:${26+Math.min(level-7,2)*5}px;animation:bondCrown 2.2s ease-in-out infinite;pointer-events:none;`;cr.textContent='👑';wrap.appendChild(cr);}
  // Level 9: legendary rainbow aura
  if(level>=9){
    wrap.style.animation='legendaryRainbow 4s linear infinite';
    const aura=document.createElement('div');
    aura.style.cssText=`position:absolute;inset:-25px;border-radius:50%;background:radial-gradient(circle,rgba(120,60,255,.18) 0%,rgba(255,120,60,.08) 40%,transparent 70%);pointer-events:none;`;
    wrap.insertBefore(aura,wrap.firstChild);
  }
}
function getBondUpgradeMsg(lv){return{1:'A spark of friendship!',3:'💕 Hearts are floating!',5:'👑 Golden bond!',7:'💎 Legendary connection!',9:'🌟 ETERNAL BOND!'}[lv]||'Growing closer...';}

function doAction(a){
  if(!S.pet)return;
  if(a==='feed'){if(!checkGates('feed'))return;showActionPicker('feed');return;}
  if(a==='play'){if(!checkGates('play'))return;showActionPicker('play');return;}
  if(!checkGates(a))return;
  const f=FX_STATS[a];S.pet.stats.hap=clamp(S.pet.stats.hap+f.hap);S.pet.stats.eng=clamp(S.pet.stats.eng+f.eng);S.pet.stats.hun=clamp(S.pet.stats.hun+f.hun);
  addBond(f.bond);if(S.pet.beh[a+'Count']!==undefined)S.pet.beh[a+'Count']++;
  checkMiles(a);checkEvo();
  const msgs={sleep:['Zzzzz... 💤','*drifts off peacefully*','So cozy~'],train:['Getting stronger! ⚡','*focuses intensely*','No pain no gain! 💪']};
  setBubble(msgs[a][Math.floor(Math.random()*msgs[a].length)]);
  runAnim(a);
  animatePet();updateStats();updateActionBtns();save();savePetCloud();
  toast({sleep:'Rested',train:'Trained'}[a]+' '+S.pet.name+'!');
}
function petTap(){if(!S.pet)return;S.pet.beh.tapCount++;addBond(1);const r=['*purrs softly* 💜','*nuzzles you*','I love you! ❤️','*happy wiggles*','Hehe~ 🌟'];setBubble(r[Math.floor(Math.random()*r.length)]);tapEffect();checkEvo();updateStats();save();}
function getMood(){const{hap,eng,hun}=S.pet.stats;if(hun<12)return'hungry';if(eng<12)return'tired';if(hap>=90)return'ecstatic';if(hap<30)return'sad';if(hap<50)return'bored';if(hap>=70)return'happy';return'content';}
function setBubble(t){const e=document.getElementById('mbub');if(e){e.style.animation='none';e.textContent=t;void e.offsetWidth;e.style.animation='bpop .3s ease';}}
function autoBubble(){if(!S.pet)return;if(S.pet.stats.hun<12){setBubble("I'm starving! 😫 Please feed me!! 🍎");return;}if(S.pet.stats.eng<12){setBubble("So tired... 😴 Can we rest please?");return;}const ms=MOOD_MSGS[getMood()]||MOOD_MSGS.content;setBubble(ms[Math.floor(Math.random()*ms.length)]);}
function addBond(p){if(!S.pet)return;S.pet.bond.pts+=p;const nL=BOND_LEVELS.filter(b=>b.pts<=S.pet.bond.pts).length-1;if(nL>S.pet.bond.level){S.pet.bond.level=nL;const li=BOND_LEVELS[nL];addMile(`💖 Bond: "${li.label}" (Lv${nL})`);setTimeout(()=>{evoFlash();renderBondFx(nL);showBondLevelUp(nL);},200);}updateBond();}

// ─── BOND LEVEL UP POPUP ─────────────────────
const BOND_UP_DATA=[
  {icon:'🌱',label:'First spark of friendship',unlock:'You can now chat more freely!'},
  {icon:'💬',label:'Getting acquainted',unlock:'Your pet grows more expressive'},
  {icon:'💕',label:'Hearts are floating!',unlock:'New floating hearts appear!'},
  {icon:'✨',label:'Deeply connected',unlock:'Golden aura unlocked!'},
  {icon:'💛',label:'True friendship blooms',unlock:'Golden halo glows around your pet!'},
  {icon:'🔮',label:'A powerful bond forms',unlock:'Purple aura radiates your soul link'},
  {icon:'💎',label:'Legendary connection!',unlock:'Crown appears above your pet! 👑'},
  {icon:'🌈',label:'Rainbow soul bond!',unlock:'Rainbow shimmer aura!'},
  {icon:'🌟',label:'ETERNAL BOND!',unlock:'Maximum legendary status achieved! ∞'}
];
function showBondLevelUp(lv){
  const bd=BOND_UP_DATA[Math.min(lv-1,BOND_UP_DATA.length-1)]||{icon:'💖',label:'Growing closer',unlock:''};
  const li=BOND_LEVELS[Math.min(lv,9)];
  const popup=document.getElementById('bond-lvup-popup');
  const bk=document.getElementById('bond-lvup-backdrop');
  document.getElementById('blvup-icon').textContent=bd.icon;
  document.getElementById('blvup-title').textContent='Bond Level Up!';
  document.getElementById('blvup-badge').textContent=`${li.label}  •  Level ${lv}`;
  document.getElementById('blvup-label').textContent=bd.label;
  document.getElementById('blvup-unlock').textContent=bd.unlock;
  // Spawn particles
  const pc=document.getElementById('blvup-particles');pc.innerHTML='';
  const cols=['#ffb347','#f08030','#ff6eb0','#60e8ff','#c0ff80','#ffe060'];
  for(let i=0;i<22;i++){const el=document.createElement('div');el.className='blvup-part';const a=Math.random()*Math.PI*2,d=80+Math.random()*130;el.style.cssText=`left:50%;top:50%;background:${cols[i%cols.length]};--tx:${Math.cos(a)*d}px;--ty:${Math.sin(a)*d}px;animation-delay:${Math.random()*.35}s;animation-duration:${0.9+Math.random()*.6}s;width:${5+Math.random()*6}px;height:${5+Math.random()*6}px;`;pc.appendChild(el);}
  bk.classList.add('show');
  popup.classList.remove('out');popup.style.display='none';
  void popup.offsetWidth;
  popup.classList.add('show');
  popup.style.display='block';
}
function closeBondPopup(){
  const popup=document.getElementById('bond-lvup-popup');
  const bk=document.getElementById('bond-lvup-backdrop');
  popup.classList.add('out');
  bk.classList.remove('show');
  setTimeout(()=>{popup.classList.remove('show','out');popup.style.display='none';},480);
}
function updateBond(){if(!S.pet)return;const li=BOND_LEVELS[Math.min(S.pet.bond.level,9)];const e1=document.getElementById('blv'),e2=document.getElementById('bdesc');if(e1)e1.textContent=S.pet.bond.level;if(e2)e2.textContent=` • ${li.label}`;}
function checkEvo(){if(!S.pet)return;EVO_RULES.forEach(r=>{if((S.pet.beh[r.key]||0)>=r.n&&!S.pet.evolvedTraits.includes(r.label)){S.pet.evolvedTraits.push(r.label);addMile(`✨ Evolved: ${r.label}`);evoFlash();toast(`✨ ${S.pet.name} evolved: ${r.label}`);renderTraits();}});}
function checkMiles(a){const b=S.pet.beh;({feed:[[1,'🍎 First meal!'],[5,'🌱 Fed 5x'],[20,'🌳 20 meals!']],play:[[1,'🎮 First play!'],[5,'🎉 Played 5x']],train:[[1,'⚡ First training!']],sleep:[[1,'😴 First rest']]}[a]||[]).forEach(([n,msg])=>{if(b[a+'Count']===n)addMile(msg);});}
function addMile(t){if(!S.pet)return;S.pet.mem.milestones.push({text:t,time:Date.now()});if(S.pet.mem.milestones.length>30)S.pet.mem.milestones=S.pet.mem.milestones.slice(-30);}
function evoFlash(){const f=document.createElement('div');f.className='eflash';document.body.appendChild(f);setTimeout(()=>f.remove(),1600);}
function animatePet(){const el=document.getElementById('pet3d');if(!el)return;el.style.animation='none';el.style.transform='scale(1.18)';setTimeout(()=>{el.style.transform='';el.style.animation='float 4s ease-in-out infinite';},240);}
function updateActionBtns(){if(!S.pet)return;const pb=document.getElementById('act-play');if(pb)pb.classList.toggle('dis',S.pet.stats.eng<15);}

// ─── MAIN RENDER ───────────────────────────────
function renderMain(){
  if(!S.pet)return;
  document.getElementById('mu').textContent=S.user.name;
  document.getElementById('m-av').textContent=S.user.avatar||'🧑';
  document.getElementById('mpname').textContent=S.pet.name;
  const days=Math.floor((Date.now()-S.pet.born)/86400000);
  document.getElementById('mage').textContent=days===0?'✨ Born today':`${days} day${days>1?'s':''} old`;
  document.getElementById('pet3d').innerHTML=getSVG(S.pet.type,S.pet.custom,uid());
  applyColor(S.pet.color);setBackground(S.pet);
  decay();updateStats();updateBond();renderTraits();autoBubble();updateActionBtns();
  renderBondFx(S.pet.bond.level);
  clearInterval(window._di);window._di=setInterval(()=>{decay();updateStats();autoBubble();updateActionBtns();},30000);
}
function updateStats(){if(!S.pet)return;const{hap,eng,hun}=S.pet.stats;[['sfh',hap],['sfe',eng],['sfn',hun]].forEach(([id,v])=>{const el=document.getElementById(id);if(el)el.style.width=v+'%';});[['svh',hap],['sve',eng],['svn',hun]].forEach(([id,v])=>{const el=document.getElementById(id);if(el)el.textContent=Math.round(v);});}
function renderTraits(){if(!S.pet)return;const el=document.getElementById('mtraits');if(!el)return;const sp=S.pet.spiritWord?`<span class="ttag spirit">✦ ${S.pet.spiritWord}</span>`:'';const base=S.pet.baseTraits.map(id=>{const t=TRAITS.find(x=>x.id===id);return t?`<span class="ttag">${t.icon} ${t.name}</span>`:''}).join('');const evol=S.pet.evolvedTraits.map(l=>`<span class="ttag ev">${l}</span>`).join('');el.innerHTML=sp+base+evol;}

// ─── AI CHAT ───────────────────────────────────
function buildPrompt(mode){const p=S.pet,pi=PETS[p.type];const bn=p.baseTraits.map(id=>{const t=TRAITS.find(x=>x.id===id);return t?t.name:id;});const bl=BOND_LEVELS[Math.min(p.bond.level,9)];const miles=p.mem.milestones.slice(-5).map(m=>m.text).join(' | ')||'Just born';const mc=mode==='study'?'\nMODE: Study Guide — Be a warm tutor, stay in character.':mode==='emotional'?'\nMODE: Emotional Support — Listen, validate, be nurturing.':'';return`You are ${p.name}, a ${pi.name} digital companion. Never break character, never say you're AI.\nWorld: ${p.homeWorld||'ether'} | Spirit: ${p.spiritWord||'Brave'} | Traits: ${bn.join(', ')} | Evolved: ${p.evolvedTraits.join(', ')||'none'} | Mood: ${getMood()} | Bond: ${bl.label} Lv${p.bond.level}/9\nHappy ${Math.round(p.stats.hap)}% | Energy ${Math.round(p.stats.eng)}% | Hunger ${Math.round(p.stats.hun)}%\n${miles}${mc}\n1-3 sentences max. Actions in *italics*. 1-2 emojis. Bond ${p.bond.level<3?'= shy/curious':p.bond.level<6?'= warm friend':'= deeply bonded'}.`;}
async function callClaude(msg, mode) {
  S.pet.beh.talkCount++;

  if (mode === 'study')
    S.pet.beh.studyCount = (S.pet.beh.studyCount || 0) + 1;

  if (mode === 'emotional')
    S.pet.beh.eCount = (S.pet.beh.eCount || 0) + 1;

  addBond(2);
  checkEvo();

  // Separate memories per mode
  if (!S.pet.mem.talk) S.pet.mem.talk = [];
  if (!S.pet.mem.study) S.pet.mem.study = [];
  if (!S.pet.mem.emotional) S.pet.mem.emotional = [];

  const history = S.pet.mem[mode] || [];

  const msgs = [
    ...history.slice(-8),
    { role: 'user', content: msg }
  ];

  try {
    const res = await fetch("http://localhost:3000/api/chat", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },

      // send mode instead of frontend prompt
      body: JSON.stringify({
        messages: msgs,
        mode: mode
      })
    });

    const d = await res.json();

    const reply =
      d.reply ||
      d.content?.[0]?.text ||
      '...';

    history.push(
      { role: 'user', content: msg },
      { role: 'assistant', content: reply }
    );

    if (history.length > 24)
      history.splice(0, history.length - 24);

    S.pet.stats.hap = clamp(S.pet.stats.hap + 4);

    save();
    savePetCloud();
    updateStats();

    return reply;

  } catch (e) {
    return "Connection error.";
  }
}

function openChat(mode='normal'){
  if(!S.pet)return;chatMode=mode;
  document.getElementById('cname').textContent=S.pet.name;
  const bl=BOND_LEVELS[Math.min(S.pet.bond.level,9)];
  document.getElementById('cstatus').textContent=`${bl.label} • Lv${S.pet.bond.level}`;
  const badge=document.getElementById('cmbadge');
  if(mode==='study'){badge.className='cmode-badge cmode-study';badge.textContent='📚 Study Mode';badge.style.display='';}
  else if(mode==='emotional'){badge.className='cmode-badge cmode-emo';badge.textContent='💛 Emotional Support';badge.style.display='';}
  else badge.style.display='none';
  const hdrPet=document.getElementById('chdr-pet');if(hdrPet)hdrPet.innerHTML=getSVG(S.pet.type,S.pet.custom,uid());
  const cm=document.getElementById('cmsgs');cm.innerHTML='';
  const moodAct={ecstatic:'zooms excitedly',happy:'wags tail warmly',content:'stretches and smiles',hungry:'stomach growls quietly',tired:'yawns softly',bored:'paws gently at screen',sad:'looks up with big eyes'};
  const wm=mode==='study'?`Let's study, ${S.user.name||'friend'}! What are we learning? 📚`:mode==='emotional'?(S.pet.bond.level<3?`Hello... *moves closer gently* I'm here. 💛`:`${S.user.name||'hey'}... *nuzzles softly* I'm listening. 💛`):(S.pet.bond.level<2?`Nice to meet you! 🌟`:S.pet.bond.level<5?`${S.user.name||'hey'}! I missed you! 💙`:`${S.user.name||'hey'}!! My favourite person!! 💖`);
  addMsg('pet',`*${moodAct[getMood()]||'tilts head'}* ${wm}`);
  scrollMsgs();showScreen('chat');setTimeout(()=>document.getElementById('cinp').focus(),200);autoBubble();
}
function addMsg(role,text,anim=true){const cm=document.getElementById('cmsgs');const d=document.createElement('div');d.className=`msg ${role}`;if(!anim)d.style.animation='none';const av=role==='pet'?`<div class="msg-av-pet">${getSVG(S.pet.type,S.pet.custom,uid())}</div>`:`<div class="msg-av">${S.user.avatar||'👤'}</div>`;d.innerHTML=`${av}<div class="mbub">${text}</div>`;cm.appendChild(d);if(anim)scrollMsgs();}
function showTyping(){const cm=document.getElementById('cmsgs');const d=document.createElement('div');d.id='typing';d.className='typing-ind';d.innerHTML=`<div class="msg-av-pet">${getSVG(S.pet.type,S.pet.custom,uid())}</div><div class="tdots"><div class="tdot"></div><div class="tdot"></div><div class="tdot"></div></div>`;cm.appendChild(d);scrollMsgs();}
function hideTyping(){document.getElementById('typing')?.remove();}
function scrollMsgs(){const sc=document.getElementById('chat-scroll');if(sc)sc.scrollTop=sc.scrollHeight;}
async function sendMsg(){
  const inp=document.getElementById('cinp');
  const btn=document.getElementById('csend');
  const txt=inp.value.trim();
  if(!txt||btn.disabled)return;

  inp.value='';
  btn.disabled=true;
  addMsg('user',txt);
  showTyping();

  try{
    const reply=await callClaude(txt,chatMode);
    hideTyping();
    addMsg('pet',reply);
    setBubble(reply);
  }catch(e){
    hideTyping();
    addMsg('pet','*static hiss* ...connection wavered...');
  }

  btn.disabled=false;
  inp.focus();
  scrollMsgs();
}
function backToMain(){renderMain();showScreen('main');}

// ─── MODALS ────────────────────────────────────
function showJournal(){const p=S.pet;const miles=p.mem.milestones.slice(-8).reverse();const mHtml=miles.length?miles.map(m=>`<div class="memitem"><strong>${m.text}</strong><br>${new Date(m.time).toLocaleDateString('en-IN',{day:'numeric',month:'short'})}</div>`).join(''):`<div style="color:var(--muted)">No memories yet. Spend time together!</div>`;showMod(`<div class="mo-title">📖 ${p.name}'s Story</div><div style="font-size:var(--fsm);color:var(--muted);font-style:italic">${p.spiritWord?`"${p.spiritWord}" • `:''}From ${p.homeWorld||'the ether'} • Born at ${p.bornTime||'dusk'}</div><div class="stat-cnt"><div class="sci"><div class="sci-n">${p.beh.feedCount||0}</div><div class="sci-l">Fed</div></div><div class="sci"><div class="sci-n">${p.beh.playCount||0}</div><div class="sci-l">Played</div></div><div class="sci"><div class="sci-n">${p.beh.talkCount||0}</div><div class="sci-l">Talked</div></div><div class="sci"><div class="sci-n">${(p.beh.studyCount||0)+(p.beh.eCount||0)}</div><div class="sci-l">Guided</div></div></div><div style="font-size:var(--fsm);font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--muted)">Milestones</div><div style="display:flex;flex-direction:column;gap:8px">${mHtml}</div>`);}
function showSettings(){showMod(`<div class="mo-title">⚙️ Settings</div>${currentUser?`<div style="font-size:var(--fb1);color:var(--muted)">Signed in as <strong style="color:var(--acc2)">${S.user.name}</strong> ${S.user.avatar||''}</div>`:''}<button class="btn btn-p" style="width:100%" onclick="doLogout()">👋 Sign Out</button><div class="divider"></div><button class="btn" style="width:100%;color:var(--bad);border:1px solid var(--bad);background:transparent" onclick="confirmReset()">⚠️ Reset Everything</button>`);}
function confirmReset(){closeMod();setTimeout(()=>showMod(`<div class="mo-title" style="color:var(--bad)">⚠️ Reset?</div><p style="color:var(--muted);line-height:1.6">Permanently deletes ${S.pet?.name||'your companion'} and all memories.</p><div style="display:flex;gap:10px;margin-top:8px"><button class="btn btn-g" style="flex:1" onclick="closeMod()">Cancel</button><button class="btn btn-p" style="flex:1;background:var(--bad)" onclick="doReset()">Delete Forever</button></div>`),100);}
function doReset(){localStorage.removeItem(SKEY);if(supa&&currentUser)supa.from('pets').delete().eq('user_id',currentUser.id);location.reload();}
function showMod(html){closeMod();const ov=document.createElement('div');ov.className='mov';ov.id='modal';ov.innerHTML=`<div class="moc">${html}</div>`;ov.addEventListener('click',e=>{if(e.target===ov)closeMod();});document.body.appendChild(ov);}
function closeMod(){document.getElementById('modal')?.remove();}

// ─── TOAST + INIT ──────────────────────────────
let _tt;function toast(msg){const el=document.getElementById('toast');el.textContent=msg;el.classList.add('show');clearTimeout(_tt);_tt=setTimeout(()=>el.classList.remove('show'),2800);}
async function init(){load();initAvatarGrid();await initSupa();setTimeout(()=>document.getElementById('loader').classList.add('gone'),400);if(S.pet&&S.user.name){applyColor(S.pet.color);decay();renderMain();showScreen('main');}else if(S.user.name&&!S.pet){showScreen('design');initDesign();}else showScreen('auth');}
init();