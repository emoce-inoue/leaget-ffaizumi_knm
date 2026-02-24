const triggerMenu = () => {
  const header = document.querySelector('.l-header');
  const button = document.querySelector('.l-button');
  const navLinks = document.querySelectorAll('.l-nav__link');

  button.addEventListener('click', () => {
    header.classList.toggle('l-header--opened');

    const isOpened = header.classList.contains('l-header--opened');
    button.setAttribute('aria-expanded', isOpened);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      header.classList.remove('l-header--opened');
      button.setAttribute('aria-expanded', 'false');
    });
  });
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
