<script>
  export let content;
</script>

<div class="terminal__interface__cmdl multiline">
  {#each content.content.text as line}
    <!-- {#if line.text.title}
      <h3 class="terminal__interface__cmdl__title">{line.title}</h3>
    {/if} -->
    <div class="terminal__interface__cmdl__content">
      {#each line.text as singleLine}
        {#if singleLine.type === "title"}
          <h4 class="terminal__interface__cmdl__content__title">{singleLine.text}</h4>
        {/if}
        {#if singleLine.type === "date"}
          <p class="terminal__interface__cmdl__content__date">{singleLine.text}</p>
        {/if}
        {#if singleLine.type === "text"}
          <p class="terminal__interface__cmdl__content__text">{singleLine.text}</p>
        {/if}
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
  .terminal__interface__cmdl.multiline {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 1rem;

    position: relative;

    .terminal__interface__cmdl__content {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      margin-bottom: 1rem;

      .terminal__interface__cmdl__content__title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-right: 1rem;
      }

      .terminal__interface__cmdl__content__date {
        font-size: 1rem;
        font-weight: 400;
        margin-right: 1rem;
        color: var(--black);
      }
    }

    .terminal__interface__cmdl__content__text {
      font-size: 1rem;
      font-weight: 400;
      text-align: left;
      white-space: pre-line;
      margin-left: 0.5rem;
    }
  }
</style>
