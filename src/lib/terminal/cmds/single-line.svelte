<script>
  export let content;

  let lineObj;
  $: content.type == "initial" ? (lineObj = content.content) : (lineObj = content.content.text);

  function scrollToLink(node) {
    document.getElementById(lineObj.link).scrollIntoView({
      behavior: "smooth",
    });
  }

</script>

<div class="terminal__interface__cmdl single-line" style={content.type == "initial" ? "margin: 0 1rem" : ""}>
  <div class="terminal__interface__cmdl__content" style={lineObj.speed == "speed-quick" ? "margin: 0" : ""}>
    {#if lineObj.type === "title"}
      <h4 class="terminal__interface__cmdl__content__title">{lineObj.text}</h4>
    {/if}
    {#if lineObj.type === "date"}
      <p class="terminal__interface__cmdl__content__date">{lineObj.text}</p>
    {/if}
    {#if lineObj.type === "text" || !lineObj.type}
      <p class="terminal__interface__cmdl__content__text {lineObj.size}">{lineObj.text}</p>
    {/if}
    {#if lineObj.type === "ascii"}
      <pre class="terminal__interface__cmdl__content__ascii">
         ___           ___           ___           ___           ___           ___           ___                   ___     
        /\  \         /\  \         /\  \         /\  \         /\  \         /\  \         /\__\      ___        /\  \    
       /::\  \       /::\  \       /::\  \        \:\  \       /::\  \       /::\  \       /:/  /     /\  \      /::\  \   
      /:/\:\  \     /:/\:\  \     /:/\:\  \        \:\  \     /:/\:\  \     /:/\:\  \     /:/  /      \:\  \    /:/\:\  \  
     /::\~\:\  \   /:/  \:\  \   /::\~\:\  \       /::\  \   /::\~\:\  \   /:/  \:\  \   /:/  /       /::\__\  /:/  \:\  \ 
    /:/\:\ \:\__\ /:/__/ \:\__\ /:/\:\ \:\__\     /:/\:\__\ /:/\:\ \:\__\ /:/__/ \:\__\ /:/__/     __/:/\/__/ /:/__/ \:\__\
    \/__\:\/:/  / \:\  \ /:/  / \/_|::\/:/  /    /:/  \/__/ \/__\:\ \/__/ \:\  \ /:/  / \:\  \    /\/:/  /    \:\  \ /:/  /
         \::/  /   \:\  /:/  /     |:|::/  /    /:/  /           \:\__\    \:\  /:/  /   \:\  \   \::/__/      \:\  /:/  / 
          \/__/     \:\/:/  /      |:|\/__/     \/__/             \/__/     \:\/:/  /     \:\  \   \:\__\       \:\/:/  /  
                     \::/  /       |:|  |                                    \::/  /       \:\__\   \/__/        \::/  /   
                      \/__/         \|__|                                     \/__/         \/__/                 \/__/    
      </pre>
    {/if}
    {#if lineObj.type === "link"}
      <a class="terminal__interface__cmdl__content__link" href={`#${lineObj.link}`} use:scrollToLink>{lineObj.text}</a>
    {/if}
  </div>
</div>

<style lang="scss">
  .terminal__interface__cmdl.single-line {
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
      max-width: 100%;

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

      .terminal__interface__cmdl__content__ascii {
        width: 100%;
        font-size: 11px;
        font-weight: 900;
        letter-spacing: -0.07em;
      }

      .terminal__interface__cmdl__content__link {
        color: var(--white);
        text-decoration: underline;

        transition: color 0.2s ease-in-out;

        &:hover {
          color: var(--terminal-command-color);
        }
      }

      .terminal__interface__cmdl__content__text {
        font-size: 1rem;
        font-weight: 400;
        text-align: left;
        white-space: pre-line;
        margin-left: 0.5rem;
      }

      .font-large {
        font-size: 2.8rem;
        font-weight: 900;
      }
    }
  }
</style>
