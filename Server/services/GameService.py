from app import sio
from entities.game import Game
import json 

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
        return {
                "cards":player.get_card_list(),
                "team":player.team,
                "dealer":game.get_dealer(),
                "players": [{ "name": p.name, "team" : p.team, "current_bid" : p.current_bid, "position" : p.position} for p in game.players],
                "current_bidder": game.get_current_bidder(),
                "name":player.name}

@sio.event
async def make_bid(sid,data):
    async with sio.session(sid) as session:
        print(session)
        game = Games[session['room']]
        player = game.get_player(sid)
        pname = player.name
        game.make_bid(player.position,data["bid"])
        next = game.get_current_bidder()
        for player in Games[session['room']].players:
            await sio.emit('bid_made',{"name":pname,"bid":data["bid"], "nextBidder":next}, player.id)

        return True

