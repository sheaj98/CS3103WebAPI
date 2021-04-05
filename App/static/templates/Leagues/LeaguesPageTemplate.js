const LeaguesPageTemplate = `
    <div class="leaguePageTemplate">
        <div class="container">
            <div class="row">
                <div v-for="league in leagues">
                    <div class="col">
                        <LeagueCard v-bind:leagueName="league.leagueName" v-bind:leagueDescription="league.leagueDescription" />
                    </div>
                </div>
                <div class="col">
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addLeagueModal">Add League</button>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="addLeagueModal" tabindex="-1" role="dialog" aria-labelledby="addLeagueModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addLeagueModalLabel">Add a New League:</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="leagueName">Name</label>
                                <input type="text" class="form-control" id="leagueName" v-model="input.leagueName" placeholder="Enter league name">
                            </div>
                            <div class="form-group">
                                <label for="leagueDescription">Description</label>
                                <input type="text" class="form-control" id="leagueDescription" v-model="input.leagueDescription" placeholder="Enter league description">
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
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" v-on:click="addLeague()">Add League</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
export {LeaguesPageTemplate}