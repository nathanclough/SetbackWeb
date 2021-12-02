import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import Login from './Components/Login';
import './App.css';
import { createTheme,ThemeProvider } from '@mui/material/styles';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  
 const [currentPage,setCurrentPage] = useState("Login");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ThemeProvider theme={darkTheme}>
          {
            <Login></Login>
          }
        </ThemeProvider>        
      </header>
    </div>
  );
}

export default App;
