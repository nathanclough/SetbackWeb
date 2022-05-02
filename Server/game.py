from dealer import Dealer
from player import Player
import random

class Game:
    def __init__(self, team_one, team_two) -> None:
        # create the teams from each player 
        self.players = [Player(1,team_one[0]), Player(2,team_two[0]), Player(1,team_one[1]), Player(2,team_two[1])]
    
        # randomly select dealer    
        self.dealer = Dealer(random.randint(0,3))
        
        # deal cards 
        self.dealer.deal(self.players)
    
    def get_dealer(self):
        return self.players[self.dealer.dealer_index].name

    def get_player(self,id):
        res = [ p for p in self.players if p.id == id]
        return res[0]