from dataclasses import dataclass
from player import Player
from card import Card

@dataclass
class PlayResult():
    winner: Player
    points_won: int
    cards_played: list[Card]