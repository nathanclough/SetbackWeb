from lobbyManager import LobbyManager
import socketio

sio = socketio.AsyncServer(async_mode='asgi',cors_allowed_origins='*')
app = socketio.ASGIApp(sio)

import services.AuthenticationService
import services.GameService
import services.LobbyService

from services.LobbyService import lobbyManager

total = 0

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
    print(session['username'],sid,'disconnected')

    if "room" in session:
        await lobbyManager.remove_from_lobby(session["room"],sid)
    
    if "team" in session:
        await sio.emit('left_team', {'team':session["room"], 'username':session["username"]},room=session['room'])