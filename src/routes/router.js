import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import UserList from '../components/UserList.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      alias: ['/login', '/signin'], 
      name: 'login',
      component: LoginPage
    },
    {
      path: '/userList',
      name: 'UserList',
      component: UserList,
      props: {}
    }
  ]
})