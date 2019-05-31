<template>
    <div id="headerNode" class="header">
        {{testCount}}
        <panel-header>
            <template v-slot:headName>
                <i class="iconfont iconworkflow work-flow-icon"></i>
                流程方案设计
            </template>
        </panel-header>
        <ul>
            <li class="iconfont iconsave icon-header" @click="saveFlow"></li>
            <li class="iconfont iconcopy icon-header"></li>
            <li class="iconfont iconcut icon-header"></li>
            <li class="iconfont iconshrink1 icon-header"></li>
            <li class="iconfont iconarrawsalt icon-header"></li>
            <li class="iconfont iconshrink icon-header"></li>
            <li class="iconfont iconmagnify icon-header"></li>
            <li class="iconfont iconup-circle icon-header"></li>
            <li class="iconfont icondown-circle icon-header"></li>
            <li class="iconfont iconleft-circle icon-header"></li>
            <li class="iconfont iconright-circle icon-header"></li>
        </ul>
    </div>
</template>

<script>
    import PanelHeader from "components/PanelHeader"
    // import {currentNodeInfo, svgNodesInfo, initNodes} from '../../js/design/flow.js'
    import store from '../../js/design/flow.js'
    import {getUUID, getInitBpmn} from "../../js/common/util"
    export default {
        name: "Top",
        components: {PanelHeader},
        watch: {
            'store.currentNodeInfo' (newVal) {
                console.log(`watch currentNodeInfo : ` + newVal)
            }
        },
        computed: {
            testCount () {
                console.log(`computed currentNodeInfo : ` + store.store.currentNodeInfo)
                return store.store.currentNodeInfo
            }
        },
        data() {
            return {
                module: {
                    currentNodeInfo: ''
                }
            }
        },
        methods: {
            saveFlow() {
                console.log(`saveFlow`)
                // store.currentNodeInfo = getUUID()
                debugger
                this.$set(store, 'currentNodeInfo', store.currentNodeInfo)
                // this.$set(this.module, 'currentNodeInfo', this.module.currentNodeInfo)
            }
        },
        mounted() {
            store.store.initNodes()
            // setInterval(function () {
            //     console.log(store.store.currentNodeInfo)
            // }, 300)
            // import('../../js/design/flow.js').then(module => {
            //     debugger
            //     this.module = module.store
            // })
        }
    }
</script>

<style lang="scss" scoped>
    .header {
        position: relative;
        flex: 1 1 0;
    }
    .header ul {
        position: relative;
        height: 60%;
        display: flex;
        /*align-items: center;*/
        box-sizing: border-box;
        padding: 10px 0 0 20px;
        /*头部功能图标*/
        .icon-header {
            width: 36px;
            height: 55%;
            list-style: none;
            font-size: 26px;
            background-color: rgba(132, 198, 232, 0.7);
            color: white;
            border-radius: 5px;
            padding: 5px;
            margin: 0 10px;
            cursor: pointer;
            text-align: center;
        }
    }
    /**workflow图标*/
    .work-flow-icon {
        margin: 10px;
        color: rgb(92, 184, 92);
        font-size: 18px;
    }
    #headerNode /deep/ .panel-header {
        height: 40%;
        background-color: rgb(250, 250, 250);
        box-sizing: border-box;
        box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
        font-size: 18px;
        color: rgb(117, 138, 186);
    }
</style>
