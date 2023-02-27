<template>
  <div>
    <v-data-table :headers="headers" :items="usersload">
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.username }}</td>
            <td>{{ item.email }}</td>
            <v-data-table-cell>
              <v-btn text @click="editUser(item)">Edit</v-btn>
              <v-btn text @click="deleteUser(item.id, item.accessToken)">Delete</v-btn>
            </v-data-table-cell>
          </tr>
        </tbody>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          Edit User
        </v-card-title>
        <v-card-text>
          <v-form ref="editForm">
            <v-text-field v-model="editedUser.username" label="Username"></v-text-field>
            <v-text-field v-model="editedUser.email" label="Email"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="updateUser(editUser)">Save</v-btn>
          <v-btn color="secondary" @click="closeDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import UserService from "../services/user.service";
export default {
  name: 'UserList',
  data() {
    return {
      headers: [
        { text: 'Username', value: 'username' },
        { text: 'Email', value: 'email' },
      ],
      selectedUserData: null,
      usersload: [],
      loadingUsers: true,
      dialog: false,
      editedUser: {
        id: null,
        username: "",
        email: "",
      },
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
    },
    editUser(user) {
      this.editedUser = { ...user };
      this.dialog = true;
    },
    updateUser() {
      
          this.dialog = false;
          UserService.update(this.editedUser).then(
            (edited) => {
              console.log("borraUsuario");
              this.getUsers()
              return edited
            },
            (error) => {
              this.content =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
              console.log(error.toString());
            }
          );
    },
    deleteUser: function (id) {
      this.loading = true;
      this.showModal = false;
      UserService.delete(id).then(
        () => {
          console.log("borraUsuario");
          localStorage.removeItem('user');
          this.$router.push("/login");
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log(error.toString());
        }
      );
    }
  }
}
</script>
