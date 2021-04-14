import { RecentMatchesPageTemplate } from '../../templates/RecentMatches/RecentMatchesPageTemplate.js'
import { RecentMatchesCell } from '../../components/RecentMatches/RecentMatchesCell.js'

const RecentMatchesPage = {
    template: RecentMatchesPageTemplate,

    components: {
        RecentMatchesCell
    },
    
    data: function() {
        return {
            userId: localStorage.getItem("userId"),
            leagueId: this.$route.params.id,
            serviceURL: "https://cs3103.cs.unb.ca:8005",
            matches: [],
            showingModal: false,
            members: [],
            matchInput: {
                member1: null,
                member2: null,
                points1: 0,
                points2: 0,
            }
        }
    },

    mounted: function() {
        this.getRecentMatches();
    },

    methods: {
        getRecentMatches() {
            if (this.userId != "" && this.leagueId != "") {
                //Get all of the leagues
                axios
                .get(this.serviceURL+"/users/"+this.userId+"/leagues/"+this.leagueId+"/matches")
                .then(response => {
                    console.log(response)
                    this.matches = response.data.matches
                })
                .catch(e => {
                    alert("There was an issue getting the matches for the particular league.");
                    console.log(e);
                });
            } else {
                alert("Invalid user id or league id.");
            }
        },
        hideModal() {
            this.showingModal = false;
        },
        showModal() {
            axios
            .get(this.serviceURL+"/users/"+this.userId+"/leagues/"+this.leagueId+"/members").then(response => {
                console.log(response)
                this.members = response.data.members
                this.showingModal = true
            })
            .catch(e => {
                alert("There was an issue fetching the members of this league.");
                console.log(e);
            });
        },
        clearInput() {
            this.matchInput = {
                member1: null,
                member2: null,
                points1: 0,
                points2: 0,
            }
        },
        addNewMatch() {
            console.log(this.matchInput.member1.User_userId)
            console.log(this.matchInput.member2.User_userId)
            console.log(this.matchInput.points1)
            console.log(this.matchInput.points2)
            if (this.matchInput.member1 == null || this.matchInput.member2 == null) {
                this.showingModal = false;
                alert("Please Select Two Unique Members")   
                return  
            }
            if (this.matchInput.member1.User_userId == this.matchInput.member2.User_userId) {
                this.showingModal = false;
                alert("Please Select Two Unique Members")   
                return  
            }

            axios.post(this.serviceURL+"/users/" + this.userId + "/leagues/" + this.leagueId + "/matches", {})
            .then(response => response.data.matchId)
            .then(matchId => {
                 return Promise.all([
                    axios.post(this.serviceURL+"/users/" + this.userId + "/leagues/" + this.leagueId + "/matches/" + matchId + "/results", {
                        userId: this.matchInput.member1.User_userId,
                        points: this.matchInput.points1
                    }),
                    axios.post(this.serviceURL+"/users/" + this.userId + "/leagues/" + this.leagueId + "/matches/" + matchId + "/results", {
                        userId: this.matchInput.member2.User_userId,
                        points: this.matchInput.points2
                    })
                 ])
            })
            .then(() => {
                console.log("Success");
                this.showingModal = false;
                this.clearInput();
                this.getRecentMatches();
                
            })
            .catch(() => {
                this.showingModal = false;
                this.clearInput();
                alert("There was an unexpected error creating match, please try again.")
            })
        }
    }
}

export { RecentMatchesPage }