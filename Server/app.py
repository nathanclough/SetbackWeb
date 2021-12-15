from lobbyManager import LobbyManager
import socketio

sio = socketio.AsyncServer(async_mode='asgi',cors_allowed_origins='*')
app = socketio.ASGIApp(sio)

lobbyManager = LobbyManager()
total = 0
# example of server calling client     
# sio.start_background_task(task,sid)
 
async def startTask(game_id):
    await sio.sleep(5)
    if lobbyManager.games[game_id].is_ready():
        print("started", game_id)
        await sio.emit('start_game',room=game_id)

@sio.event
async def connect(sid,environ):
    global total
    async with sio.session(sid) as session:
        session['username'] = f'guest-{sid[:4]}'
        print(sid,'connected as', session['username'])
        total += 1
        await sio.emit('client_count',{'total_clients':total})
        await sio.emit('set_guest',{'username':session['username']},sid)
        return {'username':session['username']}

@sio.event
async def disconnect(sid):
    global total
    total -= 1
    await sio.emit('client_count',{'total_clients':total})
    session = await sio.get_session(sid)
    
    if "room" in session:
        await lobbyManager.remove_from_game(session["room"],sid)
    
    if "team" in session:
        await sio.emit('left_team', {'team':session["room"], 'username':session["username"]},room=session['room'])

    print(session['username'],sid,'disconnected')

@sio.event
async def set_username(sid,data):
    print(data['username'])
    async with sio.session(sid) as session:
        session['username'] = data['username']

@sio.event
async def create_game(sid):
    # create a new room 
    async with sio.session(sid) as session:
        gameid = await lobbyManager.create_game(sid,session['username'])
        print("created",gameid)
        sio.enter_room(sid,gameid)
        session["room"] = gameid
        print(session["room"])
        print(lobbyManager.games)
        await sio.emit('joined_game',{'username':session['username'] })
        print("Joined", gameid)
    return gameid

@sio.event
async def join_game(sid,data):
    async with sio.session(sid) as session:
        gameid = await lobbyManager.join_game(sid,data["game_id"],session['username'])
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
        print(lobbyManager.games)
        print(session)
        lobbyManager.games[session['room']].join_team(data['team'],sid)
        await sio.emit('team_selection',{'username':session['username'], 'team':data['team']}, room=session['room'])

@sio.event 
async def leave_team(sid,data):
    async with sio.session(sid) as session:
        session["team"] = ""
        lobbyManager.games[session['room']].leave_team(data['team'],sid)
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
        game = lobbyManager.games[session['room']]
        result = {}
        result[1] = game.get_players(1)
        result[2] = game.get_players(2)
        return result