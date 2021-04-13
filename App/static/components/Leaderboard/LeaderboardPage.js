import { LeaderboardPageTemplate } from '../../templates/Leaderboard/LeaderboardPageTemplate.js'

const LeaderboardPage = {
    data: function() {
        return {
            userId: localStorage.getItem("userId"),
            leagueId: this.$route.params.id,
            serviceURL: "https://cs3103.cs.unb.ca:8005",
            userStats: [],
            users: [],
            matches: []
        }
    },

    beforeMount: function() {
        this.getParticipants()
    },

    methods: {
        getParticipants() {
            axios
            .get(this.serviceURL+"/users/"+this.userId+"/leagues/"+this.leagueId+"/members")
            .then(response => {
                console.log(response)
                this.users = response.data.members
                this.getRecentMatches()
            })
            .catch(e => {
                alert("There was an issue getting the users.");
                console.log(e);
            });
        },
        getRecentMatches() {
            if (this.userId != "" && this.leagueId != "") {
                //Get all of the leagues
                axios
                .get(this.serviceURL+"/users/"+this.userId+"/leagues/"+this.leagueId+"/matches")
                .then(response => {
                    this.matches = response.data.matches
                    this.createUserlist()
                })
                .catch(e => {
                    alert("There was an issue getting the matches for the particular league.");
                    console.log(e);
                });
            } else {
                alert("Invalid user id or league id.");
            }
        },
        createUserlist() {
            var i,y
            var list = []
            for (i = 0; i < this.users.length; i++) {
                var w = 0
                var l = 0
                var t = 0
                for (y=0; y < this.matches.length; y++) {
                    var match = this.matches[y]
                    var result_1 = match.results[0]
                    var result_2 = match.results[1]
                    if(result_1.User_userId == this.users[i].userId ) {
                        if(result_1.points > result_2.points) {
                            w++
                        } else if(result_1.points < result_2.points) {
                            l++
                        } else {
                            t++
                        }
                    } else if(result_2.User_userId == this.users[i].userId ) {
                        if(result_2.points > result_1.points) {
                            w++
                        } else if(result_2.points < result_1.points) {
                            l++
                        } else {
                            t++
                        }
                    }   
                }
                list.push ({
                    firstName: this.users[i].firstName, 
                    lastName: this.users[i].lastName,
                    wins: w,
                    losses: l,
                    ties: t,
                })
            } 
            list.sort( (stat1, stat2) => {
                if (stat1.wins > stat2.wins) {
                    return -1
                } else if(stat1.wins < stat2.wins) {
                    return 1
                }
                return 0
            } );
            this.userStats = list
        }
    },

    template: LeaderboardPageTemplate,

}

export { LeaderboardPage }