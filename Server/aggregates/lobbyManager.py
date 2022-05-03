import socketio
import asyncio
from entities.lobby import Lobby

class LobbyManager():
    def __init__(self) -> None:
        self.lobbies = {}
    
    async def create_lobby(self,sid,username):
        game_id = f"Game-{len(self.lobbies)+1}"
        self.lobbies[game_id] = Lobby()
        self.lobbies[game_id].add_player(sid,username)
        return game_id

    async def join_lobby(self,sid,game_id,username):
        if not self.lobbies[game_id].is_full():
            self.lobbies[game_id].add_player(sid,username)
            return game_id
        else:
            return None
    
    async def remove_from_lobby(self,game_id,sid):
        lobby = self.lobbies[game_id]
        lobby.remove_player(sid)
        
        if lobby.is_empty():
            self.lobbies.pop(game_id)

    async def update_ready(self,game_id,ready,team,sid):
        return self.lobbies[game_id].update_ready(ready,team,sid)
