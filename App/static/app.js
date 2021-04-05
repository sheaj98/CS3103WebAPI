import { Login } from './components/Login/Login.js'
import {MainScreenTemplate} from './templates/Login/MainScreenTemplate.js'

// Vue.use(VueRouter)

// const router = new VueRouter({
//   routes: [{
//   }]
// })

new Vue({
    el: '#app',
    data: function() {
        return {
            isAuthenticated: false
        }
    },
    mounted() {
        let userId = localStorage.getItem('userId');
        if (userId) {
            this.isAuthenticated = true;
        } 
    },
    methods: {
        setAuth() {
            this.isAuthenticated = true;
        }
    },
    components: {
        Login
    },
    template: MainScreenTemplate
})