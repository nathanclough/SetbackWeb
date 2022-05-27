import { ListItem,List,ListItemText,Button } from "@mui/material";

function ScoreBoard (props) {

    const styles = {
        backgroundColor: '#90caf9'
    }
    const getStyle = (index) =>{
        if(index===props.activeTurn){
            return styles
        }
        else 
        {
            return {}
        }
    }
    const pStyle = {fontSize: "2vmin"}
    return (                
        <List style={{width:"20vw", minHeight:"400px", maxHeight:"30vh", display:"flex", flexDirection:"column",alignItems:"self-start"}} sx={{ bgcolor: 'background.paper' }}>
            <p style={pStyle}>Team One: {props.score[1]} </p>
            <p style={pStyle}>Team Two: {props.score[2]} &emsp; Trump: {props.trump} </p>
            {props.players.map((item,index) => (
                <ListItem key={index} style={getStyle(index)}>
                    <ListItemText primary={item.name} secondary={`team ${item.team}, bid ${item.current_bid}`}></ListItemText>
                </ListItem>
            ))}
        </List>)
}
export default ScoreBoard