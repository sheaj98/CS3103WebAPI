import { LeagueDetailPageTemplate } from '../../templates/Leagues/LeagueDetailPageTemplate.js';

const LeagueDetailPage = {
    data: function() {
        return {
            serviceURL: "https://cs3103.cs.unb.ca:8005",
            userId: localStorage.getItem('userId'),
            leagueId: this.$route.params.id,
            league: {
                name: ""
            }
        }
    },
    mounted: function () {
        this.fetchLeague();
    },
    methods: {
        fetchLeague: function() {
            if (this.userId != "") {
                //Get all of the leagues
                axios
                .get(this.serviceURL+"/users/"+this.userId+"/leagues/"+this.leagueId)
                .then(response => {
                    console.log(response)
                    this.league = response.data.league
                })
                .catch(e => {
                    alert("There was an issue getting the leagues for the particular user.");
                    console.log(e);
                });
            } else {
                alert("Invalid user id.");
            } 
        }
    },
    template: LeagueDetailPageTemplate
}

export { LeagueDetailPage }