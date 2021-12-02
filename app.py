import socketio

sio = socketio.AsyncServer(async_mode='asgi')
app = socketio.ASGIApp(sio,static_files={
    '/':'./public/'
})

total = 0

# example of server calling client 
async def task(sid):
    await sio.sleep(5)
    result = await sio.call('mult',{'numbers': [3,4]},sid)
    print(result)

@sio.event
async def connect(sid,environ):
    print(sid,'connected')
    global total
    total += 1
    sio.start_background_task(task,sid)
    await sio.emit('client_count',{'total_clients':total})

@sio.event
async def disconnect(sid):
    global total
    total -= 1
    await sio.emit('client_count',{'total_clients':total})
    print(sid,'disconnected')

@sio.event
async def sum(sid,data):
    result = data['numbers'][0] + data['numbers'][1]
    return result 

