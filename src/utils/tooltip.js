import { get } from "svelte/store";
import { store_tooltip } from "../lib/stores";

store_tooltip.subscribe((value) => {
  if (document.querySelector(".tooltip")) checkZombieToolTips();

  setTimeout(() => {
    if (get(store_tooltip) !== null) {
      if (value === null) return checkZombieToolTips();
      const offsetPos = 20;
      const targetPos = value.event.target.getBoundingClientRect();
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.style.left = targetPos.right + offsetPos + "px";
      tooltip.style.top = targetPos.top - offsetPos + "px";
      tooltip.textContent = value.msg;
      // add the tooltip to the page
      document.body.appendChild(tooltip);
    }
    return;
  }, 200);
});

export function toolTip(event, message = null) {
  message ? store_tooltip.set({ event: event, msg: "Double click to open Terminal." }) : store_tooltip.set(null);
}

export function checkZombieToolTips() {
  document.querySelectorAll(".tooltip")?.forEach((el) => el.classList.add("tooltip--hide"));
  return document.querySelector(".tooltip")?.addEventListener("transitionend", () => document.querySelector(".tooltip")?.remove());
}
