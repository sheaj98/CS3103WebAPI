import { RecentMatchesCellTemplate } from '../../templates/RecentMatches/RecentMatchesCellTemplate.js'

const RecentMatchesCell = {
    props: {
        result_1: {
            type: Object,
            default: () => {}
        },
        result_2: {
            type: Object,
            default: () => {}
        },
    },

    data: function() {
        return {
            serviceURL: "https://cs3103.cs.unb.ca:58651",
            user1: {
                firstName: "",
                lastName: "",
                points: 0
            },
            user2: {
                firstName: "",
                lastName: "",
                points: 0
            },
        }
    },

    mounted: function() {
        this.getUser1(this.result_1.User_userId)
        this.user1.points = this.result_1.points
        this.getUser2(this.result_2.User_userId)
        this.user2.points = this.result_2.points
    },

    methods: {
        getUser1(userId) {
            axios
            .get(this.serviceURL+"/users/"+userId)
            .then(response => {
                console.log(response)
                this.user1.firstName = response.data.user.firstName
                this.user1.lastName = response.data.user.lastName
            })
            .catch(e => {
                alert("There was an issue getting the user.");
                console.log(e);
            });
        },
        getUser2(userId) {
            axios
            .get(this.serviceURL+"/users/"+userId)
            .then(response => {
                console.log(response)
                this.user2.firstName = response.data.user.firstName
                this.user2.lastName = response.data.user.lastName
            })
            .catch(e => {
                alert("There was an issue getting the user.");
                console.log(e);
            });
        },
    },
    
    template: RecentMatchesCellTemplate
}

export { RecentMatchesCell }