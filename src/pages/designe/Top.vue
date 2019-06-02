<template>
    <div id="headerNode" class="header">
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
    import {store} from '../../js/design/flow.js'
    export default {
        name: "Top",
        components: {PanelHeader},
        // computed: {
        //     testCount () {
        //         if (store.currentNodeInfo)
        //         console.log(`computed currentNodeInfo : ` + store.currentNodeInfo.id)
        //         // return store.currentNodeInfo.id
        //         return 'store.currentNodeInfo.id'
        //     }
        // },
        watch: {
            'module.currentNodeInfo.id' (newVal) {
                console.log(`watch currentNodeInfo : ` + newVal)
            }
        },
        data() {
            return {
                module: null
            }
        },
        methods: {
            saveFlow() {
                console.log(this.module)
                // this.$set(store, 'currentNodeInfo', store.currentNodeInfo)
                // this.$set(this.module, 'currentNodeInfo', this.module.currentNodeInfo)
            }
        },
        mounted() {
            // watch只能监听data中的数据？
            this.module = store
            store.initNodes()
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
