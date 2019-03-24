interface AnimationFrame {
  start: number;
  end: number;
}

export const SPEED: number = 4;
export const SPRITE_SIZE_MULTIPLIER: number = -36;
export const BASE_Y: number = 100;
export const JUMP_FRAMES: AnimationFrame = {
  start: 11,
  end: 13,
};
export const WALK_FRAMES: AnimationFrame = {
  start: 0,
  end: 8,
};
