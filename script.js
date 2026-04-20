// ===== STARS =====
    const starfield = document.getElementById('starfield');
    for (let i = 0; i < 160; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const sz = Math.random() * 2.5 + 0.5;
      s.style.cssText = `
        width:${sz}px; height:${sz}px;
        left:${Math.random()*100}%;
        top:${Math.random()*100}%;
        --dur:${2+Math.random()*5}s;
        --delay:${-Math.random()*5}s;
        opacity:${0.2+Math.random()*0.5};
      `;
      starfield.appendChild(s);
    }
 
    // ===== PARTICLES =====
    const pcLayer = document.getElementById('particles');
    const pcColors = ['#D4AF6A','#C8405A','#FFE066','#F5E6C0','#C86820'];
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const sz = Math.random() * 5 + 2;
      p.style.cssText = `
        width:${sz}px; height:${sz}px;
        left:${Math.random()*100}%;
        background:${pcColors[Math.floor(Math.random()*pcColors.length)]};
        --fdur:${5+Math.random()*8}s;
        --fdelay:${-Math.random()*8}s;
      `;
      pcLayer.appendChild(p);
    }
 
    // ===== COUNTDOWN =====
    let count = 3;
    const countEl = document.getElementById('count-num');
    const countScreen = document.getElementById('countdown-screen');
 
    function nextCount() {
  if (count === 0) {
    setTimeout(() => {
      countScreen.style.opacity = '1';
      setTimeout(() => { 
        countScreen.style.display = 'none'; 
        startShow(); 
      }, 100);
    }, 100);
    return;
  }

  countEl.style.animation = 'none';
  void countEl.offsetWidth;
  countEl.style.animation = 'countPulse 0.9s ease-out';

  countEl.textContent = count;
  countEl.setAttribute('data-n', count);

  count--;
  setTimeout(nextCount, 1000);
}
    
    nextCount();
 
    // ===== MAIN SHOW =====
    const mainShow = document.getElementById('main-show');
    const words = [
      document.getElementById('w-happy'),
      document.getElementById('w-birthday'),
      document.getElementById('w-to'),
      document.getElementById('w-name')
    ];
 
    function startShow() {
      mainShow.style.display = 'flex';
      let i = 0;
 
      const wordTimer = setInterval(() => {
        words.forEach(w => w.classList.remove('active'));
        if (i < words.length) {
          words[i].classList.add('active');
          if (i === words.length - 1) {
            launchBurst(window.innerWidth / 2, window.innerHeight / 2, 24);
          }
          i++;
        } else {
          clearInterval(wordTimer);
          words.forEach(w => w.classList.remove('active'));
          setTimeout(showCake, 600);
        }
      }, 1400);
    }
 
    // ===== CAKE =====
    const cakeScene = document.getElementById('cake-scene');
    const cakeLabel = document.getElementById('cake-label');
    const cakeSub   = document.getElementById('cake-sub');
    const letterBox = document.getElementById('letter-box');
    const letterHint= document.getElementById('letter-hint');
 
    function showCake() {
      cakeScene.classList.add('show-cake');
      setTimeout(() => {
        cakeLabel.classList.add('show-label');
        cakeSub.classList.add('show-label');
        launchConfetti(60);
        launchBurst(window.innerWidth/2, window.innerHeight*0.35, 32);
      }, 300);
 
      setTimeout(() => {
        letterBox.classList.add('drop-in');
        letterHint.classList.add('show');
      }, 5000);
    }
 
    // ===== BURST / SPARKS =====
    const burstContainer = document.getElementById('bursts');
 
    function launchBurst(cx, cy, count) {
      const colors = ['#D4AF6A','#FFE066','#C8405A','#F5E6C0','#FF9800','#fff'];
      for (let i = 0; i < count; i++) {
        const sp = document.createElement('div');
        sp.className = 'spark';
        const sz = Math.random() * 8 + 4;
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
        const dist  = 80 + Math.random() * 160;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;
        const color = colors[Math.floor(Math.random() * colors.length)];
        sp.style.cssText = `
          width:${sz}px; height:${sz}px;
          background:${color};
          left:${cx}px; top:${cy}px;
          box-shadow: 0 0 ${sz*2}px ${color};
          transition: transform 0.8s cubic-bezier(0.17,0.89,0.32,1.1), opacity 0.8s ease;
        `;
        burstContainer.appendChild(sp);
        void sp.offsetWidth;
        sp.style.transform = `translate(${dx}px,${dy}px) scale(0)`;
        sp.style.opacity = '0';
        setTimeout(() => sp.remove(), 900);
      }
    }
 
    // ===== CONFETTI =====
    function launchConfetti(n) {
      const shapes = ['◆','★','●','▲','♥'];
      const colors = ['#D4AF6A','#C8405A','#FFE066','#F5E6C0','#88DDFF','#FF88AA'];
      for (let i = 0; i < n; i++) {
        const c = document.createElement('div');
        c.className = 'confetti-piece';
        c.textContent = shapes[Math.floor(Math.random()*shapes.length)];
        c.style.cssText = `
          left:${Math.random()*100}vw;
          font-size:${12+Math.random()*14}px;
          color:${colors[Math.floor(Math.random()*colors.length)]};
          --cdur:${3+Math.random()*4}s;
          --cdelay:${Math.random()*2}s;
          --cx:${(Math.random()-0.5)*200}px;
        `;
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 7000);
      }
    }
 
    // ===== LETTER OPEN/CLOSE =====
    const letterContent = document.getElementById('letter-content');
    const closeLetter   = document.getElementById('close-letter');
 
    letterBox.addEventListener('click', () => {
      launchBurst(
        letterBox.getBoundingClientRect().left + 36,
        letterBox.getBoundingClientRect().top  + 36,
        20
      );
      letterBox.style.display = 'none';
      letterHint.style.display = 'none';
      letterContent.classList.add('open');
    });
 
    closeLetter.addEventListener('click', () => {
      letterContent.classList.remove('open');
    });
 
    // ===== CLICK SPARKLE =====
    document.addEventListener('click', (e) => {
      if (e.target.closest('#letter-content') || e.target.closest('#letter-box')) return;
      launchBurst(e.clientX, e.clientY, 10);
    });