import Vue from 'vue'
import App from './App.vue'
import lpUi from './components/index'
import lp_alert from './components/lp-alert/lp-alert'

const message = function(options) {
  let Alert = Vue.extend(lp_alert)
  let alert = new Alert()
  let option = options || {}
  if(!Object.prototype.toString.call(option) === '[object Object]') {
    console.error('Please enter an object as a parameter')
    return;
  }
  let {type = 'info', lastTime = 2500, content = '这是一条提示消息'} = option
  alert.type = type
  alert.lastTime = lastTime
  alert.content = content
  //挂载
  alert.$mount()
  document.getElementById('app').appendChild(alert.$el)
}

Vue.prototype.$alert = message


Vue.use(lpUi)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
