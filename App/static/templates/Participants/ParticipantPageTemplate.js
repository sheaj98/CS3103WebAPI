const ParticipantPageTemplate = `
    <div>
        <div class="container">
            <h1>Participants</h1>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Role</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody v-for="user in users">
                    <tr>
                        <td>{{user.firstName}}</td>
                        <td>{{user.lastName}}</td>
                        <td>{{user.role}}</td>
                        <td> 
                            <button v-if="user.role != 'owner' && isOwner" v-on:click="deleteUser(user.userId)" type="button" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button v-if="isOwner" type="button" class="btn btn-primary" v-on:click="showModal()">Add Participant</button>
        </div>

        <!-- Modal -->
        <div v-if="showingModal">
            <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add New Participant</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" @click="hideModal">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="firstName">First Name</label>
                                <input type="text" class="form-control" id="firstName" v-model="input.firstName" placeholder="Enter first name">
                            </div>
                            <div class="form-group">
                                <label for="lastName">Last Name</label>
                                <input type="text" class="form-control" id="lastName" v-model="input.lastName" placeholder="Enter last name">
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="text" class="form-control" id="lastName" v-model="input.email" placeholder="Enter email">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="hideModal()">Close</button>
                        <button type="button" class="btn btn-primary" @click="addParticipant()">Save changes</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </transition>
        </div>

    </div>
`
export {ParticipantPageTemplate}