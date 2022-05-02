export default class GameApi{
    constructor(sio){
        this.sio = sio;
    }

    getInitialState(cb){
        cb({
            "cards": [
                {
                    "suit": "",
                    "rank": "JOKER"
                },
                {
                    "suit": "Diamonds",
                    "rank": "King"
                },
                {
                    "suit": "Clubs",
                    "rank": "Queen"
                },
                {
                    "suit": "Spades",
                    "rank": "Jack"
                },
                {
                    "suit": "Hearts",
                    "rank": 10
                },
                {
                    "suit": "Diamonds",
                    "rank": 8
                }
            ],
            "team": 1,
            "dealer": "guest-_H17",
            "players": [
                "guest-_H17",
                "guest-7CxJ",
                "guest-OsdL",
                "guest-mBvY"
            ]
        })
        // this.sio.emit('get_initial_state',(result) => {
        //     cb(result)
        // })
    }
}