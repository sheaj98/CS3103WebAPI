const RecentMatchesPageTemplate = `
    <div>
        <div class="container" v-for="result in results">
            <div class="row">
                <RecentMatchesCell />
            </div>
        </div>
    </div>
`
export {RecentMatchesPageTemplate}