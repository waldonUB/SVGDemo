<!--流程属性面板-->
<template>
    <panel-slot-scope :processList="processList">

    </panel-slot-scope>
</template>

<script>
    import AttrPanelHeader from "../../src/pages/designe/attrConfigPanel/AttrPanelHeader"
    import PanelSlotScope from "@pPanelSlotScope"
    export default {
        name: "ProcessPanel",
        components: {AttrPanelHeader, PanelSlotScope},
        data() {
            return {
                processInfo: {
                    processId: '',
                    processName: '',
                    describe: ''
                },
                processList: [
                    // 流程设置属性
                    {
                        name: `流程：`,
                        code: '01',
                        isFold: false
                    },{
                        name: `全局表单设置`,
                        code: '0101',
                        isFold: false
                    },{
                        name: `流程数据模型绑定`,
                        code: '0102',
                        isFold: false
                    },{
                        name: `流程属性配置`,
                        code: '0103',
                        isFold: false
                    },
                    // 节点面板属性
                    {
                        name: `节点：`,
                        code: '02',
                        isFold: false
                    }
                ]
            }
        },
        deactivated() {

        }
    }
</script>

<style lang="scss" scoped>
    @import "../../src/css/attrConfig/attrpanel";
</style>
