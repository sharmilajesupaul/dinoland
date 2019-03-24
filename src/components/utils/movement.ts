export function setSpriteFrame(
  sprite: HTMLElement | null,
  spriteSize: number,
  currentFrame: number
) {
  if (sprite !== null)
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
