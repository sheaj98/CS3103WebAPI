const RecentMatchesPageTemplate = `
    <div class="container">
        <h1>Recent Matches</h1>
        <div v-for="match in matches">
            <div class="row mb-2 justify-content-center">
                <RecentMatchesCell v-bind:result_1="match.results[0]" v-bind:result_2="match.results[1]"/>
            </div>
        </div>
    </div>
`
export {RecentMatchesPageTemplate}