import lp_button from './lp-button/lp-button'
import lp_filp from "./lp-filp/lp-filp";
import lp_sliding from "./lp-sliding/lp-sliding";
import lp_accordion from "./lp-accordion/lp-accordion";


const components = [
    lp_button,
    lp_filp,
    lp_sliding,
    lp_accordion,

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