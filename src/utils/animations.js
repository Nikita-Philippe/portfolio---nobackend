import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

export function initAnimations() {
  miscGSAPEffects();
  registerAllSkillsRelatedAnimations();
  registerAllProjectsRelatedAnimations();
}

function registerAllSkillsRelatedAnimations() {
  skillFloat(20, { min: 3, max: 7, step: 1 });
  skillToHover();
  skillFromHover();
}

function registerAllProjectsRelatedAnimations() {
  projectAppearing();
  openProject();
  closeProject();
}

function skillFloat(aroundPos, delay) {
  gsap.registerEffect({
    name: "skillFloat",
    extendTimeline: true,
    effect: (targets, config) => {
      return gsap.to(targets, {
        x: gsap.utils.random(-Math.abs(aroundPos), Math.abs(aroundPos), 1),
        y: gsap.utils.random(-Math.abs(aroundPos), Math.abs(aroundPos), 1),
        duration: gsap.utils.random(delay.min, delay.max, delay.step),
        ease: "easeInOut",
        repeat: -1,
        yoyo: true,
        onRepeat: () => {
          gsap.to(targets, {
            x: gsap.utils.random(-Math.abs(aroundPos), Math.abs(aroundPos), 1),
            y: gsap.utils.random(-Math.abs(aroundPos), Math.abs(aroundPos), 1),
            duration: gsap.utils.random(delay.min, delay.max, delay.step),
            ease: "easeInOut",
            repeat: -1,
            yoyo: true,
          });
        },
      });
    },
  });
}
function skillToHover() {
  gsap.registerEffect({
    name: "skillToHover",
    effect: (targets, config) => {
      return gsap.to(targets, {
        scale: 4,
        duration: 0.5,
        ease: "power1.inOut",
      });
    },
  });
}
function skillFromHover() {
  gsap.registerEffect({
    name: "skillFromHover",
    effect: (targets, config) => {
      return gsap.to(targets, {
        scale: 1,
        duration: 0.5,
        ease: "power1.inOut",
      });
    },
  });
}

function miscGSAPEffects() {
  gsap.registerPlugin(CustomEase);
  CustomEase.create("easeInOut", "M0,0 C0.4,0 0.6,1 1,1");
}

function projectAppearing() {
  gsap.registerEffect({
    name: "projectAppearing",
    effect: (targets, config) => {
      return gsap.from(targets, {
        x: Math.random() < 0.5 ? "-110vw" : "110vw",
        duration: gsap.utils.random(2, 4, 0.5),
        ease: "power2.out",
      });
    },

  });
}

function openProject() {
  gsap.registerEffect({
    name: "openProject",
    effect: (targets, config) => {
      return gsap.to(targets, {
        width: "100%",
        height: "fit-content",
        duration: 0.5,
        ease: "power2.out",
      });
    },
  });
}

function closeProject(){
  gsap.registerEffect({
    name: "closeProject",
    effect: (targets, config) => {
      return gsap.to(targets, {
        width: "auto",
        height: "auto",
        duration: 0.5,
        ease: "power2.out",
      });
    },
  });
}
