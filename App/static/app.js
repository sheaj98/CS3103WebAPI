import { LeaguesPage } from './components/Leagues/LeaguesPage.js'
import { Login } from './components/Login/Login.js'
import { MainScreenTemplate } from './templates/Login/MainScreenTemplate.js'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/leagues',
    component: LeaguesPage,
    name: 'Leagues Page',
  }]
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
            this.userId = userId;
            this.$router.push({ name: 'Leagues Page' })
        } 
    },
    methods: {
        setAuth() {
            this.isAuthenticated = true;
            let userId = localStorage.getItem('userId');
            this.userId = userId
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