from value_objects.rank import Rank
from value_objects.suit import Suit

class Card():
    def __init__(self,rank: int, suit: Suit) -> None:
        self.rank = rank
        self.suit = suit
        self.player = None

    def get_rank(self) -> Rank:
        return self.rank 
        
