from common.list_helper import ListHelper

class BidManager():
    def __init__(self,bidder_index) -> None:
        self.bidder_index = bidder_index
        self.bids = {}

    def make_bid(self,player_id,bid)-> int:
        self.bids[player_id] = bid
        self.bidder_index = ListHelper.get_next_index(self.bidder_index)
    
    def get_winner(self):
        winner = max(self.bids, key=self.bids.get)
        bid = self.bids[winner]
        return bid,winner
    
    def get_bids(self):
        return self.bids

    def bids_are_complete(self):
        print(self.bids)
        return len(self.bids) == 4
