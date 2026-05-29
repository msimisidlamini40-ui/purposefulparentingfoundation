/* ============================================================
   Purposeful Parenting Foundation — Main JavaScript
   purposefulparentingfoundation.co.za
   ============================================================ */

'use strict';

/* ── SCROLL FADE-IN ANIMATIONS ── */
(function initFadeObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 120);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
})();

/* ── NAV: ACTIVE LINK ON SCROLL ── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const bottom = top + sec.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        navLinks.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { passive: true });
})();

/* ── SMOOTH SCROLL ── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* ── CONTACT FORM ── */
(function initForm() {
  const btn = document.getElementById('submitBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const name  = document.querySelector('.cform input[type="text"]');
    const email = document.querySelector('.cform input[type="email"]');
    const inputs = document.querySelectorAll('.cform input, .cform textarea, .cform select');
    if (!name.value.trim())  { name.style.borderColor  = '#8B3A3A'; name.focus();  return; }
    if (!email.value.trim() || !email.value.includes('@')) { email.style.borderColor = '#8B3A3A'; email.focus(); return; }
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#2A3D2A';
    inputs.forEach(el => { el.value = ''; el.style.borderColor = ''; });
    setTimeout(() => { btn.textContent = 'Send Message →'; btn.style.background = ''; }, 3500);
  });
  document.querySelectorAll('.cform input').forEach(input => {
    input.addEventListener('input', () => { input.style.borderColor = ''; });
  });
})();

/* ── COUNTER ANIMATION ── */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-num, .imp-num, .crisis-stat-num');
  const animateCount = (el) => {
    const raw    = el.textContent.replace(/[^0-9]/g, '');
    const suffix = el.textContent.replace(/[0-9]/g, '');
    if (!raw) return;
    const target = parseInt(raw, 10);
    const step   = Math.ceil(target / (1500 / 16));
    let current  = 0;
    const timer  = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(timer);
    }, 16);
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animateCount(entry.target); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => observer.observe(el));
})();

/* ── FAQ ACCORDION ── */
function toggleFaq(el) {
  const item    = el.parentElement;
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

/* ── DONATE AMOUNT SELECTOR ── */
function selectAmt(btn) {
  document.querySelectorAll('.donate-btn-amt').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

/* ── NEWSLETTER ── */
(function initNewsletter() {
  const btn = document.querySelector('.btn-newsletter');
  if (!btn) return;
  btn.addEventListener('click', () => {
    btn.textContent = '✓ Subscribed!';
    btn.style.background = '#2A3D2A';
    btn.style.color = '#fff';
    const input = document.querySelector('.newsletter-input');
    if (input) input.value = '';
  });
})();
