// each section question
const methodSection = document.getElementById('preferences');
const coffeeTypeSection = document.getElementById('bean-type');
const quantitySection = document.getElementById('quantity');
const grindSection = document.getElementById('grind-options');
const deliveriesSection = document.getElementById('deliveries');

// modal
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const modalSummaryText = modal.querySelector('.modal--order');

// pricing spans
const weekPricing = document.querySelector('#week-pricing');
const twoWeekPricing = document.querySelector('#two-week-pricing');
const monthPricing = document.querySelector('#month-pricing');

//Text outputs
const summaryText = document.querySelector('.order--text');

// buttons
const arrowBtns = document.querySelectorAll('.subscribe--card__button');
const planBtn = document.querySelector('.plan__btn-primary');
const checkoutBtn = document.getElementById('checkout');

//FUNCTIONS
//Collapse Accordeon

const SUMMARY_PLACEHOLDER = '_____';

const PRICING_DATA = {
  250: {
    week: 7.2,
    twoWeeks: 9.6,
    month: 12,
  },
  500: {
    week: 13.0,
    twoWeeks: 17.5,
    month: 22.0,
  },
  1000: {
    week: 22.0,
    twoWeeks: 32.0,
    month: 42.0,
  },
};

//For the Summary
let method = '';
let coffeeType = '';
let quantity = '';
let grind = '';
let frequency = '';

/*/ Creating the Summary Text /*/
const createSpan = (text = SUMMARY_PLACEHOLDER) => {
  return `<span>${text}</span>`;
};

const createMethodPart = () => {
  if (method === '') {
    return createSpan();
  }
  const joiningWord = method === 'capsule' ? 'using' : 'as';
  return `${joiningWord} ${createSpan(method)}`;
};

const createCoffeeTypePart = () => {
  const type = coffeeType || SUMMARY_PLACEHOLDER;
  return createSpan(type);
};

const createQuantityPart = () => {
  if (quantity === '') return createSpan();
  const quantityText = `${quantity}g`;
  return createSpan(quantityText);
};

const createGrindPart = () => {
  if (method === 'capsule') return '';
  const grindText = `ground ala ${grind ? createSpan(grind) : createSpan()}, `;
  return grindText;
};

const createFrequencyPart = () => {
  if (frequency === '') return createSpan();
  const frequencyText = `every ${frequency}`;
  return createSpan(frequencyText);
};

//Disable Grind when capsules is Selected
const disableGrindText = (method) => {
  const grindContainer = document.getElementById('grind-options');
  const grindContainerBtn = grindContainer.querySelector(
    '.subscribe--card__button'
  );
  const isCapsules = method === 'capsule';
  if (isCapsules) {
    grindContainerBtn.style.filter = 'grayscale(100%)';
    grindContainerBtn.setAttribute('disabled', 'disabled');
  }
};

const createSummary = () => {
  const methodText = createMethodPart();
  const coffeeTypeText = createCoffeeTypePart();
  const quantityText = createQuantityPart();
  const grindText = createGrindPart();
  const frequencyText = createFrequencyPart();

  return `“I drink coffee ${methodText}, with a ${coffeeTypeText} type of bean. ${quantityText}, ${grindText}sent to me ${frequencyText}.”`;
};

const insertSummary = () => {
  summaryText.innerHTML = createSummary();
};

insertSummary();

/*/ STYLING /*/
//collapse accordeon
const collapseOption = (element) => {
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
  element.setAttribute('aria-label', 'closed');
};

//Expand Accordeon
const expandOption = (element) => {
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
  element.setAttribute('aria-label', 'opened');
};

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

const disableGrindSection = (option) => {
  method = option.dataset.method;

  //what needs to change
  const grindContainer = grindSection.querySelector(
    '.subscribe--card__options'
  );
  const btnArrow = grindSection.querySelector('.subscribe--card__button');

  if (method === 'capsule') {
    collapseOption(grindContainer);
    btnArrow.style.filter = 'grayscale(100%)';
    btnArrow.setAttribute('disabled', 'disabled');
    btnArrow.classList.add('close');
  } else {
    btnArrow.removeAttribute('disabled');
    btnArrow.style.filter = null;
  }
};

//remove active Classes
const removeActiveClass = (elements) => {
  if (HTMLCollection.prototype.isPrototypeOf(elements)) {
    elements = [...elements];
  }
  elements.forEach((el) => el.classList.remove('active'));
};

//add active class
const updateCardUI = (selectedCard) => {
  const allCards = selectedCard.parentElement.children;
  removeActiveClass(allCards);
  selectedCard.classList.add('active');
};

/*/ Check which cards are selected based on the dataset/*/
const handleMethodChoice = (option) => {
  method = option.dataset.method;
  disableGrindText(method);
  insertSummary();
};

const handleCoffeeTypeChoice = (option) => {
  coffeeType = option.dataset.coffeeType;
  insertSummary();
};

// inserting prices
const insertingPricingData = (quantity) => {
  const { week, twoWeeks, month } = PRICING_DATA[quantity];
  weekPricing.textContent = `$${week.toFixed(2)}`;
  twoWeekPricing.textContent = `$${twoWeeks.toFixed(2)}`;
  monthPricing.textContent = `$${month.toFixed(2)}`;
};

const handleQuantityChoice = (option) => {
  quantity = option.dataset.quantity;
  insertingPricingData(quantity);
  insertSummary();
};

const handleGrindChoice = (option) => {
  grind = option.dataset.grind;
  insertSummary();
};

const handleFrequencyChoice = (option) => {
  frequency = option.dataset.delivery;
  insertSummary();
};

const calcEndPrices = () => {
  switch (frequency) {
    case 'week':
      return (4 * PRICING_DATA[quantity].week).toFixed(2);
    case '2 weeks':
      return (2 * PRICING_DATA[quantity].twoWeeks).toFixed(2);
    case 'month':
      return (1 * PRICING_DATA[quantity].month).toFixed(2);
    default:
      return '0.00';
  }
};

const checkChoices = () => {
  const methodChosen = method !== '';
  const coffeeTypeChosen = coffeeType !== '';
  const quantityChosen = quantity !== '';
  const grindChosen = method !== 'capsule' ? grind !== '' : true;
  const frequencyChosen = frequency !== '';
  const shouldActivate =
    methodChosen &&
    coffeeTypeChosen &&
    quantityChosen &&
    grindChosen &&
    frequencyChosen;

  return shouldActivate;
};

//Check if all cards are active
const activatePlanBtn = () => {
  if (checkChoices()) {
    planBtn.classList.remove('disable');
  }
};

const sectionHandlers = (e, handler) => {
  const selectedCard = e.target.closest('.subscribe--card__option');
  if (!selectedCard) return;
  updateCardUI(selectedCard);
  handler(selectedCard);
  activatePlanBtn();
};

//MODAL
//Open Modal
const openModal = () => {
  modal.classList.remove('hide');
  overlay.classList.remove('hide');
  modal.classList.add('show');
  overlay.classList.add('show');
};
//Close Modal
const closeModal = () => {
  modal.classList.remove('show');
  overlay.classList.remove('show');
  modal.classList.add('hide');
  overlay.classList.add('hide');
};

/*/ EVENLISTENERS /*/
// CARDS
methodSection.addEventListener('click', (e) => {
  const selectedCard = e.target.closest('.subscribe--card__option');
  if (!selectedCard) return;
  handleMethodChoice(selectedCard);
  updateCardUI(selectedCard);
  disableGrindSection(selectedCard);
  activatePlanBtn();
});

coffeeTypeSection.addEventListener('click', (e) => {
  sectionHandlers(e, handleCoffeeTypeChoice);
});

quantitySection.addEventListener('click', (e) => {
  sectionHandlers(e, handleQuantityChoice);
});

grindSection.addEventListener('click', (e) => {
  sectionHandlers(e, handleGrindChoice);
});

deliveriesSection.addEventListener('click', (e) => {
  sectionHandlers(e, handleFrequencyChoice);
});

overlay.addEventListener('click', closeModal);
//BUTTONS
arrowBtns.forEach((btn) =>
  btn.addEventListener('click', (e) => {
    const btnArrow = e.target.closest('.subscribe--card__button');
    btnArrow.classList.toggle('close');
    //DOM Traversing, container should change height
    const targetedContainer = btnArrow.nextElementSibling;
    checkAccordeonStatus(targetedContainer);
  })
);

planBtn.addEventListener('click', function () {
  if (checkChoices()) {
    openModal();
    modalSummaryText.innerHTML = summaryText.innerHTML;
    const subscriptionPrice = document.querySelector('.end-price');
    const modalSubscriptionPrice = document.querySelector('.end-price-modal');
    subscriptionPrice.innerHTML = calcEndPrices();
    modalSubscriptionPrice.innerHTML = subscriptionPrice.innerHTML;
  }
});

checkoutBtn.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});
