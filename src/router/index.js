import Vue from "vue"
import Router from "vue-router"
// import Flow from "../pages/Flow.vue"
const Flow = () => import("../pages/Flow.vue") // 懒加载

Vue.use(Router)
export default new Router({
    routes: [
        {
            path: "/",
            name: "Flow",
            component: Flow
        }
    ]
})
