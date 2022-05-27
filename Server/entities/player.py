from value_objects.card import Card
import uuid
from entities.lobby import Member

class Player():
    def __init__(self,team,member:Member) -> None:
        self.name = member.username
        self.team = team
        self.cards = []
        self.current_bid = -1
        self.position = 0
        self.id = member.sid        
    
    def give_cards(self,cards):
        self.cards.extend(cards)
    
    def get_opposing_team_number(self):
        if self.team == 1:
            return 2
        else:
            return 1
    
    def get_card_list(self):
        for card in self.cards:
            print(card.rank,card.suit)
        return [{"suit":c.suit.value if c.suit else "","rank":str(c.rank)} for c in self.cards]

    def discard_cards(self, discards):
        print("discards",discards)
        print("before",self.cards)
        self.cards = [c for c in self.cards if c not in discards]    
        print("after",self.cards)

            