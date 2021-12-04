export class Lobby{
    constructor(sio){
        this.sio = sio;
    }

    onTeamSelection(cb){
        this.sio.on('team_selection', (data) =>{
            console.log("callback",data)
            cb(data)

        })
    }
    updateReady(value){
        this.sio.emit('update_ready',{'ready':value})
    }
    selectTeam(team){
        this.sio.emit('select_team',{'team':team})
        console.log("select_team event",team) 
    }

    onLeft(cb){
        this.sio.on('left_team', (data) =>{
            console.log('left_team',data)
            cb(data)
        })
    }

    leaveTeam(team,username){
        console.log('leave_team',team,username)
        this.sio.emit('leave_team', {'team':team, 'username':username})
    }
}