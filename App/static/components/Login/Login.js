import { LoginTemplate } from '../../templates/Login/LoginTemplate.js'

const Login = {
    data: function () {
        return {
            serviceURL: "https://cs3103.cs.unb.ca:8005",
            loginInput: {
                username: "",
                password: ""
            },
            signupInput: {
                firstName: "",
                lastName: "",
                email: ""
            },
            loggingIn: true,
        }
    },
    methods: {
        login() {
            if (this.loginInput.username != "" && this.loginInput.password != "") {
                axios
                .post(this.serviceURL+"/login", {
                    "username": this.loginInput.username,
                    "password": this.loginInput.password
                })
                .then(response => {
                    localStorage.setItem('userId', response.data.user.userId);
                    console.log(response)
                    this.$emit('userAuth');         
                })
                .catch(e => {
                    alert("The username or password was incorrect, try again");
                    this.loginInput.password = "";
                    console.log(e);
                });
              } else {
                alert("A username and password must be present");
              }
        },
        signup() {
            let { firstName, lastName, email } = this.signupInput;
            if (firstName != "" && lastName != "" && email != "") {
                axios
                .post(this.serviceURL+'/users', {
                    firstName,
                    lastName,
                    email,
                    isActive: true
                }).then(() => {
                    alert("You have successfully created an account, please log in.")
                    this.loggingIn = true;
                }).catch(e => {
                    alert("Something went wrong, do you already have an account?");
                    this.input.password = "";
                    console.log(e);
                });
            }
        },
        goToLogin() {
            this.loggingIn = true;
        },
        goToSignup() {
            this.loggingIn = false;
        }

    },
    template: LoginTemplate,
}

export { Login }
