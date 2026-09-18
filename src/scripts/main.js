/* Christine Noelle Travel — site interactions
   Lightweight, dependency-free: IntersectionObserver reveals + header state.
   Kept framework-free so it stays fast on any device. */

const initHeader = () => {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
};

const initMobileNav = () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.mobile-nav');
  if (!toggle || !nav) return;

  const close = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
};

const initReveal = () => {
  const targets = document.querySelectorAll('.reveal, .reveal-fade, .reveal-scale');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  );

  targets.forEach((el, i) => {
    if (!el.style.getPropertyValue('--delay')) {
      const group = el.closest('[data-stagger]');
      if (group) {
        const siblings = Array.from(group.querySelectorAll('.reveal, .reveal-fade, .reveal-scale'));
        const idx = siblings.indexOf(el);
        el.style.setProperty('--delay', `${Math.min(idx * 0.12, 0.6)}s`);
      }
    }
    observer.observe(el);
  });
};

const initPageFade = () => {
  document.body.classList.add('is-preload');
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      document.body.classList.remove('is-preload');
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initPageFade();
  initHeader();
  initMobileNav();
  initReveal();
});
