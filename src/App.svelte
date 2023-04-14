<script>
  import { initHTML } from "./utils/HTML";

  import svelteLogo from "./assets/logo/logoTemp.jpg";
  import homebg from "./assets/bg/homebg.png";

  import ProjectGroupset from "./lib/project-groupset.svelte";
  import ProForma from "./lib/pro-forma.svelte";
  import Header from "./lib/header.svelte";
  import Footer from "./lib/footer.svelte";
  import SkillGroupset from "./lib/skill-groupset.svelte";
  import Infos from "./lib/infos.svelte";
  import Terminal from "./lib/terminal/main.svelte";
  import About from "./lib/about.svelte";

  import { initAnimations } from "./utils/animations";

initAnimations();

  window.onscroll = function () {
    window.scrollTo(0, 0);
  };
</script>

<Header logo={svelteLogo} />

<main use:initHTML>
  <section class="home">
    <figure class="home-background">
      <img src={homebg} alt="bg" />
    </figure>
    <Terminal />
  </section>

  <section class="content-top-section project">
    <h1 class="background-title" id="projets">Projets</h1>
    <ProjectGroupset />
  </section>

  <section class="content-top-section about">
    <h1 class="background-title" id="about">A propos</h1>
    <section class="exp">
      <h2 class="background-title">Expériences pro et formations</h2>

      <ProForma
        content={{
          slidePos: 700,
          forma: true,
          title: "DUT Info",
          date: "2020-2022",
          location: "Nantes",
          pcontent: "Obtention de mon DUT Informatique à l'IUT de Nantes",
        }}
      />
      <ProForma
        content={{
          slidePos: -500,
          delay: 1000,
          exp: true,
          title: "Géoclic Solutions",
          type: "Alternance",
          date: "2021-2022",
          location: "Saint-Nazaire",
          pcontent: "Développeur en alternance chez Géoclic Solutions.",
          content:
            "Alternance au sein de Géoclic Solutions dans le cadre de ma 2eme année de DUT Informatique.<br>Poste de développeur et support technique (gestion et amélioration d’une application existantes JS, tests Mocha, refonte du site web de l’entreprise)",
        }}
      />
      <ProForma
        content={{
          slidePos: 500,
          delay: 1300,
          forma: true,
          title: "Bac STI2D",
          date: "2019-2020",
          location: "Saint-Nazaire",
          pcontent: "Obtention du baccalauréat STI2D mention très bien au lycée Aristide Briand",
        }}
      />
      <ProForma
        content={{
          slidePos: -500,
          delay: 1600,
          exp: true,
          title: "SoyHuce",
          type: "Stage",
          date: "2019",
          location: "Caen",
          pcontent: "Stage personnellement motivé chez SoyHuce.",
          content: "Observation et travaux sur développement back-end.<br>Apprentissage de languages et outils.",
        }}
      />
      <ProForma
        content={{
          slidePos: 500,
          delay: 1900,
          exp: true,
          title: "Concours robotique",
          type: "Bénévolat",
          date: "2019",
          location: "Saint-Nazaire",
          pcontent: "Poste d’arbitre au concours robotique organisé par IBM à Saint-Nazaire.",
          content: "Rôle d’arbitre sur les matchs et enregistrement et transfère des scores.",
        }}
      />
    </section>
    <section class="skills">
      <h2 class="background-title">Compétences</h2>
      <SkillGroupset />
    </section>
    <section class="me">
      <h2 class="background-title">A propos</h2>
      <About />
    </section>

    <section class="infos">
      <h2 class="background-title" id="infos">Infos</h2>
      <Infos />
    </section>
  </section>
</main>
<div id="fullpage" />
<Footer />

<style lang="scss">
  .content-top-section {
    margin: 20vh 0 10vh 0;
    position: relative;
  }

  .about > section {
    margin: 20vh 0;
    position: relative;
  }

  .about .exp {
    margin-top: 10vh;
  }

  .exp {
    min-height: 600px;
  }

  .home {
    height: calc(100vh - var(--Header-height));

    .home-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
  }

  #fullpage {
    display: none;
    position: absolute;
    z-index: 9999;
    opacity: 0;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-size: contain;
    background-repeat: no-repeat no-repeat;
    background-position: center center;
    background-color: black;
  }
</style>
