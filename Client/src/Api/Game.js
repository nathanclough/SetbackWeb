export default class GameApi{
    constructor(sio){
        this.sio = sio;
    }

    getInitialState(cb){
        // cb({
        //     "cards": [
        //         {
        //             "suit": "",
        //             "rank": "JOKER"
        //         },
        //         {
        //             "suit": "Diamonds",
        //             "rank": "King"
        //         },
        //         {
        //             "suit": "Clubs",
        //             "rank": "Queen"
        //         },
        //         {
        //             "suit": "Spades",
        //             "rank": "Jack"
        //         },
        //         {
        //             "suit": "Hearts",
        //             "rank": 10
        //         },
        //         {
        //             "suit": "Diamonds",
        //             "rank": 8
        //         }
        //     ],
        //     "team": 1,
        //     "dealer": "n",
        //     "players": [
        //         { "name": "n", "team" : 1, "current_bid" : "p.current_bid", "position" : "p.position"},
        //         { "name": "n2", "team" : 1, "current_bid" : "p.current_bid", "position" : "p.position"},
        //         ,
        //         { "name": "n3", "team" : 2, "current_bid" : "p.current_bid", "position" : "p.position"},
        //         ,
        //         { "name": "n4", "team" : 2, "current_bid" : "p.current_bid", "position" : "p.position"},

        //     ],
        //      "current_bidder":"n",
        //      "name": "n2"
        // })
        
        this.sio.emit('get_initial_state',(result) => {
            console.log(result)
            cb(result)
        }) 
    }

    makeBid(cb,bid){
        this.sio.emit('make_bid', {'bid':bid}, (result) => {
            console.log("made bid",bid)
            cb(result)
        })
    }

    onBidRequest(cb){
        this.sio.on('bid_request',)
    }

    onBid(cb){
        this.sio.on('bid_made', (data) => {
            console.log("hello")
            cb(data)
        })
    }

    onBidWin(cb){
        this.sio.on('bid_won', (data) => {
            console.log(data)
            cb(data)
        })
    }

    setTrump(data) {
        console.log(data)
        this.sio.emit('set_trump',data)
    }

    onNewTrump(cb,bid){
        this.sio.on('new_trump', (data) => {
            cb(data["trump"])
        })
    }

    discard(data){
        this.sio.emit('discard',{"discard" : data})
    }
}