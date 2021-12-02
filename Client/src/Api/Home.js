export class Home{
    constructor(sio){
        this.sio = sio;
    }

    onConnection(cb){
        this.sio.on('connect', () => {
            cb()
            console.log('connected')
        });
    }

    setUsername(username,cb){
        this.sio.emit('set_username',{'username': username}, (result) =>{
            cb(result)
        })
    }

    CreateGame(){

    }

    JoinGame(){

    }
}
