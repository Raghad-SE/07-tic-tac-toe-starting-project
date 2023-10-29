import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

const PALYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIALGAMEBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function checkForWinner(gameboard) {
  // Check for a winner in each row.
  for (let row = 0; row < gameboard.length; row++) {
    if (
      gameboard[row][0] === gameboard[row][1] &&
      gameboard[row][1] === gameboard[row][2] &&
      gameboard[row][0] !== null
    ) {
      return gameboard[row][0];
    }
  }

  // Check for a winner in each column.
  for (let col = 0; col < gameboard[0].length; col++) {
    if (
      gameboard[0][col] === gameboard[1][col] &&
      gameboard[1][col] === gameboard[2][col] &&
      gameboard[0][col] !== null
    ) {
      return gameboard[0][col];
    }
  }

  // Check for a winner in each diagonal.
  if (
    gameboard[0][0] === gameboard[1][1] &&
    gameboard[1][1] === gameboard[2][2] &&
    gameboard[0][0] !== null
  ) {
    return gameboard[0][0];
  }

  if (
    gameboard[0][2] === gameboard[1][1] &&
    gameboard[1][1] === gameboard[2][0] &&
    gameboard[0][2] !== null
  ) {
    return gameboard[0][2];
  }

  // If no winner is found, return null.
  return null;
}

function derivedActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function derivedGameBoard(gameTurns) {
  let gameboard = [...INITIALGAMEBOARD.map((array) => [...array])];
  for (const turn in gameTurns) {
    const { square, player } = gameTurns[turn];
    const { row, col } = square;
    gameboard[row][col] = player;
  }
  return gameboard;
}

function App() {
  const [player, setPlayers] = useState(PALYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = derivedActivePlayer(gameTurns);
  const gameboard = derivedGameBoard(gameTurns);
  const winner = checkForWinner(gameboard);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = derivedActivePlayer(prevTurns);
      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      console.log(gameboard);
      return updateTurns;
    });
  }
  function handleRestart() {
    setGameTurns([]);
  }
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            key={1}
            initialName={PALYERS.X}
            symbol="X"
            onChangeName={handlePlayerNameChange}
            isActive={activePlayer === "X"}
          />
          <Player
            key={2}
            initialName={PALYERS.O}
            symbol="O"
            onChangeName={handlePlayerNameChange}
            isActive={activePlayer === "O"}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={player[winner]} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameboard} />
      </div>
      <Log turns={gameTurns}></Log>
    </main>
  );
}

export default App;
