import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import UserList from '../components/UserList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/UserList',
      name: 'UserList',
      component: UserList,
      props: {}
    }
  ]
})