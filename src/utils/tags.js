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

  if (!el.classList.contains("tag-active")) {
    store_tags.update((tags) => [...tags, tag]);
    updateTagsClasses(tag, "add");
    return el.classList.add("tag-active");
  } else {
    store_tags.update((tags) => tags.filter((t) => t !== tag));
    updateTagsClasses(tag, "del");
    return el.classList.remove("tag-active");
  }
}

function updateTagsClasses(tag, action) {
  const els = document.querySelectorAll(".single-filter");
  els.forEach((el) => {
    // @ts-ignore
    if (el.innerText === tag) {
      if (action === "add") el.classList.add("tag-active");
      else el.classList.remove("tag-active");
    }
  });
}
