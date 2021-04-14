const RecentMatchesPageTemplate = `
<div>
    <div class="container">
        <div class="row justify-content-between">
            <div class="col-4">
                <h1>Recent Matches</h1>
            </div>
            <div class="col-4 align-self-center">
                <button type="button" class="btn btn-primary float-right" v-on:click="showModal()">Add New Match</button>
            </div>
        </div>
        <div v-for="match in matches">
            <div class="row mb-2 justify-content-center">
                <RecentMatchesCell v-bind:result_1="match.results[0]" v-bind:result_2="match.results[1]"/>
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
                    <h5 class="modal-title">Add New Match</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" @click="hideModal">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                    <div class="form-row">
                        <div class="col form-group">
                            <label for="member1">Member 1</label>
                            <select class="form-control" id="member1" v-model="matchInput.member1">
                                <option selected disabled value="">Please select member 1</option>
                                <option v-for="member in members" :value="member">{{member.firstName}} {{member.lastName}}</option>
                            </select>
                        </div>
                        <div class="col form-group">
                            <label for="points1">Points</label>
                            <input type="text" class="form-control" id="points1" v-model="matchInput.points1" placeholder="Enter points for member">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col form-group">
                            <label for="member2">Member 2</label>
                            <select class="form-control" id="member2" v-model="matchInput.member2">
                                <option selected disabled value="">Please select member 2</option>
                                <option v-for="member in members" :value="member">{{member.firstName}} {{member.lastName}}</option>
                            </select>
                        </div>
                        <div class="col form-group">
                            <label for="points2">Points</label>
                            <input type="text" class="form-control" id="points2" v-model="matchInput.points2" placeholder="Enter points for member">
                        </div>
                    </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="hideModal()">Close</button>
                    <button type="button" class="btn btn-primary" @click="addNewMatch()">Save changes</button>
                </div>
                </div>
            </div>
            </div>
        </div>
        </transition>
    </div>
</div>
`
export {RecentMatchesPageTemplate}