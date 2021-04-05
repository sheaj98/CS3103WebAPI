const LeaguesPageTemplate = `
    <div class="leaguePageTemplate">
        <div class="container">
            <div class="row">
                <div v-for="league in leagues">
                    <div class="col">
                        <LeagueCard v-bind:leagueName="league.name" v-bind:leagueDescription="league.description" />
                    </div>
                </div>
                <div class="col">
                    <button type="button" class="btn btn-primary" v-on:click="showModal()">Add League</button>
                </div>
            </div>
        </div>

        <!-- Modal -->
    
        <modal v-if="showingModal" @close="hideModal">
            <!--
                you can use custom content here to overwrite
                default content
            -->
            <div slot="header" class="modal-header">
                Edit School Data
            </div>
            <div slot="body">
                <form>
                    <div class="form-group">
                        <label for="leagueName">Name</label>
                        <input type="text" class="form-control" id="leagueName" v-model="input.name" placeholder="Enter league name">
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
            <div slot="footer">
                <button type="button" class="btn btn-secondary" v-on:click="hideModal()">Close</button>
            </div>
        </modal>
        <!-- template for the modal component -->
        <script type="text/x-template" id="modal-template">
        <transition name="modal">
            <div class="modal-backdrop">
            <div class="modal">
            <header class="modal-header">
                <slot name="header">
                This is the default tile!
                <button type="button" class="btn-close" @click="hideModal()">
                    x
                </button>
                </slot>
            </header>
            <section class="modal-body">
                <slot name="body">
                I'm the default body!
                </slot>
            </section>
            <footer class="modal-footer">
                <slot name="footer">
                    I'm the default footer!
                    <button type="button" class="btn-green" @click="hideModal()">
                    Close me!
                    </button>
                </slot>
                </footer>
            </div>
            </div>
        </transition>
        </script>
    </div>
`
export {LeaguesPageTemplate}