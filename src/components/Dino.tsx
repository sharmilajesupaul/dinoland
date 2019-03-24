import React, { useEffect, useState, SyntheticEvent } from 'react';
import tard from '../images/tard.png';
import { move, setSpriteFrame } from './utils/movement';

export default function Dino() {
  const FRAMES = 8;
  const [currentFrame, setFrame] = useState(0);
  const SPRITE_SIZE = -36;
  const [containerPos, setContainerPos] = useState(0);

  const handleKeyUp = (event: KeyboardEvent) => {
    const spriteElement: any = document.querySelector('.Dino-sprite');

    setSpriteFrame(spriteElement, SPRITE_SIZE, 0);
    setFrame(0);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;
    const spriteElement: any = document.querySelector('.Dino-sprite');
    const spriteContainer: any = document.querySelector('.Dino-container');
    if (key === 'ArrowRight') {
      setFrame(currentFrame >= FRAMES ? 0 : currentFrame + 1);
      setContainerPos(containerPos + 1);
      move(
        spriteElement,
        spriteContainer,
        containerPos,
        SPRITE_SIZE,
        currentFrame
      );
    } else if (key === 'ArrowLeft') {
      setFrame(currentFrame === 0 ? FRAMES : currentFrame - 1);
      setContainerPos(containerPos - 1);
      move(
        spriteElement,
        spriteContainer,
        containerPos,
        SPRITE_SIZE,
        currentFrame
      );
    } else if (key === 'ArrowUp') {
      let animationState = 'paused';
      const jumpFrame = 11;

      if (animationState === 'paused') {
        animationState = 'running';
        spriteContainer.classList.add('Dino-container-jump');
        setSpriteFrame(spriteElement, SPRITE_SIZE, jumpFrame);
        setFrame(jumpFrame);
      }

      setTimeout(() => {
        spriteContainer.classList.remove('Dino-container-jump');
        animationState = 'paused';
      }, 1000);
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
    <div className={`Dino-container`}>
      <img src={tard} alt="dino" className={`Dino-sprite`} />
    </div>
  );
}
