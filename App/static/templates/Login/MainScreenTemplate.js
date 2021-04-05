const MainScreenTemplate = `
    <div>
        <div v-if="!isAuthenticated">
            <Login v-on:userAuth="setAuth" />
        </div>
        <div v-else>
            <router-view></router-view>
        </div>
    </div>
`
export {MainScreenTemplate}