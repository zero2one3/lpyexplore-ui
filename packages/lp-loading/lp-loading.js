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
        let {content = '', type = 'bubble'} = option
        loading.content = content
        loading.type = type

        let element = document.querySelector('#app')

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