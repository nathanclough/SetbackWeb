export default class Home{
    constructor(sio){
        this.sio = sio;
    }

    onConnection(){
        this.sio.on('connect', () => {
            console.log('connected')
        });
    }

    setUsername(username,cb){
        this.sio.emit('set_username',{'username': username})
        cb(username)
    }

    setGuest(cb){
        this.sio.on('set_guest',(data) => {
            console.log(data)
            cb(data['username'])
        })
    }

    createGame(){
        this.sio.emit('create_game',(result) =>{
            console.log("created",result)
        });
    }

    JoinGame(gameid,cb){
        this.sio.emit('join_game',{'game_id':gameid}, (result) =>{
            cb(result)
        })
    }

    onJoined(cb){
        this.sio.on('joined_game', (data) => {
            cb(data)
        })
    }
    
}
