import { gsap } from "gsap";

function skillOverlap(dimensions, matrix, index, margin) {
  if (!matrix[index]) return true;

  let currentSkill = {
    left: matrix[index].left - margin,
    right: matrix[index].left + dimensions.Skillwidth + margin * 2,
    top: matrix[index].top - margin,
    bottom: matrix[index].top + dimensions.Skillheight + margin * 2,
  };

  if (currentSkill.left < 0 || currentSkill.right > dimensions.containerWidth || currentSkill.top < 0 || currentSkill.bottom > dimensions.containerHeight)
    return true;

  let intersect = false;
  matrix.forEach((skillPos) => {
    if (skillPos === matrix[index]) return;
    let skillDim = {
      left: skillPos.left - margin,
      right: skillPos.left + dimensions.Skillwidth + margin * 2,
      top: skillPos.top - margin,
      bottom: skillPos.top + dimensions.Skillheight + margin * 2,
    };
    if (!(skillDim.left > currentSkill.right || skillDim.right < currentSkill.left || skillDim.top > currentSkill.bottom || skillDim.bottom < currentSkill.top))
      intersect = true;
  });
  return intersect;
}

export function initSkills(margin, iterations) {
  let skillsMatrix = [];
  var skills = document.querySelectorAll(".single-skill");
  var container = document.getElementById("skill-set");

  var centerX = container.clientWidth / 2;
  var centerY = container.clientHeight / 2;

  const dimensions = {
    // @ts-ignore
    Skillwidth: skills[0].offsetWidth,
    // @ts-ignore
    Skillheight: skills[0].offsetHeight,
    containerWidth: container.clientWidth,
    containerHeight: container.clientHeight,
  };

  for (var i = 0; i < skills.length; i++) {
    const skill = skills[i];
    // @ts-ignore
    skill.style.left = ` ${centerX - dimensions.Skillwidth}px`;
    // @ts-ignore
    skill.style.top = ` ${centerY - dimensions.Skillheight}px`;
  }

  for (var i = 0; i < skills.length; i++) {
    const skill = skills[i];
    let leftPos, topPos;

    let j = 0;
    while (skillOverlap(dimensions, skillsMatrix, i, margin)) {
      if (j === iterations) break;
      leftPos = Math.round(Math.random() * (dimensions.containerWidth - dimensions.Skillwidth));
      topPos = Math.round(Math.random() * (dimensions.containerHeight - dimensions.Skillheight));
      skillsMatrix[i] = { left: leftPos, top: topPos };
      j++;
    }

    // @ts-ignore
    skill.style.left = `${leftPos}px`;
    // @ts-ignore
    skill.style.top = `${topPos}px`;
    // @ts-ignore

    // // Animate the element's position in plain JS
    // const x = Math.random() * 30 - 10;
    // const y = Math.random() * 30 - 10;
    // const speed = (Math.random() * 4 + 1) * 1000;
    // skill.animate([{ transform: "translate(0, 0)" }, { transform: `translate(${x}px, ${y}px)` }], {
    //   duration: speed,
    //   easing: "ease-in-out",
    //   direction: "alternate-reverse",
    //   iterations: Infinity,
    // });

    const skillFloatAnimation = gsap.effects.skillFloat(skill);
    skill.addEventListener("mouseenter", () => {
      gsap.effects.skillToHover(skill);
      skillFloatAnimation.pause();
    });
    skill.addEventListener("mouseleave", () => {
      gsap.effects.skillFromHover(skill);
      skillFloatAnimation.play();
    });
    skill.addEventListener("click", (e) => {
      gsap.effects.skillToHover(skill);
      skillFloatAnimation.pause();
      setTimeout(() => {
        document.addEventListener(
          "click",
          () => {
            gsap.effects.skillFromHover(skill);
            skillFloatAnimation.play();
          },
          { once: true }
        );
      }, 100);
    });
  }
}
