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
            serviceURL: "https://cs3103.cs.unb.ca:58651",
            results: [],
            showingModal: false
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
                    this.results = response.data.matches
                })
                .catch(e => {
                    alert("There was an issue getting the matches for the particular user.");
                    console.log(e);
                });

            } else {
                alert("Invalid user id.");
            }
        },
    }
}

export { RecentMatchesPage }