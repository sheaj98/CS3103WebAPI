import { LeaguesPage } from './components/Leagues/LeaguesPage.js'
import { LeagueDetailPage } from './components/Leagues/LeagueDetailPage.js'
import { RecentMatchesPage } from './components/RecentMatches/RecentMatchesPage.js'
import { ParticipantPage } from './components/Participants/ParticipantPage.js'
import { Login } from './components/Login/Login.js'
import { MainScreenTemplate } from './templates/Login/MainScreenTemplate.js'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/leagues',
    component: LeaguesPage,
    name: 'Leagues Page',
  },
//   {
//       path: '/leagues/:id/matches',
//       component: RecentMatchesPage,
//       name: 'Recent Matches'
//   },
  {
      path: '/leagues/:id',
      component: LeagueDetailPage,
      name: 'League Details',
      children: [
          {
              path: 'matches',
              component: RecentMatchesPage
          },
          {
              path: 'members',
              component: ParticipantPage
          }
      ]
  }
]
})

new Vue({
    el: '#app',
    data: function() {
        return {
            isAuthenticated: false,
            userId: -1
        }
    },
    mounted() {
        let userId = localStorage.getItem('userId');
        if (userId) {
            this.isAuthenticated = true;
            this.$router.push({ name: 'Leagues Page' })
        } 
    },
    methods: {
        setAuth() {
            this.isAuthenticated = true;
            this.$router.push({ name: 'Leagues Page' })
        }
    },
    components: {
        Login
    },
    router,
    template: MainScreenTemplate
})

Vue.component("modal", {
    template: "#modal-template"
});