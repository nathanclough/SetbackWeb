import socketio

sio = socketio.AsyncServer(async_mode='asgi',cors_allowed_origins='*')
app = socketio.ASGIApp(sio)

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
        session['username'] = 'guest'
    print(sid,'connected as guest')
    total += 1

    await sio.emit('client_count',{'total_clients':total})

@sio.event
async def disconnect(sid):
    global total
    total -= 1
    await sio.emit('client_count',{'total_clients':total})
    session = await sio.get_session(sid)
    print(session['username'],sid,'disconnected')

@sio.event
async def set_username(sid,data):
    print(data['username'])

    async with sio.session(sid) as session:
        session['username'] = data['username']
        return session['username']
    

