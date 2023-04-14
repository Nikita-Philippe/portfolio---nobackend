<script>
  import svelteLogo from "../assets/icons/svelte.svg";
  import npLogo from "../assets/logo/logoTemp.jpg";

  import { onMount } from "svelte";
  import { cursor } from "../utils/HTML"

  import { alterttip } from "../utils/alerttip";
  import {simpleModal} from "../utils/simpleModal";
  
  onMount(() => {
    setTimeout(() => {cursor()}, 1000);
    alterttip(`Attention, ce site avec actuellement en beta (V.${__APP_VERSION__}) ! Certaines fonctionnalités peuvent donc ne pas fonctionner correctement.`, 2000, true, "50%");
    if (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()))
    simpleModal(`Attention, ce site n'est pas encore optimisé pour les mobiles !`, 1000);
  });
</script>

<footer>
  <p>
    Version {__APP_VERSION__}
    <a class="hover-target" href="/" on:click={(e) => { 
      e.preventDefault();
      simpleModal(`Version ${__APP_VERSION__} - 2021-2023`, 10, true, true);
    }}>@2023</a>- Crée avec
    <a href="https://svelte.dev/" class="logo-container hover-target"><img src={svelteLogo} class="logo svelte" alt="svelt logo" /></a>
    <a href="https://vitejs.dev/" class="logo-container hover-target"><img src="/vite.svg" class="logo vite" alt="svelt logo" /></a>
  </p>
  <figure class="np-logo hover-target">
    <img src={npLogo} alt="html logo" />
  </figure>
</footer>

<style lang="scss">

  footer {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 60px;
    width: 100%;

    position: absolute;
    left: 0;
    right: 0;

    background-color: var(--darker-background);

    p {
      gap: 0.5rem;
      font-size: 16px;
      color: var(--txt-grey);

      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      a {
        color: var(--txt-secondary);
        text-decoration: none;
        transition: 0.2s ease-in-out;

        &:hover {
          color: var(--link-txt-color-hover);
        }
      }

      a.logo-container {
        display: flex;
        align-items: center;
        justify-content: center;

        img:hover {
          filter: drop-shadow(0 2em 10em var(--link-txt-color-hover));
          overflow: visible;
        }
      }

      img {
        max-height: 20px;
      }
    }

    figure.np-logo {
      position: absolute;
      display: flex;
      align-items: center;
      right: 0;
      margin-right: 1rem;

      img {
        max-height: 20px;
      }
    }
  }
</style>
