import { ListItem,List,ListItemText,Button,Slider} from "@mui/material";
import { useEffect,useState } from "react";
import ScoreBoard from "./ScoreBoard"
import Bid from "./Bid"


function Table (props) {
    const [players,setPlayers] = useState([])
    const [activeTurn, setActiveTurn] = useState("")
    const [dealer,setDealer] = useState("")
    const [cards,setCards] = useState([])
    const [selectedCards,setSelectedCards] = useState([])
    const [gameState, setGameState] = useState("Bid")
    const [score, setScore] = useState({1:0,2:0})
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    useEffect( () => {
         props.gameApi.getInitialState( (data) => {
            setPlayers(data['players'])
            setDealer(data['dealer'])
            setCards(data['cards'])
         } )
    },[props.gameApi])
    
    const selectCard = (card) => {
        var newCards = cards.filter( x => !(x.rank == card.rank && x.suit === x.suit))
        var newSelected = [...selectedCards, card]

        setCards(newCards)
        setSelectedCards(newSelected)
    }

    const unSelectCard = (card) => {
        var newCards = [...cards, card]
        var newSelected = selectedCards.filter( x => !(x.rank == card.rank && x.suit === x.suit))

        setCards(newCards)
        setSelectedCards(newSelected)
    }

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center",justifyContent:"space-between"}}>
            <Button variant="outlined" onClick={handleClickOpen}>
                 Select Bid
             </Button>
            <div style={{display: "flex", flexDirection: "row", justifyContent:"space-between", height:"85vh"}}>
                <div style={{width:"80vw"}}>
                    <List style={{display:"flex", flexDirection:"row"}} >
                    {selectedCards.map((item,index) => (
                        <Button onClick={() => unSelectCard(item)}>
                            <ListItemText primary={`${item.rank} ${item.suit}`}></ListItemText>
                        </Button>
                    ))}
                    </List>
                </div>
                <ScoreBoard score={score} activeTurn={1} players={players}/>
            </div>
            <div style={{height:"10vh", width:"95vw"}}>
                <List  style={{display:"flex", flexDirection:"row", alignItems:"flex-start", justifyContent:"flex-start"}} >
                    {cards.map((item,index) => (
                        <ListItem key={index}>
                            <Button onClick={() => selectCard(item)}>
                                <ListItemText primary={`${item.rank} ${item.suit}`}></ListItemText>
                            </Button>
                        </ListItem>
                    ))}
                    <Button variant="contained" style={{marginLeft:"auto", minWidth:"80px"}}>Confirm</Button>
                </List>                
            </div>
            <Bid open={open} setOpen={setOpen}></Bid>
        </div>
    )
}
export default Table