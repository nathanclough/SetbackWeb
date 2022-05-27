from app import sio
from entities.game import Game
from value_objects.card import Card
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
        game.make_bid(player.id,data["bid"])
        next = game.get_current_bidder()

        for player in Games[session['room']].players:
            await sio.emit('bid_made',{"name":pname,"bid":data["bid"], "nextBidder":next, "complete" : game.bids_are_complete()}, room=player.id)                
        
        if game.bids_are_complete():
                bid, winner_id,kitty = game.get_bid_winner()
                winner = game.get_player(winner_id)
                winner.give_cards(kitty)
                await sio.emit('bid_won',{"won": "True", "bid": bid,"kitty":[c.to_json() for c in kitty]},room=winner_id)
        
        return True

@sio.event
async def set_trump(sid,data):
    async with sio.session(sid) as session:
        game = Games[session['room']]
        player = game.get_player(sid)
        
        discards = [ Card.from_json(c) for c in data['discard']]
        player.discard_cards(discards)
        game.state = "preround"
        await sio.emit('new_trump', {'trump': data["trump"]},room=session['room'], skip_sid=sid)

@sio.event
async def discard(sid,data):
    async with sio.session(sid) as session:
        game = Games[session['room']]
        player = game.get_player(sid)

        player.discard_cards(data["discard"])
