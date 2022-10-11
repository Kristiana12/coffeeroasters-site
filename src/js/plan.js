const subscribe = document.querySelector('.subscribe');
const cardSection = document.querySelectorAll('.subscribe--card');
const cards = document.querySelectorAll('.subscribe--card__option');
const categories = document.querySelectorAll('.subscribe__categories p');

function removeClass(elements, className) {
  if (HTMLCollection.prototype.isPrototypeOf(elements)) {
    elements = [...elements];
  }
  elements.forEach((el) => el.classList.remove(className));
}

//FUNCTIONS
//Collapse Accordeon
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

//Expand Accordeon
function expandOption(element) {
  //get the height of the elemen's inner content
  const optionHeight = element.scrollHeight;

  //have the element transition to the height of its inner content
  element.style.height = optionHeight + 'px';

  //when the next css transition finishes (which should be the one we just triggered)
  element.addEventListener('transitioned', function () {
    //remove this event listener so that it only is triggred one
    // callee is a property of the arguments object. It can be used to refer to the currently executing function inside the function body of that function. This is useful when the name of the function is unknown, such as within a function expression with no name (also called "anonymous functions").
    element.removeEventListener('transitioned', arguments.callee);

    //remove the height from the elements inline styles, so it can return to it's initial value
    element.style.height = null;
  });

  //mark the section as currently not colllapsed
  element.setAttribute('data-collapsed', 'false');
}

//Check if Accordeon open or closed
const checkAccordeonStatus = (element) => {
  const isCollapsed = element.getAttribute('data-collapsed') === 'true';
  if (isCollapsed) {
    expandOption(element);
    element.setAttribute('data-collapsed', 'false');
  } else {
    collapseOption(element);
  }
};

//Show Hide the cards
function toggleOptionHeight(e) {
  const btnArrow = e.target.parentElement;
  if (btnArrow.classList.contains('subscribe--card__button')) {
    btnArrow.classList.toggle('close');
    //Create accordion functionality
    const cardContainer = btnArrow.nextElementSibling;
    checkAccordeonStatus(cardContainer);
  }
}

//Set active class
function changeCardStatus(e) {
  const selectedCard = e.target.closest('.subscribe--card__option');

  //if not a descedant or the card itself is selected then ignore
  if (!selectedCard) return;

  //Activate clicked
  if (selectedCard.classList.contains('subscribe--card__option')) {
    const containerSelected = selectedCard.parentElement;

    if (containerSelected) {
      removeClass(containerSelected.children, 'active');
      selectedCard.classList.add('active');

      const orderSummary = document.querySelectorAll('.order--text span');
      orderSummary[containerSelected.dataset.index].innerHTML =
        selectedCard.querySelector('h3').innerHTML;

      orderSummary[containerSelected.dataset.index].style.color = '#0e8784';
    }
  }
}

//Hide Grind Oprtions if Capsule selected
function disableGrindOption(e) {
  const grindContainer = document.getElementById('grind-options');
  const capsuleCard = document.querySelector(
    '.subscribe--card__option[data-capsule="true"]'
  );

  const grindContainerBtn = grindContainer.querySelector(
    '.subscribe--card__button'
  );

  if (capsuleCard.classList.contains('active')) {
    collapseOption(grindContainer.querySelector('.subscribe--card__options'));
    grindContainerBtn.style.filter = 'grayscale(100%)';
    grindContainerBtn.setAttribute('disabled', 'disabled');
  } else if (!capsuleCard.classList.contains('active')) {
    grindContainerBtn.removeAttribute('disabled');
    grindContainerBtn.style.filter = 'none';
  }
}

//Bind each function with the object you need
subscribe.addEventListener('click', toggleOptionHeight.bind(subscribe));
subscribe.addEventListener('click', changeCardStatus.bind(subscribe));
subscribe.addEventListener('click', disableGrindOption.bind(subscribe));
