<script async>
  import { afterUpdate, onDestroy, onMount } from "svelte";
  import { getContext } from "svelte";
  import ProjectArticle from "./project-article.svelte";

  import { normalizeTags, updateFilterTag } from "../utils/tags";

  import { masonArticles } from "../utils/HTML";

  import { store_projects, store_filtered } from "./stores.js";

  import { inview } from "svelte-inview";

  let filenb, tags, isInView;

  const tagsLimit = 10;

  let filteredProjectsArray = [];

  const unsubscribe = store_filtered.subscribe((value) => {
    filteredProjectsArray = value;
  });
  onDestroy(unsubscribe);

  afterUpdate(() => {
    if (filteredProjectsArray && filteredProjectsArray.length > 0) masonArticles(null);
  });

  async function getProjects() {
    const modules = import.meta.glob("../news/*.md", { as: 'raw' });
    filenb = Object.keys(modules).length;
    const projects = [];
    tags = [];
    for (const path in modules) {
      const mod = await modules[path]();
      // @ts-ignore
      projects.push({ attributes: mod.attributes, html: mod.html });
      // @ts-ignore
      tags.push(mod.attributes.tags);
    }
    tags = normalizeTags(tags);
    store_projects.set(projects);

    return { projects, tags };
  }

  $: {
    const els = document.querySelectorAll(".single-project");
    if (isInView)
      els?.forEach((el) => {
        // @ts-ignore
        const elstyle = el.style;
        elstyle.opacity = 1;
        elstyle.visibility = "visible";
        elstyle.transform = "translateY(0)";
        el.addEventListener("transitionend", () => {
          elstyle.transform = "none";
          elstyle.transition = "all 0.5s ease-in-out";
        });
      });
    else
      els?.forEach((el) => {
        // @ts-ignore
        const elstyle = el.style;
        elstyle.opacity = 0;
        elstyle.visibility = "hidden";
        elstyle.transform = "translateY(1000%)";
      });
  }
</script>

<section class="project-groupset">
  {#await getProjects() then { projects, tags }}
    {#if filenb === projects.length}
      <section class="project-groupset__filters">
        <nav class="tags-nav">
          {#each Object.entries(tags)
            .sort((a, b) => b[1] - a[1])
            .slice(0, tagsLimit) as tag}
            <button
              class="single-filter hover-target"
              on:click={(e) => {
                updateFilterTag(e, tag[0]);
              }}><span class="single-filter__top">{tag[0]}</span></button
            >
          {/each}
        </nav>
      </section>
      <section
        use:inview={{ unobserveOnEnter: true, rootMargin: "-30%" }}
        on:change={({ detail }) => {
          isInView = detail.inView;
        }}
        use:masonArticles
        class="project-groupset__content grid_masonry "
      >
        <div class="grid__col-sizer" />
        <div class="grid__gutter-sizer" />
        {#each filteredProjectsArray as project}
          {#if project.html}
            <ProjectArticle content={project} />
          {/if}
        {/each}
      </section>
    {/if}
  {/await}
</section>

<style lang="scss">
  .project-groupset {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: auto;
  }

  .project-groupset__filters {
    margin: 2rem 0;
  }

  :global(.grid_masonry) {
    width: 100%;
  }

  :global(.grid__item, .grid__col-sizer) {
    width: 32%;
  }

  :global(.grid__gutter-sizer) {
    width: 2%;
  }
</style>
