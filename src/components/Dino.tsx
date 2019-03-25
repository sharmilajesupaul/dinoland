import React, { useEffect, useState } from 'react';
import { nextFrame, getFramePx, jumpKeyframes } from './utils/movement';
import injectStylesheet from './utils/injectStylesheet';
import { JUMP_FRAMES, SPEED } from './utils/constants';
import styled, { AnyStyledComponent } from 'styled-components';
import { DinoSprite, Direction } from '../types/dino';

const SpriteContainer: AnyStyledComponent = styled.div`
  /* ... */
  left: ${(props: { containerPos: number }) => props.containerPos}px;
  ${({ setJump, animationName}: any) => setJump ? `
    animation-name: ${animationName};
    animation-duration: 1s;
  ` : ''};
`;

const Sprite: AnyStyledComponent = styled.img`
  /* ... */
  transform: translate(
    ${(props: { framePos: number }) => `${props.framePos}px`}
  );
`;

export default function Dino({
  name,
  imageSourceLeft,
  imageSourceRight,
}: DinoSprite) {
  const [containerPos, setContainerPos] = useState(0);
  const [idleTime, setIdleTime] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [animationName, setAnimationName] = useState('jump-with-direction');
  const [direction, setDirection] = useState<Direction>('right');
  const [currentFrame, setFrame] = useState(1);
  const [framePos, setFramePos] = useState(getFramePx(direction, currentFrame));
  const [keyMap, setKeyMap] = useState({
    ArrowUp: false,
    ArrowLeft: false,
    ArrowRight: false,
    ArrowDown: false,
    Space: false,
  });

  const reset = (
    spriteElement: HTMLElement | null,
    timeoutId: number | null
  ): number => {
    if (timeoutId !== null) clearTimeout(timeoutId);

    return window.setTimeout(() => {
      // setFrame(JUMP_FRAMES.end);
    }, 500);
  };

  const handleKeyUp = ({ code }: KeyboardEvent) => {
    setKeyMap({ ...keyMap, [code]: false });
    setIdleTime(reset(document.querySelector('.Dino-sprite'), idleTime));
  };

  const handleKeyDown = ({ code }: KeyboardEvent) => {
    const spriteContainer: any = document.querySelector('.Dino-container');
    setKeyMap({ ...keyMap, [code]: true });

    const newDirectionX = code === 'ArrowLeft' ? 'left' : 'right';

    if (code === 'ArrowRight' || code === 'ArrowLeft') {
      if (isJumping) return;
      const changeDirection = direction !== newDirectionX;
      const newFrame = nextFrame(currentFrame, newDirectionX, changeDirection);
      setDirection(newDirectionX);
      setFrame(newFrame);
      setContainerPos(
        newDirectionX === 'left' ? containerPos - SPEED : containerPos + SPEED
      );
      setFramePos(() => getFramePx(direction, newFrame));
    } else if (code === 'ArrowUp' || code === 'Space') {
      const { start } = JUMP_FRAMES;
      setFrame(start);

      if (!isJumping) {
        setIsJumping(true);
        if (keyMap.ArrowLeft || keyMap.ArrowRight) {
          const keyframe = jumpKeyframes(containerPos, direction);
          injectStylesheet(keyframe);
        }
        // TODO: Handle this better
        spriteContainer.classList.add('Dino-container-jump');
        window.setTimeout(() => {
          spriteContainer.classList.remove('Dino-container-jump');
          setIsJumping(false);
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
    <SpriteContainer
      className={`Dino-container ${name}`}
      containerPos={containerPos}
      setJump={isJumping}
      animationName={animationName}
    >
      <Sprite
        src={direction === 'right' ? imageSourceRight : imageSourceLeft}
        alt="dino"
        className={`Dino-sprite`}
        framePos={framePos}
      />
    </SpriteContainer>
  );
}
