<script>
  import terminalIcon from "../../assets/icons/TerminalIcon.svg";

  import { toolTip } from "../../utils/tooltip.js";

  let moving = false;
  let left = 400,
    top = 400;

  export let openTerm = false;
</script>

<div
  id="draggable"
  class:openTerm
  class="terminal-app-icon cursor-move hover-target"
  on:mousedown={() => (moving = true)}
  style="left: {left}px; top: {top}px;"
  on:dblclick={() => {
    return (openTerm = !openTerm);
  }}
  on:mouseenter={(e) => toolTip(e, "Double click to open the terminal")}
  on:mouseleave={(e) => toolTip()}
>
  <img src={terminalIcon} alt="Terminal icon" />
  <div class="terminal-app-icon__text">Terminal</div>
  <span class="terminal-app-icon__notif" />
</div>
<svelte:window
  on:mouseup={() => (moving = false)}
  on:mousemove={(e) => {
    if (moving) {
      left += e.movementX;
      top += e.movementY;
    }
  }}
/>

<style lang="scss">
  .terminal-app-icon {
    width: 60px;
    height: 60px;

    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;

    transition: transform 0.3s ease-in-out;

    img {
      pointer-events: none;
      width: 100%;
    }

    .terminal-app-icon__text {
      position: absolute;
      bottom: -30px;
      color: white !important;
    }

    .terminal-app-icon__notif {
      position: absolute;

      width: 20px;
      height: 20px;

      border-radius: 50%;

      background-color: red;

      left: 70%;
      bottom: 70%;

      animation: blink 1s ease-in-out infinite;

      @keyframes blink {
        0%,
        100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.5);
        }
      }
    }

    &:hover {
      transform: scale(1.1);
    }
  }

  .terminal-app-icon.openTerm {
    display: none;
  }
</style>
