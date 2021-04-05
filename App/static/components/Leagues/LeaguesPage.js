import { LeaguesPageTemplate } from '../../templates/Leagues/LeaguesPageTemplate.js'
import { LeagueCard } from '../../components/Leagues/LeagueCard.js'


const LeaguesPage = {

    components: {
        LeagueCard
    },

    props: {
        userId: String
    },
    
    data: function() {
        return {
            serviceURL: "https://cs3103.cs.unb.ca:52617/static",
            input: {
                leagueName: "",
                leagueDescription: "",
                leagueFormat: 0
            },
            leagues: [
                {leagueName: "Test League", leagueDescription: "This is a cool league"},
                {leagueName: "Hello World", leagueDescription: "this is another saucey league"},
                {leagueName: "Hello World", leagueDescription: "this is another saucey league"},
                {leagueName: "Hello World", leagueDescription: "this is another saucey league"},
                {leagueName: "Hello World", leagueDescription: "this is another saucey league"}
            ]
        }
    },

    mounted: function() {
        console.log("Getting leagues for user")
        this.getLeaguesForUser();
    },

    methods: {
        getLeaguesForUser() {
            if (this.userId != "") {
                //Get all of the leagues
                axios
                .get(this.serviceURL+"/users/"+this.userId+"/leagues")
                .then(response => {
                    this.leagues = response.data 
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
                    "leagueName": this.input.username,
                    "leagueDescription": this.input.password,
                    "leagueFormat": this.input.leagueFormat
                })
                .then(response => {
                    //Update League List 
                    this.getLeaguesForUser()
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