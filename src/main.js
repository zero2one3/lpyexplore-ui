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
  console.log(this.$EventBus._events)
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
const loading_info = function(options) {
  let Loading = Vue.extend(lp_loading)
  let loading = new Loading

  let option = options || {}
  if(!Object.prototype.toString.call(option) === '[object Object]') {
    console.error('Please enter an object as a parameter')
    return;
  }
  let {fullScreen = true, content = '', location = null} = option

  let element = document.getElementById('app')

  loading.fullScreen = fullScreen
  loading.content = content

  if(location && !fullScreen) {
    element = location
  }

  //适配
  let width = element.clientWidth
  let height = element.clientHeight
  let min = height
  if(width < height) {
    min = width
  }
  if(min <= 21) {
    loading.width = '15px'
    loading.height = '15px'
  }
  else if(min <= 46) {
    loading.width = '22px'
    loading.width = '22px'
  }
  else {
    loading.width = '42px'
    loading.width = '42px'
  }

  //挂载
  loading.$mount()
  element.appendChild(loading.$el)

  const _this = this.$EventBus.isLoading

  return {
    close: function () {
      _this.$destroy(true)
      _this.$el.parentNode.removeChild(_this.$el)
      _this.$EventBus.isLoadng = null
    }
  }

}

Vue.prototype.$alert = alert_info
Vue.prototype.$confirm = confirm_info
Vue.prototype.$loading = loading_info

Vue.use(lpUi)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
