<script>
  import { getMenu } from "./cmdUtils.js";

  export let command;
  export let isActive;

  let focusedItem = null;
</script>

<div class="terminal__interface__cmdl menu {isActive ? 'menu-active' : ''} ">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <ul
    tabindex="-1"
    class="menu__wrapper"
    on:keydown|preventDefault={(e) => {
      if (e.key === "Enter") {
        if (focusedItem != null)
          // @ts-ignore
          return document.querySelector(".menu-active")?.querySelector(`#menu-item-${focusedItem}`)?.querySelector(".menu__wrapper__item__content")?.click();
      }
      if (focusedItem == null) focusedItem = 0;
      e.key === "ArrowUp" ? focusedItem-- : e.key === "ArrowDown" || e.key === "Tab" ? focusedItem++ : "";
      if (focusedItem < 0) focusedItem = getMenu().length - 1;
      if (focusedItem > getMenu().length - 1) focusedItem = 0;
      // @ts-ignore
      document.querySelector(".menu-active")?.querySelector(`#menu-item-${focusedItem}`)?.focus();
    }}
  >
    {#each getMenu() as item, index}
      <li tabindex="-1" id="menu-item-{index}" class="menu__wrapper__item">
        <span class="menu__wrapper__item__cursor">></span>
        <a
          class="menu__wrapper__item__content"
          href={void 0}
          on:click={() => {
            if (isActive)
              return (command = {
                error: false,
                menu: false,
                input: false,
                active: false,
                // @ts-ignore
                multiline: Array.isArray(item.content),
                // @ts-ignore
                content: { type: "text", speed: "none", delay: "none", text: item.content },
              });
            // @ts-ignore
          }}>{item.title}</a
        >
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  .menu {
    &:focus {
      outline: none;
    }

    &__wrapper {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      width: 100%;
      height: 100%;
      overflow: auto;

      &__item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        gap: 1rem;

        &__content {
          color: var(--terminal-command-color);

          &:hover {
            color: var(--terminal-command-color-hover);
          }
        }

        &__cursor {
          display: none;
          opacity: 0;
          transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
          top: -6%;

          color: var(--terminal-command-color-hover);
          font-weight: 900;
          font-size: 100%;
        }

        &:hover,
        &:focus {
          outline: none;

          .menu__wrapper__item__content {
            color: var(--terminal-command-color-hover);
          }

          .menu__wrapper__item__cursor {
            display: block;
            opacity: 1;
          }
        }
      }
    }
  }
</style>
