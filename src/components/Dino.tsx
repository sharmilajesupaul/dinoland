import React, { useEffect, useState } from 'react';
import tard from '../images/tard.png';

export default function Dino() {
  const [currentPos, setPos] = useState(0);

  const handleKeyDown = (event: any) => {
    const { key } = event;
    const spriteElement: any = document.querySelector('.Dino-sprite');

    if (key === 'ArrowRight') {
      spriteElement.style.transform = `translate(${currentPos - 24}px)`;
      setPos(currentPos - 24);
    }
  };

  useEffect(() => {
    // @ts-ignore
    document.addEventListener('keydown', handleKeyDown);
  });

  return (
    <div className={`Dino-container`}>
      <img src={tard} alt="dino" className={`Dino-sprite`} />
    </div>
  );
}
