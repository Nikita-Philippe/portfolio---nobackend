<script>
  import Icon from "svelte-awesome";
  import { send, repeat } from "svelte-awesome/icons";

  import axios from "axios";

  import monCV from "../assets/files/CV-NP.pdf";

  let key = "",
    showInfo = false,
    loadIcon = false;

  async function getFileSize(url) {
    return await fetch(url).then((res) => {
      return Math.round((parseInt(res.headers.get("Content-Length")) / 1048576) * 10) / 10;
    });
  }

  async function checkKey() {
    try {
      loadIcon = true;
      if (import.meta.env.VITE_INFOS_AUTHS.split(" ").includes(key)) {
        loadIcon = false;
        return (showInfo = true);
      }

      if (key.includes("@")) {
        loadIcon = showInfo = false;
        key = "";
        return alert(`Désolé, mais l'accès par mail n'est pas encore disponible. Merci de me contacter pour obtenir une clé.`);
      }
      
      if (!new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm").test(key)) {
        loadIcon = showInfo = false;
        key = "";
        return alert(`Mail introuvable. Merci de réessayer.`);
      }

      const response = await axios.post(`/mail-check`, { emails: [key] });
      if (response.data?.results[0]?.result?.score > 2) {
        loadIcon = false;
        return (showInfo = true);
      }
      loadIcon = showInfo = false;
      key = "";
      return alert(`Erreur serveur. Merci de réessayer.`);
    } catch (err) {
      loadIcon = showInfo = false;
      key = "";
      return alert(`Mail introuvable. Merci de réessayer.`);
    }
  }
</script>

<section class="infos-content">
  <div class="access hover-target">
    <p>Veuillez renseigner une clé pour accéder à cette section:</p>
    <input type="text" bind:value={key} on:keydown={(e) => (e.key === "Enter" ? checkKey() : "")} />
    {#if loadIcon}
      <button><Icon class="loop-icon" data={repeat} /></button>
    {:else}
      <button on:click={checkKey}><Icon data={send} /></button>
    {/if}
  </div>
  <div class="contact">
    {#if showInfo}
      <p>Adresse mail: <a class="hover-target" href="mailto:nikita.philippe1@gmail.com">nikita.philippe1@gmail.com</a></p>
      <p>Numéro de téléphone: <a class="hover-target" href="tel:06 89 98 71 30">06 89 98 71 30</a></p>
      {#await getFileSize(monCV)}
        <p>
          Chargement du CV... <Icon class="loop-icon" data={repeat} />
        </p>
      {:then fileSize}
        <p class="file-download">
          Télécharger mon CV: <a class="hover-target" rel="noreferrer" target="_blank" href={monCV}
            ><svg
              viewBox="0 0 24 24"
              preserveAspectRatio="xMidYMid meet"
              height="2em"
              width="2em"
              role="img"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              ><path
                d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"
                stroke-width="2"
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke="currentColor"
                fill="none"
              /></svg
            >CV.pdf - {fileSize} Mb</a
          >
        </p>
      {/await}
    {:else}
      <p>Adresse mail: <a class="hover-target" href="mailto:nikita.philippe1@gmail.com">nikita.philippe1@gmail.com</a></p>
      <p>Numéro de téléphone: <span /></p>
      <p>Télécharger mon CV: <span /></p>
    {/if}
  </div>
</section>

<style lang="scss">
  @keyframes loop {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  :global(.loop-icon) {
    transform-origin: 50% 50%;
    animation: loop 1s linear infinite;
  }

  section.infos-content {
    margin: 1rem 0;
    .access {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: fit-content;

      p {
        color: var(--txt-grey);
        margin-right: 1rem;
      }

      input {
        height: 30px;
        border: none;
        background-color: var(--txt-grey);
        margin-right: 0.5rem;
        color: var(--txt-secondary);
        font-size: 18px;
        padding: 0 0.5rem;

        &:focus {
          outline: none;
        }
      }

      button {
        height: 30px;
        width: 30px;
        border-radius: 5px;
        border: none;
        background-color: var(--accentcolor);
        color: var(--black);

        display: flex;
        justify-content: center;
        align-items: center;

        transition: all 0.2s ease-in-out;

        &:hover {
          transform: scale(1.1);
        }
      }
    }

    .contact {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;

      margin: 1rem 0;

      p {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;

        span {
          height: 25px;
          width: 300px;
          background-color: var(--black);
        }

        &.file-download {
          a {
            display: flex;
            align-items: center;
            gap: 0.5rem;

            padding: 0.5rem 0.8rem;

            background-color: var(--accentcolor);
            color: var(--black);
            border: 2px solid transparent;
            font-weight: 600;
            border-radius: 10px;

            transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;

            svg {
              height: 20px;
              width: 20px;
              margin-right: 0.5rem;
            }

            &:hover {
              background-color: var(--background);
              color: var(--accentcolor);
              border: 2px solid var(--accentcolor);

              svg {
                animation: hop 0.5s ease-in-out infinite alternate;
              }

              @keyframes hop {
                0% {
                  transform: translateY(0);
                }
                100% {
                  transform: translateY(-4px);
                }
              }
            }
          }
        }
      }
    }
  }
</style>
