import Vue from 'vue'
import App from './App.vue'
import lpUi from './components/index'
import lp_alert from './components/lp-alert/lp-alert'
import lp_dialog from './components/lp-dialog/lp-dialog'
import lp_loading from './components/lp-loading/lp-loading'

Vue.prototype.$EventBus = new Vue()

//alert信息
const alert_info = function (options) {
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

//confirm信息
const confirm_info = function (options) {
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

    this.$EventBus.$once('confirmClick', (isSure) => {
      if(isSure) {
        resolve()
      }
      else {
        reject()
      }
    })

  })

}

//loading信息
const loading_info = function() {
  let Loading = Vue.extend(lp_loading)
  let loading = new Loading

  loading.fullScreen = true

  //挂载
  loading.$mount()
  document.getElementById('app').appendChild(loading.$el)

  this.$EventBus.$once('loadingClose', () => {


  })

}

Vue.prototype.$alert = alert_info
Vue.prototype.$confirm = confirm_info
Vue.prototype.$loading = loading_info

Vue.use(lpUi)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
