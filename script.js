const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

function toggleNav() {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', toggleNav);
  siteNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (siteNav.classList.contains('open')) {
        toggleNav();
      }
    });
  });
}

// Reveal on scroll (progressive)
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
revealElements.forEach(el => {
  const delay = parseFloat(el.dataset.revealDelay) || 0;
  el.style.transitionDelay = `${delay}s`;
  revealObserver.observe(el);
});

// Contact form handling (client-side only for now)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const clearBtn = document.getElementById('contact-clear');
  clearBtn && clearBtn.addEventListener('click', () => contactForm.reset());

  contactForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      projectType: form.projectType.value,
      message: form.message.value.trim(),
      sentAt: new Date().toISOString()
    };

    if (!data.name || !data.email || !data.message) {
      alert('Vul aub uw naam, e-mail en korte omschrijving in.');
      return;
    }

    // Save locally (for demo / future processing)
    const existing = JSON.parse(localStorage.getItem('yc_submissions') || '[]');
    existing.push(data);
    localStorage.setItem('yc_submissions', JSON.stringify(existing));

    // Future: POST to server endpoint
    // fetch('/api/contact', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data) })

    contactForm.reset();
    alert('Dank! Uw aanvraag is ontvangen. We nemen binnenkort contact met u op.');
  });
}

// Lightbox for project images
document.addEventListener('click', (e) => {
  const card = e.target.closest('.project-card');
  if (!card) return;
  const img = card.querySelector('img');
  if (!img) return;
  openLightbox(img.src, img.alt || 'Project foto');
});

function openLightbox(src, alt) {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:9999;padding:20px';
  overlay.addEventListener('click', () => document.body.removeChild(overlay));
  const image = document.createElement('img');
  image.src = src;
  image.alt = alt;
  image.style.maxWidth = '1200px';
  image.style.width = '100%';
  image.style.borderRadius = '10px';
  overlay.appendChild(image);
  document.body.appendChild(overlay);
}

/* Hero slider logic */
;(function(){
  const slider = document.getElementById('heroSlider');
  if (!slider) return;
  const slides = Array.from(slider.querySelectorAll('.slide'));
  const prev = slider.querySelector('.hero-prev');
  const next = slider.querySelector('.hero-next');
  const dotsWrap = document.getElementById('heroDots');
  let idx = 0; let timer = null;

  slides.forEach((s,i)=>{s.style.opacity = i===0?1:0; s.style.transition='opacity .8s ease';
    const btn = document.createElement('button'); btn.addEventListener('click', ()=>goto(i)); dotsWrap.appendChild(btn);
  });
  const dots = Array.from(dotsWrap.children);
  dots[0] && dots[0].classList.add('active');

  function goto(i){ slides[idx].style.opacity=0; dots[idx].classList.remove('active'); idx = (i+slides.length)%slides.length; slides[idx].style.opacity=1; dots[idx].classList.add('active'); }
  function nextSlide(){ goto(idx+1); }
  prev && prev.addEventListener('click', ()=>{ goto(idx-1); clearInterval(timer); timer = setInterval(nextSlide,5000); });
  next && next.addEventListener('click', ()=>{ nextSlide(); clearInterval(timer); timer = setInterval(nextSlide,5000); });

  timer = setInterval(nextSlide,5000);
})();

/* Before/After slider */
(function(){
  const ba = document.getElementById('beforeAfter');
  if (!ba) return;
  const before = ba.querySelector('.before');
  const range = document.getElementById('baRange');
  function update(){ const val = range.value; before.style.clipPath = `inset(0 ${100-val}% 0 0)`; }
  range.addEventListener('input', update);
  update();
})();

/* FAQ: ensure accessible toggling (details handled by browser) */
document.querySelectorAll('.faq details summary').forEach(s => s.addEventListener('click', ()=>{ s.parentElement.classList.toggle('open'); }));

// Projects filter on referenties page
(function(){
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  const buttons = document.querySelectorAll('.filter-row [data-filter]');
  buttons.forEach(btn => btn.addEventListener('click', ()=>{
    const filter = btn.getAttribute('data-filter');
    grid.querySelectorAll('.project-card').forEach(card => {
      const type = card.getAttribute('data-type') || 'all';
      if (filter === 'all' || type === filter) card.style.display = '';
      else card.style.display = 'none';
    });
    buttons.forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  }));
})();
