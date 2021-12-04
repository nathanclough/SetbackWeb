import uuid

class Game:
    def __init__(self,team_one=[],team_two=[],name="", id =None,started=False) -> None:
        if(id == None):
            self.id = str(uuid.uuid4())
        else:
            self.id = id
        self.team_one = team_one
        self.team_two = team_two 
        self.name = name
        self.started = started
    
    def is_full(self):
        return len(self.team_one) == 2 and len(self.team_two) == 2

    def add_player(self,player):
        if (len(self.team_one) < 2):
            self.team_one.append(player)
            return 1
        elif(len(self.team_two) < 2):
            self.team_two.append(player)    
            return 2

    def remove_player(self,player_id):
        for player in self.team_one:
            if(player.id == player_id):
                self.team_one.remove(player)
        
        for player in self.team_two:
            if(player.id == player_id):
                self.team_two.remove(player)

    def has_players(self):
        return len(self.team_two) > 0 or len(self.team_one) > 0
    
 