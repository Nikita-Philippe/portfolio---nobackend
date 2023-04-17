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
