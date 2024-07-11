import React, { useState, useEffect } from 'react';

const CarRacingGame = () => {
  const [carPosition, setCarPosition] = useState(300);
  const [obstacles, setObstacles] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [gameSpeed, setGameSpeed] = useState(5);
  const [carSpeed, setCarSpeed] = useState(20);

  useEffect(() => {
    if (difficulty !== null && !gameOver) {
      const gameInterval = setInterval(() => {
        moveObstacles();
        if (Math.random() < 0.02) {
          createObstacle();
        }
      }, 50);

      return () => clearInterval(gameInterval);
    }
  }, [obstacles, gameOver, difficulty]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft' && carPosition > 0) {
      setCarPosition((prev) => Math.max(prev - carSpeed, 0));
    } else if (e.key === 'ArrowRight' && carPosition < 340) {
      setCarPosition((prev) => Math.min(prev + carSpeed, 340));
    }
  };

  useEffect(() => {
    if (!gameOver) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [carPosition, gameOver]);

  const createObstacle = () => {
    setObstacles((prevObstacles) => [
      ...prevObstacles,
      { left: Math.floor(Math.random() * 340), top: -80 },
    ]);
  };

  const moveObstacles = () => {
    setObstacles((prevObstacles) =>
      prevObstacles
        .map((obstacle) => ({
          ...obstacle,
          top: obstacle.top + gameSpeed,
        }))
        .filter((obstacle) => {
          if (obstacle.top > 600) return false;
          if (checkCollision(obstacle)) {
            setGameOver(true);
            return false;
          }
          return true;
        })
    );
  };

  const checkCollision = (obstacle) => {
    const carRect = { left: carPosition, right: carPosition + 60, top: 580, bottom: 600 };
    const obstacleRect = { left: obstacle.left, right: obstacle.left + 60, top: obstacle.top, bottom: obstacle.top + 80 };

    return (
      carRect.left < obstacleRect.right &&
      carRect.right > obstacleRect.left &&
      carRect.top < obstacleRect.bottom &&
      carRect.bottom > obstacleRect.top &&
      obstacleRect.top > 500 // Only detect collision when the obstacle is close to the car
    );
  };

  const restartGame = () => {
    setGameOver(false);
    setObstacles([]);
    setCarPosition(300);
  };

  const handleDifficultySelection = (level) => {
    setDifficulty(level);
    setGameSpeed(level === 'easy' ? 5 : level === 'medium' ? 10 : 15);
    setCarSpeed(level === 'easy' ? 20 : level === 'medium' ? 30 : 40);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {difficulty === null ? (
        <div className="flex flex-col items-center justify-center bg-white bg-opacity-75 text-gray-800 p-6 rounded-lg">
          <div className="text-2xl mb-4">Select Difficulty</div>
          <button
            onClick={() => handleDifficultySelection('easy')}
            className="bg-green-300 hover:bg-green-400 text-white font-bold py-2 px-4 rounded mb-2"
          >
            Easy
          </button>
          <button
            onClick={() => handleDifficultySelection('medium')}
            className="bg-yellow-200 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded mb-2"
          >
            Medium
          </button>
          <button
            onClick={() => handleDifficultySelection('hard')}
            className="bg-red-200 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
          >
            Hard
          </button>
        </div>
      ) : (
        <>
          <div className="relative w-[400px] h-[600px] bg-yellow-50 overflow-hidden border-4 border-black">
            <img
              src="/car5.png"
              alt="Car"
              className="absolute bottom-5 w-15 h-20 transition-transform duration-100"
              style={{ left: `${carPosition}px` }}
            />
            {obstacles.map((obstacle, index) => (
              <img
                key={index}
                src="/barrel.png"
                alt="Obstacle"
                className="absolute w-15 h-20"
                style={{ left: `${obstacle.left}px`, top: `${obstacle.top}px` }}
              />
            ))}
          </div>
          {gameOver && (
            <div className="absolute flex flex-col items-center justify-center bg-white bg-opacity-50 text-gray-800 p-6 rounded-lg">
              <div className="text-4xl mb-4">Game Over</div>
              <button
                onClick={restartGame}
                className="bg-blue-200 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded mb-2"
              >
                Restart
              </button>
              <button
                onClick={() => setDifficulty(null)}
                className="bg-red-200 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CarRacingGame;
