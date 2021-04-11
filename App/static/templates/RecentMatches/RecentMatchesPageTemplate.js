const RecentMatchesPageTemplate = `
    <div class="container">
        <h1>Recent Matches</h1>
        <div v-for="result in results">
            <div class="row mb-2 justify-content-center">
                <RecentMatchesCell />
            </div>
        </div>
    </div>
`
export {RecentMatchesPageTemplate}