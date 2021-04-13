const LeagueDetailPageTemplate = `
    <div class="d-flex" id="wrapper">

    <!-- Sidebar -->
    <div class="bg-light border-right" id="sidebar-wrapper">
    <div class="sidebar-heading">{{league.name}}</div>
    <div class="list-group list-group-flush">
        <router-link :to="{ path: '/leagues/' + this.leagueId +'/matches'}" exact class="list-group-item list-group-item-action bg-light">Recent Matches</router-link>
        <a href="#" class="list-group-item list-group-item-action bg-light">Leaderboard</a>
        <router-link :to="{ path: '/leagues/' + this.leagueId +'/members'}" exact class="list-group-item list-group-item-action bg-light">Participants</router-link>
        <a href="#" class="list-group-item list-group-item-action bg-light">League Details</a>
    </div>
    </div>
    <!-- /#sidebar-wrapper -->

    <!-- Page Content -->
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
    <!-- /#page-content-wrapper -->

    </div>
`
export { LeagueDetailPageTemplate }