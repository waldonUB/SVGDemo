import Vue from 'vue'
import Router from 'vue-router'
import AxiosTest from '../../test/AxiosTest'
import es6Test from '../../test/es6ExportTest/index'
// import Flow from "../pages/Flow.vue"
const Flow = () => import('../pages/Flow.vue') // 懒加载

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Flow',
      component: Flow
    },
    {
      path: '/axiosTest',
      name: 'AxiosTest',
      component: AxiosTest
    },
    {
      path: '/es6Test',
      name: 'es6Test',
      component: es6Test
    }
  ]
})
