const LoginTemplate = `
    <div class='loginScreen container-fluid'>
        <div class="h-100 row align-items-center">
            <div class="col">
                Splash Screen
            </div>
            <div class="col form-group text-center">
                <h2>Welcome to Leaderboard Service</h2>
                <input class="mb-3 col-4 mx-auto form-control" type="text" name="username" v-model="input.username" placeholder="Username" />
                <input class="mb-3 col-4 mx-auto form-control" type="password" name="password" v-model="input.password" placeholder="Password" />
                <button class="mb-3 col-4 btn btn-outline-success" v-on:click="login()"type="button">Login</button>
            </div>
        </div>
    </div>
`
export { LoginTemplate }