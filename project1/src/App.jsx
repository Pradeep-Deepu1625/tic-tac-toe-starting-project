import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import {WINNING_COMBINATIONS} from "./components/winning-combinations";
import GameOver from "./GameOver";
const PLAYERS = {
  X : "PLAYER 1",
  O : "PLAYER 2"
}
const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
];
function deriveActivePlayer(gameTurns){
  let curPlayer ="X";
  if(gameTurns.length > 0 && gameTurns[0].player === "X"){
    curPlayer = "O"
  }
  return curPlayer
}
function deriveGameBoard(gameTurns){
  let board = [...initialGameBoard.map((inner)=> [...inner])];
    for(const turn of gameTurns){
        const {square , player} = turn;
        const {row , col} = square;
        board[row][col] = player
    }
    return board
}
function deriveWinner(board,players){
    let winner;
    for(const combination of WINNING_COMBINATIONS){
      const firstSquareSymbol = board[combination[0].row][combination[0].column]
      const secondSquareSymbol = board[combination[1].row][combination[1].column]
      const thirdSquareSymbol = board[combination[2].row][combination[2].column]
      if(firstSquareSymbol &&
        firstSquareSymbol === secondSquareSymbol &&
        firstSquareSymbol === thirdSquareSymbol
      ){
        winner = players[firstSquareSymbol]
      }
    }
    return winner
}
function App() {
  // const [activePlayer,setActivePlayer] = useState("X");
  const [players,setPlayers]= useState(PLAYERS)
  // let winner;
  const [gameTurns,setTurns]=useState([]);
  let activePlayer = deriveActivePlayer(gameTurns)
  // let board = [...initialGameBoard.map((inner)=> [...inner])];
  //   for(const turn of gameTurns){
  //       const {square , player} = turn;
  //       const {row , col} = square;
  //       board[row][col] = player
  //   }
  //   for(const combination of WINNING_COMBINATIONS){
  //     const firstSquareSymbol = board[combination[0].row][combination[0].column]
  //     const secondSquareSymbol = board[combination[1].row][combination[1].column]
  //     const thirdSquareSymbol = board[combination[2].row][combination[2].column]
  //     if(firstSquareSymbol &&
  //       firstSquareSymbol === secondSquareSymbol &&
  //       firstSquareSymbol === thirdSquareSymbol
  //     ){
  //       winner = players[firstSquareSymbol]
  //     }
  //   }
    const hasDraw = gameTurns.length === 9 && !winner;
  const handleActivePlayer = (rowIndex,colIndex)=>{
    // setActivePlayer((currActivePlayer)=>currActivePlayer === "X" ? "O" : "X");
    setTurns((prevTurn)=>{
      // let curPlayer = "X";
      // if(prevTurn.length > 0 && prevTurn[0].player === "X" ){
      //   curPlayer= "O"
      // }
      let curPlayer = deriveActivePlayer(prevTurn)
      const updatedTurns = [{square:{row:rowIndex,col:colIndex},player: curPlayer},...prevTurn]
      return updatedTurns
    })
  }
  const handleRematch = ()=>{
    setTurns([])
  };
  const handlePlayerChange = (symbol,newName)=>{
    setPlayers(prevPlayers =>{
      return {
        ...prevPlayers,
        [symbol] : newName
      }
    })
  }
  let board = deriveGameBoard(gameTurns)
  let winner = deriveWinner(board,players) 
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onChangePlayerName={handlePlayerChange}/>
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} onChangePlayerName={handlePlayerChange}/>
        </ol>
        {(winner||hasDraw)&& <GameOver winner={winner} onRematch={handleRematch}/>}
          <GameBoard onPlacePlayer={handleActivePlayer} GameBoard={board}/>
      </div>
          <Log turns={gameTurns}/>
    </main>
  )
}

export default App
