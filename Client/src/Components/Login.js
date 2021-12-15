import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button'
import { TextField } from '@mui/material';

function Login(props) {
    const [connection, setConnection] = useState("Not Connected");
    const [i, setInput] = useState("");
    
    useEffect( () => {
        props.homeApi.onConnection(() => setConnection("Connected"))
    }, [])
  
   const onContinue  = () => 
   {
        if(i !== ""){
        console.log("set user",i)
        props.homeApi.setUsername(i,props.setUsername)
        }

        props.navigate("SelectGame")
   }

   return (
       <div>
           <h1>Setback</h1>
            <p> Welcome! <br /> To get started add an optional username</p>
            <div class="App-form">
                <TextField name="username-input" onChange={(event) => {setInput(event.target.value)}} id="username-input" label="Username" variant="outlined" />
                <Button id="continue-button" variant="contained" onClick={onContinue}>Continue</Button>
            </div>
            
       </div>
   )
}
export default Login;