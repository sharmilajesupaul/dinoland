import { WALK_FRAMES, MAX_FRAMES, SPRITE_SIZE_MULTIPLIER } from './constants';
import { Direction } from '../../types/dino';

function nextFrameIncrement(direction: Direction) {
  const { start, end } = WALK_FRAMES[direction];
  return start > end ? -1 : 1;
}

export function getFramePx(direction: Direction, currentFrame: number) {
  const moveBy = SPRITE_SIZE_MULTIPLIER * currentFrame;

  if (currentFrame > MAX_FRAMES) {
    return WALK_FRAMES[direction].start;
  }

  return -Math.abs(moveBy);
}

export function nextFrame(
  currentFrame: number = 1,
  direction: Direction,
  changeDirection: boolean
) {
  const { start, end } = WALK_FRAMES[direction];
  if (changeDirection) {
    return start;
  }
  const walkDirection = nextFrameIncrement(direction);
  const outOfFrameRange =
    walkDirection > 0
      ? currentFrame > end || currentFrame < start
      : currentFrame < end || currentFrame > start;

  return outOfFrameRange ? start : currentFrame + walkDirection;
}
