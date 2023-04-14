import { store_alert } from "../lib/stores";
import { htmlToElem } from "./HTML";

store_alert.subscribe((value) => {
  if (!value) return;
  checkSingleAlert();
  setTimeout(() => {
    htmlToElem(`<figure class="alerttip ${value.right ? "right" : "left"}" style="top: ${value.pos}; opacity: 0;">
    <svg class="alerttip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
    <figcaption class="alerttip-label">
    ${value.msg}
    </figcaption>
    </figure>`).then((el) => {
      el = document.body.appendChild(el);
      el.setAttribute("data-labelWidth", el.querySelector(".alerttip-label").offsetWidth);
      el.style.transform = `translateX(${value.right ? "+" : "-"}${el.getAttribute("data-labelWidth")}px)`;
      el.style.transition = "all 0.3s ease-in-out";
      el.style.opacity = "1"
      el.addEventListener("mouseenter", () => (el.style.transform = `translateX(0)`));
      el.addEventListener("mouseleave", () => {
        el.style.transform = `translateX(${value.right ? "+" : "-"}${el.getAttribute("data-labelWidth")}px)`;
        setTimeout(() => {
          el.style.opacity = "0";
          el.addEventListener("transitionend", () => el.remove(), { once: true });
        }, 3000);
      });
    });
  }, value.delay);
});

export function alterttip(message, delay, right = true, pos) {
  store_alert.set({
    msg: message,
    delay: delay,
    right: right,
    pos: pos,
  });
}

function checkSingleAlert() {
  document.querySelectorAll(".alerttip")?.forEach((el) => el.addEventListener("transitionend", () => el.remove(), { once: true }));
  // @ts-ignore
  setTimeout(() => document.querySelectorAll(".alerttip").forEach((el) => (el.style.opacity = 0)), 0);
}
