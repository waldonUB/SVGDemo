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
    import PanelHeader from "@components/PanelHeader"
    import {getInitBpmn} from "../../js/common/util";
    export default {
        name: "Top",
        components: {PanelHeader},
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
                let initBpmn = getInitBpmn() // 获取初始化的BPMN文件
                let bpmMap = JSON.parse(initBpmn)
                let [process, diagram] = bpmMap.elements[0].elements // 将节点事件和图形坐标界面分离
                let nodesEvent = process.elements // 获取所有节点事件
                nodesEvent.push('123')
                nodesEvent.push('456')
                console.log(bpmMap)
                console.log(process)
                console.log(diagram)
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../css/base";
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
            width: pxToRem(36px);
            height: pxToRem(26px);
            list-style: none;
            font-size: pxToRem(26px);
            background-color: rgba(132, 198, 232, 0.7);
            color: white;
            border-radius: 5px;
            padding: 5px;
            margin: 0 10px;
            cursor: pointer;
            text-align: center;
        }
        @media screen and (max-width: 1360px){
            .icon-header {
                width: pxToRem(30px);
                height: pxToRem(19px);
                font-size: pxToRem(22px);
            }
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
