import uuid

class Member:
    def __init__(self,sid) -> None:
        self.sid = sid
        self.ready = False

class Lobby:
    def __init__(self) -> None:
        self.connected = {}
        self.team_one = []
        self.team_two = []
        self.team_one_ready = 0
        self.team_two_ready = 0

    def is_full(self):
        return len(self.connected) >= 4

    def add_player(self,sid):
        self.connected[sid] = Member(sid)

    def remove_player(self,sid):
        self.connected.pop(sid)
        self.team_one = [m for m in self.team_one if m.sid != sid]
        self.team_two = [m for m in self.team_two if m.sid != sid]
        print(self.team_one,self.team_two)

    def update_ready(self,ready,team,sid):

        if team == 1:
            team_one_count = 0

            for m in self.team_one:
                if m.sid == sid:
                    m.ready = ready
                if m.ready:
                    team_one_count += 1
            self.team_one_ready = team_one_count
        else:
            team_two_count = 0

            for m in self.team_two:
                if m.sid == sid:
                    m.ready = ready

                if m.ready:
                    team_two_count +=1 
            self.team_two_ready = team_two_count
        
        return self.team_one_ready + self.team_two_ready
    
    def is_ready(self):
        return (self.team_two_ready + self.team_one_ready) == 4
    
    def join_team(self,team, sid):
        if team == 1:
            self.team_one.append(self.connected[sid])
        else:
            self.team_two.append(self.connected[sid])
        print("Count",len(self.team_one),len(self.team_two))

    def leave_team(self,team,sid):
        if team == 1:
            self.team_one = [m for m in self.team_one if m.sid != sid]
        else:
            self.team_two = [m for m in self.team_two if m.sid != sid]
        print("Count",len(self.team_one),len(self.team_two))
