<script>
  import { afterUpdate } from "svelte";

  export let rating;
  export let skill;
  export let skill_img;
  export let skill_text;

  let skill_active = false;

  let skillRoot;

  if (rating == 1) rating = "bad";
  else if (rating == 2) rating = "medium";
  else if (rating == 3) rating = "good";
  else rating = "medium";

  afterUpdate(() => {
    // @ts-ignore
    document.querySelector(".skill_active") ? (document.querySelector(".skill_active").style.transition = "transform 0.2s ease-in-out !important") : "";
  });
</script>

<article class="single-skill {rating}" class:skill_active bind:this={skillRoot}>
  <div class="single-skill-overlay">
    <figure><img src={skill_img} alt="skill logo" /></figure>
    <h3>{skill}</h3>
    <div class="skill-text">
      {#each skill_text as line}
        <p>{line}</p>
      {/each}
    </div>
  </div>
</article>

<style lang="scss">
  .single-skill {
    --skill-closed-width: 100px;
    --skill-closed-height: 100px;
    --skill-opened-width: 400px;
    --skill-opened-height: 400px;

    

    width: var(--skill-closed-width);
    height: var(--skill-closed-height);
    border-radius: calc(var(--skill-closed-width) / 2);

    position: absolute;

    opacity: 1;

    transform-origin: center center;

    &.good {
      background-color: var(--skill-good);
    }
    &.medium {
      background-color: var(--skill-medium);
    }
    &.bad {
      background-color: var(--skill-bad);
    }

    div.single-skill-overlay {
      width: var(--skill-closed-width);
      height: var(--skill-closed-height);

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      figure {
        display: flex;
        justify-content: center;
        align-items: center;

        width: var(--skill-closed-width);
        height: var(--skill-closed-height);
        min-width: var(--skill-closed-width);

        img {
          max-width: calc(var(--skill-closed-width) / 2);
          max-height: calc(var(--skill-closed-height) / 2);
          object-fit: cover;
          opacity: 1;
          transition: opacity 0.2s ease-in-out;
        }
      }

      h3 {
        animation: skill_text_show 0.4s alternate initial;
        display: none;
        opacity: 0;
      }
    }

    div.skill-text {
      animation: skill_text_show 0.4s alternate;
      display: none;
      opacity: 0;
    }
  }

  .single-skill:hover {
    overflow: hidden;
    z-index: 100;

    .single-skill-overlay {
      gap: 5px;

      figure {
        position: absolute;
        img {
          opacity: 0.2;
        }
      }

      h3 {
        opacity: 1;
        display: block;
        width: 100%;
        font-size: 9px;
        font-weight: 900;
        color: black;
        z-index: 101;
        margin-top: 1rem;
      }

      .skill-text {
        display: flex;
        opacity: 1;
        flex-direction: column;
        align-items: center;
        //text-align: left;

        z-index: 101;

        p {
          color: black;
          font-size: 4px;
          font-weight: 800;
          width: 80%;
        }
      }
    }
  }

  @keyframes skill_text_show {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0;
      transform: translateX(-100%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
</style>
