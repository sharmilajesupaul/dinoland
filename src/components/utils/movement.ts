export function setSpriteFrame(
  sprite: HTMLElement,
  spriteSize: number,
  currentFrame: number
) {
  sprite.style.transform = `translate(${spriteSize * currentFrame}px)`;
}

export function move(
  sprite: HTMLElement,
  container: HTMLElement,
  containerPos: number,
  spriteSize: number,
  currentFrame: number
) {
  setSpriteFrame(sprite, spriteSize, currentFrame);
  container.style.left = `${containerPos}px`;
}
