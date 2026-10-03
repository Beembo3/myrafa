const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const store={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};
// fresh start every time the page opens: she has to explore again to unlock the secret
try{["letters","visited","surprise"].forEach(k=>localStorage.removeItem(k))}catch{}
const START=new Date(2026,7,3); // August 3, 2026
const PASSCODE="0803";
const music=$("#bgMusic");

/* ===== EDIT YOUR CONTENT HERE ===== */
const TIMELINE=[
 ["First Conversation","January 9, 2026","Write what you remember about the very first time we talked.","assets/photos/1.jpg"],
 ["First Call","April 28, 2026","The call I didn't want to end."],
 ["First Date","March 6, 2026","The day I knew I wanted more days like it.","assets/photos/2.jpg"],
 ["First \"I Love You\"","June 24, 2026","Three words that changed everything."],
 ["First Monthsary","September 3, 2026","One month of choosing each other."],
 ["Special Moments","Always","The little days that became my favorites."],
 ["Anniversary","August 3, 2026 (11:45 PM)","Here we are. And I'd do it all again."]];
const LETTERS=[
 ["My Appreciation Letter",`To My Baby Rafa ❤️

Thank you for being my peace, my comfort, my best friend, and the greatest blessing that entered my life.

You make ordinary days feel special.
You make difficult days easier.
And somehow, you always make my heart feel at home.

I know life becomes heavy sometimes. I know there are days when you feel tired, stressed, and overwhelmed.

But I hope you always remember that I am proud of you. Not only because of your achievements, but because of who you are.

Thank you for staying.
Thank you for loving me.
Thank you for being my baby.

I will keep choosing you. Today. Tomorrow. And every day after that.

To infinity and beyond.

Love,
Kevin ❤️`],
 ["What I Love About You","I love your smile, your heart, and the way you care. I love how you make me feel safe, understood, and loved. Most of all, I love you for being you.\n\nKevin ❤️"],
 ["My Promise To You","I promise to keep choosing you, supporting you, and being proud of you. Through the good days and the difficult ones, I'll always be here.\n\nKevin ❤️"],
 ["Our Future Together","I look forward to more memories, more adventures, more milestones, and more days with you. My favorite future will always be the one that has you in it.\n\nKevin ❤️"],
 ["The Secret Letter","Thank you for staying, loving me, and choosing me every day. You'll always be my baby, my girlfriend, my best friend. To infinity and beyond.\n\nKevin ❤️"]];
const PHOTOS={"Our Selfies":[1,2],"Random Memories":[3,4],"Special Days":[5],"Favorite Pictures":[6]};
const REASONS = [
  "Because you stayed.",
  "Because you always try your best.",
  "Because you make me feel at home.",
  "Because you're my favorite person.",
  "Because you make ordinary days feel special.",
  "Because I can be myself around you.",
  "Because you understand me.",
  "Because you're patient with me.",
  "Because you listen to my random thoughts.",
  "Because you're strong even when life gets hard.",
  "Because you never give up easily.",
  "Because you care so much for the people you love.",
  "Because you're passionate about what you do.",
  "Because your smile can fix my day.",
  "Because hearing your voice makes me feel okay.",
  "Because you're my peace.",
  "Because you're my comfort.",
  "Because you're my best friend.",
  "Because I love talking to you.",
  "Because I love listening to your stories.",
  "Because even your little updates make me happy.",
  "Because you're worth waiting for.",
  "Because you're worth choosing every day.",
  "Because you make me want to become better.",
  "Because you're always more than enough.",
  "Because I admire how hardworking you are.",
  "Because you still keep going even when you're tired.",
  "Because you're genuine.",
  "Because you're thoughtful.",
  "Because you're kind.",
  "Because you're beautiful inside and out.",
  "Because I feel safe with you.",
  "Because you make me feel loved.",
  "Because you make me feel important.",
  "Because I can see my future with you.",
  "Because I trust you.",
  "Because I can laugh with you.",
  "Because I can cry with you.",
  "Because I can be vulnerable with you.",
  "Because you never make me feel alone.",
  "Because your happiness matters to me.",
  "Because your dreams matter to me.",
  "Because seeing you succeed makes me proud.",
  "Because seeing you smile makes me happy.",
  "Because I love the way you care.",
  "Because I love the way you love.",
  "Because you became my favorite hello.",
  "Because you're my favorite notification.",
  "Because you're my baby.",
  "Because you're you."
];

const MSGS = [
  "Thank you for choosing to stay, even through the days that weren't always easy.",
  "I see how much effort you put into everything, and I'll always be proud of you for trying.",
  "Being with you gives me a kind of comfort that feels like home.",
  "Out of everyone in this world, you're still the person I'd choose to spend my time with.",
  "Even the simplest moments become memories I want to keep when I'm with you.",
  "I never feel like I have to pretend around you. I can just be me.",
  "You understand parts of me that I sometimes struggle to explain.",
  "Thank you for being patient with me, especially during the moments when I'm difficult to understand.",
  "I love that I can tell you the most random things and somehow you still listen.",
  "I admire how you keep standing even when things become heavy.",
  "Even when things don't go your way, you somehow find the strength to continue.",
  "The way you care about the people you love says so much about how beautiful your heart is.",
  "I love seeing how much heart you put into the things that matter to you.",
  "Sometimes all it takes is seeing your smile to make everything feel a little lighter.",
  "Your voice has this way of calming me down and making me feel like everything will be okay.",
  "In a world that can feel overwhelming, you're one of the places where my mind feels calm.",
  "You're the person I want beside me whenever life feels a little too heavy.",
  "You're not just the person I love. You're also the person I genuinely enjoy having beside me.",
  "I could talk to you for hours and somehow still have more things I want to tell you.",
  "I love hearing about your day, your thoughts, your stories, and even the smallest things you want to share.",
  "Even a simple update from you can instantly make my day better.",
  "No matter how long something takes, you're someone I would patiently wait for.",
  "Loving you isn't something I only choose once. It's something I'd choose again and again.",
  "Being with you makes me want to grow into someone who's even better for you and for myself.",
  "I hope you always remember that you never have to prove your worth to me. You're already more than enough.",
  "I notice how hard you work, even when nobody else sees all the effort behind it.",
  "Even when you're exhausted, you still find a way to move forward, and I'm always proud of you for that.",
  "I love that what I get from you is real. Your feelings, your personality, and simply who you are.",
  "The little things you remember and the small ways you show you care mean more to me than you probably realize.",
  "Your kindness is one of those things about you that I hope the world never changes.",
  "The way you treat people with warmth and kindness will always be something I admire about you.",
  "Of course you're beautiful to me, but it's your heart and the person you are that make you even more beautiful.",
  "I know I can open my heart to you and still feel protected, understood, and accepted.",
  "You make me feel loved not only through words, but through all the little things you do.",
  "You make me feel like my thoughts, feelings, and presence genuinely matter to you.",
  "When I imagine the days ahead, you're naturally someone I hope will still be there beside me.",
  "Trusting someone means giving them a vulnerable part of yourself, and I'm glad that person is you.",
  "I love that we can be stupid together, laugh at random things, and just enjoy being ourselves.",
  "You're one of the few people I don't feel like I have to hide my tears from.",
  "With you, I don't always have to act strong. I know I can show you the softer parts of me too.",
  "Even when you're not physically beside me, somehow your presence still makes me feel less alone.",
  "Your happiness will always matter to me because seeing you genuinely happy makes my heart happy too.",
  "I want to see you reach the things you've been dreaming about, and I'll always be cheering for you.",
  "Every achievement, big or small, makes me proud because I know how much effort you put into getting there.",
  "Your smile is honestly one of my favorite things to see.",
  "The way you care is one of those little things that constantly reminds me why I love you.",
  "You have your own beautiful way of loving, and I'm thankful that I get to experience it.",
  "Somehow, you became the person I always look forward to seeing and talking to.",
  "Seeing your name pop up on my screen will probably never stop making me smile.",
  "You're my baby, and taking care of your heart will always mean something special to me.",
  "I don't need one specific reason to love you. Sometimes the best reason is simply that you're you."
];
const NOTES=["Baby, drink water muna.", "Proud ako sayo palagi.", "Pahinga ka muna kung pagod ka na.", "You don't have to figure everything out today.", "One step at a time, baby.", "Thank you for staying.", "I'm always here for you.", "You are more than enough.", "Please don't be too hard on yourself.", "I'm lucky to have you.", "Your efforts never go unnoticed.", "Kaya mo 'yan, baby.", "I believe in you.", "You're doing better than you think.", "I love you. Always."];
const SECS=["welcome","counter","appreciation","timeline","letters","memories","reasons","notes","future"];
let visited=new Set(store.get("visited",[]));
/* ================================== */

/* loader */
const hideLoader=()=>{const l=$("#loader");if(!l)return;l.style.pointerEvents="none";l.style.opacity=0;setTimeout(()=>l.remove(),800)};
setTimeout(hideLoader,1800);          // doesn't wait for fonts/images/audio
$("#loader").onclick=hideLoader;      // tap to skip

/* petals */
const pc=$("#petals");
setInterval(()=>{const p=document.createElement("div");p.className="petal";p.textContent=["🌸","🌹","🌺","🌷"][Math.random()*4|0];
 p.style.left=Math.random()*100+"vw";p.style.fontSize=14+Math.random()*16+"px";p.style.animationDuration=9+Math.random()*8+"s";pc.appendChild(p);setTimeout(()=>p.remove(),17500)},700);

/* theme */
const setTheme=t=>{document.documentElement.dataset.theme=t;$("#themeBtn").textContent=t==="dark"?"☀️":"🌙";store.set("theme",t)};
setTheme(store.get("theme",matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"));
$("#themeBtn").onclick=()=>setTheme(document.documentElement.dataset.theme==="dark"?"light":"dark");

/* music */
let playing=false;
const setMusic=on=>{playing=on;$("#musicBtn").textContent=on?"⏸ Pause":"🎵 Music";on?music.play().catch(()=>{playing=false;$("#musicBtn").textContent="🎵 Music"}):music.pause()};
$("#musicBtn").onclick=()=>setMusic(!playing);

/* gate 1 */
function unlock(){
 const code=$("#passcode").value.trim();
 if(code===PASSCODE){$("#errorText").textContent="";$("#lock").hidden=true;$("#gate2").hidden=false;setMusic(true)}
 else{$("#errorText").textContent="Hmm baby, try again ❤️"}}
$("#unlockBtn").addEventListener("click",unlock);
$("#passcode").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();unlock()}});

/* gate 2: dodging No */
const no=$("#noBtn"),yes=$("#yesBtn");let tries=0;
const lines=["Nice try 😏","Are you sure, baby?","The button is shy 🙈","Wrong one, love!","Oops, it ran away","You can't catch it 😂","Think about it again ❤️","Okay okay, just press Yes 🥺","It's getting smaller, look!","I'll wait forever, you know."];
function dodge(e){
 e&&e.preventDefault();tries++;
 $("#noMsg").textContent=lines[(tries-1)%lines.length];
 no.classList.add("run");
 const w=innerWidth-no.offsetWidth-20,h=innerHeight-no.offsetHeight-20;
 no.style.left=10+Math.random()*w+"px";no.style.top=10+Math.random()*h+"px";
 no.style.transform=`scale(${Math.max(.45,1-tries*.07)})`;
 yes.style.transform=`scale(${Math.min(1.6,1+tries*.07)})`;
 if(tries%5===0){no.classList.remove("run");$("#yesno").prepend(no)} // swaps sides
}
["mouseenter","touchstart","click"].forEach(ev=>no.addEventListener(ev,dodge,{passive:false}));
yes.onclick=()=>{$("#gate2").hidden=true;$("#main").hidden=false;scrollTo(0,0);confetti(120);startMain()};

/* counter */
function tick(){
 const n=new Date(),ms=Math.max(0,n-START),s=Math.floor(ms/1000),d=Math.floor(s/86400);
 let m=(n.getFullYear()-START.getFullYear())*12+n.getMonth()-START.getMonth();if(n.getDate()<START.getDate())m--;
 $("#cDays").textContent=d;$("#cWeeks").textContent=Math.floor(d/7);$("#cMonths").textContent=Math.max(0,m);
 const p=x=>String(x).padStart(2,"0");
 $("#clock").textContent=`${p(Math.floor(s/3600)%24)}h : ${p(Math.floor(s/60)%60)}m : ${p(s%60)}s`}
setInterval(tick,1000);tick();

/* timeline */
$("#timeline").innerHTML=TIMELINE.map(([t,d,txt,img])=>`<li><button class="glass" aria-expanded="false"><small>${d}</small><b>${t}</b><div class="tl-body"><div><p>${txt}</p>${img?`<img src="${img}" alt="" loading="lazy">`:""}</div></div></button></li>`).join("");
$$("#timeline button").forEach(b=>b.onclick=()=>{const o=b.parentElement.classList.toggle("open");b.setAttribute("aria-expanded",o)});

/* letters */
let opened=new Set(store.get("letters",[])),marks=new Set(store.get("marks",[])),cur=0,typingId=0;
function secretReady(){
 if(store.get("secretUnlocked",false))return true;   // once unlocked, stays unlocked
 const ok=LETTERS.slice(0,-1).every((_,i)=>opened.has(i))&&visited.size>=SECS.length;
 if(ok)store.set("secretUnlocked",true);
 return ok}
function shelf(){
 $("#shelf").innerHTML=LETTERS.map(([t],i)=>{const sec=i===LETTERS.length-1,lock=sec&&!secretReady();
  return `<button class="glass env ${opened.has(i)?"read":""}" data-i="${i}" ${lock?"disabled":""}><i>${lock?"🔒":opened.has(i)?"📖":"💌"}</i>${t}${marks.has(i)?" 🔖":""}</button>`}).join("");
 $$(".env").forEach(b=>b.onclick=()=>read(+b.dataset.i))}
function read(i){
 cur=i;opened.add(i);store.set("letters",[...opened]);
 const paper=$("#paper");paper.hidden=false;paper.style.animation="none";paper.offsetHeight;paper.style.animation="";
 $("#paperTitle").textContent=LETTERS[i][0];$("#markBtn").classList.toggle("on",marks.has(i));
 paper.scrollIntoView({behavior:"smooth",block:"center"});
 const id=++typingId,txt=LETTERS[i][1],el=$("#typed");el.textContent="";let k=0;
 (function t(){if(id!==typingId)return;if(k<txt.length){el.textContent+=txt[k++];if(k%40===0)hearts(1);setTimeout(t,28)}else{shelf();progress()}})();
 shelf();progress()}
$("#markBtn").onclick=()=>{marks.has(cur)?marks.delete(cur):marks.add(cur);store.set("marks",[...marks]);$("#markBtn").classList.toggle("on",marks.has(cur));shelf()};
function hearts(n){for(let i=0;i<n;i++){const h=document.createElement("div");h.className="petal";h.textContent="❤️";h.style.left=Math.random()*100+"vw";h.style.top="100vh";h.style.animationDuration="6s";h.style.animationName="rise";pc.appendChild(h);setTimeout(()=>h.remove(),6000)}}
document.head.insertAdjacentHTML("beforeend","<style>@keyframes rise{to{transform:translateY(-115vh) rotate(20deg)}}</style>");

/* memory box */
function gallery(cat){
 $$("#tabs button").forEach(b=>b.classList.toggle("on",b.dataset.c===cat));
 $("#gallery").innerHTML=PHOTOS[cat].map(n=>`<button class="polaroid"><img src="assets/photos/${n}.jpg" alt="${cat}, photo ${n}" loading="lazy"><span>Our Memory #${n}</span></button>`).join("");
 $$(".polaroid").forEach(p=>p.onclick=()=>{$("#lbImg").src=p.querySelector("img").src;$("#lightbox").hidden=false})}
$("#tabs").innerHTML=Object.keys(PHOTOS).map(c=>`<button data-c="${c}">${c}</button>`).join("");
$$("#tabs button").forEach(b=>b.onclick=()=>gallery(b.dataset.c));gallery("Our Selfies");
$("#closeLb").onclick=()=>$("#lightbox").hidden=true;
$("#lightbox").onclick=e=>{if(e.target.id==="lightbox")$("#lightbox").hidden=true};
$("#lightbox").hidden=true;
addEventListener("keydown",e=>e.key==="Escape"&&($("#lightbox").hidden=true));

/* reasons */
$("#reasons").innerHTML=REASONS.map((r,i)=>`<button class="rc" aria-label="Reason ${i+1}: ${r}"><div><span class="f">${r}</span><span class="b">${MSGS[i%MSGS.length]}</span></div></button>`).join("");
$$(".rc").forEach(c=>c.onclick=()=>c.classList.toggle("flip"));

/* notes wall (draggable) */
const cols=["#ffd9de","#fff0b8","#d8f0e0","#e0e0ff","#ffe0c2"];
NOTES.forEach((t,i)=>{const n=document.createElement("div");n.className="note";n.textContent=t;n.style.background=cols[i%5];
 n.style.left=(i%4)*24+2+"%";n.style.top=Math.floor(i/4)*150+20+"px";n.style.transform=`rotate(${(Math.random()*10-5).toFixed(1)}deg)`;n.tabIndex=0;$("#wall").appendChild(n);
 let dx,dy;n.onpointerdown=e=>{n.setPointerCapture(e.pointerId);dx=e.clientX-n.offsetLeft;dy=e.clientY-n.offsetTop;n.style.zIndex=Date.now()%100000;n.style.cursor="grabbing"};
 n.onpointermove=e=>{if(!n.hasPointerCapture(e.pointerId))return;const w=$("#wall");
  n.style.left=Math.min(w.clientWidth-n.offsetWidth,Math.max(0,e.clientX-dx))+"px";n.style.top=Math.min(w.clientHeight-n.offsetHeight,Math.max(0,e.clientY-dy))+"px"};
 n.onpointerup=()=>n.style.cursor="grab"});

/* progress + surprise */
function progress(){
 const l=LETTERS.slice(0,-1).filter((_,i)=>opened.has(i)).length,ok=secretReady();
 $("#progress").textContent=ok?"Everything explored. It's ready ❤️":`Explored ${visited.size}/${SECS.length} sections · Read ${l}/${LETTERS.length-1} letters`;
 const b=$("#surpriseBtn");b.disabled=!ok;b.textContent=ok?"Open Your Surprise ❤️":"🔒 Locked";
 if(ok&&store.get("surprise",false))showFinal(false)}
function showFinal(fx=true){$("#final").hidden=false;$("#surpriseBtn").hidden=true;store.set("surprise",true);if(fx){confetti(200);fireworks();$("#final").scrollIntoView({behavior:"smooth"})}}
$("#surpriseBtn").onclick=()=>showFinal();

function startMain(){
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&e.target.dataset.sec&&SECS.includes(e.target.dataset.sec)){visited.add(e.target.dataset.sec);store.set("visited",[...visited]);progress();shelf()}}),{threshold:.1});
 $$("[data-sec]").forEach(s=>io.observe(s));shelf();progress()}
$$("[data-go]").forEach(b=>b.onclick=()=>document.getElementById(b.dataset.go).scrollIntoView({behavior:"smooth"}));

/* confetti + fireworks */
const cv=$("#fx"),cx=cv.getContext("2d");let parts=[],run=false;
const fit=()=>{cv.width=innerWidth;cv.height=innerHeight};fit();addEventListener("resize",fit);
function confetti(n){for(let i=0;i<n;i++)parts.push({x:innerWidth/2,y:innerHeight/2,vx:(Math.random()-.5)*14,vy:-Math.random()*14-2,g:.25,c:`hsl(${Math.random()*40+330},80%,${60+Math.random()*20}%)`,s:4+Math.random()*5,l:120});loop()}
function fireworks(){let k=0;const t=setInterval(()=>{const x=Math.random()*innerWidth,y=Math.random()*innerHeight*.5+40,h=Math.random()*60+320;
 for(let i=0;i<60;i++){const a=Math.PI*2*i/60,v=3+Math.random()*3;parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,g:.05,c:`hsl(${h},90%,70%)`,s:3,l:70})}loop();if(++k>8)clearInterval(t)},500)}
function loop(){if(run)return;run=true;(function f(){cx.clearRect(0,0,cv.width,cv.height);
 parts=parts.filter(p=>p.l-->0);parts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;cx.globalAlpha=Math.min(1,p.l/30);cx.fillStyle=p.c;cx.fillRect(p.x,p.y,p.s,p.s)});
 parts.length?requestAnimationFrame(f):(run=false,cx.clearRect(0,0,cv.width,cv.height))})()}

/* render letters + progress on load so they never depend on another step */
shelf();progress();
