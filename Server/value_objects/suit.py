from enum import Enum

class Suit(Enum):
    H = "Hearts"
    S = "Spades"
    C = "Clubs"
    D = "Diamonds"

    def from_string(s):
        if s == "Hearts":
            return Suit.H
        elif s == "Spades":
            return Suit.S
        elif s == "Clubs":
            return Suit.C
        elif s == "Diamonds":
            return Suit.D
suits = [Suit.H,Suit.S,Suit.C,Suit.D]

    