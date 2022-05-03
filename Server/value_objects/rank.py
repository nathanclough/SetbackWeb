from enum import IntEnum


class Rank(IntEnum):
    T = 10
    JA = 14
    Q = 15
    K = 16
    A = 17
    jo = 28
    JO = 29

    def __str__(self) -> str:
        if self.value <= 9:
            return super().__str__()
        elif self.value == 10:
            return "10"
        elif self.value == 14:
            return "Jack"
        elif self.value == 15:
            return "Queen"
        elif self.value == 16:
            return "King"
        elif self.value == 17:
            return "Ace"
        elif self.value == 28:
            return "joker"
        elif self.value == 29: 
            return "JOCKER"
        
    
normal_ranks = [2,3,4,5,6,7,8,9,Rank.T,Rank.JA,Rank.Q,Rank.K,Rank.A]

     