import { useState } from "react"

// const initialGameBoard = [
//     [null,null,null],
//     [null,null,null],
//     [null,null,null]
// ]
export default function GameBoard({onPlacePlayer,GameBoard}){
    // let boardSymbol = initialGameBoard;
    // for(const turn of turns){
    //     const {square , player} = turn;
    //     const {row , col} = square;
    //     boardSymbol[row][col] = player
    // }
    // const [boardSymbol,setBoardSYmbol] = useState(initialGameBoard);
    // const handleSymbolSelect = (rowIndex,colIndex)=>{
    //     setBoardSYmbol((prevGameBord)=>{
    //         const updatedGameBoard = [...prevGameBord.map(innerArray=>[...innerArray])]
    //         updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedGameBoard
    //     });
    //     onPlacePlayer();
    // }
    return(
        <ol id="game-board">
            {GameBoard.map((row,rowIndex)=>
            <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol,colIndex)=>
                    <li key={colIndex}>
                        <button 
                            onClick={()=>onPlacePlayer(rowIndex,colIndex)}
                            disabled={playerSymbol !== null}
                        >
                            {playerSymbol}
                        </button>
                    </li>)}
                </ol>
            </li>)}
        </ol>
    )
}