import Vue from 'vue'
import App from './App.vue'
import lpUi from '../packages'
import '../packages/tools/font-awesome/css/font-awesome.min.css'

Vue.use(lpUi)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
