const subscribe=document.querySelector(".subscribe"),cards=document.querySelectorAll(".subscribe--card__option");function removeClass(t,e){HTMLCollection.prototype.isPrototypeOf(t)&&(t=[...t]),t.forEach((t=>t.classList.remove(e)))}function collapseOption(t){const e=t.scrollHeight,s=t.style.transition;t.style.transition="",requestAnimationFrame((function(){t.style.height=e+"px",t.style.transition=s,requestAnimationFrame((function(){t.style.height="0px"}))})),t.setAttribute("data-collapsed","true")}function expandOption(t){const e=t.scrollHeight;t.style.height=e+"px",t.addEventListener("transitioned",(function(e){t.removeEventListener("transitioned",arguments.callee),t.style.height=null})),t.setAttribute("data-collapsed","false")}subscribe.addEventListener("click",(function(t){if(t.target.classList.contains("subscribe--card__img")){const e=t.target;e.classList.toggle("close");const s=e.nextElementSibling;"true"===s.getAttribute("data-collapsed")?(expandOption(s),s.setAttribute("data-collapsed","false")):collapseOption(s)}const e=t.target.closest(".subscribe--card__option");if(e&&t.target.closest(".subscribe--card__option").classList.contains("subscribe--card__option")){const t=e.parentElement,s=e.querySelector("h3").textContent;console.log(s),t&&(removeClass(t.children,"active"),e.classList.add("active"))}}));
//# sourceMappingURL=plan.js.map