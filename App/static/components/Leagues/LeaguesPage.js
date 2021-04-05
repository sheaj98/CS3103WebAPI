import { LeaguesPageTemplate } from '../../templates/Leagues/LeaguesPageTemplate.js'
import { LeagueCard } from '../../components/Leagues/LeagueCard.js'

Vue.component("modal", {
    template: "#modal-template"
});

const LeaguesPage = {

    components: {
        LeagueCard
    },
    
    data: function() {
        return {
            serviceURL: "https://cs3103.cs.unb.ca:58651",
            input: {
                name: "",
                leagueFormat: 1
            },
            leagues: [],
            showingModal: false,
            userId: localStorage.getItem('userId')
        }
    },

    mounted: function() {
        console.log("Getting leagues for user")
        this.getLeaguesForUser();
    },

    methods: {
        hideModal() {
            this.showingModal = false
        },
        showModal() {
            this.showingModal = true
        },
        getLeaguesForUser() {
            if (this.userId != "") {
                //Get all of the leagues
                axios
                .get(this.serviceURL+"/users/"+this.userId+"/leagues")
                .then(response => {
                    this.leagues = response.data.leagues
                })
                .catch(e => {
                    alert("There was an issue getting the leagues for the particular user.");
                    console.log(e);
                });
            } else {
                alert("Invalid user id.");
            }
        },
        addLeague() {
            if (this.userId != "") {
                axios
                .post(this.serviceURL+"/users/"+this.userId+"/leagues", {
                    "leagueName": this.input.name,
                    "leagueFormatId": this.input.leagueFormat
                })
                .then(response => {
                    this.hideModal()
                    this.getLeaguesForUser()
                    this.name = "";
                })
                .catch(e => {
                    alert("There was an issue adding the league.");
                    console.log(e);
                });
            } else {
                alert("Invalid user id.");
            }
        }
    },

    template: LeaguesPageTemplate,
}

export { LeaguesPage }