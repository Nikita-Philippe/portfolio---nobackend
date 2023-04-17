---
title: Portfolio
description: Création de mon portfolio
tags:
  - "code"
  - "JS"
  - "Svelte"
img: /assets/portfolio/homebg.png
---

**Projet en développement; cet article est donc probablement incomplet**

## Cahier des charges
Pour développer mon site web, j'avais déjà quelques idées 

## Maquette
J'ai choisi d'utiliser Figma pour créer mes maquettes.

### V1
En 1er lieu, j'ai créé une maquette sans trop réfléchir, en prenant les idées comme elles venaient. Cette maquette est le résultat :
<span class="gallery">
![Accueil de la maquette V1!](./assets/portfolio/homev1.png "Accueil de la maquette V1")
![Page projets de la maquette V1!](./assets/portfolio/projetsv1.png "Page projets de la maquette V1")
![A propos de la maquette V1!](./assets/portfolio/aboutv1.png "A propos de la maquette V1")
</span>

De cette 1ère maquette, j'ai tiré quelques problèmes :
- Je n'étais pas convaincu du multi-pages. Je pense que développer un site sur une seule page sera bien plus efficace.
- L'affichage des projets. Cet affichage est efficace, mais je pense beaucoup trop fouillis une fois que des images remplaceront les couleurs.
- L'affichage des expériences professionnelles prend trop de places, et je n'ai pas tant d'expérience que ça...
- Quelques styles, surtout dans le 'A propos'
- Ma méthodologie générale sur Figma

### V2
Je me suis donc lancé sur une V2, réutilisant la plupart des éléments de la V1.
...
Je me retrouve donc avec une V2 bien plus complète :
![Maquette V2 du site](./assets/portfolio/maquettev2.png "Maquette V2 du site")

## Choix des technologies
Pour ce projet, j'ai essayé d'utiliser au maximum des technologies que je n'avais jamais utilisées.

### Framework
Pour rester un petit peu familier avec mon environnement, j'ai choisi de développement mon application sous Javascript, en utilisant NodeJS.

En cherchant un Framework, je suis tombé sur [ViteJS](https://vitejs.dev/).
Rapidité, automatisation, plugins, HMR, ce Framework m'a tout de suite interessé. 

Hésitant entre Vite et [NextJS](https://nextjs.org/), j'ai décidé d'utiliser Vite, plus adapté vu que mon site étant exlusivement Frontend.

J'ai pu facilement initialiser mon site avec `npm create vite@latest`.
De nombreux template sont disponibles, dont du Javascript vanilla, Vue, React, ou encore Svelte.
Ayant entendu beaucoup de bien, j'ai décidé d'utiliser Svelte un peu sur un coup de tête.

### Styles
Pour la mise en style des composants Svelte, j'ai utilisé le préprocesseur SCSS.
Je suis habitué à l'utiliser sous Wordpress, et la simplicité du site me permet de me passer d'outils comme [Tailwind](https://tailwindcss.com/).

Pour ce faire, je vais pouvoir utiliser le plugin npm [`svelte-preprocess`](https://github.com/sveltejs/svelte-preprocess).

On le définit dans `vite.config.js` avec son 'output file' en utilisant le plugin `@sveltejs/vite-plugin-svelte`:
``` Javascript
export default defineConfig({
  plugins: [
    svelte({
      preprocess: sveltePreprocess(),
      css: (css) => {
        css.write("public/bundle.css");
      },
    }),
  ],
});
```

Dans chaque composant Svelte, on peut ensuite définir l'utilisation de SCSS avec
``` Javascript
<style lang="scss">
  // les styles...
</style>
```

### Hosting
Au début, j'avais prévu de host mon site avec [Hostinger](https://www.hostinger.fr/).

J'utilise Hostinger pour acheter et gérer mes noms de domaine, et pour de l'hébergement, comme celui de [Pain Contre La Faim Saint-Nazaire](https://paincontrelafaim-saintnazaire.fr).

Le problème est que l'hébergement Hostinger ne permet que l'hébergement de sites statiques (ou semi-statiques comme Wordpress). 
Mon site étant sous NodeJS et faisant des appels serveurs, je n'ai pas pu utiliser cette solution.
Je pensais donc me rabattre sur un service VPS, mais ait finalement découvert que [Firebase](https://firebase.google.com/) proposait aussi des services de Hosting, et que le tout était très facilement déployable sur NodeJS.

Une fois la configuration initiale effectuée, je peux donc simplement build mon app avec `npm run build` et déployer sur [Firebase](https://firebase.google.com/) avec `firebase deploy`.
Le tout prend 20 secondes et ne nécessite pas de passer par FTP.

Pour l'instant, le service est gratuit car mon site n'a que très peu de traffic, ce qui est, évidemment, un plus.

## Composants
### Projets
### Infos