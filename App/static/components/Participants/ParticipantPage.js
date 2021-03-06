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
            },
            isOwner: false
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
                this.updateIsOwner()
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
            if(this.input.firstName === "" || this.input.lastName === "" || this.input.email === "" ){
                alert("Form not correctly filled out - at least one value is missing.");
            } else {
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
        updateIsOwner() {
            var y
            for (y=0; y < this.users.length; y++) {
                var user = this.users[y]
                if (user.role == "owner") {
                    if (user.userId == this.userId) {
                        this.isOwner = true
                    }
                }
            }
        }
    },

    template: ParticipantPageTemplate,

}

export { ParticipantPage }