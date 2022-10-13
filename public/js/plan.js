const methodSection=document.getElementById("preferences"),coffeeTypeSection=document.getElementById("bean-type"),quantitySection=document.getElementById("quantity"),grindSection=document.getElementById("grind-options"),deliveriesSection=document.getElementById("deliveries"),modal=document.querySelector(".modal"),overlay=document.querySelector(".overlay"),modalSummaryText=modal.querySelector(".modal--order"),weekPricing=document.querySelector("#week-pricing"),twoWeekPricing=document.querySelector("#two-week-pricing"),monthPricing=document.querySelector("#month-pricing"),summaryText=document.querySelector(".order--text"),arrowBtns=document.querySelectorAll(".subscribe--card__button"),createPlanBtn=document.querySelector(".plan__btn-primary"),checkoutBtn=document.getElementById("checkout"),SUMMARY_PLACEHOLDER="_____",PRICING_DATA={250:{week:7.2,twoWeeks:9.6,month:12},500:{week:13,twoWeeks:17.5,month:22},1e3:{week:22,twoWeeks:32,month:42}};let method="",coffeeType="",quantity="",grind="",frequency="";const createSpan=(e="_____")=>`<span>${e}</span>`,createMethodPart=()=>{if(""===method)return createSpan();return`${"capsule"===method?"using":"as"} ${createSpan(method)}`},createCoffeeTypePart=()=>createSpan(coffeeType||"_____"),createQuantityPart=()=>{if(""===quantity)return createSpan();return createSpan(`${quantity}g`)},createGrindPart=()=>{if("capsule"===method)return"";return`ground ala ${grind?createSpan(grind):createSpan()}, `},createFrequencyPart=()=>{if(""===frequency)return createSpan();return createSpan(`every ${frequency}`)},disableGrindText=e=>{const t=document.getElementById("grind-options").querySelector(".subscribe--card__button");"capsule"===e&&(t.style.filter="grayscale(100%)",t.setAttribute("disabled","disabled"))},createSummary=()=>`“I drink coffee ${createMethodPart()}, with a ${createSpan(coffeeType||"_____")} type of bean. ${createQuantityPart()}, ${createGrindPart()}sent to me ${createFrequencyPart()}.”`,insertSummary=()=>{summaryText.innerHTML=`“I drink coffee ${createMethodPart()}, with a ${createSpan(coffeeType||"_____")} type of bean. ${createQuantityPart()}, ${createGrindPart()}sent to me ${createFrequencyPart()}.”`};function collapseOption(e){const t=e.scrollHeight,n=e.style.transition;e.style.transition="",requestAnimationFrame((function(){e.style.height=t+"px",e.style.transition=n,requestAnimationFrame((function(){e.style.height="0px"}))})),e.setAttribute("data-collapsed","true"),e.setAttribute("aria-label","closed")}function expandOption(e){const t=e.scrollHeight;e.style.height=t+"px",e.addEventListener("transitioned",(function(){e.removeEventListener("transitioned",arguments.callee),e.style.height=null})),e.setAttribute("data-collapsed","false"),e.setAttribute("aria-label","opened")}insertSummary();const checkAccordeonStatus=e=>{"true"===e.getAttribute("data-collapsed")?(expandOption(e),e.setAttribute("data-collapsed","false")):collapseOption(e)},disableGrindSection=e=>{method=e.dataset.method;const t=grindSection.querySelector(".subscribe--card__options"),n=grindSection.querySelector(".subscribe--card__button");"capsule"===method?(collapseOption(t),n.style.filter="grayscale(100%)",n.setAttribute("disabled","disabled"),n.classList.add("close")):(n.removeAttribute("disabled"),n.style.filter=null)},removeActiveClass=e=>{HTMLCollection.prototype.isPrototypeOf(e)&&(e=[...e]),e.forEach((e=>e.classList.remove("active")))},updateCardUI=e=>{const t=e.parentElement.children;var n;n=t,HTMLCollection.prototype.isPrototypeOf(n)&&(n=[...n]),n.forEach((e=>e.classList.remove("active"))),e.classList.add("active")},handleMethodChoice=e=>{method=e.dataset.method,disableGrindText(method),insertSummary()},handleCoffeeTypeChoice=e=>{coffeeType=e.dataset.coffeeType,insertSummary()},insertingPricingData=e=>{const{week:t,twoWeeks:n,month:a}=PRICING_DATA[e];weekPricing.textContent=`$${t.toFixed(2)}`,twoWeekPricing.textContent=`$${n.toFixed(2)}`,monthPricing.textContent=`$${a.toFixed(2)}`},handleQuantityChoice=e=>{quantity=e.dataset.quantity,insertingPricingData(quantity),insertSummary()},handleGrindChoice=e=>{grind=e.dataset.grind,insertSummary()},handleFrequencyChoice=e=>{frequency=e.dataset.delivery,insertSummary()},calcEndPrices=()=>{switch(frequency){case"week":return(4*PRICING_DATA[quantity].week).toFixed(2);case"2 weeks":return(2*PRICING_DATA[quantity].twoWeeks).toFixed(2);case"month":return(1*PRICING_DATA[quantity].month).toFixed(2);default:return"0.00"}},checkChoices=()=>""!==method&&""!==coffeeType&&""!==quantity&&("capsule"===method||""!==grind)&&""!==frequency,sectionHandlers=(e,t)=>{const n=e.target.closest(".subscribe--card__option");n&&(updateCardUI(n),t(n))},openModal=()=>{modal.classList.remove("hide"),overlay.classList.remove("hide"),modal.classList.add("show"),overlay.classList.add("show")},closeModal=()=>{modal.classList.remove("show"),overlay.classList.remove("show"),modal.classList.add("hide"),overlay.classList.add("hide")};methodSection.addEventListener("click",(e=>{const t=e.target.closest(".subscribe--card__option");t&&(method=t.dataset.method,disableGrindText(method),insertSummary(),updateCardUI(t),disableGrindSection(t))})),coffeeTypeSection.addEventListener("click",(e=>{sectionHandlers(e,handleCoffeeTypeChoice)})),quantitySection.addEventListener("click",(e=>{sectionHandlers(e,handleQuantityChoice)})),grindSection.addEventListener("click",(e=>{sectionHandlers(e,handleGrindChoice)})),deliveriesSection.addEventListener("click",(e=>{sectionHandlers(e,handleFrequencyChoice)})),overlay.addEventListener("click",closeModal),arrowBtns.forEach((e=>e.addEventListener("click",(e=>{const t=e.target.closest(".subscribe--card__button");t.classList.toggle("close");const n=t.nextElementSibling;var a;"true"===(a=n).getAttribute("data-collapsed")?(expandOption(a),a.setAttribute("data-collapsed","false")):collapseOption(a)})))),createPlanBtn.addEventListener("click",(function(){if(""!==method&&""!==coffeeType&&""!==quantity&&("capsule"===method||""!==grind)&&""!==frequency){modal.classList.remove("hide"),overlay.classList.remove("hide"),modal.classList.add("show"),overlay.classList.add("show"),modalSummaryText.innerHTML=summaryText.innerHTML;const e=document.querySelector(".end-price"),t=document.querySelector(".end-price-modal");e.innerHTML=calcEndPrices(),t.innerHTML=e.innerHTML}})),checkoutBtn.addEventListener("click",closeModal),document.addEventListener("keydown",(e=>{"Escape"===e.key&&closeModal()}));
//# sourceMappingURL=plan.js.map