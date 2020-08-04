import Vue from 'vue'
import App from './App.vue'
import lpUi from './components/index'
import lp_alert from './components/lp-alert/lp-alert'
import lp_dialog from './components/lp-dialog/lp-dialog'

Vue.prototype.$EventBus = new Vue()

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

const confirm_box = function(options) {
  let Confirm = Vue.extend(lp_dialog)
  let confirm = new Confirm()
  let option = options || {}
  if(!Object.prototype.toString.call(option) === '[object Object]') {
    console.error('Please enter an object as a parameter')
    return;
  }
  let {title = '提示信息', content = '这是提示内容', center = true} = option
  confirm.title = title
  confirm.content = content
  confirm.center = center

  //挂载
  confirm.$mount()
  document.getElementById('app').appendChild(confirm.$el)

  return new Promise((resolve, reject) => {

    this.$EventBus.$on('confirmClick', (isSure) => {
      if(isSure) {
        resolve()
      }
      else {
        reject()
      }
    })

  })

}

Vue.prototype.$alert = message
Vue.prototype.$confirm = confirm_box

Vue.use(lpUi)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
