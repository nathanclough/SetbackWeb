import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Button, Slider} from "@mui/material";

function Bid(props){
    const handleClose = (event,reason) => {
        if (reason !== 'backdropClick') {
          props.setOpen(false);
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
                defaultValue={10}
                valueLabelDisplay="on"
                step={1}
                min={0}
                max={7}
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}
export default Bid;