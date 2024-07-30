import { useState } from "react";
export default function Player({initialName,symbol,isActive,onChangePlayerName}){
    const [isEditing,setIsEditing] = useState(false);
    const [playerName,setPlayerName] = useState(initialName)
    const editHandler = ()=>{
        setIsEditing(editing=>!editing);
        if(isEditing){
            onChangePlayerName(symbol,playerName)
        }
    }
    const nameHandler=(event)=>{
        setPlayerName(event.target.value);
    }
    return(
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {isEditing && <input type="text" required value={playerName} onChange={nameHandler}></input>}
                {!isEditing && <span className="player-name">{playerName}</span>}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={editHandler}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    )
}