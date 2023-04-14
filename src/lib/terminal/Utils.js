export function onMouseDown(moving) {
  return moving = true;
}

export function onMouseMove(moving, e, left, top) {
  if (moving) {
    left += e.movementX;
    top += e.movementY;
  }
}

export function onMouseUp(moving) {
  return (moving = false);
}
