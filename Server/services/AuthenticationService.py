from app import sio

@sio.event
async def set_username(sid,data):
    print(data['username'])
    async with sio.session(sid) as session:
        session['username'] = data['username']