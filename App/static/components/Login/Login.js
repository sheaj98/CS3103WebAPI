import { LoginTemplate } from '../../templates/Login/LoginTemplate.js'

const Login = {
    data: function () {
        return {
            serviceURL: "https://cs3103.cs.unb.ca:58651",
            input: {
                username: "",
                password: ""
            } 
        }
    },
    methods: {
        login() {
            if (this.input.username != "" && this.input.password != "") {
                axios
                .post(this.serviceURL+"/login", {
                    "username": this.input.username,
                    "password": this.input.password
                })
                .then(response => {
                    localStorage.setItem('userId', response.data.user.userId);
                    console.log(response)
                    this.$emit('userAuth');         
                })
                .catch(e => {
                    alert("The username or password was incorrect, try again");
                    this.input.password = "";
                    console.log(e);
                });
              } else {
                alert("A username and password must be present");
              }
        }
    },
    template: LoginTemplate,
}

export { Login }