<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
        <v-list>
          <v-list-item v-if="currentUser" :to="'/profile/' + currentUser.id">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ currentUser.username }}
            </v-list-item-title>
          </v-list-item>

          <v-divider v-if="created" />

          <v-list-item to="/home">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Home
            </v-list-item-title>
          </v-list-item>



          <v-list-item v-if="!drawer" to="/register">
            <v-list-item-icon>
              <v-icon>mdi-account-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Sign Up
            </v-list-item-title>
          </v-list-item>

          <v-list-item v-if="drawer" to="/login">
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Login
            </v-list-item-title>
          </v-list-item>

          <v-list-item v-if="!drawer" @click.prevent="logOut">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              LogOut
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    <v-app-bar app color="primary">
      <v-toolbar-title>
        <router-link to="/" class="white--text">
          Pemex
        </router-link>
      </v-toolbar-title>

      <v-spacer />

      <v-btn icon @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
    
    
  
<script>

export default {
  data() {
    return {
      drawer: false
    };
  },
  methods: {
    logOut() {
      this.drawer = false;
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
    setDrawerState() {
      let isLogedin = this.$store.state.users;
      if (isLogedin) {
        this.drawer = false;
      } else {
        this.drawer = true;
      }
      return isLogedin
    },
  },
  computed: {
    currentUser() {
      let user = this.$store.state.users.initialState.user;
      if (user && user.user) {
        return user.user;
      } else {
        return null;
      }
    },
    
    created() {
      let showMenu = this.setDrawerState();
      return showMenu;
    },
    
  },

};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
  

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
