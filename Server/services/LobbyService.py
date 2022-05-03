from app import sio
from aggregates.lobbyManager import LobbyManager
from services.GameService import CreateGame

lobbyManager = LobbyManager()
 
async def startTask(game_id):
    await sio.sleep(5)
    lobby = lobbyManager.lobbies[game_id]
    if lobby.is_ready():
        print("started", game_id)
        await CreateGame(game_id, lobby.team_one,lobby.team_two)

@sio.event
async def create_game(sid):
    # create a new room 
    async with sio.session(sid) as session:
        gameid = await lobbyManager.create_lobby(sid,session['username'])
        print("created",gameid)
        sio.enter_room(sid,gameid)
        session["room"] = gameid
        print(session["room"])
        print(lobbyManager.lobbies)
        await sio.emit('joined_game',{'username':session['username'] })
        print("Joined", gameid)
    return gameid

@sio.event
async def join_game(sid,data):
    async with sio.session(sid) as session:
        gameid = await lobbyManager.join_lobby(sid,data["game_id"],session['username'])
    # if game to join 
        if gameid:
            print("joined")
            sio.enter_room(sid,gameid)
            session["room"] = gameid
            await sio.emit('joined_game',{'username':session['username'] },room=gameid,skip_sid=sid)
        return gameid

@sio.event
async def select_team(sid,data):
    async with sio.session(sid) as session:
        session["team"] = data["team"]
        print(lobbyManager.lobbies)
        print(session)
        lobbyManager.lobbies[session['room']].join_team(data['team'],sid)
        await sio.emit('team_selection',{'username':session['username'], 'team':data['team']}, room=session['room'])

@sio.event 
async def leave_team(sid,data):
    async with sio.session(sid) as session:
        session["team"] = ""
        lobbyManager.lobbies[session['room']].leave_team(data['team'],sid)
        await sio.emit('left_team',data,room=session['room'])

@sio.event
async def update_ready(sid,data):
    async with sio.session(sid) as session:
        session['ready'] = data['ready']
        print(sid,"ready is", data['ready'])
        ready_count = await lobbyManager.update_ready(session['room'],data['ready'],session['team'],sid)
        print(ready_count)
        await sio.emit('total_ready',{'total':ready_count},room=session['room'])
        if ready_count == 4:
            print(ready_count)
            sio.start_background_task(startTask,session['room'])

@sio.event
async def get_teams(sid):
    async with sio.session(sid) as session:
        game = lobbyManager.lobbies[session['room']]
        result = {}
        result[1] = game.get_players(1)
        result[2] = game.get_players(2)
        return result
