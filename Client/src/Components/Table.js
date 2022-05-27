import { ListItem,List,ListItemText,Button} from "@mui/material";
import { useEffect,useState } from "react";
import ScoreBoard from "./ScoreBoard"
import Bid from "./Bid";
import TrumpSelector from "./TrumpSelector";
import DiscardMenu from "./DiscardMenu";

function Table (props) {
    const [players,setPlayers] = useState([])
    const [activeTurn, setActiveTurn] = useState("")
    const [trump, setTrump] = useState("")
    const [showTrumpSelector,setShowTrumpSelector] = useState(false)
    const [dealer,setDealer] = useState("")
    const [cards,setCards] = useState([])
    const [selectedCards,setSelectedCards] = useState([])
    const [gameState, setGameState] = useState("Bid")
    const [score, setScore] = useState({1:0,2:0})
    const [open, setOpen] = useState(false);
    const [showDiscardMenu, setShowDiscardMenu] = useState(false)

    useEffect( () => {
         props.gameApi.getInitialState( (data) => {
            setPlayers(data['players'])
            setDealer(data['dealer'])
            setCards(data['cards'])
            setActiveTurn(data['players'].findIndex( (x) => x.name === data.current_bidder))
            setOpen(data.current_bidder === data.name)
            props.gameApi.onBid((bidRes) => {
                let newPlayers = [...data.players]
                var index = newPlayers.findIndex( x => x.name === bidRes.name) 
                newPlayers[index].current_bid = bidRes.bid 
                console.log(bidRes)           
                setActiveTurn(data['players'].findIndex( (x) => x.name === bidRes.nextBidder))
                setOpen(bidRes.nextBidder === data.name && bidRes.complete === false)
                setPlayers(newPlayers)
             })

            props.gameApi.onBidWin( (d) => {
                console.log(d)
                setShowTrumpSelector(true)
                var current_cards = [...data.cards, ...d.kitty]
                setCards(current_cards)
            })


         } )
         props.gameApi.onNewTrump( (trump) => {
            setTrump(trump)
            setShowDiscardMenu(true) 
        })
         

    },[props.gameApi])
    
    const selectCard = (card) => {
        var newCards = cards.filter( x => !(x.rank === card.rank && card.suit === x.suit))
        var newSelected = [...selectedCards, card]

        setCards(newCards)
        setSelectedCards(newSelected)
    }

    const unSelectCard = (card) => {
        var newCards = [...cards, card]
        var newSelected = selectedCards.filter( x => !(x.rank == card.rank && card.suit === x.suit))

        setCards(newCards)
        setSelectedCards(newSelected)
    }

    const trumpSelector = () =>{
        if (!showTrumpSelector)
            return <></>
        
        return <TrumpSelector setShowTrumpSelector={setShowTrumpSelector} setSelected={setSelectedCards} gameApi={props.gameApi} selectedCards={selectedCards} trump={trump} setTrump={setTrump}/>

    }

    const discardMenu = () => {
        if (!showDiscardMenu)
            return <></>
        
        return <DiscardMenu setShowDiscardMenu={setShowDiscardMenu} setSelected={setSelectedCards} gameApi={props.gameApi} selectedCards={selectedCards}/>
    }

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center",justifyContent:"space-between"}}>
            
            <div style={{display: "flex", flexDirection: "row", justifyContent:"space-between", height:"70vh"}}>
                <div style={{width:"70vw"}}>
                    <List style={{display:"flex", flexDirection:"row"}} >
                    {selectedCards.map((item,index) => (
                        <Button onClick={() => unSelectCard(item)}>
                            <ListItemText primary={`${item.rank} ${item.suit}`}></ListItemText>
                        </Button>
                    ))}
                    </List>
                </div>
                <ScoreBoard score={score} activeTurn={activeTurn} players={players} trump={trump}/>
            </div>
            <div style={{height:"20vh"}}>
            {trumpSelector()}
            {discardMenu()}
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
                </List>                
            </div>
            <Bid gameApi={props.gameApi} open={open} setOpen={setOpen}></Bid>
        </div>
    )
}
export default Table