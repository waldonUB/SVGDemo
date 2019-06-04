<!--属性面板各个panel的头部-->
<template>
    <div class="panel-header">
        <slot></slot>
        <i class="iconfont iconxiala1 icon-panel-header" :class="foldState" @click="toggleFold"></i>
    </div>
</template>

<script>
    export default {
        name: "AttrPanelHeader",
        data() {
            return {
                foldState: 'unfold'
            }
        },
        methods: {
            toggleFold() {
                this.foldState = (this.foldState === 'unfold') ? 'fold' : 'unfold'
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../css/attrConfig/attrpanel";
</style>
