// ================= EDITABLE CONTENT =================
// Add more poems here (each as one string, use \n for line breaks)
const poems = [
"நிலவை பார்த்தேன்...\nஅது அழகாக இருந்தது,\nஆனால்...\nஉன்னை நினைத்த பிறகு\nநிலவும் கொஞ்சம் சாதாரணமாகிவிட்டது. ❤️",
"உன் புன்னகை ஒரு கவிதை,\nநான் படிக்கும் ஒவ்வொரு முறையும்\nபுதிதாக உணர்கிறேன். 🌸",
"மழை பெய்யும் போது,\nநீ நினைவுக்கு வருகிறாய்...\nஏனெனில் உன் சிரிப்பும்\nஅதே அளவு குளிர்ச்சியானது. 🌧️",
"தூரம் இருந்தாலும்,\nஎன் நினைவுகளில்\nநீ எப்போதும் அருகில்தான். 💗",
"வார்த்தைகள் இல்லாமலே\nஉன்னிடம் பேச முடிகிறது என் மனது...\nஅதுவே நம் உரையாடல். ✨"
];
// Add more surprise messages here
const surpriseMessages = [
"You make ordinary days feel special. ❤️",
"Some people become memories.\nYou became a feeling. 💕",
"Whenever I see something beautiful,\nsomehow you come to my mind. 🌸",
"Your smile is my favorite notification. 😊",
"Talking to you is my favorite part of the day. 💗",
"You don't have to try — you're just naturally special. ✨",
"I'm grateful for every little conversation with you. 🌙",
"Ammu Kutty, you're one of a kind. ❤️"
];
// Add / edit the "why special" cards here
const whySpecial = [
{t:"Your Smile 😊", m:"It has a way of making everything feel lighter."},
{t:"Your Kindness 🌸", m:"You notice people in a way that's rare."},
{t:"Your Voice 🎶", m:"Even a simple 'hi' from you feels warm."},
{t:"Your Little Habits 💕", m:"The small things about you are my favorite things."},
{t:"The Way You Make Me Smile 😊", m:"You do it without even trying."},
{t:"The Memories We Share ✨", m:"Every one of them means something to me."}
];
// Add more random messages here
const randomMessages = [
"Hey Ammu Kutty, just a reminder that you are very special. ❤️",
"Some smiles stay in our memory forever.\nYours is one of them. 🌸",
"You have this way of making things feel okay. 💗",
"I hope your day is as nice as your smile. ✨",
"You're the kind of good that doesn't come around often. ❤️",
"Talking to you is one of my favorite habits now. 🌙",
"Just so you know — you're appreciated. 💕",
"You make small moments feel bigger. 😊",
"Ammu Kutty, you're doing great. Keep shining. ✨",
"A little reminder: you matter, a lot. ❤️"
];
// CHANGE YOUR COUNTDOWN TARGET DATE HERE (YYYY, MM(0-11), DD, HH, MM)
const countdownTarget = new Date(2026, 11, 31, 0, 0);

const finalMessage =
`Dear Jamuna,
My Ammu Kutty... ❤️

Out of all the people in this world,
I'm grateful that our paths crossed.

You are one of those beautiful memories
that I will always keep close to my heart.

No matter where life takes us,
I hope you always remember
that you are special.

With lots of love,
❤️`;
// ================= END EDITABLE CONTENT =================

document.addEventListener('DOMContentLoaded', () => {

  // Intro
  document.getElementById('open-surprise').addEventListener('click', () => {
    burstHearts(30);
    document.getElementById('intro').classList.add('hide');
    document.getElementById('site').hidden = false;
    setTimeout(startTyping, 500);
  });

  // Floating hearts ambient
  setInterval(() => spawnHeart(), 900);

  // Cursor heart trail (desktop only)
  const cursorHeart = document.getElementById('cursor-heart');
  document.addEventListener('mousemove', e => {
    cursorHeart.style.left = e.clientX + 'px';
    cursorHeart.style.top = e.clientY + 'px';
    cursorHeart.textContent = '❤️';
    cursorHeart.style.opacity = 1;
    clearTimeout(cursorHeart._t);
    cursorHeart._t = setTimeout(() => cursorHeart.style.opacity = 0, 300);
  });

  // Nav hamburger
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('nav-links').classList.toggle('open');
  });
  document.querySelectorAll('#nav-links a').forEach(a =>
    a.addEventListener('click', () => document.getElementById('nav-links').classList.remove('open')));

  // Scroll progress + reveal + back to top
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    document.getElementById('progress-bar').style.width = pct + '%';
    document.getElementById('back-to-top').style.display = h.scrollTop > 400 ? 'block' : 'none';
    document.querySelectorAll('.reveal').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.85) el.classList.add('show');
    });
  });
  document.getElementById('back-to-top').addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  // Letter read more
  document.getElementById('read-more').addEventListener('click', function() {
    document.querySelector('.letter-more').hidden = false;
    this.style.display = 'none';
  });

  // Poems
  let poemIndex = 0;
  const poemEl = document.getElementById('poem-text');
  poemEl.textContent = poems[0];
  document.getElementById('next-poem').addEventListener('click', () => {
    poemIndex = (poemIndex + 1) % poems.length;
    poemEl.style.opacity = 0;
    setTimeout(() => { poemEl.textContent = poems[poemIndex]; poemEl.style.opacity = 1; }, 200);
  });

  // Surprise boxes
  const surpriseGrid = document.getElementById('surprise-grid');
  surpriseMessages.forEach((msg, i) => {
    const box = document.createElement('div');
    box.className = 'surprise-box glass';
    box.textContent = i === surpriseMessages.length - 1 ? 'Final Surprise 🎁' : `Surprise ${i+1} 🎁`;
    box.addEventListener('click', () => {
      if (box.classList.contains('open')) return;
      box.classList.add('open');
      box.style.whiteSpace = 'pre-line';
      box.textContent = msg;
      burstHearts(14);
    });
    surpriseGrid.appendChild(box);
  });

  // Why special flip cards
  const flipGrid = document.getElementById('flip-grid');
  whySpecial.forEach(item => {
    const card = document.createElement('div');
    card.className = 'flip-card';
    card.innerHTML = `<div class="flip-inner">
      <div class="flip-front"><h3>${item.t}</h3></div>
      <div class="flip-back"><p>${item.m}</p></div>
    </div>`;
    card.addEventListener('click', () => card.classList.toggle('flipped'));
    flipGrid.appendChild(card);
  });

  // Random message generator
  document.getElementById('gen-message').addEventListener('click', () => {
    const el = document.getElementById('random-message');
    const msg = randomMessages[Math.floor(Math.random() * randomMessages.length)];
    el.style.whiteSpace = 'pre-line';
    el.style.opacity = 0;
    setTimeout(() => { el.textContent = msg; el.style.opacity = 1; }, 150);
  });

  // Countdown
  function updateCountdown() {
    const diff = countdownTarget - new Date();
    if (diff <= 0) { document.getElementById('countdown').innerHTML = '<p>The moment is here ❤️</p>'; return; }
    document.getElementById('cd-days').textContent = Math.floor(diff / 86400000);
    document.getElementById('cd-hours').textContent = Math.floor(diff / 3600000 % 24);
    document.getElementById('cd-mins').textContent = Math.floor(diff / 60000 % 60);
    document.getElementById('cd-secs').textContent = Math.floor(diff / 1000 % 60);
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Final surprise
  document.getElementById('open-final').addEventListener('click', () => {
    document.getElementById('final-intro').hidden = true;
    const content = document.getElementById('final-content');
    content.hidden = false;
    spawnStars();
    typeText(document.getElementById('final-text'), finalMessage, 35);
    burstHearts(24);
  });

  // Secret heart
  document.getElementById('secret-heart').addEventListener('click', () => {
    document.getElementById('secret-msg').hidden = false;
    burstHearts(10);
  });

  // Music toggle — add music/song.mp3 for this to play
  const audio = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-toggle');
  let playing = false;
  musicBtn.addEventListener('click', () => {
    if (!playing) { audio.play().catch(()=>{}); musicBtn.textContent = '🔊'; }
    else { audio.pause(); musicBtn.textContent = '🔇'; }
    playing = !playing;
  });

  window.dispatchEvent(new Event('scroll'));
});

// Typing effect for hero subtitle
function startTyping() {
  const text = "Jamuna, this little corner of the internet is just for you...";
  typeText(document.getElementById('typing-subtitle'), text, 45);
}
function typeText(el, text, speed) {
  el.textContent = '';
  let i = 0;
  (function step() {
    if (i < text.length) { el.textContent += text[i++]; setTimeout(step, speed); }
  })();
}

// Floating hearts
function spawnHeart() {
  const el = document.createElement('span');
  el.className = 'fh';
  el.textContent = ['❤️','💕','✨','💗'][Math.floor(Math.random()*4)];
  el.style.left = Math.random()*100 + 'vw';
  el.style.setProperty('--drift', (Math.random()*80-40) + 'px');
  el.style.animationDuration = (6 + Math.random()*5) + 's';
  document.getElementById('floating-hearts').appendChild(el);
  setTimeout(() => el.remove(), 12000);
}
function burstHearts(n) {
  for (let i=0;i<n;i++) setTimeout(spawnHeart, i*30);
}
function spawnStars() {
  const container = document.getElementById('final-stars');
  container.innerHTML = '';
  for (let i=0;i<60;i++) {
    const s = document.createElement('span');
    s.style.cssText = `position:absolute; width:2px; height:2px; background:#fff; border-radius:50%;
      top:${Math.random()*100}%; left:${Math.random()*100}%; opacity:${Math.random()};`;
    container.appendChild(s);
  }
}
