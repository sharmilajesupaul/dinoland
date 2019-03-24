import React, { useEffect, useState } from 'react';
import tard from '../images/tard.png';
import { move, setSpriteFrame } from './utils/movement';
import {
  JUMP_FRAMES,
  WALK_FRAMES,
  SPRITE_SIZE_MULTIPLIER,
  SPEED,
} from './utils/constants';

export default function Dino({ name }: { name: string }) {
  const [currentFrame, setFrame] = useState(0);
  const [containerPos, setContainerPos] = useState(0);
  const [idleTime, setIdleTime] = useState(0);
  const [jumpAnimation, setJumpAnimation] = useState({
    isRunning: false,
  });

  const [keyMap, setKeyMap] = useState({
    ArrowUp: false,
    ArrowLeft: false,
    ArrowRight: false,
    ArrowDown: false,
  });

  const reset = (
    spriteElement: HTMLElement | null,
    timeoutId: number | null
  ): number => {
    if (timeoutId !== null) clearTimeout(timeoutId);

    return window.setTimeout(() => {
      setSpriteFrame(spriteElement, SPRITE_SIZE_MULTIPLIER, JUMP_FRAMES.end);
      setFrame(JUMP_FRAMES.end);
    }, 500);
  };

  const handleKeyUp = ({ key }: KeyboardEvent) => {
    setKeyMap({ ...keyMap, [key]: false });
    setIdleTime(reset(document.querySelector('.Dino-sprite'), idleTime));
  };

  const handleKeyDown = ({ key }: KeyboardEvent) => {
    const spriteElement: any = document.querySelector('.Dino-sprite');
    const spriteContainer: any = document.querySelector('.Dino-container');
    setKeyMap({ ...keyMap, [key]: true });

    if (key === 'ArrowRight') {
      setFrame(currentFrame >= WALK_FRAMES.end ? 0 : currentFrame + 1);
      setContainerPos(containerPos + SPEED);
      move(
        spriteElement,
        spriteContainer,
        containerPos,
        SPRITE_SIZE_MULTIPLIER,
        currentFrame
      );
    } else if (key === 'ArrowLeft') {
      setFrame(currentFrame === 0 ? WALK_FRAMES.end : currentFrame - 1);
      setContainerPos(containerPos - SPEED);
      move(
        spriteElement,
        spriteContainer,
        containerPos,
        SPRITE_SIZE_MULTIPLIER,
        currentFrame
      );
    } else if (key === 'ArrowUp') {
      const { start } = JUMP_FRAMES;
      setSpriteFrame(spriteElement, SPRITE_SIZE_MULTIPLIER, start);
      setFrame(start);

      if (!jumpAnimation.isRunning) {
        setJumpAnimation({ isRunning: true });
        spriteContainer.classList.add('Dino-container-jump');
        window.setTimeout(() => {
          spriteContainer.classList.remove('Dino-container-jump');
          setJumpAnimation({ isRunning: false });
        }, 1000);
      }
    }
  };

  useEffect(
    (): any => {
      // @ts-ignore
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
      };
    }
  );

  return (
    <div className={`Dino-container ${name}`}>
      <img src={tard} alt="dino" className={`Dino-sprite`} />
    </div>
  );
}
