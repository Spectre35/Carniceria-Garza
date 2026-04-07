/* =============================================
   GARZA'S CARNICERÍA — main.js
   ============================================= */

'use strict';

/* --- NAV scroll effect --- */
const nav = document.querySelector('.nav');
const handleNavScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
};
window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

/* --- Hamburger menu --- */
const hamburger  = document.querySelector('.nav__hamburger');
const mobileMenu = document.querySelector('.nav__mobile');
const bars       = hamburger ? hamburger.querySelectorAll('span') : [];

hamburger?.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  bars[0].style.transform = isOpen ? 'translateY(7px) rotate(45deg)' : '';
  bars[1].style.opacity   = isOpen ? '0' : '1';
  bars[2].style.transform = isOpen ? 'translateY(-7px) rotate(-45deg)' : '';
});

mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    bars[0].style.transform = '';
    bars[1].style.opacity   = '1';
    bars[2].style.transform = '';
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* --- Scroll reveal --- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i * 0.03, 0.3)}s`; // Máximo 0.3s de delay
  revealObserver.observe(el);
});

/* --- Smooth scroll for nav links --- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* --- Número contador animado --- */
const animateCount = (el) => {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1600;
  let current = 0;
  const startTime = performance.now();
  
  const frame = (timestamp) => {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    current = Math.floor(progress * target);
    
    el.textContent = el.dataset.suffix
      ? current + el.dataset.suffix
      : current + '+';
    
    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      el.textContent = el.dataset.suffix
        ? target + el.dataset.suffix
        : target + '+';
    }
  };
  
  requestAnimationFrame(frame);
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));
