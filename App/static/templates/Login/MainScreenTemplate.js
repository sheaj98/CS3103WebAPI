const MainScreenTemplate = `
    <div>
        <div v-if="!isAuthenticated">
            <Login v-on:userAuth="setAuth" />
        </div>
        <div v-else>
            <LeaguesPage v-bind:userId="userId" />
        </div>
    </div>
`
export {MainScreenTemplate}