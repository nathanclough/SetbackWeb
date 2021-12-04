import socketio
import asyncio
from game import Game

class GameManager():
    def __init__(self) -> None:
        self.game_count = 0
        self.games = {}
    
    async def create_game(self,sid):
        game_id = f"Game-{self.game_count+1}"
        self.games[game_id] = [sid]
        self.game_count+=1
        return game_id

    async def join_game(self,sid,game_id):
        if len(self.games[game_id]) <4:
            self.games[game_id].append(sid)
            return game_id
        else:
            return None
    
    async def remove_from_game(self,game_id,sid):
        game = self.games[game_id]
        game.remove(sid)