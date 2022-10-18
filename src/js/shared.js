const btnMenuOpen = document.querySelector('.menu-icon');
const headerChildren = [...document.querySelector('.header__content').children];
const sections = document.querySelectorAll('.section');

//Show-Hide Navigation
btnMenuOpen.addEventListener('click', function () {
  const icon = btnMenuOpen.getAttribute('src').includes('hamburger')
    ? 'close'
    : 'hamburger';

  let path = `public/assets/shared/mobile/icon-${icon}.svg`;
  btnMenuOpen.setAttribute('src', path);

  //Toggle class
  document.querySelector('.nav__links').classList.toggle('active');
});

// Functions
// Hide DOM Elements
const hideElements = (DOMElements) => {
  DOMElements.forEach((el) => el.classList.add('hidden'));
};
//Show DOM Elements
const showElements = (DOMElements) => {
  DOMElements.forEach((el) => el.classList.remove('hidden'));
};

hideElements(headerChildren);
hideElements(sections);

//Fade in Header Elements
document.addEventListener('DOMContentLoaded', function () {
  headerChildren.forEach((el) => {
    showElements(headerChildren);
    el.classList.add('fade-in');
  });
});

//Section fadind-sliding In
const showSection = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('hidden');

  observer.unobserve(entry.target);
};

const sectionObs = new IntersectionObserver(showSection, {
  root: null,
  threshold: 0.1,
});

sections.forEach((sect) => sectionObs.observe(sect));
