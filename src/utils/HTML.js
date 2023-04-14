import Splide from "@splidejs/splide";
import "@splidejs/splide/css";

import { basicKey } from "./misc";

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

// @ts-ignore
export function initHTML(node) {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  const backTitles = document.querySelectorAll(".background-title");
  parallax(backTitles, -1);
  backTitles.forEach((backTitle) => {
    backTitle.parentElement.classList.add("background-title-parent");
    document.addEventListener("scroll", () => {
      // @ts-ignore
      isTitleInViewport(backTitle) ? (backTitle.style.opacity = 1) : (backTitle.style.opacity = 0);
    });
  });

  window.addEventListener("DOMContentLoaded", () => {
    // @ts-ignore
    document.querySelector(".loading-screen").style.opacity = "0";
    // @ts-ignore
    document.querySelector(".loading-screen").style.visibility = "hidden";
    // @ts-ignore
    document.querySelector(".loading-screen").addEventListener("transitionend", (e) => e.target.remove());
    window.onscroll = function () {};
    window.addEventListener("resize", checkResize);
  });
}

function checkResize(event) {
  const alert = document.querySelector(".alerttip");
  if (alert) {
    // @ts-ignore
    alert.setAttribute("data-labelWidth", alert.querySelector(".alerttip-label").offsetWidth);
    // @ts-ignore
    alert.style.transform = `translateX(${(alert.style.right = 0 ? "-" : "+")}${alert.getAttribute("data-labelWidth")}px)`;
  } else window.removeEventListener("resize", checkResize);
}

function isTitleInViewport(elem) {
  var distance = elem.getBoundingClientRect();
  return distance.top >= 0 && distance.bottom <= (window.innerHeight || document.documentElement.clientHeight);
}

export function cursor() {
  document.getElementById("cursor").style.visibility = "visible";

  document.getElementsByTagName("body")[0].addEventListener("mousemove", function (n) {
    document.getElementById("cursor").style.transform = "translate(" + n.clientX + "px, " + n.clientY + "px)";
  });

  document.querySelectorAll(".hover-target").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      document.getElementById("cursor").classList.add("hovered");
    });
    element.addEventListener("mouseleave", () => {
      document.getElementById("cursor").classList.remove("hovered");
    });
  });

  document.querySelectorAll(".hover-target.cursor-move").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      document.getElementById("cursor").classList.add("hovered", "hovered-move");
    });
    element.addEventListener("mouseleave", () => {
      document.getElementById("cursor").classList.remove("hovered", "hovered-move");
    });
  });

  document.querySelectorAll(".fs-img.hover-target").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      document.getElementById("cursor").classList.add("hovered", "hovered-fs");
    });
    element.addEventListener("mouseleave", () => {
      document.getElementById("cursor").classList.remove("hovered", "hovered-fs");
    });
  });
}

// @ts-ignore
export function customizeHTML(articleContent, initial = true) {
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

export function getArticleSize() {
  const heigth = masonrySizes.height[Math.floor(Math.random() * masonrySizes.height.length)];
  let width = "";
  Math.random() > 0.85 ? (width = masonrySizes.width[Math.floor(Math.random() * masonrySizes.width.length)]) : (width = "");
  return [heigth, width];
}

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

export function showToolTip(event, message, isEnter) {
  // fade out the tooltip after a delay
  setTimeout(() => {
    if (isEnter) {
      const offsetPos = 20;
      const targetPos = event.target.getBoundingClientRect();
      // create and position the tooltip element
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.style.left = targetPos.right + offsetPos + "px";
      tooltip.style.bottom = targetPos.top + offsetPos + "px";
      tooltip.textContent = message;
      // add the tooltip to the page
      document.body.appendChild(tooltip);

      setTimeout(() => {
        document.body.removeChild(tooltip);
      }, 500);
    }
    return;
  }, 1000);
}

function getTextNodesIn(node) {
  var textNodes = [];
  if (node.nodeType == 3) {
    textNodes.push(node);
  } else {
    var children = node.childNodes;
    for (var i = 0, len = children.length; i < len; ++i) {
      textNodes.push.apply(textNodes, getTextNodesIn(children[i]));
    }
  }
  return textNodes;
}

export function setSelectionRange(el, start, end) {
  if (document.createRange && window.getSelection) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var textNodes = getTextNodesIn(el);
    var foundStart = false;
    var charCount = 0,
      endCharCount;

    for (var i = 0, textNode; (textNode = textNodes[i++]); ) {
      endCharCount = charCount + textNode.length;
      if (!foundStart && start >= charCount && (start < endCharCount || (start == endCharCount && i <= textNodes.length))) {
        range.setStart(textNode, start - charCount);
        foundStart = true;
      }
      if (foundStart && end <= endCharCount) {
        range.setEnd(textNode, end - charCount);
        break;
      }
      charCount = endCharCount;
    }

    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    // @ts-ignore
  } else if (document.selection && document.body.createTextRange) {
    // @ts-ignore
    var textRange = document.body.createTextRange();
    textRange.moveToElementText(el);
    textRange.collapse(true);
    textRange.moveEnd("character", end);
    textRange.moveStart("character", start);
    textRange.select();
  }
}

export function scrollToElm(container, elm, duration) {
  var pos = getRelativePos(elm);
  scrollTo(container, pos.top, duration);
}

function getRelativePos(elm) {
  var pPos = elm.parentNode.getBoundingClientRect(),
    cPos = elm.getBoundingClientRect(),
    pos = {};

  (pos.top = cPos.top - pPos.top + elm.parentNode.scrollTop),
    (pos.right = cPos.right - pPos.right),
    (pos.bottom = cPos.bottom - pPos.bottom),
    (pos.left = cPos.left - pPos.left);

  return pos;
}

function scrollTo(element, to, duration, onDone) {
  var start = element.scrollTop,
    change = to - start,
    startTime = performance.now(),
    // @ts-ignore
    val,
    now,
    elapsed,
    t;

  function animateScroll() {
    now = performance.now();
    elapsed = (now - startTime) / 1000;
    t = elapsed / duration;

    element.scrollTop = start + change * easeInOutQuad(t);

    if (t < 1) window.requestAnimationFrame(animateScroll);
    else onDone && onDone();
  }

  animateScroll();
}

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

let lastKnownScrollPosition;

function parallax(elements, pixelsPerScroll) {
  // @ts-ignore
  window.addEventListener("scroll", function (event) {
    elements.forEach(function (element) {
      if (isTitleInViewport(element)) {
        let movePos = 0;
        lastKnownScrollPosition > window.scrollY ? (movePos += pixelsPerScroll) : (movePos -= pixelsPerScroll);
        if (!element.custom?.pos) element.custom = { pos: 0 };
        element.custom.pos += movePos;

        element.style.transform = `translateY(${element.custom.pos}px)`;
      }
    });
    lastKnownScrollPosition = window.scrollY;
  });
}

export function htmlToElem(html) {
  // @ts-ignore
  return new Promise((resolve, reject) => {
    let temp = document.createElement("template");
    temp.innerHTML = html.trim();
    resolve(temp.content.firstChild);
  });
}
