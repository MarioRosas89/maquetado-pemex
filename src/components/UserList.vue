<template>
  <div>
    <h2>List of Users: {{usersload.length}}</h2>
    <div v-if="loadingUsers">Loading...</div>
    <v-data-table  :items="usersload">
      <v-data-table-header>
        <v-data-table-header-row>
          <v-data-table-header-cell>Name</v-data-table-header-cell>
          <v-data-table-header-cell>Email</v-data-table-header-cell>
          <v-data-table-header-cell>Actions</v-data-table-header-cell>
        </v-data-table-header-row>
      </v-data-table-header>
      <v-data-table-body>
        <template v-slot:items="usersload">
          <v-data-table-row>
            <td class="text-xs-right">{{ usersload.username }}</td>
            <td class="text-xs-right">{{ usersload.email }}</td>
            <v-data-table-cell>
              <v-btn text @click="editUser(username)">Edit</v-btn>
              <v-btn text @click="deleteUser(username)">Delete</v-btn>
            </v-data-table-cell>
          </v-data-table-row>
        </template>
      </v-data-table-body>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data() {
    return {
      selectedUserData: null,
      usersload: [],
      loadingUsers: true,
    }
  
}
,
  computed: {
    loggedIn() {
      return this.$store.state.users.initialState.status.loggedIn;
    },
    users() {
      
      let usersw = this.$store.state.users
      return usersw
    },
    editUser(name) {
      console.log(`Editing user ${name}`);
      return this.users.find(user => user.id === this.name.id);
    },
    deleteUser(name) {
      console.log(`Deleting user ${name}`);
      return this.users.find(user => user.id === this.name.id);
    },
    loadingUser() {
      // eslint-disable-next-line no-console
      console.log('Loading!')
      return this.$store.state.users.getterLoadingUsers
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    async getUsers() {
      this.$store.dispatch('getUsers')
      .then((user) => {
        this.usersload = user
        this.loadingUsers = false;
      })
      .catch((error) => {
        console.error(error); // Handle any errors
      });
    }
  }
}
</script>

<style scoped>

</style>