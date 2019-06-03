import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    // strict: process.env.NODE_ENV !== 'production',
    state: {
        currentNodeInfo: {
            id: '',
            type: ''
        },
        svgNodesInfo: null
    },
    mutations: {
        changeCurrent(state, currentNodeInfo) {
            state.currentNodeInfo = currentNodeInfo
        }
    },
    actions: {
        changeCurrent(context, currentNodeInfo) {
            context.commit('changeCurrent', currentNodeInfo)
        }
    }
})
