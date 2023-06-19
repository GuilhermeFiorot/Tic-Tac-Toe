import React, { useState } from "react";
import styled from "styled-components";

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

type CellProps = {
  onClick: (row: number, column: number) => void;
};

const Cell = styled.div<CellProps>`
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
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const checarGanhador = (board: string[][]) => {
  const todasCombinacoes = [
    // Linha
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    // Coluna
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    // Diagonal
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
  ];
  
  let msgGanhador = "";
  
  // Check for a winner
  for (const combination of todasCombinacoes) {
    const [x1, y1] = combination[0];
    const [x2, y2] = combination[1];
    const [x3, y3] = combination[2];
  
    if (
      board[x1][y1] === board[x2][y2] &&
      board[x2][y2] === board[x3][y3] &&
      board[x1][y1] !== ""
    ) {
      msgGanhador = "O Ganhador é " + board[x1][y1];
      break;
    }
  }
  
  // Check for a draw
  if (msgGanhador === "") {
    let boardCheio = true;
    for (const row of board) {
      for (const cell of row) {
        if (cell === "") {
          boardCheio = false;
          break;
        }
      }
      if (!boardCheio) {
        return msgGanhador;
      }
    }
    if (boardCheio) {
      msgGanhador = "O jogo terminou em empate";
    }
  }
  return msgGanhador;
};

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [player, setPlayer] = useState("X");
  const [ganhador, setGanhador] = useState("");

  const restartGame = () => {
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setPlayer("X");
    setGanhador("");
  };

  const buttonHandler = (row: number, column: number) => {
    if (board[row][column] != "") {
      return;
    }
    board[row][column] = player;
    setBoard(board);

    let possivelGanhador = checarGanhador(board);

    if (possivelGanhador != "") {
      setGanhador(possivelGanhador);
    } else {
      setPlayer((prev) => (prev === "X" ? "O" : "X"));
    }
  };

  return (
    <Container>
      <Message>É a vez do jogador {player}</Message>
      <br></br>
      <Board>
        <Cell onClick={() => buttonHandler(0, 0)}> {board[0][0]} </Cell>
        <Cell onClick={() => buttonHandler(0, 1)}> {board[0][1]} </Cell>
        <Cell onClick={() => buttonHandler(0, 2)}> {board[0][2]} </Cell>
        <Cell onClick={() => buttonHandler(1, 0)}> {board[1][0]} </Cell>
        <Cell onClick={() => buttonHandler(1, 1)}> {board[1][1]} </Cell>
        <Cell onClick={() => buttonHandler(1, 2)}> {board[1][2]} </Cell>
        <Cell onClick={() => buttonHandler(2, 0)}> {board[2][0]} </Cell>
        <Cell onClick={() => buttonHandler(2, 1)}> {board[2][1]} </Cell>
        <Cell onClick={() => buttonHandler(2, 2)}> {board[2][2]} </Cell>
      </Board>

      <Message>{ganhador}</Message>

      <Message>
        <button onClick={restartGame}>Reiniciar</button>
      </Message>
    </Container>
  );
};

export default App;

//<Message>O Jogador {player} venceu! <button onClick={restartGame}>Reiniciar</button></Message>
