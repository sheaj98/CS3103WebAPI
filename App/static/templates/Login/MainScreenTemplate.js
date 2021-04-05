const MainScreenTemplate = `
    <div>
        <div v-if="!isAuthenticated">
            <Login v-on:userAuth="setAuth" />
        </div>
        <div v-else>
            <LeaguesPage userId="1" />
        </div>
    </div>
`
export {MainScreenTemplate}