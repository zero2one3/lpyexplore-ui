//全局组件
import lp_button from './lp-button/lp-button'
import lp_filp from "./lp-filp/lp-filp";
import lp_sliding from "./lp-sliding/lp-sliding";
import lp_accordion from "./lp-accordion/lp-accordion";
import lp_switch from "./lp-switch/lp-switch";
import lp_rate from "./lp-rate/lp-rate";
import lp_tabs from "./lp-tabs/lp-tabs"
import lp_radio from "./lp-radio/lp-radio"
import lp_input from "./lp-input/lp-input"
//全局方法组件
import lp_alert from "./lp-alert/lp-alert.js";
import lp_dialog from "./lp-dialog/lp-dialog.js";
import lp_loading from "./lp-loading/lp-loading.js";
//全局方法
import {removeClass} from "./tools/operateClassName/removeClass";
import {addClass} from "./tools/operateClassName/addClass";

const components = [
    lp_button,
    lp_filp,
    lp_sliding,
    lp_accordion,
    lp_switch,
    lp_rate,
    lp_tabs,
    lp_radio,
    lp_input
]

const install = function (Vue) {
    if(install && install.isinstalled) return;

    install.isinstalled = true

    components.map(component => Vue.component(component.name, component))

    Vue.prototype.$EventBus = new Vue()

    //lp-alert组件注册
    lp_alert(Vue)

    //lp-confirm组件注册
    lp_dialog(Vue)

    //lp-loading组件注册
    lp_loading(Vue)

    //注册操作className的方法
    Vue.prototype.$addClass = addClass
    Vue.prototype.$removeClass = removeClass

}

if(typeof window !== 'undefined' && window.Vue) {
   install(window.Vue)
}

export default {
    install,
    components
}
