import React, { useState, useEffect } from 'react';

const TicTacToeGame = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (!isXNext && !winner) {
      // Computer's turn
      const timeout = setTimeout(makeComputerMove, 500);
      return () => clearTimeout(timeout);
    }
  }, [isXNext, winner]);

  const handleClick = (index) => {
    if (board[index] || winner || !isXNext) return;
    const newBoard = board.slice();
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsXNext(false);
    checkWinner(newBoard);
  };

  const makeComputerMove = () => {
    // Check if computer can win in this move
    let computerMove = findWinningMove(board, 'O');

    if (computerMove === -1) {
      // Check if user can win in the next move and block it
      computerMove = findWinningMove(board, 'X');
    }

    if (computerMove === -1) {
      // Otherwise, make a random move
      computerMove = getRandomMove(board);
    }

    const newBoard = board.slice();
    newBoard[computerMove] = 'O';
    setBoard(newBoard);
    setIsXNext(true);
    checkWinner(newBoard);
  };

  const findWinningMove = (currentBoard, symbol) => {
    for (let i = 0; i < currentBoard.length; i++) {
      if (!currentBoard[i]) {
        const newBoard = currentBoard.slice();
        newBoard[i] = symbol;
        if (isWinningMove(newBoard, symbol)) {
          return i;
        }
      }
    }
    return -1;
  };

  const isWinningMove = (currentBoard, symbol) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (currentBoard[a] === symbol && currentBoard[b] === symbol && currentBoard[c] === symbol) {
        return true;
      }
    }
    return false;
  };

  const getRandomMove = (currentBoard) => {
    const emptyCells = currentBoard.reduce((acc, cell, index) => {
      if (!cell) acc.push(index);
      return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
  };

  const checkWinner = (currentBoard) => {
    if (isWinningMove(currentBoard, 'X')) {
      setWinner('You');
    } else if (isWinningMove(currentBoard, 'O')) {
      setWinner('Computer');
    } else if (!currentBoard.includes(null)) {
      setWinner('Draw');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="text-4xl font-bold mb-6">Tic Tac Toe</div>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <div
            key={index}
            className="w-24 h-24 flex items-center justify-center bg-white border border-gray-400 text-3xl font-bold cursor-pointer"
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      {winner && (
        <div className="mt-6 text-2xl font-semibold text-white">
          {winner === 'Draw' ? 'It\'s a Draw!' : `${winner} wins!`}
        </div>
      )}
      <button
        onClick={resetGame}
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Restart Game
      </button>
    </div>
  );
};

export default TicTacToeGame;
