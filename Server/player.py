from setback.game.card import Card
import uuid

class Player():
    def __init__(self,name,team,id = None) -> None:
        self.name = name
        self.team = team
        self.cards = []
        self.current_bid = -1
        self.position = 0
        if(id == None):
            self.id = str(uuid.uuid4())
        else:
            self.id = id
    
    def give_cards(self,cards):
        if(len(self.cards) + len(cards) > 6):
            raise Exception("Player can only have 6 cards")
        self.cards.extend(cards)
    
    def get_opposing_team_number(self):
        if self.team == 1:
            return 2
        else:
            return 1
    

    