const LeaderboardPageTemplate = `
    <div>
        <div class="container">
            <h1>Leaderboad</h1>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Record</th>
                    </tr>
                </thead>
                <tbody v-for="(user,index) in userStats">
                    <tr>
                        <th scope="row">{{index + 1}}</th>
                        <td>{{user.firstName}}</td>
                        <td>{{user.lastName}}</td>
                        <td>{{user.wins}}-{{user.losses}}-{{user.ties}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
`
export {LeaderboardPageTemplate}