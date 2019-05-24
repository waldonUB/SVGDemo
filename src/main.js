import Vue from "vue"
import router from "./router"
import App from "./App.vue"
import "../src/css/reset.scss"
import "../src/css/iconfont/iconfont.css"
import "../src/css/iconfont/iconfont"
import "../src/css/design.scss"

Vue.config.productionTip = false


new Vue({
    el: "#app",
    router,
    components: {App},
    template: '<App></App>'
})
