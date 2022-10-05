const btnMenuOpen = document.querySelector('.menu-icon');

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

//Add breakline
const addBreakLine = () => {
  const withBr = `Pick your <br> coffee`;
  const withoutBr = `Pick your coffee`;
  const text = window.innerWidth >= 768 ? withBr : withoutBr;
  document.querySelector('.steps--content__card--title').innerHTML = text;
};
addBreakLine();

window.addEventListener('resize', addBreakLine);
