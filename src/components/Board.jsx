import { Square } from './Square';
import { useRef, useState, useEffect } from 'react';
import clickSound from '../assets/music/bubble.mp3';
import finishSound from '../assets/music/finish.mp3';
import './Board.css';

export const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState('X');
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  const clickAudioRef = useRef(null);
  const finishAudioRef = useRef(null);

  useEffect(() => {
    if (winner || isDraw) {
      finishAudioRef.current.play();
    }
  }, [winner, isDraw]);

  const handleClick = (index) => {
    if (squares[index] || winner) {
      return;
    }

    const squaresCopy = [...squares];
    squaresCopy[index] = turn;
    setSquares(squaresCopy);
    setTurn(turn === 'X' ? 'O' : 'X');
    clickAudioRef.current.play();
  };

  const renderSquare = (index) => {
    return (
      <Square value={squares[index]} onClick={() => handleClick(index)} />
    );
  };

  useEffect(() => {
    const winningCOMBOS = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winningCOMBOS.forEach((line) => {
      const [a, b, c] = line;

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        setWinner(squares[a]);
      }
    });

    if (!winner && squares.every((square) => square !== null)) {
      setIsDraw(true);
    }
  }, [squares, winner]);

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setTurn('X');
    setWinner(null);
    setIsDraw(false);
  };

  return (
    <>
      <div className="board">
        <div className="alertTurn">Turno de: {turn}</div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        {winner && (
          <>
            <div className="alertContainer">
              <div className="resultAlert">Ganador: {winner}</div>
              <div className="reset" onClick={resetGame}>
                Reiniciar
              </div>
            </div>
          </>
        )}
        {!winner && isDraw && (
          <>
            <div className="alertContainer">
              <div className="resultAlert">¡Empate!</div>
              <div className="reset" onClick={resetGame}>
                Reiniciar
              </div>
            </div>
          </>
        )}
      </div>
      <audio ref={clickAudioRef}>
        <source src={clickSound} />
      </audio>
      <audio ref={finishAudioRef}>
        <source src={finishSound} />
      </audio>
    </>
  );
};
