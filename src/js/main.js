const imgsToLoad = document.querySelectorAll('img[data-src]');
const cards = document.querySelectorAll('.card');

//Cookies Banner
const cookiesAcceptBtn = document.querySelector('.btn-cookies-accept');
const cookiesCancelBtn = document.querySelector('.btn-cookies-cancel');
const cookiesBanner = document.querySelector('.cookies-banner');

hideElements(cards);

//Add breakline
const addBreakLine = () => {
  const withBr = `Pick your <br> coffee`;
  const withoutBr = `Pick your coffee`;
  const text = window.innerWidth >= 768 ? withBr : withoutBr;
  document.querySelector('.steps--content__card--title').innerHTML = text;
  // console.log(document.querySelector('.steps--content__card--title'));
};
addBreakLine();

window.addEventListener('resize', addBreakLine);

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

//DIALOG
function closeDialog(element) {
  this.removeAttribute('open', 'open');
  this.setAttribute('close', 'close');
}

const showCookiesBanner = () => {
  cookiesBanner.setAttribute('open', 'open');
};

setTimeout(showCookiesBanner, 3000);

cookiesAcceptBtn.addEventListener('click', closeDialog.bind(cookiesBanner));
cookiesCancelBtn.addEventListener('click', closeDialog.bind(cookiesBanner));
