const LeaguesPageTemplate = `
    <div class="leaguePageTemplate">
        <div class="container">
            <h1>Your Leagues</h1>
            <div class="row">
                <div v-for="league in leagues">
                    <div class="col">
                        <LeagueCard v-bind:leagueName="league.name" v-bind:leagueDescription="league.description" v-on:click.native="goToLeague(league.leagueId)"/>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <button type="button" class="btn btn-primary" v-on:click="showModal()">Add League</button>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div v-if="showingModal">
            <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add New Leaderboard</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" @click="hideModal">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="leagueName">Name</label>
                                <input type="text" class="form-control" id="leagueName" v-model="input.name" placeholder="Enter league name">
                            </div>
                            <div class="form-group">
                                <label for="leagueDescription">Description</label>
                                <input type="text" class="form-control" id="leagueDescription" v-model="input.description" placeholder="Enter league description">
                            </div>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <label class="input-group-text" for="inputGroupSelect01">Options</label>
                                </div>
                                <select class="custom-select" id="inputGroupSelect01">
                                    <option selected>Choose...</option>
                                    <option value="1">Option 1</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="hideModal()">Close</button>
                        <button type="button" class="btn btn-primary" @click="addLeague()">Save changes</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </transition>
        </div>
    </div>
`
export {LeaguesPageTemplate}