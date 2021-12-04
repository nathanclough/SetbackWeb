import { Button } from "@mui/material";
import { display } from "@mui/system";
import { useState, useEffect } from "react";
import { home, lobby } from "../Api/Api";
import { v4 as uuidv4 } from 'uuid';


function Lobby(props){
    const [teamOne,setTeamOne] = useState([])
    const [teamTwo,setTeamTwo] = useState([])
    const [ready,setReady] = useState(false)
    const [currentTeam,setCurrentTeam] = useState("")
    const [totalReady,setTotalReady] = useState(0)
    const addPlayer = (data)=>{
        if ( data["team"] === 1){
            
            setTeamOne(prevTeamOne => {
                console.log(prevTeamOne)
                const n =[
                    ...prevTeamOne,
                    data["username"]
                  ]
                console.log(n)
                return n  })
        }
        else{
            setTeamTwo(prevTeamTwo => {
                return [
                  ...prevTeamTwo,
                  data["username"]
                ]})
            console.log(teamTwo)
        } 
    }

    const removePlayer = (data) =>{
        console.log("Remove player", data)
        
        if (data["team"] === 1){
            setTeamOne( prev => { const n = prev.filter(p => p !== data["username"]) 
                console.log(n,data["username"])
                return n    
            })
        }
        else{
            setTeamTwo( prev => { const n = prev.filter(p => p !== data["username"]) 
                console.log(n, data["username"])
                return n    
            })
        }
    }
    const selectTeam = (team) =>{
        console.log("clicked",team)
        
        if( currentTeam === ""){
            console.log("here")
            lobby.selectTeam(team)
            setCurrentTeam(team)
        }
        else if (currentTeam !== team){
            console.log(props.username)
            lobby.leaveTeam(currentTeam,props.username);
            lobby.selectTeam(team)
            setCurrentTeam(team)

        }
    }

    useEffect( () => {
        console.log(props.username)
        home.onJoined((data) => console.log(data))
        lobby.onTeamSelection(addPlayer)
        lobby.onLeft(removePlayer)
        lobby.onTotalReady(setTotalReady)
        lobby.onStart(() => props.navigate("Table"))
    },[])
    
    const buttons = () =>{
        if(!ready){
            return (
            <div>
                <Button onClick={()=>selectTeam(1)} variant="outlined" >Join Team One</Button>
                <Button onClick={() => selectTeam(2)} variant="outlined">Join Team Two</Button>
            </div>)
        }
        else{
            return <div></div>
        }
    }
    const readyText = () =>{
        if(ready){
            return "Un-ready"
        }
        else{
            return "Ready"
        }
    }

    return (
        <div>
            <h3>Lobby</h3>
            { buttons()}
            <Button onClick={() => {
                const r = (!ready && currentTeam !== "" && ( currentTeam == 1 ? (teamOne.length <=2) : (teamTwo.length <=2)))
                lobby.updateReady(r)
                setReady(r)
                }}>{readyText()}</Button>
            <p>{totalReady}</p>
            <div style={{display:'flex', justifyContent:'space-between' }}>
                <div style={{padding:'15px'}}>
                    <p>Team One</p>
                    {teamOne.map((item, index) => (
                        <li key={index}>{item}</li>
                        ))}
                </div>
                
                <div style={{padding:'15px'}}>
                    <p>Team Two</p>
                    {teamTwo.map((item, index) => (
                        <li key={index}>{item}</li>
                        ))}
                </div>
            </div>
        </div>
    )
}
export default Lobby;