import React from 'react';
import { Link } from 'react-router-dom';

function Game() {
  const links = [
    { id: 2, path: "car-race", imageUrl: "car-race.png" },
    { id: 2, path: "tic-tac-go", imageUrl: "tic-tac-go.png" },
    { id: 2, path: "quiz", imageUrl: "quiz.png" },
    // Add more links as needed
  ];

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-3 gap-20">
        {links.map(link => (
          <Link key={link.id} to={link.path} className="block">
              <img src={link.imageUrl} alt={link.title} className="w-72" />
          </Link>
        ))}s
      </div>
    </div>
  );
}

export default Game;
