const btnMenuOpen = document.querySelector('.menu-icon');
const imgsToLoad = document.querySelectorAll('img[data-src]');

const headerAnimation = document.querySelector('.header__content');

// Hide Header Elements
const hideHeader = () => {
  for (let el of headerAnimation.children) {
    el.classList.add('hidden');
  }
};
hideHeader();

//Animations on header
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    for (let el of headerAnimation.children) {
      el.classList.remove('hidden');
    }
    headerAnimation.querySelector('h1').classList.add('slide-left');
    headerAnimation.querySelector('p').classList.add('slide-left');
    headerAnimation.querySelector('a').classList.add('fade-in');
  }, 1000);
});

//Handlers Show Hide Navigation
btnMenuOpen.addEventListener('click', function () {
  const icon = btnMenuOpen.getAttribute('src').includes('hamburger')
    ? 'close'
    : 'hamburger';

  let path = `public/assets/shared/mobile/icon-${icon}.svg`;
  btnMenuOpen.setAttribute('src', path);

  //Toggle class
  document.querySelector('.nav__links').classList.toggle('active');
});

//Lazy loading images
const loadImg = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  //Show img after loaded
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '100px',
});

imgsToLoad.forEach((img) => imgObserver.observe(img));
