type AnimationFrame = {
  start: number;
  end: number;
};

type WalkAnimationFrame = {
  left: AnimationFrame;
  right: AnimationFrame;
};

export const SPEED: number = 4;
export const SPRITE_SIZE_MULTIPLIER: number = 36;
export const BASE_Y: number = 100;
export const JUMP_FRAMES: AnimationFrame = {
  start: 11,
  end: 13,
};
export const MAX_FRAMES = 24;
export const WALK_FRAMES: WalkAnimationFrame = {
  right: {
    start: 1,
    end: 8,
  },
  left: {
    start: 23,
    end: 16,
  },
};
export const JUMP_DISTANCE: number = 50;
