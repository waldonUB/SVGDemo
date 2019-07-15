<!--流程属性面板-->
<template>
    <div>
        <div class="attr-panel">
            <attr-panel-header>
                <span>流程：</span>{{processInfo.processName}}
            </attr-panel-header>
            <div class="panel-body">
                <div class="input-group">
                    <div class="input-form">
                        <label for="processName">名称</label>
                        <input class="attr-input" id="processName" type="text" v-model="processInfo.processName">
                    </div>
                    <div class="input-form">
                        <label for="describe">描述</label>
                        <input class="attr-input" id="describe" type="text" v-model="processInfo.describe">
                    </div>
                </div>
            </div>
        </div>
        <div class="attr-panel">
            <attr-panel-header>
                <span>全局表单设置</span>
            </attr-panel-header>
            <div class="panel-body">
            </div>
        </div>
        <div class="attr-panel">
            <attr-panel-header>
                <span>流程数据模型绑定</span>
            </attr-panel-header>
            <div class="panel-body">
            </div>
        </div>
        <div class="attr-panel">
            <attr-panel-header>
                <span>流程属性配置</span>
            </attr-panel-header>
            <div class="panel-body">
            </div>
        </div>
    </div>
</template>

<script>
import AttrPanelHeader from '@pages/designe/attrConfigPanel/AttrPanelHeader'
export default {
  name: 'ProcessPanel',
  components: { AttrPanelHeader },
  data () {
    return {
      processInfo: {
        processId: '',
        processName: '',
        describe: ''
      }
    }
  },
  deactivated () {

  }
}
</script>

<style lang="scss" scoped>
    @import "../../../css/attrConfig/attrpanel";
</style>
