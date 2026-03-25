import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Trophy, RefreshCw } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const GAME_SPEED = 150;

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const generateFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // Check if food is on snake
      const onSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!onSnake) break;
    }
    return newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setIsGameOver(false);
    setFood(generateFood());
  };

  const moveSnake = useCallback(() => {
    if (isGameOver) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      // Check collision with self
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true);
        if (score > highScore) setHighScore(score);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isGameOver, score, highScore, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    gameLoopRef.current = setInterval(moveSnake, GAME_SPEED);
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [moveSnake]);

  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-black/40 backdrop-blur-xl rounded-3xl border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
      <div className="flex justify-between w-full px-4">
        <div className="flex items-center gap-2 text-cyan-400 font-mono">
          <Trophy size={20} />
          <span className="text-xl font-bold">{score}</span>
        </div>
        <div className="text-gray-500 font-mono text-sm">
          HI: {highScore}
        </div>
      </div>

      <div 
        className="relative bg-black border-2 border-cyan-500/20 rounded-lg overflow-hidden"
        style={{ 
          width: GRID_SIZE * 20, 
          height: GRID_SIZE * 20,
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
        }}
      >
        {/* Grid Background */}
        <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 opacity-5 pointer-events-none">
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-cyan-500" />
          ))}
        </div>

        {/* Snake */}
        {snake.map((segment, i) => (
          <div
            key={i}
            className={`absolute rounded-sm transition-all duration-150 ${
              i === 0 ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-cyan-600/80'
            }`}
            style={{
              width: '20px',
              height: '20px',
              left: segment.x * 20,
              top: segment.y * 20,
              zIndex: 10
            }}
          />
        ))}

        {/* Food */}
        <div
          className="absolute bg-magenta-500 rounded-full shadow-[0_0_15px_#f43f5e] animate-pulse"
          style={{
            width: '16px',
            height: '16px',
            left: food.x * 20 + 2,
            top: food.y * 20 + 2,
            backgroundColor: '#f43f5e',
            zIndex: 5
          }}
        />

        {/* Game Over Overlay */}
        {isGameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20 backdrop-blur-sm">
            <h2 className="text-magenta-500 text-3xl font-black tracking-tighter mb-4">GAME OVER</h2>
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-6 py-2 bg-cyan-500 text-black font-bold rounded-full hover:bg-cyan-400 transition-colors"
            >
              <RefreshCw size={18} />
              RETRY
            </button>
          </div>
        )}
      </div>

      <div className="text-gray-500 text-xs font-mono uppercase tracking-widest">
        Use Arrow Keys to Navigate
      </div>
    </div>
  );
}
