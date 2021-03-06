const LeagueDetailPageTemplate = `
    <div class="d-flex" id="wrapper">

    <div class="bg-light border-right" id="sidebar-wrapper">
    <div class="sidebar-heading">{{league.name}}</div>
    <div class="list-group list-group-flush">
        <router-link :to="{ path: '/leagues/' + this.leagueId +'/matches'}" class="list-group-item list-group-item-action bg-light">Recent Matches</router-link>
        <router-link :to="{ path: '/leagues/' + this.leagueId +'/leaderboard'}" class="list-group-item list-group-item-action bg-light">Leaderboard</router-link>
        <router-link :to="{ path: '/leagues/' + this.leagueId +'/members'}" class="list-group-item list-group-item-action bg-light">Participants</router-link>
        <router-link :to="{ path: '/leagues/' + this.leagueId +'/details'}" class="list-group-item list-group-item-action bg-light">Details</router-link>
    </div>
    </div>
    <div id="page-content-wrapper">

    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
            <li class="nav-item">
                <router-link class="nav-link" to="/leagues">Back to Leagues</router-link>
            </li>
        </ul>
        </div>
    </nav>

    <div class="container-fluid">
        <router-view></router-view>
    </div>
    </div>
    </div>
`
export { LeagueDetailPageTemplate }