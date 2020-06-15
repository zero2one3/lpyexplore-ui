import lp_button from './lp_button/lp_button'
import lp_filp from "./lp_filp/lp_filp";
import lp_sliding from "./lp_sliding/lp_sliding";
import lp_accordion from "./lp_accordion/lp_accordion";

const components = [
    lp_button,
    lp_filp,
    lp_sliding,
    lp_accordion
]

const install = function (Vue) {
    if(install && install.isinstalled) return;

    install.isinstalled = true

    components.map(component => Vue.component(component.name, component))
}

if(window.Vue) {
   install(window.Vue)
}

export default {
    install,
    components
}