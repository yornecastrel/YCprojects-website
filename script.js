/* YC Projects — JavaScript */

// ── Mobile nav ──
const navToggle = document.getElementById('navToggle');
const siteNav   = document.getElementById('siteNav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
  });
  siteNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', false);
    });
  });
}

// ── Header scroll effect ──
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ── Scroll reveal ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const delay = parseFloat(entry.target.dataset.delay || 0) * 1000;
    setTimeout(() => entry.target.classList.add('visible'), delay);
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── FAQ accordion ──
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ── Project filter (referenties) ──
const projectsGrid = document.getElementById('projectsGrid');
if (projectsGrid) {
  document.querySelectorAll('.filter-row [data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      document.querySelectorAll('.filter-row [data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      projectsGrid.querySelectorAll('.project-card').forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.type === filter) ? '' : 'none';
      });
    });
  });
}

// ── Lightbox ──
document.addEventListener('click', e => {
  const card = e.target.closest('.project-card');
  if (!card) return;
  const img = card.querySelector('img');
  if (!img) return;
  const overlay = Object.assign(document.createElement('div'), {
    style: 'position:fixed;inset:0;background:rgba(0,0,0,.92);display:flex;align-items:center;justify-content:center;z-index:9999;padding:1.5rem;cursor:zoom-out'
  });
  overlay.addEventListener('click', () => overlay.remove());
  document.addEventListener('keydown', function esc(e) {
    if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', esc); }
  });
  const photo = Object.assign(document.createElement('img'), {
    src: img.src, alt: img.alt,
    style: 'max-width:1200px;width:100%;border-radius:14px;box-shadow:0 40px 120px rgba(0,0,0,.7)'
  });
  overlay.appendChild(photo);
  document.body.appendChild(overlay);
});

// ── Contact form ──
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const fd   = new FormData(contactForm);
    const data = Object.fromEntries(fd.entries());
    if (!data.naam || !data.email || !data.bericht) {
      alert('Vul naam, e-mailadres en bericht in om door te gaan.');
      return;
    }
    const leads = JSON.parse(localStorage.getItem('yc_leads') || '[]');
    leads.push({ ...data, datum: new Date().toISOString() });
    localStorage.setItem('yc_leads', JSON.stringify(leads));
    contactForm.reset();
    const success = document.getElementById('formSuccess');
    if (success) { success.style.display = 'block'; setTimeout(() => success.style.display = 'none', 6000); }
  });
}
