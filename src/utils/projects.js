import parseMD from "parse-md";
import { initCommitToDB, getAllTagsFromProjectsDB, getAllProjectsEssentialsFromProjectsDB, getProjectFromID, addParsedContentFromID, updateParsedWithCustomizedHTML } from "./database";
import { marked } from "marked";

import Splide from "@splidejs/splide";
import "@splidejs/splide/css";

import { basicKey } from "./misc";

import { store_projects } from "../lib/stores";

// TODO use custom renderer instead of the customizeHTML function
const customMDRenderer = {};

async function initProjects() {
  const modules = import.meta.glob("../news/*.md", { as: "raw" });
  const projects = [];
  for (const path in modules) {
    const mod = await modules[path]();
    projects.push(parseMD(mod));
  }
  await initCommitToDB("projects", projects);
}

export async function getProjects() {
  await initProjects();

  const tags = await getAllTagsFromProjectsDB();
  const projects = await getAllProjectsEssentialsFromProjectsDB();

  store_projects.set(projects);

  return {
    tags: tags,
    projects: projects,
  };
}

export async function getParsedProject(id) {
  const project = await getProjectFromID(id);

  marked.use({ renderer: customMDRenderer });

  let initial = false;

  try {
    let parsedContent = project.parsedContent;
    if (!parsedContent) {
      initial = true;
      parsedContent = marked.parse(project.content);
      await addParsedContentFromID(id, parsedContent);
      return { parsedContent, initial };
    }
    return {parsedContent, initial};
  } catch (error) {
    console.log(error);
  }
}

export async function customizeHTML(articleContent) {
  articleContent.querySelectorAll("a").forEach((a) => {
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener noreferrer");
  });

  articleContent.querySelectorAll("p").forEach((p) => {
    p.classList.add("article-content", "article-single-element", "text");

    p.querySelectorAll("span.gallery")?.forEach((gal) => {
      gal.querySelectorAll("img")?.forEach((img) => {
        img.classList.add("fs-img", "hover-target", "gallery-img");
      });
    });

    p.querySelectorAll("img")?.forEach((img) => {
      if (!img.classList.contains("gallery-img")) img.classList.add("fs-img", "hover-target", "single-img");
    });
  });

  articleContent.querySelectorAll("h2").forEach((h2) => {
    h2.classList.add("article-content", "article-single-element", "htwo");
  });

  articleContent.querySelectorAll("h3").forEach((h3) => {
    h3.classList.add("article-content", "article-single-element", "hthree");
  });

  var imgElements = document.querySelector(".article-content .gallery");
  if (imgElements) {
    var imgPaths = [];
    var imgs = imgElements.querySelectorAll("img");
    for (var i = 0; i < imgs.length; i++) {
      imgPaths.push(imgs[i].getAttribute("src"));
    }

    let slidesHTML = "";
    // Add the images to the Swiper instance
    imgPaths.forEach((path) => {
      slidesHTML += `
    <li class="splide__slide">
      <img class="fs-img hover-target" src="${path}" alt="">
    </li>`;
    });

    const splideKey = basicKey(10);

    imgElements.outerHTML = `
  <section class="splide ${splideKey}" aria-label="Splide Basic HTML Example">
    <div class="splide__track">
      <ul class="splide__list">
        ${slidesHTML}
      </ul>
    </div>
  </section>`;

    if (!document.querySelector(".splide")) return;
    new Splide(`.${splideKey}`, {
      type: "loop",
      start: Math.round(imgPaths.length / 2),
      fixedWidth: "100%",
      padding: "20%",
      gap: "6rem",
      pagination: true,
      arrows: true,
      focus: 0,
      drag: true,
      snap: true,
      rewind: true,
      height: "500px",
    }).mount();
  }

  articleContent.querySelectorAll(".splide__arrow, .splide__pagination__page").forEach((el) => {
    el.classList.add("hover-target");
  });

  articleContent.querySelectorAll(".single-img").forEach((img) => {
    if (img.parentElement.tagName === "FIGURE") return;
    img.outerHTML = `<figure class="project-img-container">${img.outerHTML}<figcaption>${img.alt}</figcaption></figure>`;
  });

  const fullpage = document.getElementById("fullpage");

  document.querySelectorAll(".fs-img")?.forEach((img) => {
    img.addEventListener("click", () => {
      fullpage.style.backgroundImage = `url(${img.getAttribute("src")})`;
      fullpage.style.top = `${Math.abs(document.querySelector("html").getBoundingClientRect()["top"])}px`;
      fullpage.style.display = "block";
      fullpage.style.opacity = "1";
      document.querySelector("html").style.overflow = "hidden";
      document.querySelector("html").style.height = "100%";
    });
  });

  fullpage.addEventListener("click", () => {
    fullpage.style.opacity = "0";
    setTimeout(() => {
      fullpage.style.display = "none";
      document.querySelector("html").style.overflow = "auto";
      document.querySelector("html").style.height = "auto";
    }, 300);
  });
}

import Masonry from "masonry-layout";

const masonrySizes = {
  height: ["grid__item--height1", "grid__item--height4", "grid__item--height2", "grid__item--height3", "grid__item--height5"],
  width: ["grid__item--width2"],
};

// @ts-ignore
const masonrySizesW = {
  height: ["grid__item--height1", "grid__item--height4", "grid__item--height2", "grid__item--height3", "grid__item--height5"],
  width: ["grid__item--width1", "grid__item--width2", "grid__item--width3", "grid__item--width4", "grid__item--width5"],
};


export function masonArticles(node) {
  let masoned = document.getElementById("masonry-grid");
  if (node === null && !masoned) return;
  if (masoned) {
    // @ts-ignore
    Masonry.data(masoned).reloadItems();
    // @ts-ignore
    Masonry.data(masoned).layout();
    return;
  }

  new Masonry(node, {
    itemSelector: ".grid__item",
    columnWidth: ".grid__col-sizer",
    gutter: ".grid__gutter-sizer",
    percentPosition: true,
    stagger: 30,
    visibleStyle: { transform: "translateY(0)", opacity: 1 },
    hiddenStyle: { transform: "translateY(100px)", opacity: 0 },
  });

  if (node) node.id = "masonry-grid";
  node.setAttribute("data-baseHeight", node.style.height);
}

export function getArticleSize() {
  const heigth = masonrySizes.height[Math.floor(Math.random() * masonrySizes.height.length)];
  let width = "";
  Math.random() > 0.85 ? (width = masonrySizes.width[Math.floor(Math.random() * masonrySizes.width.length)]) : (width = "");
  return [heigth, width];
}
