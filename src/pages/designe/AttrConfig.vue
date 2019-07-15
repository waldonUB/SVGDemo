<!--右边属性面板-->
<template>
    <div class="right">
        <panel-header>
            <template v-slot:headName>
                属性配置
            </template>
        </panel-header>
        <div class="attr-content">
            <keep-alive>
                <component :is="currentTemp"
                           :key="$store.state.currentNodeInfo.id"
                           :nodeType="$store.state.currentNodeInfo.type">
                </component>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import PanelHeader from '@components/PanelHeader'
import ProcessPanel from '@pages/designe/attrConfigPanel/ProcessPanel'
import NodePanel from '@pages/designe/attrConfigPanel/NodePanel'

// 当前画布选择流程或节点的状态
// const PROCESS = '01'
// const NODE = '02'

export default {
  name: 'AttrConfig',
  components: { PanelHeader, ProcessPanel, NodePanel },
  computed: {
    currentTemp () {
      const type = this.$store.state.currentNodeInfo.type
      if (type) {
        const typeName = type === 'process' ? 'process' : 'node'
        return typeName + '-panel'
      }
      return null
    }
  },
  props: {

  },
  data () {
    return {
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
    .attr-content {
        height: 100%;
        overflow: auto;
    }
</style>
