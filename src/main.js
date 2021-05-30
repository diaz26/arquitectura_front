import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'

require('./store/modules/Suscriber')

axios.defaults.baseURL = "http://127.0.0.1:8000/api/"
Vue.config.productionTip = false

store.dispatch('login/me', localStorage.getItem('blog_token'))
  .then(() => {
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')

  }).catch((e) => {
    console.log(e)
    router.push('login')
  })

