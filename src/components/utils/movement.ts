import { WALK_FRAMES, MAX_FRAMES, SPRITE_SIZE_MULTIPLIER } from './constants';
import { Direction } from '../../types/dino';

function nextFrameIncrement(direction: Direction) {
  const { start, end } = WALK_FRAMES[direction];
  return start > end ? -1 : 1;
}

function getFramePx(direction: Direction, currentFrame: number) {
  // const spriteWidth = MAX_FRAMES * SPRITE_SIZE_MULTIPLIER;
  const moveBy = SPRITE_SIZE_MULTIPLIER * currentFrame;

  if (currentFrame >= MAX_FRAMES) {
    return WALK_FRAMES[direction].start;
  }

  return -Math.abs(moveBy);
}

export function setSpriteFrame(
  sprite: HTMLElement | null,
  currentFrame: number,
  direction: Direction
) {
  if (sprite !== null) {
    sprite.style.transform = '';
    sprite.style.transform = `translate(${getFramePx(
      direction,
      currentFrame
    )}px)`;
  }
}

export function move(
  sprite: HTMLElement,
  container: HTMLElement,
  containerPos: number,
  spriteSize: number,
  currentFrame: number,
  direction: Direction
) {
  setSpriteFrame(sprite, currentFrame, direction);
  container.style.left = `${containerPos}px`;
}

export function nextFrame(currentFrame: number = 1, direction: Direction) {
  const { start, end } = WALK_FRAMES[direction];
  const walkDirection = nextFrameIncrement(direction);

  if (direction === 'right') {
    return currentFrame > end || currentFrame < start
      ? start
      : currentFrame + walkDirection;
  } else {
    return currentFrame < end || currentFrame > start
      ? end
      : currentFrame + walkDirection;
  }
}
