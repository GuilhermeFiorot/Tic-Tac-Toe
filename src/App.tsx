import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background-color: #f2f2f2;
  font-size: 36px;
  cursor: pointer;
`;

const Message = styled.div`
  margin-top: 20px;
  font-size: 24px;
`;

const initialBoard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [player, setPlayer] = useState('X');

  const restartGame = () => {
    // to-do
  };

  return (
    <Container>
      <Board>
        <Cell></Cell>
        <Cell></Cell>
        <Cell></Cell>
        <Cell></Cell>
        <Cell></Cell>
        <Cell></Cell>
        <Cell></Cell>
        <Cell></Cell>
        <Cell></Cell>
      </Board>
      <Message>
        O jogador "" venceu!
        <br />
        <button onClick={restartGame}>Reiniciar</button>
      </Message>
      <Message>
        É a vez do jogador "{player}"
      </Message>
    </Container>
  );
};

export default App;
