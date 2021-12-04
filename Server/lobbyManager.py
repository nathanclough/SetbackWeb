import socketio
import asyncio
from lobby import Lobby

class LobbyManager():
    def __init__(self) -> None:
        self.games = {}
    
    async def create_game(self,sid):
        game_id = f"Game-{len(self.games)+1}"
        self.games[game_id] = Lobby()
        self.games[game_id].add_player(sid)
        return game_id

    async def join_game(self,sid,game_id):
        if not self.games[game_id].is_full():
            self.games[game_id].add_player(sid)
            return game_id
        else:
            return None
    
    async def remove_from_game(self,game_id,sid):
        game = self.games[game_id]
        game.remove_player(sid)

    async def update_ready(self,game_id,ready,team,sid):
        return self.games[game_id].update_ready(ready,team,sid)
