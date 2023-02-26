<template>
  <div>
    <h2>List of Users: {{users.length}}</h2>
    <div v-if="loadingUsers">Loading...</div>
    <UserComponent
      v-for="user in users"
      v-bind:user="user"
      v-bind:key="user.id"
      v-bind:selectedUserData="selectedUserData"
      v-on:selectedUser="onClickUserInList"
     />
     <br />
     <div v-if="selectedUserData">
       You selected: {{ selectedUserData }}
     </div>
  </div> 
</template>

<script>
import UserComponent from './UserComponent'

export default {
  name: 'UserList',
  components: {
    UserComponent
  },
  data() {
    return {
      selectedUserData: null
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.users.initialState.status.loggedIn;
    },
    users() {
      
      let users = this.$store.state.users
      return users
    },
    loadingUsers() {
      // eslint-disable-next-line no-console
      console.log('Loading!')
      return this.$store.state.users.getterLoadingUsers
    }
  },
  created() {
    this.callActionGetUsers()
  },
  methods: {
    callActionGetUsers() {
      return this.$store.dispatch('getUsers')
    },
    onClickUserInList(user) {
      this.selectedUserData = user
      // eslint-disable-next-line no-console
      console.log('List!')
      }
    }
}
</script>

<style scoped>

</style>