import { ParticipantPageTemplate } from '../../templates/Participants/ParticipantPageTemplate.js'

const ParticipantPage = {
    data: function() {
        return {
            userId: localStorage.getItem("userId"),
            leagueId: this.$route.params.id,
            serviceURL: "https://cs3103.cs.unb.ca:8005",
            users: [],
            showingModal: false,
            input: {
                firstName: "",
                lastName: "", 
                email: ""
            }
        }
    },

    mounted: function() {
        this.getParticipants()
    },

    methods: {
        hideModal() {
            this.showingModal = false
        },
        showModal() {
            this.showingModal = true
        },
        getParticipants() {
            axios
            .get(this.serviceURL+"/users/"+this.userId+"/leagues/"+this.leagueId+"/members")
            .then(response => {
                console.log(response)
                this.users = response.data.members
            })
            .catch(e => {
                alert("There was an issue getting the user.");
                console.log(e);
            });
        },
        deleteUser(id) {
            axios
            .delete(this.serviceURL+"/users/"+this.userId+"/leagues/"+this.leagueId+"/members/"+id)
            .then(response => {
                this.getParticipants()
            })
            .catch(e => {
                alert("There was an issue deleting the member.");
                console.log(e);
            });
        },
        addParticipant() {
            axios
            .post(this.serviceURL+"/users/"+this.userId+"/leagues/"+this.leagueId+"/members", {
                "firstName": this.input.firstName,
                "lastName": this.input.lastName,
                "email": this.input.email
            })
            .then(response => {
                this.hideModal()
                this.getParticipants()
            })
            .catch(e => {
                alert("There was an issue adding the participant.");
                console.log(e);
            });
        }
    },

    template: ParticipantPageTemplate,

}

export { ParticipantPage }