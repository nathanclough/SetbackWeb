import { ListItem,List,ListItemText,Button } from "@mui/material";

function ScoreBoard (props) {

    const styles = {
        backgroundColor: 'green'
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
            <p style={pStyle}>Team One: {props.score[1]} </p><p style={pStyle}>Team Two: {props.score[2]}</p>
            {props.players.map((item,index) => (
                <ListItem key={index} style={getStyle(index)}>
                    <ListItemText primary={item} secondary={`team ${index%2+1}`}></ListItemText>
                </ListItem>
            ))}
        </List>)
}
export default ScoreBoard