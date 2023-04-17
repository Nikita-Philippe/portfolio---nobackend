import { store_modal } from "../lib/stores";
import { htmlToElem } from "./HTML";

import { marked } from "marked";

store_modal.subscribe(async (value) => {
  if (!value) return;

  checkSingleModal();
  
  if (value.fullpage) {
    let msg
    if(value.terms) msg = await getTerms()
    else msg = value.msg
    htmlToElem(`<aside class="simple-modal fullpage ${value.terms ? "terms" : ""}"><p class="simple-modal__content">${msg}</p></aside>`).then((el) => {
      el = document.body.appendChild(el);

      window.scrollTo(0, 0);
      el.addEventListener("click", () => {
        el.style.opacity = "0";
        el.addEventListener("transitionend", () => el.remove(), { once: true });
      });
    });
    return;
  }

  setTimeout(() => {
    htmlToElem(
      `<aside class="simple-modal"><p class="simple-modal__content">${value.msg}</p><button class="simple-modal__dismiss">Compris !</button></aside>`
    ).then((el) => {
      el = document.body.appendChild(el);
      el.querySelector(".simple-modal__dismiss").addEventListener("click", () => {
        el.style.opacity = "0";
        el.addEventListener("transitionend", () => el.remove(), { once: true });
      });
    });
  }, value.delay);
});

export function simpleModal(message, delay, fullpage = false, terms = false) {
  store_modal.set({
    msg: message,
    delay: delay,
    fullpage: fullpage,
    terms: terms,
  });
}

function checkSingleModal() {
  document.querySelectorAll(".simple-modal")?.forEach((el) => el.addEventListener("transitionend", () => el.remove(), { once: true }));
  // @ts-ignore
  setTimeout(() => document.querySelectorAll(".simple-modal").forEach((el) => (el.style.opacity = 0)), 0);
}

async function getTerms() {
  // @ts-ignore
  const rawTerms = await import.meta.glob('../data/terms.md', { as: 'raw' })['../data/terms.md']()
  return marked.parse(rawTerms);
}
