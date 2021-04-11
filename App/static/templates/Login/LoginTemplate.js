const LoginTemplate = `
    <div class='loginScreen container-fluid'>
        <div class="h-100 row align-items-center">
            <div class="col">
                <img src="images/loginSplash.svg" alt="Splash Screen" />
            </div>
            <div v-if="loggingIn" class="col">
                <div class="form-group text-center">
                    <h2>Welcome to Leaderboard Service</h2>
                    <input class="mb-3 col-4 mx-auto form-control" type="text" name="username" v-model="loginInput.username" placeholder="Username" />
                    <input class="mb-3 col-4 mx-auto form-control" type="password" name="password" v-model="loginInput.password" placeholder="Password" />
                    <button class="mb-3 col-4 btn btn-primary" v-on:click="login()"type="button">Login</button>
                    <button class="mb-3 col-4 btn btn-secondary" v-on:click="goToSignup()" type="button">No account? Click to signup!</button>
                </div>
            </div>
            <div v-else class="col">
                <div class="form-group text-center">
                    <h2>Welcome to Leaderboard Service</h2>
                    <input class="mb-3 col-4 mx-auto form-control" type="text" name="First Name" v-model="signupInput.firstName" placeholder="First Name" />
                    <input class="mb-3 col-4 mx-auto form-control" type="text" name="Last Name" v-model="signupInput.lastName" placeholder="Last Name" />
                    <input class="mb-3 col-4 mx-auto form-control" type="text" name="Email" v-model="signupInput.email" placeholder="Email" />
                    <button class="mb-3 col-4 btn btn-primary" v-on:click="signup()"type="button">Signup</button>
                    <button class="mb-3 col-4 btn btn-secondary" v-on:click="goToLogin()"type="button">Already have account? Log In!</button>
                </div> 
            </div>
        </div>
    </div>
`
export { LoginTemplate }