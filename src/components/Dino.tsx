import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { move, setSpriteFrame, nextFrame } from './utils/movement';
import {
  JUMP_FRAMES,
  WALK_FRAMES,
  SPRITE_SIZE_MULTIPLIER,
  SPEED,
} from './utils/constants';
import styled from 'styled-components';
import { DinoSprite, Direction } from '../types/dino';

const SpriteContainer = styled.div`
  /* ... */
`;

const Sprite = styled.img`
  /* ... */
`;

export default function Dino({
  name,
  imageSourceLeft,
  imageSourceRight,
}: DinoSprite) {
  const [currentFrame, setFrame] = useState(0);
  const [containerPos, setContainerPos] = useState(0);
  const [idleTime, setIdleTime] = useState(0);
  const [jumpAnimation, setJumpAnimation] = useState({
    isRunning: false,
  });
  const [direction, setDirection] = useState<Direction>('right');

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
      // setSpriteFrame(spriteElement, JUMP_FRAMES.end, direction);
      // setFrame(JUMP_FRAMES.end);
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
      setDirection('right');
      setFrame(nextFrame(currentFrame, direction));
      setContainerPos(containerPos + SPEED);
      move(
        spriteElement,
        spriteContainer,
        containerPos,
        SPRITE_SIZE_MULTIPLIER,
        currentFrame,
        direction
      );
    } else if (key === 'ArrowLeft') {
      setDirection('left');
      setFrame(nextFrame(currentFrame, direction));
      setContainerPos(containerPos - SPEED);
      move(
        spriteElement,
        spriteContainer,
        containerPos,
        SPRITE_SIZE_MULTIPLIER,
        currentFrame,
        direction
      );
    } else if (key === 'ArrowUp') {
      const { start } = JUMP_FRAMES;
      setSpriteFrame(spriteElement, start, direction);
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
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
      };
    }
  );

  return (
    <SpriteContainer className={`Dino-container ${name}`}>
      <Sprite
        src={direction === 'right' ? imageSourceRight : imageSourceLeft}
        alt="dino"
        className={`Dino-sprite`}
      />
    </SpriteContainer>
  );
}
