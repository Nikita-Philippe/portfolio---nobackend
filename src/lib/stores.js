import { writable, derived } from "svelte/store";

export const store_tags = writable([]);
export const store_projects = writable([{}]);
export const store_filtered = derived([store_projects, store_tags], ([$projects, $tags]) => {
  if ($tags.length === 0) return $projects;
  else return $projects.filter((project) => project.attributes.tags.some((tag) => $tags.includes(tag)));
});

// store_filtered.subscribe((value) => {
//   if (value.length > 0) return console.log(`projects found: ${value.length}`);
// });

export const store_tooltip = writable(null);
export const store_alert = writable(null);
export const store_modal = writable(null);