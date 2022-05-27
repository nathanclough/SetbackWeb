import {Button, Select, MenuItem, FormControl ,FormHelperText,InputLabel} from "@mui/material";

function TrumpSelector (props) {
    const submit = () =>{
        if(props.selectedCards.length >=6){
        props.gameApi.setTrump({"trump" : props.trump, "discard":props.selectedCards})
        props.setSelected([])
        props.setShowTrumpSelector(false)
        }
    }
    return <>
            <p>Select trump from and choose cards to discard then click confirm </p>
            <FormControl>
                    <InputLabel id="demo-simple-select-helper-label">Trump</InputLabel>
                    <Select
                    labelId="trump-select-label"
                    id="trump-select"
                    value={props.trump}
                    label="Trump"
                    onChange={(event) => {
                        props.setTrump(event.target.value);
                    }}
                >
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Diamonds"}>Diamonds</MenuItem>
                        <MenuItem value={"Hearts"}>Hearts</MenuItem>
                        <MenuItem value={"Spades"}>Spades</MenuItem>
                        <MenuItem value={"Clubs"}>Clubs</MenuItem>
                    </Select>
                <FormHelperText>Select trump from dropdown </FormHelperText>
            </FormControl>
            <Button variant="contained" style={{minWidth:"80px"}} onClick={() => submit()} >Confirm</Button>
        </> 
      }
      export default TrumpSelector