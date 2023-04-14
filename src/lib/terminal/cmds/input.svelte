<script>
  import { getInitial } from "./cmdUtils";

  const baseCmd = { cmd: getInitial(), currLength: 0 };

  export let content;
  let value = "";

  const activate = (node) => (node.contenteditable = content.active);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="terminal__interface__cmdl input hover-target"
  on:click={() => {
    // @ts-ignore
    document.querySelector(".terminal__interface__cmdl__input.active-input")?.focus();
  }}
>
  <span class="terminal__interface__cmdl__pwd">~/portfolio $</span>
  {#if content.active}
    <p
      contenteditable="true"
      use:activate
      class="terminal__interface__cmdl__input active-input"
      bind:innerHTML={value}
      on:keydown|preventDefault={(e) => {
        if (e.key === "Backspace" && baseCmd.currLength > 0) baseCmd.currLength -= 2;
        if (value != baseCmd.cmd && e.key === "Enter") return;
        value = baseCmd.cmd.slice(0, baseCmd.currLength);
        if (value == baseCmd.cmd && e.key === "Enter") {
          content.active = false;
          content.content.text = value;
          return;
        }
        baseCmd.currLength++;
        return;
      }}
    />
    <span class="terminal__interface__cmdl__input_cursor" dir="rtl" />
    {#if baseCmd.currLength == 0}
      <span class="terminal__interface__cmdl__input_hint">Essayez de taper une commande...</span>
    {/if}
  {:else}
    <p class="terminal__interface__cmdl__input">{content.content.text}</p>
  {/if}
</div>

<style lang="scss">

  .terminal__interface__cmdl.input {
    display: flex;
    margin-top: 1rem;

    width: 100%;

    .terminal__interface__cmdl__pwd {
      white-space: nowrap;
    }

    .terminal__interface__cmdl__input {
      width: fit-content;

      margin-left: 13px;

      border: none;
      outline: none;

      text-align: left;

      background-color: transparent;
      z-index: 2;
      caret-color: transparent;
    }

    .terminal__interface__cmdl__input_cursor {
      width: 12px;
      height: 22px;

      opacity: 1;
      background-color: #e4e4e4;
      animation: pulseAttention 1s cubic-bezier(0, -1.12, 1, 1.74) infinite;
    }

    .terminal__interface__cmdl__input_hint {
      height: 22px;
      margin-left: 1rem;

      opacity: 1;
      font-size: 16px;
      color: var(--txt-grey);
      animation: pulseAttention 5s ease-in infinite;
    }

    @keyframes pulseAttention {
      50% {
        opacity: 0;
      }
    }
  }
</style>
