import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

export function initAnimations() {
  miscGSAPEffects();
  registerAllSkillsRelatedAnimations();
}

function registerAllSkillsRelatedAnimations() {
  skillFloat(20, { min: 3, max: 7, step: 1 });
  skillToHover();
  skillFromHover();
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



function miscGSAPEffects(){
  gsap.registerPlugin(CustomEase);
  CustomEase.create("easeInOut", "M0,0 C0.4,0 0.6,1 1,1");
}
