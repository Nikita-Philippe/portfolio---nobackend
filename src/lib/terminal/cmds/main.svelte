<script>
  import SingleLine from "./single-line.svelte";
  import MultiLine from "./multi-line.svelte";
  import Input from "./input.svelte";
  import Menu from "./menu.svelte";

  import { scrollToElm } from "../../../utils/HTML";
  import { getInitialRunLines } from "./cmdUtils";

  var Commands = [
    {
      error: false,
      menu: false,
      input: true,
      active: true,
      multiline: false,
      content: { type: "text", speed: "none", delay: "none", text: "" },
    },
  ];

  let buffedCmd = null;

  $: {
    // @ts-ignore
    //document.querySelector(".menu-active > .menu__wrapper")?.focus();
    // initial command
    if (Commands[Commands.length - 1]?.input && !Commands[Commands.length - 1]?.active) {
      // @ts-ignore
      getInitialRunLines().forEach((cmd) => {
        // @ts-ignore
        Commands = [...Commands, { type: "initial", content: cmd }];
        if (cmd.clear) Commands = [];
      });

      Commands = [
        // @ts-ignore
        ...Commands,
        // @ts-ignore
        {
          menu: true,
          active: true,
        },
      ];
    }
    if (buffedCmd) {
      let tmp = buffedCmd;
      buffedCmd = null;
      Commands = [...Commands, tmp];

      Commands.forEach((cmd) => cmd.menu && cmd.active && (cmd.active = false));

      // @ts-ignore
      Commands = [...Commands, { menu: true, active: true }];
    }
    if (document.querySelector(".terminal__interface")?.childElementCount > 1)
      scrollToElm(document.querySelector(".terminal__interface"), document.querySelector(".terminal__interface")?.lastElementChild, 0.4);
  }
</script>

{#each Commands as command}
  {#if command.menu}
    <Menu bind:command={buffedCmd} isActive={command.active} />
  {:else if command.multiline}
    <MultiLine content={command} />
  {:else if command.input}
    <Input bind:content={command} />
  {:else}
    <SingleLine content={command} />
  {/if}
{/each}

<style lang="scss">
  :global(.terminal__interface__cmdl__pwd) {
    color: var(--terminal-pwd);
  }
</style>
