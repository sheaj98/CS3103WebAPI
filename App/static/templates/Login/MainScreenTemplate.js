const MainScreenTemplate = `
    <div>
        <div v-if="!isAuthenticated">
            <Login v-on:userAuth="setAuth" />
        </div>
        <div v-else>
            This is home screen
        </div>
    </div>
`
export {MainScreenTemplate}