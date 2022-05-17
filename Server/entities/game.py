from aggregates.bid_manager import BidManager
from aggregates.dealer import Dealer
from entities.player import Player
from common.list_helper import ListHelper
import random

# states: "bid", "preround", "round", "endround"
class Game:
    def __init__(self, team_one, team_two) -> None:
        # create the teams from each player 
        self.players = [Player(1,team_one[0]), Player(2,team_two[0]), Player(1,team_one[1]), Player(2,team_two[1])]
    
        # randomly select dealer 
        rand_index = random.randint(0,3)
        self.dealer = Dealer(rand_index)

        # set bidder 
        self.bid_manager = BidManager(ListHelper.get_next_index(rand_index))

        # deal cards 
        self.dealer.deal(self.players)

        self.score = [0,0]
    
    def get_dealer(self):
        return self.players[self.dealer.dealer_index].name

    def get_player(self,id):
        res = [ p for p in self.players if p.id == id]
        return res[0]

    def get_current_bidder(self):
        return self.players[self.bid_manager.bidder_index].name

    def make_bid(self,pid,bid):
        self.bid_manager.make_bid(pid,bid)
    
    def get_bids(self):
        return self.bid_manager.get_bids()

    def discard_cards(self,pid,cards_to_remove):
        # remove the cards for given player 
        return None

    def set_trump(self,pid,trump):
        # check if pid won the bid 
        # then set trump 
        return None

    def get_score(self):
        return self.score

