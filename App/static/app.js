import { Login } from './components/Login/Login.js'
import {MainScreenTemplate} from './templates/Login/MainScreenTemplate.js'

// Vue.use(VueRouter)

// const router = new VueRouter({
//   routes: [{
//   }]
// })

new Vue({
    el: '#app',
    components: {
        Login
    },
    template: MainScreenTemplate
})