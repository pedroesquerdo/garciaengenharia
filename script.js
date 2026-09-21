const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const year = document.querySelector('#year');
const hero = document.querySelector('.hero');

const updateHeader = () => {
  header.classList.toggle('scrolled', window.scrollY > 18);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

if (hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let pointerActive = false;
  let framePending = false;

  const setReveal = value => hero.style.setProperty('--hero-reveal', `${Math.max(55, Math.min(100, value))}%`);
  const updateRevealFromScroll = () => {
    framePending = false;
    if (pointerActive) return;
    const distance = Math.max(1, hero.offsetHeight * .58);
    setReveal(55 + Math.min(1, Math.max(0, window.scrollY / distance)) * 45);
  };
  const requestRevealUpdate = () => {
    if (framePending) return;
    framePending = true;
    requestAnimationFrame(updateRevealFromScroll);
  };

  hero.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch') return;
    pointerActive = true;
    const bounds = hero.getBoundingClientRect();
    setReveal(((event.clientX - bounds.left) / bounds.width) * 100);
  }, { passive: true });

  hero.addEventListener('pointerleave', () => {
    pointerActive = false;
    requestRevealUpdate();
  });

  window.addEventListener('scroll', requestRevealUpdate, { passive: true });
  window.addEventListener('resize', requestRevealUpdate, { passive: true });
  updateRevealFromScroll();
}

if (year) year.textContent = new Date().getFullYear();

if (menuButton && nav) {
  const closeMenu = () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
  };

  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
      menuButton.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 720) closeMenu();
  }, { passive: true });
}

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}


document.querySelectorAll('[data-whatsapp]').forEach(link => {
  link.addEventListener('click', () => {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', 'generate_lead', {
      event_category: 'contact',
      event_label: link.dataset.whatsapp
    });
  });
});

const cookieBanner = document.querySelector('.cookie-banner');
const consentChoice = localStorage.getItem('garcia-analytics-consent');

const loadAnalytics = () => {
  if (document.querySelector('script[data-google-analytics]')) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', 'G-QWGT12FR8R', { anonymize_ip: true });

  const analyticsScript = document.createElement('script');
  analyticsScript.async = true;
  analyticsScript.dataset.googleAnalytics = '';
  analyticsScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-QWGT12FR8R';
  document.head.append(analyticsScript);
};

if (consentChoice === 'accepted') loadAnalytics();

if (cookieBanner && !consentChoice) cookieBanner.hidden = false;

cookieBanner?.querySelector('.cookie-accept')?.addEventListener('click', () => {
  localStorage.setItem('garcia-analytics-consent', 'accepted');
  loadAnalytics();
  cookieBanner.hidden = true;
});

cookieBanner?.querySelector('.cookie-reject')?.addEventListener('click', () => {
  localStorage.setItem('garcia-analytics-consent', 'rejected');
  cookieBanner.hidden = true;
});
