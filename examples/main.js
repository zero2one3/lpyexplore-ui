import Vue from 'vue'
import App from './App.vue'
import lpUi from '../packages'

Vue.use(lpUi)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
