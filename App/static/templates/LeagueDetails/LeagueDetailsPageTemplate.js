const LeagueDetailsPageTemplate = `
    <div>
        <div class="container">
            <h1>League Details</h1>
            <form>
                <div class="form-group">
                    <label for="leagueName">League Name</label>
                    <input type="email" class="form-control" id="leagueName" v-model="updatedLeagueName" v-bind:placeholder="leagueName">
                </div>
                <div class="form-group">
                    <label for="leagueDescription">League Description</label>
                    <input type="email" class="form-control" id="leagueDescription" v-model="updatedLeagueDescription" v-bind:placeholder="leagueDescription">
                </div>
            </form>
            <button type="button" class="btn btn-success" v-on:click="updateLeague()">Update League</button>
            <button type="button" class="btn btn-danger" v-on:click="deleteLeague()">Delete League</button>
        </div>
    </div>
`
export {LeagueDetailsPageTemplate}