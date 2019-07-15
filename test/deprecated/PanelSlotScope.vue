<template>
    <div>
        <div class="attr-panel" v-for="item in processList">
            <attr-panel-header>
                <span>{{item.name}}</span>
            </attr-panel-header>
            <div class="panel-body">
                <slot :process="item"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import AttrPanelHeader from '../../src/pages/designe/attrConfigPanel/AttrPanelHeader'
export default {
  name: 'PanelSlotScope',
  components: { AttrPanelHeader },
  props: ['processList']
}
</script>

<style lang="scss" scoped>
    @import "../../src/css/attrConfig/attrpanel";
</style>
