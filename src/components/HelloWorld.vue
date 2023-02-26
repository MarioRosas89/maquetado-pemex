<template>
  <v-app >
     <v-main>
        <v-container fluid fill-height>
           <v-layout align-center justify-center>
              <v-flex xs12 sm8 md4>
                 <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                       <v-toolbar-title>Login form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                    <form ref="form" @submit.prevent="login()">
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
                          <v-btn type="submit" class="mt-4" color="primary" value="log in">Login</v-btn>
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
 name: "LoginForm",
 data() {
  const schema = {
     username: "",
     password: "",
     email: ""
   };

   return {
     loading: false,
     message: "",
     schema, 
   };
 },
 computed: {
   get loggedIn() {
     return this.$store.state.auth.status.loggedIn;
   },
 },
 methods: {
   login() {
     console.log("loading");
     const { username, password, email } = this;
     const schema = {
     username,
     password,
     email
   };
     
     console.log(schema + "logged in")
     this.$store.dispatch("auth/login", schema).then(
       () => {
         console.log("va a profile");
         this.$router.push("/profile");
       },
       (error) => {
         
         console.log(error.toString());
         this.message =
           (error.response &&
             error.response.data &&
             error.response.data.message) ||
           error.message ||
           error.toString();
       }
     );
   },
 },
};
</script>