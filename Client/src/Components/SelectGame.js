import React, {useEffect, useState} from 'react'
import Button from '@mui/material/Button'
import { Alert, TextField } from '@mui/material'

function SelectGame(props){

    const [gameId,setGameId] = useState("")

    const createGameClick = () =>{
        props.homeApi.createGame();
        props.navigate("Lobby")
    }
    
    const handleJoinGame = (result) =>{
        if(result === gameId){
            props.navigate("Lobby")
        }
        else{
            console.log("Unable to join game")
        }
    }

    const joinGameClick = () =>{
        props.homeApi.JoinGame(gameId,handleJoinGame)
    }



    return(
        <div>
            <div className="App-form">
                <TextField onChange={(event) => {setGameId(event.target.value)}} id="game-id" variant="outlined" label="Game ID"></TextField>
                <Button onClick={joinGameClick} variant="contained">Join</Button>
            </div>
            <Button onClick={createGameClick}>Create Game</Button>
        </div>
    )
}
export default SelectGame;