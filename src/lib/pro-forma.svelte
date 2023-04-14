<script>
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { inview } from "svelte-inview";

  let isInView;

  export let content;
</script>

<div
  class="pro-wrapper"
  use:inview={{ unobserveOnEnter: true, rootMargin: "-30%" }}
  on:change={({ detail }) => {
    isInView = detail.inView;
  }}
>
  {#if isInView}
    <article class="single-pro" transition:fly={{ delay: content.delay, duration: 1000, x: content.slidePos, easing: quintOut }}>
      <h3>{content.title}</h3>
      {#if content.forma}
        <div class="content-container">
          <div class="infos">
            <p>{content.date}</p>
            <p>{content.location}</p>
          </div>

          <p class="pcontent">{@html content.pcontent}</p>
        </div>
      {:else}
        <div class="content-container">
          <div class="infos">
            <p>{content.type}</p>
            <p>{content.date}</p>
            <p>{content.location}</p>
          </div>

          <p class="pcontent">{content.pcontent}</p>
          <p class="content">{@html content.content}</p>
        </div>
      {/if}
    </article>
  {/if}
</div>

<style lang="scss">
  .single-pro {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    margin: 2rem 0;
    h3 {
      text-align: left;
      padding-bottom: 0.5rem;
    }

    .content-container {
      background-color: var(--darker-background);
      border-radius: 5px 5px 0 0;
      border-bottom: 4px solid;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 0.5rem;
      gap: 0.5rem;

      transition: all 0.2s ease-in-out;

      p {
        text-align: left;
      }

      .infos {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 1rem;

        p {
          color: var(--txt-grey);
          font-size: 15px;
          font-style: italic;
        }
      }

      .pcontent {
        font-size: 20px;
      }
    }
  }

  .single-pro:hover {
    p {
      color: var(--txt-secondary) !important;
    }

    .content-container {
      background-color: var(--white);
      border-bottom: 4px solid var(--black);
    }

    @media (prefers-color-scheme: light) {
      .content-container {
        background-color: var(--black) !important;
        border-bottom: 4px solid var(--white) !important;
      }
    }
  }
</style>
