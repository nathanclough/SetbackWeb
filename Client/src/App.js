import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import Login from './Components/Login';
import SelectGame from './Components/SelectGame';
import Lobby from './Components/Lobby';
import { home } from './Api/Api';
import './App.css';
import { createTheme,ThemeProvider } from '@mui/material/styles';

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
          return <SelectGame username={username} navigate={setCurrentPage}></SelectGame>  
        case "Lobby":
          return <Lobby navigate={setCurrentPage} username={username}></Lobby>
        case "Table":
          return <p>Game Started</p>
        default:
          return <Login username={username} setUsername={setUsername} navigate={setCurrentPage}></Login>
      }
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ThemeProvider theme={darkTheme}>
          {
            getComponent()
          }
        </ThemeProvider>        
      </header>
    </div>
  );
}

export default App;
