import { LeagueDetailsPageTemplate } from "../../templates/LeagueDetails/LeagueDetailsPageTemplate.js";

const LeagueDetailsPage = {
    data: function() {
        return {
            userId: localStorage.getItem("userId"),
            leagueId: this.$route.params.id,
            serviceURL: "https://cs3103.cs.unb.ca:8005",
            numUsers: 0,
            leagueName: "", 
            leagueDescription: "",
            updatedLeagueName: "",
            updatedLeagueDescription: "",
        }
    },

    beforeMount: function() {
        this.getParticipants()
        this.getLeagueInfo()
    },

    methods: {
        getParticipants() {
            axios
            .get(this.serviceURL+"/users/"+this.userId+"/leagues/"+this.leagueId+"/members")
            .then(response => {
                this.numUsers = response.data.members.length
                console.log(this.numUsers)
            })
            .catch(e => {
                alert("There was an issue getting the users.");
                console.log(e);
            });
        },
        getLeagueInfo() {
            axios
            .get(this.serviceURL+"/users/"+this.userId+"/leagues/"+this.leagueId)
            .then(response => {
                this.leagueName = response.data.league.name
                this.updatedLeagueName = response.data.league.name
                this.leagueDescription = response.data.league.description
                this.updatedLeagueDescription = response.data.league.description
            })
            .catch(e => {
                alert("There was an issue getting the users.");
                console.log(e);
            });
        },
        updateLeague() {
            if(this.updatedLeagueName !== this.leagueName || this.updatedLeagueDescription !== this.leagueDescription) {
                axios
                .put(this.serviceURL+"/users/"+this.userId+"/leagues/"+this.leagueId, {
                    "leagueName": this.updatedLeagueName,
                    "leagueDescription": this.updatedLeagueDescription
                })
                .then(response => {
                    this.getLeagueInfo()
                })
                .catch(e => {
                    alert("There was an issue updating the league.");
                    console.log(e);
                });
            }
        },
        deleteLeague() {
            axios
            .delete(this.serviceURL+"/users/"+this.userId+"/leagues/"+this.leagueId)
            .then(response => {
            })
            .catch(e => {
                alert("There was an issue deleting the league.");
                console.log(e);
            });
        }
    },

    template: LeagueDetailsPageTemplate,

}

export { LeagueDetailsPage }