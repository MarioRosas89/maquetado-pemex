import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'
import store from './store'
import vuetify from './plugins/vuetify'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  vuetify
}).$mount('#app')
