<script>
  import { onMount, afterUpdate } from "svelte";
  import Icon from "svelte-awesome";
  import search from "svelte-awesome/icons/search";

  import FlagFR from "../assets/flags/fr.svg";
  import FlagEN from "../assets/flags/us.svg";

  export let logo = "logo";

  let languages = [
    { id: 1, logo: `${FlagFR}`, text: `Français` },
    { id: 2, logo: `${FlagEN}`, text: `English` },
  ];
  let langSelected = false;

  let search_active = false;

  let customPointer = true;

  onMount(() => {
    // @ts-ignore
    window.dark = JSON.parse(localStorage.getItem("dark_theme"));
    // @ts-ignore
    window.dark ? document.documentElement.classList.remove("light-mode") : document.documentElement.classList.add("light-mode");
  });
</script>

<header>
  <nav class="headernav-toggles hover-target">
    <a href="/" class="headerlogo">
      <img src={logo} alt="Svelte Logo" />
    </a>

    <svg class="hint-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
      ><path
        d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L370.7 256 233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L178.7 256 41.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"
      /></svg
    >

    {#if langSelected}
      <select class="language-switch" bind:value={langSelected}>
        {#each languages as language}
          <option value={language}>
            <img src={language.logo} alt={language.text} />
            {language.text}
          </option>
        {/each}
      </select>
    {/if}

    <label class="color-scheme-switch">
      <input
        class="color-scheme-switch_checkbox"
        type="checkbox"
        checked={window.dark}
        on:click={(e) => {
          // @ts-ignore
          window.dark = e.target.checked;
          // @ts-ignore
          window.dark ? document.documentElement.classList.remove("light-mode") : document.documentElement.classList.add("light-mode");
          // @ts-ignore
          localStorage.setItem("dark_theme", JSON.stringify(window.dark));
        }}
      />
      <span class="color-scheme-switch_slider" />
    </label>

    <label class="cursor-switch">
      <input
        type="checkbox"
        checked={customPointer}
        on:click={(e) => {
          customPointer = !customPointer;
          customPointer
            ? document.getElementsByTagName("body")[0].classList.remove("os-default-cursor")
            : document.getElementsByTagName("body")[0].classList.add("os-default-cursor");
        }}
      />
      <div class="checkmark" />
    </label>
  </nav>

  <nav class="headernav-links">
    <ul>
      <li><a class="hover-target" href="#projets">Projets</a></li>
      <li><a class="hover-target" href="#about">À propos</a></li>
      <li><a class="hover-target" href="#infos">Infos</a></li>
    </ul>
  </nav>
  <figure class="headersearch hover-target">
    <input type="text" class="searchbar" class:search_active />
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <figure class="search-icon" on:click={() => (search_active = !search_active)}>
      <Icon data={search} scale={1.5} />
    </figure>
  </figure>
</header>

<style lang="scss">
  header {
    height: var(--Header-height);
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .headernav-toggles {
      display: flex;
      align-items: center;
      z-index: 2;
      gap: 1rem;
      overflow: hidden;

      & > *:not(.headerlogo, .hint-icon) {
        transition: transform 0.3s ease-in-out;
        transform: translateX(-500%);
      }

      &:hover > *:not(.headerlogo) {
        transform: translateX(0);
      }

      &:hover {
        .hint-icon {
          visibility: hidden;
          opacity: 0;
        }
      }

      .headerlogo {
        float: left;
        display: flex;
        align-items: center;
        z-index: 4;
        img {
          height: 40px;
          padding: 0;
        }
      }

      .hint-icon {
        position: absolute;
        height: 20px;
        width: 20px;
        opacity: 1;
        visibility: visible;
        left: 45px;
        transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
        animation: hint 1s ease-in-out infinite alternate;
        @keyframes hint {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(5px);
          }
        }
      }

      .language-switch {
        option {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          img {
            height: 20px;
            width: 20px;
          }
        }
      }

      .color-scheme-switch {
        --width-of-switch: 3em;
        --height-of-switch: 1.6em;
        --size-of-icon: 1em;
        --slider-offset: 0.3em;
        position: relative;
        width: var(--width-of-switch);
        height: var(--height-of-switch);
        display: block;
        z-index: 3;

        .color-scheme-switch_checkbox {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .color-scheme-switch_slider {
          position: absolute;

          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #f4f4f5;
          transition: 0.4s;
          border-radius: 30px;

          &:before {
            position: absolute;
            content: "";
            height: var(--size-of-icon, 1.4em);
            width: var(--size-of-icon, 1.4em);
            border-radius: 20px;
            left: var(--slider-offset, 0.3em);
            top: 50%;
            transform: translateY(-50%);
            background: linear-gradient(40deg, #ff0080, #ff8c00 70%);
            transition: 0.4s;
          }
        }

        .color-scheme-switch_checkbox:checked + .color-scheme-switch_slider {
          background-color: #303136;

          &:before {
            left: calc(100% - (var(--size-of-icon, 1.4em) + var(--slider-offset, 0.3em)));
            background: #303136;
            box-shadow: inset -3px -2px 5px -2px #8983f7, inset -10px -4px 0 0 #a3dafb;
          }
        }
      }

      .cursor-switch {
        border-radius: 9px;
        display: block;
        position: relative;

        font-size: 20px;
        user-select: none;
        box-shadow: rgba(139, 18, 113, 0.2) 0px 8px 24px;
        background-image: linear-gradient(45deg, #f3d5f7, #fbf6e7, #e6fcf5);

        input {
          position: absolute;
          opacity: 0;

          height: 0;
          width: 0;
        }

        input:checked ~ .checkmark:after {
          display: block;
        }

        .checkmark {
          border-radius: 9px;
          position: relative;
          top: 0;
          left: 0;
          height: 1.3em;
          width: 1.3em;
          background-color: linear-gradient(45deg, #f8e7fa, #fbf6e7, #e6fcf5);

          &:after {
            content: "";
            position: absolute;
            display: none;

            left: 0.45em;
            top: 0.25em;
            width: 0.25em;
            height: 0.5em;
            border: solid rgb(233, 182, 182);
            border-width: 0 0.15em 0.15em 0;
            transform: rotate(45deg);
          }
        }
      }
    }

    .headernav-links {
      position: absolute;
      width: 100%;

      display: flex;
      align-items: center;
      justify-content: space-between;

      ul {
        display: flex;
        justify-content: space-between;
        gap: 2rem;
        padding: 0;
        list-style: none;

        margin: 0 auto;
        li {
          display: flex;
          align-items: center;
          justify-content: center;
          a {
            text-decoration: none;
            color: var(--white);
            font-size: 20px;
            transition: all 0.2s ease-in-out;
            border-bottom: 1px solid transparent;

            &:hover {
              color: var(--link-txt-color);
              border-bottom: 3px solid var(--link-txt-color);
            }
          }
        }
      }
    }

    .headersearch {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: auto;
      height: fit-content;
      visibility: hidden;

      .search-icon {
        height: fit-content;
        display: flex;
        align-items: center;

        z-index: 99;

        max-height: 20px;
      }

      .searchbar {
        //display: none;
        width: 200px;
        height: 100%;
        font-size: 20px;

        transition: all 0.2s ease-in-out;
        opacity: 0;
        visibility: hidden;

        border: none;
        border-bottom: 3px solid white;
        padding: 0.5rem 0;
        margin-right: 1rem;
        backdrop-filter: blur(10px);
        background: none;

        &:focus {
          outline: none;
        }
      }

      .searchbar.search_active {
        transition: all 0.2s ease-in-out;

        //display: block;
        opacity: 1;
        visibility: visible;
      }
    }
  }
</style>
