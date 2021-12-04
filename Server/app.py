from gameManager import GameManager
import socketio

sio = socketio.AsyncServer(async_mode='asgi',cors_allowed_origins='*')
app = socketio.ASGIApp(sio)

gameManager = GameManager()
total = 0
# example of server calling client     
# sio.start_background_task(task,sid)
 
async def task(sid):
    await sio.sleep(5)
    result = await sio.call('mult',{'numbers': [3,4]},sid)
    print(result)

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
        await gameManager.remove_from_game(session["room"],sid)

    print(session['username'],sid,'disconnected')

@sio.event
async def set_username(sid,data):
    print(data['username'])
    async with sio.session(sid) as session:
        session['username'] = data['username']

@sio.event
async def create_game(sid):
    # create a new room 
    gameid = await gameManager.create_game(sid)
    print("created",gameid)
    sio.enter_room(sid,gameid)
    async with sio.session(sid) as session:
        session["room"] = gameid
        await sio.emit('joined_game',{'username':session['username'] })
        print("Joined", gameid)
    return gameid

@sio.event
async def join_game(sid,data):
    gameid = await gameManager.join_game(sid,data["game_id"])
    # if game to join 
    if gameid:
        async with sio.session(sid) as session:
            print("joined")
            sio.enter_room(sid,gameid)
            session["room"] = gameid
            await sio.emit('joined_game',{'username':session['username'] },room=gameid,skip_sid=sid)
    return gameid

@sio.event
async def select_team(sid,data):
    async with sio.session(sid) as session:
        session["team"] = data["team"]
        await sio.emit('team_selection',{'username':session['username'], 'team':data['team']}, room=session['room'])

@sio.event 
async def leave_team(sid,data):
    async with sio.session(sid) as session:
        session["team"] = ""
        await sio.emit('left_team',data,room=session['room'])