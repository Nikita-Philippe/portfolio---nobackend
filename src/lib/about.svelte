<script>
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { inview } from "svelte-inview";

  import imgMe from "../assets/images/MOI.png";

  let isInView, imgRoot;
</script>

<section
  class="me-content"
  on:mouseenter={() => {
    imgRoot.style.filter = `grayscale(0%) drop-shadow(0px 0px 6px hsl(${Math.floor(Math.random() * 360)}, 100%, 80%)`;
  }}
  on:mouseleave={() => {
    imgRoot.style.filter = "grayscale(100%) drop-shadow(0px 0px 5px hsl(0, 0%, 0%)";
  }}
  use:inview={{ unobserveOnEnter: false, rootMargin: "-30%" }}
  on:change={({ detail }) => {
    isInView = detail.inView;
  }}
>
  <div class="me-txt">
    <p class="accentuate">Salut, moi c'est Nikita 👋.</p>
    <p>
      J'ai 21 ans et je passioné de technologies tels que la programmation, l'électronique, la mécanique, l'impression et le design 3d, le drone,
      l'informatique, l'édition photo et vidéo
    </p>
    <p>Comme vous pouvez le remarquer, j'adore découvrir et tester plein de nouvelles choses !</p>
    <p>Sur ce site vous pourrez donc retrouver la plupart de mes projets, avec toutes mes infos.</p>
  </div>
  <div class="me-img">
    {#if isInView}
      <img bind:this={imgRoot} src={imgMe} alt="me" transition:fly={{ delay: 500, duration: 1000, x: 400, easing: quintOut }} style="background-color: none;" />
    {/if}
  </div>
</section>

<style lang="scss">
  .me-content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 100%;
    height: 300px;

    .me-img {
      flex-grow: 1;
      height: 100%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        max-height: 300px;
        object-fit: contain;
        margin: 0.5rem 1rem 0 1rem;

        transition: filter 0.5s ease, background-color 0.5s ease;

        -webkit-filter: grayscale(100%);
        filter: grayscale(100%);
      }
    }

    .me-txt {
      max-width: 66%;

      transform: translateX(0);

      text-align: justify;

      background-color: var(--background-opacity);

      > * {
        &:first-child {
          margin-top: 0;
          padding-top: 1rem;
        }
        &:last-child {
          margin-bottom: 0;
          padding-bottom: 1rem;
        }
        margin: 1rem 0;
        padding: 0 1rem;
        line-height: 150%;
      }

      .accentuate {
        font-weight: 900;
        font-size: 25px;
      }
    }
  }
</style>
