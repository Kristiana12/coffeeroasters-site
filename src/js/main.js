const imgsToLoad = document.querySelectorAll('img[data-src]');
const headerChildren = [...document.querySelector('.header__content').children];
const sections = document.querySelectorAll('.section');
const cards = document.querySelectorAll('.card');

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
hideElements(cards);

//Add breakline
const addBreakLine = () => {
  const withBr = `Pick your <br> coffee`;
  const withoutBr = `Pick your coffee`;
  const text = window.innerWidth >= 768 ? withBr : withoutBr;
  document.querySelector('.steps--content__card--title').innerHTML = text;
};
addBreakLine();

window.addEventListener('resize', addBreakLine);

//Fade in Header Elements
document.addEventListener('DOMContentLoaded', function () {
  headerChildren.forEach((el) => {
    showElements(headerChildren);
    el.classList.add('fade-in');
  });
});

//OBSERVERS
//Lazy loading images
const loadImg = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    //Replace src with data-src
    entry.target.src = entry.target.dataset.src;
    //Show img after loaded
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });

    observer.unobserve(entry.target);
  });
};

const imgObs = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '100px',
});

imgsToLoad.forEach((img) => imgObs.observe(img));

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

//Fade-in Cards
const showCards = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('hidden');
    entry.target.classList.add('fade-in');

    observer.unobserve(entry.target);
  });
};

const cardsObs = new IntersectionObserver(showCards, {
  root: null,
  threshold: 0.15,
});

cards.forEach((card) => cardsObs.observe(card));

//Add breakline
// console.log(document.querySelector('.steps--content__card--title'));
