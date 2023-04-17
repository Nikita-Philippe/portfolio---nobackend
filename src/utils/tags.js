import { compareTwoStrings } from "string-similarity";

import { store_tags } from "../lib/stores.js";

export function normalizeTags(tags) {
  let tagsObject = {};
  tags.flat().forEach((tag, index) => {
    //tag = tag.toLowerCase();

    let savedkey;

    // for (const [key, value] of Object.entries(tagsObject)) {
    //     if (compareTwoStrings(tag, key) > 0.8) savedkey = key;
    // }

    savedkey ? savedkey : (savedkey = tag);

    tagsObject[savedkey] ? (tagsObject[savedkey] += 1) : (tagsObject[savedkey] = 1);
  });
  return tagsObject;
}

export function updateFilterTag(event, tag) {
  const el = event.target;
  Array.from(document.querySelectorAll(".project_active")).forEach((el) => {
    el.classList.remove("project_active");
  });

  if (!el.classList.contains("tag-active")) {
    store_tags.update((tags) => [...tags, tag]);
    el.classList.add("tag-active");
    updateTagsClasses(tag, "add");
  } else {
    store_tags.update((tags) => tags.filter((t) => t !== tag));

    el.classList.remove("tag-active");
    updateTagsClasses(tag, "del");
  }
}

function updateTagsClasses(tag, action) {
  setTimeout(() => {
  const els = document.querySelectorAll(".single-filter");
  els.forEach((el) => {
    // @ts-ignore
    if (el.innerText === tag) {
      if (action === "add") el.classList.add("tag-active");
      else el.classList.remove("tag-active");
    }
    // @ts-ignore
    document.querySelectorAll(".single-project").forEach((el) => (el.style.opacity = "1"));
  });
  }, 10);
}
