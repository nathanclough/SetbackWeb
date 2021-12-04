import React, {useState} from 'react';
import {home } from '../Api/Api'
import Button from '@mui/material/Button'
import { TextField } from '@mui/material';

function Login(props) {
    const [connection, setConnection] = useState("Not Connected");
    const [i, setInput] = useState("");
    home.onConnection(() => setConnection("Connected"))
  
   const onContinue  = () => 
   {
        if(i !== ""){
        console.log("set user")
        home.setUsername(i,props.setUsername)
        }

        props.navigate("SelectGame")
   }

   return (
       <div>
           <h1>Setback</h1>
            <p> Welcome! <br /> To get started add an optional username</p>
            <div class="App-form">
                <TextField  onChange={(event) => {setInput(event.target.value)}} id="outlined-basic" label="Username" variant="outlined" />
                <Button variant="contained" onClick={onContinue}>Continue</Button>
            </div>
            
       </div>
   )
}
export default Login;