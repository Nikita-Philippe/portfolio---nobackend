<script>
  import { afterUpdate } from "svelte";

  import { updateFilterTag } from "../utils/tags";

  import { getArticleSize } from "../utils/projects";

  import { getRandomInt } from "../utils/misc";

  import { getParsedProject, customizeHTML } from "../utils/projects";

  afterUpdate(() => {
    if (!container) container = document.querySelector(".project-groupset__content");
    
    // disable other active projects
    Array.from(container.querySelectorAll(".project_active")).forEach((el) => {
      el !== root && el.classList.remove("project_active");
    });

    if (project_active) {
      container.querySelectorAll(".single-project:not(.project_active)").forEach((el) => (el.style.opacity = "0"));

      root.addEventListener("transitionend", () => {container.style.height = root.offsetHeight + "px"
      root.querySelector(".article-content").style.opacity = "1"
    });
    } 
    else {
      container.querySelectorAll(".single-project").forEach((el) => (el.style.opacity = "1"));
      root.addEventListener("transitionend", () => {container.style.height = container.getAttribute("data-baseHeight")
    });
    }
  });

  export let id, metadata;

  let container 

  let root, size;
  let project_active = false;
  let loadProject = false;

  function activeProject(node) {
    customizeHTML(node)
    project_active = true;
  }
</script>

<article
  bind:this={root}
  class="single-project hover-target grid__item {getArticleSize().join(' ')}"
  class:project_active
  class:size
>
  <section class="article-header hover-target">
    <nav class="tags-nav tags-single-article">
      {#each metadata.tags as tag}
        <button
          class="single-filter hover-target"
          on:click={(e) => {
            updateFilterTag(e, tag);
          }}><span class="single-filter__top">{tag}</span></button
        >
      {/each}
    </nav>

    <section
      class="article-header-content hover-target"
      on:click={() => {
        if(loadProject) project_active = !project_active
        else 
          loadProject = true
      }}
      on:keypress={(e) => e.key === "Enter" && (loadProject = !loadProject)}
    >
      <div class="main-img">
        <img src={metadata.img} alt="" />
      </div>
      <div class="main-content">
        <div class="article-title">
          <h1>{metadata.title}</h1>
          <p>{metadata.description}</p>
        </div>
        <figure class="open-project">
          <svg class="open-project-icon" width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="2" y1="24.8787" x2="24.8787" y2="2" stroke="#555555" stroke-width="3" stroke-linecap="round" />
            <line x1="11.8995" y1="24.7781" x2="24.7782" y2="11.8994" stroke="#555555" stroke-width="3" stroke-linecap="round" />
            <line x1="21.799" y1="24.6778" x2="24.6777" y2="21.7991" stroke="#555555" stroke-width="3" stroke-linecap="round" />
          </svg>
        </figure>
      </div>
    </section>
  </section>

  {#if loadProject}
    {#await getParsedProject(id)}
      <section class="article-content loading">
            <h1>Loading...</h1>
      </section>
    {:then {parsedContent, initial}}
    <section use:activeProject class="article-content">
      {@html parsedContent}
    </section>
    {/await}
  {/if}

</article>

<style lang="scss">
  .single-project {
    position: absolute;

    $project-transition: 0.5s ease-in-out;

    transition: width $project-transition, height $project-transition, top $project-transition, left $project-transition;

    .article-content {
      display: none;
      opacity: 0;
    }

    .article-header {
      height: 100%;
      width: 100%;

      display: flex;
      flex-direction: column;

      .article-header-content {
        position: relative;

        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-between;
        width: 100%;

        background-size: cover;

        // TODO
        &:hover {
          .main-img {
            img {
              filter: brightness(0.8);
              -webkit-transform: translate3d(0,0,0);
              transform: perspective(1px) scale(1.2);
            }
          }
        }

        .main-img {
          position: absolute;
          width: 100%;
          height: 100%;

          overflow: hidden;
          border-radius: 5px;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            image-rendering: -webkit-optimize-contrast;

            //will-change: transform;
            transition: filter 0.2s ease-in-out, transform 0.2s ease-in-out;
            filter: brightness(0.6);
            transform: scale(1);
          }
        }

        .main-content {
          border-radius: 5px;

          z-index: 2;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;

          .article-title {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            gap: 0.5rem;

            padding: 1rem;

            height: fit-content;

            h1 {
              font-size: 24px;
              font-weight: 700;
              color: #ffffff;
              text-align: left;
            }

            p {
              text-align: left;
              margin-top: 1rem;
            }
          }

          .open-project {
            --icon-width: 40px;
            --icon-height: 40px;

            padding: 1rem;

            width: var(--icon-width);
            height: var(--icon-height);

            transition: all 0.2s ease-in-out;

            height: fit-content;

            &:hover {
              transform: scale(1.1);
            }

            .open-project-icon {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;

              width: var(--icon-width);
              height: var(--icon-height);
            }
          }
        }
      }
    }
  }

  .single-project.project_active {
    width: 100% !important;
    height: fit-content;

    display: flex;
    flex-direction: column;
    align-items: center;

    position: relative;

    left: 0 !important;
    top: 0 !important;
    z-index: 5;
    background-color: var(--background);

    box-shadow: 0px 25px 40px rgba(56, 56, 56, 0.15);

    .article-content {
      display: block;
      opacity: 1;

      width: 100%;

      line-height: 150%;
      text-align: justify;

      margin: 3rem 0;
    }

    .article-header {
      .article-header-content {
        .main-content {
          .article-title {
            h1 {
              font-size: 40px;
              font-weight: 900;
            }

            p {
              font-size: 24px;
              font-style: italic;
            }
          }
        }
      }
    }
  }

  // =================================================================
  // content
  :global(.article-single-element) {
    padding: 0 1rem;
  }

  :global(.article-content.text) {
    line-height: 150%;
    margin-bottom: 1rem;
  }

  :global(.article-content.htwo) {
    font-size: 26px;
    font-weight: 800;

    margin-top: 3rem;
    margin-bottom: 1rem;
  }

  :global(.article-content.hthree) {
    font-size: 20px;
    font-weight: 600;

    margin-top: 3rem;
    margin-bottom: 1rem;
  }

  :global(.article-content li) {
    font-size: 18px;
  }

  :global(.project-img-container) {
    width: fit-content;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
  }
  :global(.project-img-container img) {
    width: 100%;
    max-height: 500px;
    height: auto;
    object-fit: contain;
    border-radius: 5px;
  }
  :global(.project-img-container figcaption) {
    font-size: 14px;
    font-style: italic;
    margin-top: 0.5rem;
  }

  :global(.article-content pre) {
    width: fit-content;
    padding: 0.5rem;
    background-color: var(--lightgrey);
    color: black;
    overflow: auto;
    margin: 0 1rem;
    border-radius: 3px;
  }

  :global(.article-content code) {
    background-color: var(--lightgrey);
    color: black;
    padding: 0.2rem;
    margin: 0 0.2rem;
    font-family: "IBM plex mono";
    font-weight: 500;
    border-radius: 3px;
  }

  :global(.article-content strong) {
    font-weight: 900;
  }

  // =================================================================
  // Masonry
  :global(.grid__item) {
    margin-bottom: 20px;
    float: left;
  }

  :global(.grid__item--height1) {
    height: 200px;
    .article-header-content {
      height: 200px;
    }
  }
  :global(.grid__item--height2) {
    height: 300px;
    .article-header-content {
      height: 300px;
    }
  }
  :global(.grid__item--height3) {
    height: 400px;
    .article-header-content {
      height: 400px;
    }
  }
  :global(.grid__item--height4) {
    height: 500px;
    .article-header-content {
      height: 500px;
    }
  }
  :global(.grid__item--height5) {
    height: 600px;
    .article-header-content {
      height: 600px;
    }
  }

  :global(.grid__item--width2) {
    width: 66%;
  }

  // =================================================================
  // SPLIDE

  :global(.splide) {
    margin-bottom: 4rem;
  }

  :global(.splide__track) {
    overflow: hidden;
    position: relative;
    z-index: 0;
  }

  :global(.splide__list) {
    backface-visibility: hidden;
    display: flex;
    height: 100%;
    margin: 0 !important;
    padding: 0 !important;
  }

  :global(.splide__slide) {
    height: 100%;
    overflow: hidden;
    position: relative;
    z-index: 0;
  }

  :global(.splide__slide img) {
    object-fit: cover;
    filter: brightness(0.4);
    transition: filter 0.2s ease-in-out;
    width: 100%;
    height: 100%;
  }

  :global(.splide__slide.is-active img) {
    filter: brightness(1);
  }

  :global(.splide .splide__arrow) {
    background: none;
    font-size: 35px;
    opacity: 0.9;
  }

  :global(.splide .splide__arrow:hover svg) {
    filter: drop-shadow(0px 0px 5px rgb(255, 255, 255));
  }

  :global(.splide .splide__arrow--next) {
    right: 0em;
  }

  :global(.splide .splide__arrow--prev) {
    left: 0em;
  }

  :global(.splide .splide__arrow svg) {
    fill: white;
  }

  :global(.splide .splide__pagination) {
    display: flex !important;
    bottom: -2em;
  }

  :global(.splide .splide__pagination__page) {
    width: 14px;
    height: 14px;
    margin: 5px;
  }

  :global(.splide .splide__pagination__page:hover) {
    filter: drop-shadow(0px 0px 5px rgb(255, 255, 255));
  }
</style>
