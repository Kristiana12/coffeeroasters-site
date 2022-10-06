const subscribe = document.querySelector('.subscribe');
const cards = document.querySelectorAll('.subscribe--card__option');

function removeClass(elements, className) {
  if (HTMLCollection.prototype.isPrototypeOf(elements)) {
    elements = [...elements];
  }

  elements.forEach((el) => el.classList.remove(className));
}

//FUNCTIONS
function collapseOption(element) {
  //get the height of the elements inner content
  const optionHeight = element.scrollHeight;

  //temporarly disable all css transitions
  const elementTransition = element.style.transition;
  element.style.transition = '';

  //explicitly set the element's height to its current pixel height
  requestAnimationFrame(function () {
    element.style.height = optionHeight + 'px';
    element.style.transition = elementTransition;

    //on the next frame (as soon as the previous style change has taken effect),
    //have the element transition to height: 0
    requestAnimationFrame(function () {
      element.style.height = 0 + 'px';
    });
  });

  //mark the section as 'currently collapsed'
  element.setAttribute('data-collapsed', 'true');
}

function expandOption(element) {
  //get the height of the elemen's inner content
  const optionHeight = element.scrollHeight;

  //have the element transition to the height of its inner content
  element.style.height = optionHeight + 'px';

  //when hte next css transition finishes (which should be the one we just triggered)
  element.addEventListener('transitioned', function (e) {
    //remove this event listener so that it only is triggred one
    // callee is a property of the arguments object. It can be used to refer to the currently executing function inside the function body of that function. This is useful when the name of the function is unknown, such as within a function expression with no name (also called "anonymous functions").
    element.removeEventListener('transitioned', arguments.callee);

    //remove the height from the elements inline styles, so it can return to it's initial value
    element.style.height = null;
  });

  //mark the section as currently not colllapsed
  element.setAttribute('data-collapsed', 'false');
}

subscribe.addEventListener('click', function (e) {
  if (e.target.classList.contains('subscribe--card__img')) {
    const imgArrow = e.target;
    imgArrow.classList.toggle('close');
    //Create accordion functionality
    const cardContainer = imgArrow.nextElementSibling;
    const isCollapsed = cardContainer.getAttribute('data-collapsed') === 'true';

    if (isCollapsed) {
      expandOption(cardContainer);
      cardContainer.setAttribute('data-collapsed', 'false');
    } else {
      collapseOption(cardContainer);
    }
  }

  const selectedCard = e.target.closest('.subscribe--card__option');

  //if not a descendat or the card itself is selected then ignore
  if (!selectedCard) return;

  //Activate clicked card
  if (
    e.target
      .closest('.subscribe--card__option')
      .classList.contains('subscribe--card__option')
  ) {
    const containerSelected = selectedCard.parentElement;
    const selectedText = selectedCard.querySelector('h3').textContent;

    console.log(selectedText);
    if (containerSelected) {
      removeClass(containerSelected.children, 'active');
      selectedCard.classList.add('active');
    }
  }
});
