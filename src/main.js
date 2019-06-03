import Vue from "vue"
import router from "./router"
import App from "./App.vue"
import "@css/reset.scss"
import "@css/iconfont/iconfont.css"
import "@css/iconfont/iconfont"
import "@css/design.scss"
import flow from "@js/design/flow"
import store from "./store/index"

Vue.config.productionTip = false


new Vue({
    el: "#app",
    router,
    store,
    components: {App},
    template: '<App></App>',
    mounted() {
        flow.initNodes()
    }
})

