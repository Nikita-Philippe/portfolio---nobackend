<script>
  import TerminalIcon from "./terminal-icon.svelte";
  import TerminalHeader from "./header.svelte";

  import CommandLines from "./cmds/main.svelte";

  import { afterUpdate, onMount } from "svelte";

  let openTerm = false;

  let left = 100;
  let top = 200;
  let moving = false;
  let terminalRoot, homeRoot;

  afterUpdate(() => {
    // @ts-ignore
    if (openTerm) document.querySelector(".terminal__interface__cmdl__input.active-input")?.focus();
  });

  onMount(() => {
    left = (window.innerWidth - terminalRoot.clientWidth) / 2;
    top = (homeRoot.clientHeight - terminalRoot.clientHeight) / 2 + 100;
  });
</script>

<div bind:this={homeRoot} class="home-container">
  <TerminalIcon bind:openTerm />
  <main bind:this={terminalRoot} id="draggable" style="left: {left}px; top: {top}px;" class="terminal dark-theme" class:openTerm>
    <TerminalHeader bind:openTerm bind:moving />
    <section class="terminal__interface">
      <CommandLines />
    </section>
  </main>
</div>
<svelte:window
  on:mouseup={() => (moving = false)}
  on:mousemove={(e) => {
    if (moving) {
      if (left + e.movementX > 0 && left + terminalRoot.clientWidth + e.movementX <= window.innerWidth - 15) left += e.movementX;
      if (top + e.movementY > 0 + 100 && top + terminalRoot.clientHeight + e.movementY <= homeRoot.clientHeight) top += e.movementY;
    }
  }}
/>

<style lang="scss">

  .terminal {
    &.dark-theme {
      .terminal__interface {
        background-color: var(--terminal-dark-background-opacity);

        span:not(.terminal__interface__cmdl__pwd),
        p,
        input {
          color: var(--terminal-dark-txt-color);
        }
      }

      .terminal__interface__cmdl__pwd {
        color: var(--terminal-dark-pwd-color);
      }
    }

    // .terminal__interface {
    //   transition: background-color 0.5s ease-in-out;
    //   background-color: var(--terminal-light-background-opacity;

    //   span:not(.terminal__interface__cmdl__pwd),
    //   p,
    //   input {
    //     transition: color 0.5s ease-in-out;
    //     color: var(--terminal-light-txt-color;
    //   }
    // }

    // .terminal__interface__cmdl__pwd {
    //   transition: color 0.5s ease-in-out;
    //   color: var(--terminal-light-pwd-color;
    // }
  }

  .terminal {
    visibility: hidden;
  }

  .openTerm {
    visibility: visible;
  }

  .home-container {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .terminal {
      min-width: 800px;
      min-height: 400px;

      width: 800px;
      height: 400px;

      resize: both;

      border-radius: 5px;

      overflow: hidden;

      padding-bottom: 3.2rem;

      .terminal__interface {
        height: 100%;
        max-width: 100%;

        padding: 0 1rem;
        padding-bottom: 1rem;

        backdrop-filter: blur(5px);

        overflow-y: scroll;
      }
    }
  }

  :global(.terminal__interface__cmdl) {
    &:first-child {
      padding-top: 1rem;
    }
  }
</style>
