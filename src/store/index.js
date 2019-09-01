import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  state: {
    currentNodeInfo: {
      id: '',
      type: ''
    },
    svgNodesInfo: null,
    // 统计画布中各个类型svg节点的信息
    nodeTypes: {
      startEvent: {
        type: 'startEvent',
        count: 0
      },
      endEvent: {
        type: 'endEvent',
        count: 0
      },
      userTask: {
        type: 'userTask',
        count: 0
      }
    },
    persistentTest: sessionStorage.getItem("persistentTest")
  },
  mutations: {
    changeCurrent (state, currentNodeInfo) {
      state.currentNodeInfo = currentNodeInfo
    },
    nodeIncrease (state, type) {
      state.nodeTypes[type].count++
    },
    persistentTest(state, param) {
      sessionStorage.setItem("persistentTest", param)
      state.persistentTest = param
    }
  },
  actions: {
    changeCurrent (context, currentNodeInfo) {
      context.commit('changeCurrent', currentNodeInfo)
    }
  }
})
