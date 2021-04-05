import { RecentMatchesPageTemplate } from '../../templates/RecentMatches/RecentMatchesPageTemplate.js'

const RecentMatchesPage = {
    template: RecentMatchesPageTemplate,

    //------- props -------
    props: {
        userId: String
    },
    
    //------- data --------
    data: {
        serviceURL: "https://cs3103.cs.unb.ca:52617",
        matches: [],
        leagues: []
    },

    methods: {
        mounted() {
            console.log(this.$el);
        },

        getRecentMatches() {
            if (this.userId != "") {
                //Get all of the leagues
                axios
                .get(this.serviceURL+"/users/"+userId+"/leagues")
                .then(response => {
                    console.log(response)
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


        logout() {
            alert("No magic on the server yet. You'll have to write the logout code there.");
            axios
            .delete(this.serviceURL+"/signin")
            .then(response => {
                location.reload();
            })
            .catch(e => {
                console.log(e);
            });
        },

        fetchSchools() {
            alert("This feature not available until schoolsV2.")
        }
    }
    //------- END methods --------
}

export { RecentMatchesPage }