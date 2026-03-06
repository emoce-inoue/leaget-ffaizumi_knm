const triggerMenu = () => {
  const header = document.querySelector('.l-header');
  const button = document.querySelector('.l-button');
  const navLinks = document.querySelectorAll('.l-nav__link');
  const body = document.body;

  if (!header || !button) {
    return;
  }

  const toggleMenu = (isOpen) => {
    header.classList.toggle('l-header--opened', isOpen);
    button.setAttribute('aria-expanded', isOpen);
    body.classList.toggle('l-body---fixed', isOpen);
  };

  button.addEventListener('click', () => {
    const isOpening = !header.classList.contains('l-header--opened');
    toggleMenu(isOpening);
  });

  if (navLinks.length > 0) {
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });
  }
};

const triggerCta = () => {
  const cta = document.querySelector('.l-sticky-cta');
  const startTarget = document.querySelector('.l-gift');
  const endTarget = document.querySelector('.l-privacy');

  const options = {
    root: null,
    threshold: 0,
  };

  const startObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
        cta.classList.add('l-sticky-cta--fixed');
      } else {
        cta.classList.remove('l-sticky-cta--fixed');
      }
    });
  }, options);

  const endObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        cta.classList.remove('l-sticky-cta--fixed');
      } else {
        if (entry.boundingClientRect.top > 0 && startTarget.getBoundingClientRect().top < 0) {
          cta.classList.add('l-sticky-cta--fixed');
        }
      }
    });
  }, options);

  startObserver.observe(startTarget);
  endObserver.observe(endTarget);
};

document.addEventListener('DOMContentLoaded', () => {
  triggerMenu();
  triggerCta();
});
