import React from 'react'
import Square from './Square'

function Board({ xIsNext, squares, onPlay }) {

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    
    xIsNext ? nextSquares[i] = 'X' : nextSquares[i] = 'O';
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  let winningSquares = [];
  
  if (winner) {
    status = winner.winner + ' a gagné';
    winningSquares = winner.line;
  } else if (squares.every(square => square !== null)) {
    status = 'Match nul ! Partie terminée';
  }
  else {
    status = 'Prochain tour : ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      {[0, 1, 2].map(row => (
        <div key={row} className="board-row">
          {[0, 1, 2].map(col => {
            const index = row * 3 + col;
            return (
              <Square
                key={index}
                value={squares[index]}
                onSquareClick={() => handleClick(index)}
                isWinning={winningSquares.includes(index)}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: [a, b, c]
      };
    }
  }
  return null;
}

export default Board