import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import Login from './Components/Login';
import SelectGame from './Components/SelectGame';
import Lobby from './Components/Lobby';
import Table from './Components/Table';
import Home from './Api/Home'
import LobbyApi from './Api/Lobby'
import GameApi from './Api/Game'
import './App.css';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import openSocket from 'socket.io-client';

const  sio = openSocket('http://localhost:8000');
const home = new Home(sio);
const lobby = new LobbyApi(sio); 
const game = new GameApi(sio)

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const [username,setUsername] = useState("guest")
  const [currentPage,setCurrentPage] = useState("Login");

  useEffect( () =>{
    home.setGuest(setUsername)
  },[])
  
  const getComponent = () => {
    switch (currentPage) {
      case "SelectGame":
        return <SelectGame homeApi={home} username={username} navigate={setCurrentPage}></SelectGame>  
      case "Lobby":
        return <Lobby lobbyApi={lobby} homeApi={home} navigate={setCurrentPage} username={username}></Lobby>
      case "Table":
        return <Table gameApi={game}></Table>
      default:
        return <Login homeApi={home} username={username} setUsername={setUsername} navigate={setCurrentPage}></Login>
    }
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <ThemeProvider theme={darkTheme}>
          <Table gameApi={game}></Table>
          {/* {
            getComponent()
          } */}
        </ThemeProvider>        
      </header>
    </div>
  );
}

export default App;
