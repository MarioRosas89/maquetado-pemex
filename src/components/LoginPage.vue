<template>
    <v-app>
       <v-main>
          <v-container fluid fill-height>
             <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                   <v-card class="elevation-12">
                      <v-toolbar dark color="primary">
                         <v-toolbar-title>{{isRegister ? stateObj.register.name : stateObj.login.name}} form</v-toolbar-title>
                      </v-toolbar>
                      <v-card-text>
                      <form ref="form" @submit.prevent="isRegister ? register() : login()">
                             <v-text-field
                               v-model="username"
                               name="username"
                               label="Username"
                               type="text"
                               placeholder="username"
                               required
                            ></v-text-field>
                            
                             <v-text-field
                               v-model="password"
                               name="password"
                               label="Password"
                               type="password"
                               placeholder="password"
                               required
                            ></v-text-field>

                            <v-text-field v-if="isRegister"
                               v-model="confirmPassword"
                               name="confirmPassword"
                               label="confirmPassword"
                               type="confirmPassword"
                               placeholder="confirmPassword"
                               required
                            ></v-text-field>
 
                            <v-text-field v-if="isRegister"
                               v-model="email"
                               name="email"
                               label="Email"
                               type="email"
                               placeholder="Email"
                               required
                            ></v-text-field>
                            <div class="red--text"> {{errorMessage}}</div>
                            <v-btn type="submit" class="mt-4" color="primary" value="log in">{{isRegister ? stateObj.register.name : stateObj.login.name}}</v-btn>
                            <div class="grey--text mt-4" v-on:click="isRegister = !isRegister;">
                               {{toggleMessage}}  
                            </div>
                            <div class="form-group">
                                <div v-if="errorMessage" class="alert alert-danger" role="alert">
                                {{ errorMessage }}
                                </div>
                            </div>
                       </form>
                      </v-card-text>
                   </v-card>
                 
                </v-flex>
             </v-layout>
          </v-container>
       </v-main>
    </v-app>
 </template>
 
<script>
export default {
  name: "LoginPage",
  components: {
  },
  data() {

    return {
       isRegister : false,
       errorMessage: "",
       username: "",
       email: "",
       password: "",
       confirmPassword: "",
       user: {
        username: '',
        password: '',
        email: '',
       },
       stateObj: {
          register :{
             name: 'Register',
             errorMessage: 'Aleady have an Acoount? login.'
          },
          login : {
             name: 'Login',
             errorMessage: 'Register'
          }
       }
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.users.initialState.status.loggedIn;
    },
    toggleMessage : function() { 
           return this.isRegister ? this.stateObj.register.errorMessage : this.stateObj.login.errorMessage }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("userList");
    }
  },
  methods: {
    login() {
      console.log("loading");
      const { username } = this;
      const { password } = this;
      this.user.username = username;
      this.user.password = password;

      this.$store.dispatch("login", this.user).then(
        () => {
          console.log("va a profile");
          this.$router.push("userList");
        },
        (error) => {

          console.log(error.toString());
          this.errorMessage =
            (error.response &&
              error.response.data &&
              error.response.data.errorMessage) ||
            error.errorMessage ||
            error.toString();
        }
      );
    },
    register() {
        if(this.password == this.confirmPassword){
         this.message = "";
            this.successful = false;
            this.loading = true;
            const { username } = this;
         const { password } = this;
         const { email } = this;
         this.user.username = username;
         this.user.password = password;
         this.user.email = email;
            this.$store.dispatch("register", this.user).then(
            (data) => {
               this.message = data.message;
               this.successful = true;
               this.loading = false;
            },
            (error) => {
               this.message =
                  (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                  error.message ||
                  error.toString();
               this.successful = false;
               this.loading = false;
            }
            );
           this.isRegister = false;
           this.errorMessage = "";
           this.$refs.form.reset();
        }
        else {
          this.errorMessage = "password did not match"
        }
     }
  },
};
</script>