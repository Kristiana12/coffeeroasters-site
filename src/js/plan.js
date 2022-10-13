const subscribe = document.querySelector('.subscribe');
const cards = document.querySelectorAll('.subscribe--card__option');
const categories = document.querySelectorAll('.subscribe__categories p');
const createPlanBtn = document.querySelector('.plan__btn-primary');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

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

//Change Text on the Summary
function displaySummary(parentElement, element) {
  const orderSummarySpans = document.querySelectorAll(
    '.order--text span.empty'
  );

  orderSummarySpans[parentElement.dataset.index].style.color = '#0e8784';
  //Change the text based on the option
  orderSummarySpans[parentElement.dataset.index].innerHTML =
    element.querySelector('h3').innerHTML;

  //use at the end to not overwrite it
  if (element.dataset.capsule || element.dataset.filter) {
    const word = element.dataset.capsule
      ? `<span class='color-light'> using </span>`
      : `<span class='color-light'> as </span>`;
    const sentence = word + element.querySelector('h3').innerHTML;
    orderSummarySpans[0].innerHTML = sentence;
  }
}

//Set active class
function changeCardStatus(e) {
  const selectedCard = e.target.closest('.subscribe--card__option');
  //if not a descedant or the card itself is selected then ignore
  if (!selectedCard) return;

  //Activate clicked card
  if (selectedCard.classList.contains('subscribe--card__option')) {
    const containerSelected = selectedCard.parentElement;

    if (containerSelected) {
      removeClass(containerSelected.children, 'active');
      selectedCard.classList.add('active');

      displaySummary(containerSelected, selectedCard);
      containerSelected.classList.add('clicked');
      if (containerSelected.classList.contains('clicked')) {
        containerSelected.classList.remove('clicked');
        containerSelected.classList.add('clicked');
      }
    }

    //Check which quantity card is active
    const quantitySection = document.getElementById('quantity');
    const quantityCards = quantitySection.querySelectorAll(
      '.subscribe--card__option'
    );
    const selectedQuantityCard = [...quantityCards].filter((card) =>
      card.classList.contains('active')
    );

    //Check which delivery card is active
    const deliverySection = document.getElementById('deliveries');
    const deliveryCards = deliverySection.querySelectorAll(
      '.subscribe--card__option'
    );

    const selectedDeliveryCard = [...deliveryCards].some((card) =>
      card.classList.contains('active')
    );

    //Setting the prices based on the quantity
    const prices = {
      shipmentPerWeek: function () {
        return this.perWeek * 4;
      },
      shipmentPerTwoWeek: function () {
        return this.perTwoWeeks * 2;
      },
      shipmentPerMonth: function () {
        return this.perMonth * 1;
      },
    };

    function checkPrices(selectedQuantityCard, selectedQuantityCardNODE) {
      if (
        selectedQuantityCardNODE.dataset.quantity == 250 &&
        selectedQuantityCard
      ) {
        prices.perWeek = 7.2;
        prices.perTwoWeeks = 9.6;
        prices.perMonth = 12.0;
      } else if (
        selectedQuantityCardNODE.dataset.quantity == 500 &&
        selectedQuantityCard
      ) {
        prices.perWeek = 13.0;
        prices.perTwoWeeks = 17.5;
        prices.perMonth = 22.0;
      } else if (
        selectedQuantityCardNODE.dataset.quantity == 1000 &&
        selectedQuantityCard
      ) {
        prices.perWeek = 22.0;
        prices.perTwoWeeks = 32.0;
        prices.perMonth = 42.0;
      }
    }

    function showPrices() {
      let shipment;

      if (selectedCard.dataset.time === 'week' && selectedDeliveryCard) {
        checkPrices(selectedQuantityCard, ...selectedQuantityCard);
        shipment = prices.shipmentPerWeek();
      } else if (
        selectedCard.dataset.time === 'two-weeks' &&
        selectedDeliveryCard
      ) {
        checkPrices(selectedQuantityCard, ...selectedQuantityCard);
        shipment = prices.shipmentPerTwoWeek();
      } else if (
        selectedCard.dataset.time === 'month' &&
        selectedDeliveryCard
      ) {
        checkPrices(selectedQuantityCard, ...selectedQuantityCard);
        shipment = prices.shipmentPerMonth();
      }
    }

    if (selectedQuantityCard && selectedDeliveryCard) {
      showPrices();
    }
  }
}

//Hide Grind Options if Capsule selected
function disableGrindOption() {
  const grindContainer = document.getElementById('grind-options');
  const capsuleCard = document.querySelector(
    '.subscribe--card__option[data-capsule="true"]'
  );
  const grindText = document.querySelector('span.grind');

  const grindContainerBtn = grindContainer.querySelector(
    '.subscribe--card__button'
  );

  if (capsuleCard.classList.contains('active')) {
    collapseOption(grindContainer.querySelector('.subscribe--card__options'));
    grindContainerBtn.style.filter = 'grayscale(100%)';
    grindContainerBtn.setAttribute('disabled', 'disabled');
    if (grindText) {
      grindText.innerHTML = `<span class="empty"></span>`;
    }
  } else if (!capsuleCard.classList.contains('active')) {
    grindContainerBtn.removeAttribute('disabled');
    grindContainerBtn.style.filter = null;
  }
}

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

//Bind each function with the object you need
subscribe.addEventListener('click', toggleOptionHeight.bind(subscribe));
subscribe.addEventListener('click', changeCardStatus.bind(subscribe));
subscribe.addEventListener('click', disableGrindOption);
createPlanBtn.addEventListener('click', openModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});
