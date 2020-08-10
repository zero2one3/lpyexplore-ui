import lp_loading from "./lp-loading.vue"

export default function (Vue) {
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

    Vue.prototype.$loading = loading_info
}