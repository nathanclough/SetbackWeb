from app import sio
from game import Game

Games = {}
async def CreateGame(game_id,t1,t2):
    Games[game_id] = Game(t1,t2)
    for player in Games[game_id].players:
        await sio.emit('start_game',player.id)

@sio.event
async def get_initial_state(sid):
    async with sio.session(sid) as session:
        game = Games[session['room']]
        player = game.get_player(sid)
        return {"cards":player.get_card_list(),"team":player.team,"dealer":game.get_dealer(),"players": [p.name for p in game.players]}
