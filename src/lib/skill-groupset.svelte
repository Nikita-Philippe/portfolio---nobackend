<script>
  // @ts-nocheck
  import Skill from "./skill.svelte";

  import skills from "../data/skills.json";
  import { inview } from "svelte-inview";

  import { initSkills } from "../utils/skills";
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<section class="skill-caption">
  <div>
    <span class="skill-caption-icon good" />
    <p>Beaucoup utilisée</p>
  </div>
  <div>
    <span class="skill-caption-icon medium" />
    <p>Moyennement utilisée</p>
  </div>
  <div>
    <span class="skill-caption-icon bad" />
    <p>Peu utilisée</p>
  </div>
</section>
<section
  id="skill-set"
  class="set"
  use:inview={{ unobserveOnEnter: false, rootMargin: "-10%" }}
  on:change={({ detail }) => {
    if (detail.inView) {
      initSkills(15, 5000);
    }
  }}
>
  {#each skills as skill}
    <Skill skill={skill.lang} skill_img={skill.img} rating={JSON.stringify(skill.rating)} skill_text={skill.desc} />
  {/each}
</section>

<style lang="scss">
  section.skill-caption {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3rem;
    margin: 1rem;

    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.3rem;

      span {
        width: 10px;
        height: 10px;

        &.good {
          background-color: var(--skill-good);
        }
        &.medium {
          background-color: var(--skill-medium);
        }
        &.bad {
          background-color: var(--skill-bad);
        }
      }

      p {
        font-size: var(--caption-text-size);
        color: var(--txt-grey);
        font-style: italic;
      }
    }
  }

  section.set {
    // display: flex;
    // flex-wrap: wrap;
    // gap: 5rem;

    position: relative;

    margin-top: 3rem;
    width: 100%;
    height: 800px;

    transition: all 0.3s ease-in-out;
  }
</style>
