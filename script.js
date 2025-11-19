// Active nav link on scroll
const links = document.querySelectorAll('.navlinks .link');
const sections = [...links].map(a => document.querySelector(a.getAttribute('href')));
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const id = '#' + e.target.id;
      links.forEach(l=> l.classList.toggle('active', l.getAttribute('href')===id));
    }
  })
},{threshold:.35});
sections.forEach(s=> s && io.observe(s));

// Skills bars animate on view
const bars = document.querySelectorAll('.bar');
const io2 = new IntersectionObserver((ents)=>{
  ents.forEach(en=>{
    if(en.isIntersecting){
      const pct = en.target.dataset.pct || 0;
      en.target.querySelector('i').style.width = pct + '%';
      io2.unobserve(en.target);
    }
  })
}, {threshold:.4});
bars.forEach(b=> io2.observe(b));

// ---------- iOS-style entrance & scroll reveals ----------

// Stagger the hero icons
document.querySelectorAll('.hero-icons .ic').forEach((el, i) => {
  el.style.setProperty('--i', i);   // used in CSS calc() for delays
});

// Mark sections to reveal on first sight
document.querySelectorAll('.section-card, section.card').forEach(sec => {
  sec.classList.add('reveal-on-scroll');
});

// IO observer for reveal-on-scroll
const revealIO = new IntersectionObserver((ents) => {
  ents.forEach(en => {
    if (en.isIntersecting) {
      en.target.classList.add('in');
      revealIO.unobserve(en.target);
    }
  });
}, { threshold: 0.18 });

// Dim background only during initial transition
document.documentElement.classList.add('is-entering');

const heroKeyTarget = document.querySelector('.hero-pane') || document.querySelector('.hero');
const endEntrance = () => document.documentElement.classList.remove('is-entering');

// Prefer to wait for the actual CSS animation to finish
if (heroKeyTarget) {
  heroKeyTarget.addEventListener('animationend', endEntrance, { once: true });

  // Safety timeout in case animations are disabled or names change
  setTimeout(endEntrance, 1600);
} else {
  setTimeout(endEntrance, 1200);
}
const about = document.querySelector('#about');
if (about) {
  about.setAttribute('data-entering', '1');
  requestAnimationFrame(() => {
    setTimeout(() => about.removeAttribute('data-entering'), 900);
  });
}


document.querySelectorAll('.reveal-on-scroll').forEach(el => revealIO.observe(el));


// Year
document.getElementById('year')?.textContent = new Date().getFullYear();
