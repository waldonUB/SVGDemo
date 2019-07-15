<template>
    <div id="designWrapper" class="wrapper">
        <top></top>
        <div id="ToolContainer" class="main" data-content="">
            <div id="toolBox" class="left" data-content="">
                <panel-header ref="processNode">
                    <template #headName>
                        流程节点
                    </template>
                </panel-header>
                <ul>
                    <li id="startEvent" class="b-node">
                        <img src="../assets/img/startEvent.png" alt="startEvent">
                        <span>开始节点</span>
                    </li>
                    <li id="endEvent" class="b-node">
                        <img src="../assets/img/endEvent.png" alt="endEvent">
                        <span>结束节点</span>
                    </li>
                    <li id="userTask" class="b-node">
                        <img src="../assets/img/type.user.png" alt="startEvent">
                        <span>用户任务</span>
                    </li>
                    <li id="subProcess" class="b-node">
                        <img src="../assets/img/expanded.subprocess.png" alt="startEvent">
                        <span>子流程</span>
                    </li>
                    <li id="outSubProcess" class="b-node">
                        <img src="../assets/img/task.png" alt="startEvent">
                        <span>外部子流程</span>
                    </li>
                    <li id="branch" class="b-node">
                        <img src="../assets/img/exclusive.databased.png" alt="startEvent">
                        <span>分支网关</span>
                    </li>
                    <li id="parallel" class="b-node">
                        <img src="../assets/img/parallel.png" alt="startEvent">
                        <span>并行网关</span>
                    </li>
                    <li id="conditionParallel" class="b-node">
                        <img src="../assets/img/inclusive.png" alt="startEvent">
                        <span>条件并行网关</span>
                    </li>
                    <li id="pool" class="b-node">
                        <img src="../assets/img/pool.png" alt="startEvent">
                        <span>池</span>
                    </li>
                    <li id="lane" class="b-node">
                        <img src="../assets/img/lane.png" alt="startEvent">
                        <span>泳道</span>
                    </li>
                    <li id="description" class="b-node">
                        <img src="../assets/img/text.annotation.png" alt="startEvent">
                        <span>注释说明</span>
                    </li>
                </ul>
            </div>
            <div id="center" class="center">
                <panel-header>
                    <template #headName>
                        流程图设计
                    </template>
                </panel-header>
                <!--两个节点相交的时候出现的XY轴-->
                <p id="collideLineX"></p>
                <p id="collideLineY"></p>
                <!--点击svg节点时，复制出来的移动图形-->
                <div id="copyMoveShape"></div>
                <svg id="designArea">
                    <defs>
                        <marker id="myArrow" viewBox="0 0 20 1" refX="20" refY="0" markerWidth="20" markerHeight="20" orient="auto">
                            <path d="m 0 0 v -6 l 20 6 l -20 6 v -6" stroke="#000" ></path>
                        </marker>
                    </defs>
                    <defs>
                        <line id="initLine" x1="100" y1="100" x2="300" y2="200" stroke="#000" marker-end="url(#myArrow)"></line>
                    </defs>
                </svg>
            </div>
            <attr-config>
            </attr-config>
        </div>
        <div class="footer">
            <panel-header>
                <template #headName>
                    流程插件配置
                </template>
            </panel-header>
        </div>
    </div>
</template>

<script>
import Top from '@pages/designe/Top'
import AttrConfig from '@pages/designe/AttrConfig'
import PanelHeader from '@components/PanelHeader'
import flow from '@js/design/flow'

export default {
  name: 'Flow',
  components: { Top, AttrConfig, PanelHeader },
  watch: {
    '$store.state.currentNodeInfo.id' (newVal) {
      // console.log(`flow watch currentNodeInfo : ` + newVal)
    }
  },
  data () {
    return {
      processInfo: {},
      nodeInfo: {}
    }
  },
  methods: {
    updateProcessName (data) {
      this.processInfo.processName = data
    },
    updateNodeName (data) {
      this.nodeInfo.nodeName = data
    }
  },
  mounted () {
    flow.initNodes()
  }
}
</script>

<style lang="scss" scoped>
    .footer /deep/ .panel-header {
        height: 10%;
    }
    #center /deep/ .panel-header {
        position: absolute;
    }
</style>
