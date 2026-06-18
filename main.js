const pages = ['home','story','reasons','favorites','gallery','notes','appreciation','future','hidden','counter','proposal'];
const pageLabels = ['Home','Story','Reasons','Favorites','Gallery','Notes','Appreciation','Future','Hidden','Counter','The Question'];

// Build page dots
const dotsWrap = document.getElementById('pageDots');
pages.forEach((p, i) => {
  const dot = document.createElement('div');
  dot.className = 'page-dot' + (i === 0 ? ' active' : '');
  dot.title = pageLabels[i];
  dot.onclick = () => showPage(p);
  dotsWrap.appendChild(dot);
});

const secrets = [
  "I think about you more than I'd like to admit 🌸",
  "Talking to you is my favorite part of the day",
  "You make my heart do something funny ✨",
  "I smile at my phone because of you 😊",
  "You're the person I want to tell everything to",
  "I hope you know how special you are to me 🌷",
  "Even when I'm quiet, I'm thinking of you",
  "You're the kind of person I don't want to lose",
  "Every moment with you is a memory I keep 🌙",
  "My heart chose you before my mind did",
];

const reasons = [
  { icon:'😊', text:'Your smile', desc:'It stops me mid-thought every single time.' },
  { icon:'💡', text:'Your intelligence', desc:'The way your mind works is genuinely fascinating.' },
  { icon:'🎵', text:'Your taste', desc:'You introduced me to things I now love.' },
  { icon:'🤝', text:'Your loyalty', desc:"When you're in, you're all in. That's rare." },
  { icon:'😄', text:'Your humor', desc:'Nobody makes me laugh the way you do.' },
  { icon:'💬', text:'Your honesty', desc:'You say what you mean. I trust you because of it.' },
  { icon:'🤗', text:'Your warmth', desc:"I feel safe around you." },
  { icon:'🌟', text:'Your ambition', desc:'You have dreams and you chase them. It inspires me.' },
  { icon:'🎧', text:'Your passion', desc:'The things you love, you love completely.' },
  { icon:'💪', text:'Your strength', desc:'You handle things with so much grace.' },
  { icon:'🌙', text:'Your presence', desc:'Even in silence, being near you is enough.' },
  { icon:'💝', text:'Just... you', desc:'There is nobody else like you. Nobody.' },
];

const notes = [
  { seal:'💌', msg:'You came into my life and quietly rearranged my favorite things, and now you\'re at the top of the list.' },
  { seal:'💕', msg:'I love how comfortable it feels to just be myself around you. You never make me feel like I have to perform.' },
  { seal:'💗', msg:'You don\'t even know all the moments you made me smile from across the screen.' },
  { seal:'🌸', msg:'If I could pick anyone to share my days with, I\'d pick you. Every single time.' },
  { seal:'✨', msg:'I don\'t know how to explain it except to say,  you just feel like home.' },
  { seal:'💖', msg:'There\'s a version of every future I imagine... and you\'re in all of them.' },
];

const bucket = [
  { icon:'🌃', text:'Walk through the city together at night' },
  { icon:'🎬', text:'Have our own movie marathon day' },
  { icon:'🍜', text:'Cook (or order!) our favorite comfort food together' },
  { icon:'🌅', text:'Watch a sunrise or sunset together' },
  { icon:'📸', text:'Take a hundred silly photos together' },
  { icon:'🎡', text:'Go on a cute little spontaneous adventure' },
  { icon:'💌', text:'Write each other handwritten letters' },
  { icon:'🌊', text:'Go somewhere with water and just breathe' },
  { icon:'🎶', text:'Make a playlist that\'s just ours' },
  { icon:'🌙', text:'Stay up talking until sunrise' },
  { icon:'🥐', text:'Have a slow, lazy morning together' },
  { icon:'💖', text:'Do absolutely nothing together and love it' },
];

function buildReasons() {
  const g = document.getElementById('reasonsGrid');
  reasons.forEach((r) => {
    const card = document.createElement('div');
    card.className = 'reason-card';
    card.innerHTML = `<div class="icon">${r.icon}</div><div class="reason-text">${r.text}</div><div class="reason-desc">${r.desc}</div>`;
    card.onclick = function(e) { burstHearts(e.clientX, e.clientY); };
    g.appendChild(card);
  });
}

function buildNotes() {
  const g = document.getElementById('notesGrid');
  notes.forEach((n) => {
    const env = document.createElement('div');
    env.className = 'envelope';
    env.innerHTML = `
      <div class="env-outer">
        <div class="env-flap"></div>
        <div class="env-seal">${n.seal}</div>
        <div class="env-letter">${n.msg}</div>
      </div>
      <div class="env-hint">tap to open 💌</div>
    `;
    env.onclick = function() { this.classList.toggle('open'); };
    g.appendChild(env);
  });
}

function buildBucket() {
  const g = document.getElementById('bucketGrid');
  bucket.forEach((b) => {
    const item = document.createElement('div');
    item.className = 'bucket-item';
    item.innerHTML = `<div class="bucket-emoji">${b.icon}</div><div class="bucket-check"></div><div class="bucket-text">${b.text}</div>`;
    item.onclick = function() {
      this.classList.toggle('done');
      this.querySelector('.bucket-check').textContent = this.classList.contains('done') ? '✓' : '';
    };
    g.appendChild(item);
  });
}

function showPage(name) {
  pages.forEach(p => {
    const el = document.getElementById(p);
    el.classList.remove('active');
    el.style.display = 'none';
  });

  const el = document.getElementById(name);
  el.style.display = name === 'proposal' ? 'flex' : 'block';
  el.classList.add('active');

  // Update dots
  document.querySelectorAll('.page-dot').forEach((d, i) => {
    d.classList.toggle('active', pages[i] === name);
  });

  if (name === 'proposal') startProposalAnim();
  if (name === 'home') makeHomeHearts();
  if (name === 'proposal') makeProposalHearts();
  window.scrollTo(0, 0);
}

// SVG heart variants for floating
const heartSVGs = [
  // rosy pink
  `<svg width="22" height="20" viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 18C11 18 1 11 1 5C1 2.2 3.2 1 5.5 1C7.5 1 9.5 2.5 11 5C12.5 2.5 14.5 1 16.5 1C18.8 1 21 2.2 21 5C21 11 11 18 11 18Z" fill="#e8809a" opacity="0.85"/><path d="M5 4C4 5 3.5 6.5 4 8" stroke="rgba(255,255,255,0.35)" stroke-width="1.2" stroke-linecap="round" fill="none"/></svg>`,
  // deep rose
  `<svg width="20" height="18" viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg"><path d="M10 16.5C10 16.5 1 10.5 1 4.5C1 2 3 0.5 5.5 0.5C7.5 0.5 9 2 10 4C11 2 12.5 0.5 14.5 0.5C17 0.5 19 2 19 4.5C19 10.5 10 16.5 10 16.5Z" fill="#c45c7a" opacity="0.8"/></svg>`,
  // blush
  `<svg width="24" height="22" viewBox="0 0 24 22" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="fhg" cx="35%" cy="28%" r="65%"><stop offset="0%" stop-color="#ffcedd"/><stop offset="100%" stop-color="#e8809a"/></radialGradient></defs><path d="M12 20C12 20 1.5 13 1.5 6C1.5 2.8 3.8 1 6.5 1C8.8 1 10.8 2.5 12 5C13.2 2.5 15.2 1 17.5 1C20.2 1 22.5 2.8 22.5 6C22.5 13 12 20 12 20Z" fill="url(#fhg)" opacity="0.9"/><path d="M5.5 3.5C4 5 3.5 7 4.5 9" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>`,
  // light pink
  `<svg width="18" height="16" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg"><path d="M9 14.5C9 14.5 1 9 1 4.5C1 2 3 0.5 5.2 0.5C7 0.5 8.2 1.5 9 3C9.8 1.5 11 0.5 12.8 0.5C15 0.5 17 2 17 4.5C17 9 9 14.5 9 14.5Z" fill="#ffb6c1" opacity="0.75"/></svg>`,
  // vivid
  `<svg width="26" height="23" viewBox="0 0 26 23" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="fhg2" cx="35%" cy="28%" r="65%"><stop offset="0%" stop-color="#ff85a1"/><stop offset="100%" stop-color="#a02050"/></radialGradient></defs><path d="M13 21C13 21 1 13.5 1 6.5C1 3 3.5 1 7 1C9.5 1 11.5 2.5 13 5.5C14.5 2.5 16.5 1 19 1C22.5 1 25 3 25 6.5C25 13.5 13 21 13 21Z" fill="url(#fhg2)" opacity="0.85"/></svg>`,
];

function makeHomeHearts() {
  const c = document.getElementById('homeHearts');
  c.innerHTML = '';
  for (let i = 0; i < 18; i++) {
    const h = document.createElement('div');
    h.className = 'fh-heart';
    h.innerHTML = heartSVGs[Math.floor(Math.random() * heartSVGs.length)];
    h.style.left = Math.random() * 100 + '%';
    h.style.animationDuration = (6 + Math.random() * 8) + 's';
    h.style.animationDelay = (-Math.random() * 10) + 's';
    const scale = 0.6 + Math.random() * 0.9;
    h.style.transform = `scale(${scale})`;
    c.appendChild(h);
  }
}

function makeProposalHearts() {
  const c = document.getElementById('proposalHearts');
  c.innerHTML = '';
  for (let i = 0; i < 26; i++) {
    const h = document.createElement('div');
    h.className = 'fh-heart';
    h.innerHTML = heartSVGs[Math.floor(Math.random() * heartSVGs.length)];
    h.style.left = Math.random() * 100 + '%';
    h.style.animationDuration = (5 + Math.random() * 9) + 's';
    h.style.animationDelay = (-Math.random() * 10) + 's';
    const scale = 0.5 + Math.random() * 1.1;
    h.style.transform = `scale(${scale})`;
    c.appendChild(h);
  }
}

let propAnim = false;
function startProposalAnim() {
  if (propAnim) return;
  propAnim = true;
const items = [
    { id:'pt1', delay:800 },
    { id:'pt2', delay:2500 },
    { id:'pt3', delay:4500 },
    { id:'pt4', delay:6500 },
    { id:'propBig', delay:9000 },
    { id:'propQ', delay:11500 },
    { id:'yesBtns', delay:13500 },
];
  items.forEach(({ id, delay }) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.classList.add('show');
    }, delay);
  });
}

function celebrate() {
  const cel = document.getElementById('celebration');
  cel.classList.add('show');
  launchConfetti();
  launchFireworks();
  setTimeout(launchConfetti, 1000);
  setTimeout(launchFireworks, 1500);
  setTimeout(launchConfetti, 2500);
}

function launchConfetti() {
  const colors = ['#ff85a1','#e8809a','#ffb6c1','#c45c7a','#ffd1dc','#ff4d79','#ffcce0'];
  for (let i = 0; i < 70; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    const isHeart = Math.random() > 0.5;
    if (isHeart) {
      c.style.borderRadius = '0';
      c.innerHTML = heartSVGs[Math.floor(Math.random() * heartSVGs.length)];
      c.style.background = 'none';
      c.style.width = 'auto'; c.style.height = 'auto';
    } else {
      c.style.background = colors[Math.floor(Math.random() * colors.length)];
      c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    }
    c.style.left = Math.random() * 100 + 'vw';
    c.style.animationDuration = (2 + Math.random() * 3) + 's';
    c.style.animationDelay = Math.random() * 1.5 + 's';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 5000);
  }
}

function launchFireworks() {
  const emojis = ['💖','✨','🌸','💕'];
  for (let i = 0; i < 30; i++) {
    const f = document.createElement('div');
    f.className = 'firework';
    if (Math.random() > 0.5) {
      f.innerHTML = heartSVGs[Math.floor(Math.random() * heartSVGs.length)];
    } else {
      f.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    }
    const cx = 20 + Math.random() * 60;
    const cy = 20 + Math.random() * 60;
    f.style.left = cx + 'vw';
    f.style.top = cy + 'vh';
    const dx = (Math.random() - 0.5) * 200;
    const dy = (Math.random() - 0.5) * 200;
    f.style.setProperty('--dx', dx + 'px');
    f.style.setProperty('--dy', dy + 'px');
    f.style.animationDelay = (Math.random() * 1) + 's';
    document.body.appendChild(f);
    setTimeout(() => f.remove(), 2500);
  }
}

function burstHearts(x, y) {
  for (let i = 0; i < 10; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.innerHTML = heartSVGs[Math.floor(Math.random() * heartSVGs.length)];
    s.style.left = (x + (Math.random() - 0.5) * 80) + 'px';
    s.style.top = y + 'px';
    s.style.animationDelay = Math.random() * 0.3 + 's';
    s.style.fontSize = (12 + Math.random() * 14) + 'px';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 2000);
  }
}

const secretMsgs = secrets;
let sIdx = 0;

function spawnSecretHeart() { showSecret(); }

function showSecret() {
  document.getElementById('secretMsg').textContent = secretMsgs[sIdx % secretMsgs.length];
  sIdx++;
  document.getElementById('secretPopup').classList.add('show');
}

function placeHiddenHearts() {
  const positions = [
    { bottom:'80px', left:'12px' },
    { top:'120px', right:'10px' },
    { bottom:'200px', left:'8px' },
    { top:'300px', right:'8px' },
  ];
  positions.forEach((pos, i) => {
    const h = document.createElement('div');
    h.className = 'hidden-heart';
    h.innerHTML = heartSVGs[i % heartSVGs.length];
    Object.assign(h.style, pos);
    h.style.animationDelay = (i * 0.5) + 's';
    h.onclick = showSecret;
    document.body.appendChild(h);
  });
}

function addAmbientDecor() {
  const petalEmojis = ['🌸','🌷','🌹'];
  for (let i = 0; i < 6; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = petalEmojis[i % petalEmojis.length];
    p.style.left = (10 + Math.random() * 80) + '%';
    p.style.animationDuration = (8 + Math.random() * 10) + 's';
    p.style.animationDelay = (-Math.random() * 15) + 's';
    p.style.fontSize = (10 + Math.random() * 10) + 'px';
    document.body.appendChild(p);
  }
}

// COUNTER
const startDate = new Date('2025-11-30T00:00:00');

function updateCounter() {
  const now = new Date();
  const diff = now - startDate;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  document.getElementById('c-days').textContent = days;
  document.getElementById('c-hours').textContent = hours;
  document.getElementById('c-mins').textContent = mins;
  document.getElementById('c-secs').textContent = secs;
}
setInterval(updateCounter, 1000);
updateCounter();

// ========== MUSIC PLAYER ==========
const audio = document.getElementById('audioPlayer');
audio.volume = 0.7;
let isPlaying = false;

function updateBtn() {
  const btn = document.getElementById('playBtn');
  if (isPlaying) {
    btn.innerHTML = '<svg width="12" height="14" viewBox="0 0 12 14" fill="white" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="4" height="14" rx="1"/><rect x="8" y="0" width="4" height="14" rx="1"/></svg>';
    btn.title = 'Pause';
  } else {
    btn.innerHTML = '<svg width="12" height="14" viewBox="0 0 12 14" fill="white" xmlns="http://www.w3.org/2000/svg"><polygon points="0,0 12,7 0,14"/></svg>';
    btn.title = 'Play';
  }
}

audio.addEventListener('play', () => { isPlaying = true; updateBtn(); });
audio.addEventListener('pause', () => { isPlaying = false; updateBtn(); });
audio.addEventListener('ended', () => { audio.currentTime = 0; audio.play(); });

function togglePlay() {
  if (audio.paused) {
    audio.play().then(() => { isPlaying = true; updateBtn(); }).catch(e => console.log(e));
  } else {
    audio.pause();
    isPlaying = false;
    updateBtn();
  }
}

function setVol(v) {
  audio.volume = parseInt(v) / 100;
}

window.addEventListener('load', () => {
  audio.play().catch(() => {});
});

// INIT
buildReasons();
buildNotes();
buildBucket();
makeHomeHearts();
placeHiddenHearts();
addAmbientDecor();