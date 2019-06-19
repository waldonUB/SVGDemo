import Vue from "vue"
import router from "./router"
import App from "./App.vue"
import "@css/reset.scss"
import "@css/iconfont/iconfont.css"
import "@css/iconfont/iconfont"
import "@css/design.scss"
import "@css/directive.scss"
import store from "./store/index"
import tip from "@js/common/directive/tip"

Vue.config.productionTip = false

Vue.directive('tip', tip)

new Vue({
    el: "#app",
    router,
    store,
    components: {App},
    template: '<App></App>',
    mounted() {}
})


