import React, { useEffect, useState } from 'react';
import './App.css';
import Dino from './components/Dino';
import TardLeft from './images/tard-left.png';
import TardRight from './images/tard-right.png';
import { DinoSprite } from './types/dino';
import styled from 'styled-components';

export default function App() {
  const App = styled.div`
    /* ... */
    background: lightblue;
    height: 100%;
    width: 100%;
    position: absolute;
  `;

  const dinoSprites: DinoSprite[] = [
    {
      name: 'tard',
      imageSourceLeft: TardLeft,
      imageSourceRight: TardRight,
    },
  ];

  return (
    <App className="App">
      {dinoSprites.map((props) => (
        <Dino key={name} {...props} />
      ))}
    </App>
  );
}
