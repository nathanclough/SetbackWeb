import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Button, Slider} from "@mui/material";
import { useState } from 'react';

function Bid(props){
    const [amt,setAmt] = useState(0)
    const handleClose = (event,reason) => {
        if (reason !== 'backdropClick') {
          props.setOpen(false);
          console.log(amt)
          
        }
      };

    return(
        <Dialog open={props.open} onClose={handleClose}>
            <DialogTitle>Bid</DialogTitle>
            <DialogContent style={{display: "flex", flexDirection: "column",width:"25vw",height:"25vh",justifyContent:"space-between"}}>
            <DialogContentText>
                Select an amount to bid
            </DialogContentText>
                <Slider
                aria-label="Bid"
                defaultValue={0}
                valueLabelDisplay="on"
                step={1}
                min={0}
                max={7}
                onChange={(e) => {setAmt(e.target.value)}}
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}
export default Bid;