from value_objects.rank import Rank
from value_objects.suit import Suit

class Card():
    def __init__(self,rank: int, suit: Suit) -> None:
        self.rank = rank
        self.suit = suit
        self.player = None

    def get_rank(self) -> Rank:
        return self.rank 
        
    def to_json(self):
        return {"suit":self.suit.value if self.suit else "","rank":str(self.rank)}

    def from_json(data):
        return Card(data["rank"], data["suit"])

    def __eq__(self,other):
        return self.rank == other.rank and self.suit == other.suit