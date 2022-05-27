import {Button, Select, MenuItem, FormControl ,FormHelperText,InputLabel} from "@mui/material";

function DiscardMenu (props) {
    const submit = () =>{
        props.gameApi.discardCards(props.selectedCards)
        props.setSelectedCards([])
        props.setShowDiscardMenu(false)
    }
    return <>
            <p>Select cards to discard</p>
            <Button variant="contained" style={{minWidth:"80px"}} onClick={() => submit()} >Confirm</Button>
        </> 
      }
      export default DiscardMenu