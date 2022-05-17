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
        //     "dealer": "guest-_H17",
        //     "players": [
        //         "guest-_H17",
        //         "guest-7CxJ",
        //         "guest-OsdL",
        //         "guest-mBvY"
        //     ],
        //      "current_bidder":"guest-mBvY",
        //      "name": "guest-mBvY"
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
}