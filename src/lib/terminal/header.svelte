<script>
  export let openTerm, moving;
</script>

<header class="terminal__header cursor-move" on:mousedown={() => (moving = true)}>
  <div
    class="terminal__header__button terminal__header__button__red hover-target"
    on:click={() => {
      return (openTerm = !openTerm);
    }}
    on:keydown={(event) => {
      if (event.key === "Enter") return (openTerm = !openTerm);
    }}
  />
  <div
    class="terminal__header__button terminal__header__button__yellow hover-target"
    on:click={() => {
      return (openTerm = !openTerm);
    }}
    on:keydown={(event) => {
      if (event.key === "Enter") return (openTerm = !openTerm);
    }}
  />
  <div
    class="terminal__header__button terminal__header__button__green hover-target"
    on:click={() => {
      // @ts-ignore
      document.querySelector(".terminal").style.width = "80%";
      // @ts-ignore
      document.querySelector(".terminal").style.height = "80%";
    }}
    on:keydown={(event) => {
      if (event.key === "Enter") return (openTerm = !openTerm);
    }}
  />
</header>

<style lang="scss">
  @use "../../styles/colors.scss";

  :global(.terminal.dark-theme) {
    .terminal__header {
      background-color: var(--terminal-dark-background);
    }
  }

  .terminal__header {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    gap: 13px;

    height: 36px;
    width: 100%;

    transition: background-color 0.5s ease-in-out;
    background-color: var(--terminal-light-background);

    .terminal__header__button {
      width: 13px;
      height: 13px;
      border-radius: 50%;

      &:first-child {
        margin-left: 13px;
      }

      &__red {
        background-color: #fe5d56;

        position: relative;
        overflow: hidden;

        &::before {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          width: 15%;
          height: 50%;
          opacity: 0;
          background: #222;
          transition: 300ms;
        }
        &::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          width: 15%;
          opacity: 0;
          height: 50%;
          background: #222;
          transition: 300ms;
        }
        &:hover::before,
        &:hover::after {
          opacity: 1;
          top: 50%;
        }
      }

      &__yellow {
        background-color: #fcbb2d;

        position: relative;
        overflow: hidden;

        &::before {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 50%;
          height: 10%;
          opacity: 0;
          background: #222;
          transition: 300ms;
        }
        &:hover::before {
          opacity: 1;
          top: 50%;
        }
      }

      &__green {
        background-color: #26c83f;

        position: relative;
        overflow: hidden;

        &::before {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 45%;
          height: 45%;
          opacity: 0;
          background: #222;
          transition: 300ms;
        }
        &::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          width: 15%;
          height: 80%;
          opacity: 0;
          background: #39ea49;
          transition: 300ms;
        }
        &:hover::before,
        &:hover::after {
          opacity: 1;
          top: 50%;
        }
      }
    }
  }
</style>
