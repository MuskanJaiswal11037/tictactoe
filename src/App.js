
import { useState } from 'react';

export default function Game() {

  const [history, sethistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [xIsNext,setXIsNext] =useState(true); 
  const currentSquares = history[currentMove];
  const handlestatus = history.length;
  function handlePlay(nextSquares) {
  //only keeping the valid data
  const nextHistory = [...history.slice(0,currentMove +1), nextSquares];
 
  sethistory(nextHistory);
  //updating to recent move....
  setCurrentMove(nextHistory.length-1);
  setXIsNext(!xIsNext);
  }
  
  function jumpTo(nextMove){
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }
  const moves=history.map((squares,move) => {
  let description;
   if(move === history.length-1)
    description='your current move #' + move;
  else if(move > 0){
    description ='Go to move #' + move; 
  } else{
    description = 'Go to game start' ;
  } 
  return (
    <li key={move}>
      <button onClick={() => jumpTo(move)}>{description}</button>
    </li>
  );
  });
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} status1={handlestatus}/>
      </div>
      <div className="game-info">
        <ol>{moves} </ol>
      </div>

    </div>
  ) ;
  }
  function Board({xIsNext, squares, onPlay, status1 }) {
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } 
  else if(status1===10)
    status = "It's a tie!";
  
  else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  function handleClick(i) {
    status1=calculateWinner(squares);
    const nextSquares = squares.slice();
    if (nextSquares[i] != null || calculateWinner(squares))
      return;
    if (xIsNext) {
      nextSquares[i] = "X";
    }
    else {
     nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {/* used arrow function to run the function only after click! */}
        <Square className="0" value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square className="1"value={squares[1]} onSquareClick={() => handleClick(1)}  />
        <Square className="2"value={squares[2]} onSquareClick={() => handleClick(2)}  />
      </div>
      <div className="board-row">
        <Square  className="3"value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square  className="4"value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square  className="5"value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square className="6"value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square className="7"value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square className="8"value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
   </>
  )
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
            return squares[a];     
    }
  }
  return null;
}
function Square({value, onSquareClick}){
  return (
    <>
    <button className="square" onClick={onSquareClick}>{value}</button>
    </>
  );
} 
