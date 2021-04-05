import { LeaguesPage } from './components/Leagues/LeaguesPage.js'
import {MainScreenTemplate} from './templates/Login/MainScreenTemplate.js'

// Vue.use(VueRouter)

// const router = new VueRouter({
//   routes: [{
//   }]
// })

new Vue({
    el: '#app',
    components: {
        LeaguesPage
    },
    template: MainScreenTemplate
})