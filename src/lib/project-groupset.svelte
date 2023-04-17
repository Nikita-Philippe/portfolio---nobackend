<script async>
  import { afterUpdate, onDestroy } from "svelte";
  import ProjectArticle from "./project-article.svelte";

  import { updateFilterTag } from "../utils/tags";

  import { store_filtered } from "./stores.js";

  import { inview } from "svelte-inview";

  import { getProjects, masonArticles } from "../utils/projects";

  import { gsap } from "gsap";

  let isInView;

  const tagsLimit = 10;

  let filteredProjectsArray = [];

const unsubscribe = store_filtered.subscribe((value) => filteredProjectsArray = value);
onDestroy(unsubscribe);

  afterUpdate(() => {
    if (filteredProjectsArray && filteredProjectsArray.length > 0) masonArticles(null);
  }
  );

  $: {
    const els = document.querySelectorAll(".single-project");
    if (isInView)
      els?.forEach((el) => {
        gsap.effects.projectAppearing(el);
      });
  }
</script>

<section class="project-groupset">
  {#await getProjects() then datas}
      <section class="project-groupset__filters">
        <nav class="tags-nav">
          {#each Object.entries(datas.tags)
            .sort((a, b) => b[1] - a[1])
            .slice(0, tagsLimit) as tag}
            <button
              class="single-filter hover-target"
              on:click={(e) => {
                updateFilterTag(e, tag[1]);
              }}><span class="single-filter__top">{tag[1]}</span></button
            >
          {/each}
        </nav>
      </section>
      <section
        use:inview={{ unobserveOnEnter: true, rootMargin: "10%" }}
        on:change={({ detail }) => {
          isInView = detail.inView;
        }}
        use:masonArticles
        class="project-groupset__content grid_masonry "
      >
        <div class="grid__col-sizer" />
        <div class="grid__gutter-sizer" />

        {#each filteredProjectsArray as project}
            <ProjectArticle id={project.id} metadata={project.metadata}/>
        {/each}
        
      </section>
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
