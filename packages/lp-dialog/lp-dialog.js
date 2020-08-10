import lp_dialog from "./lp-dialog.vue"

export default function (Vue) {

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

    Vue.prototype.$confirm = confirm_info
}
