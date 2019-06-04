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
    import PanelHeader from "@components/PanelHeader"
    import AttrConfigPanel from "@components/AttrConfigPanel"
    import ProcessPanel from "@pages/designe/attrConfigPanel/ProcessPanel"
    import NodePanel from "@pages/designe/attrConfigPanel/NodePanel"

    // 当前画布选择流程或节点的状态
    const PROCESS = '01'
    const NODE = '02'

    export default {
        name: "AttrConfig",
        components: {PanelHeader, AttrConfigPanel, ProcessPanel, NodePanel},
        computed: {
            currentAttrList () {
                let typeCode = this.$store.state.currentNodeInfo.type === 'process' ? PROCESS : NODE
                console.log(`当前过滤的attrList:` + JSON.stringify(this.attrList.filter(item => item.code.startsWith(typeCode))))
                return this.attrList.filter(item => item.code.startsWith(typeCode))
            },
            currentTemp() {
                let type = this.$store.state.currentNodeInfo.type
                if (type) {
                    let typeName = type === 'process' ? 'process' : 'node'
                    return typeName + '-panel'
                }
            }
        },
        props: {

        },
        data() {
            return {
                // 针对流程面板和流程节点渲染出不同的属性，未来再扩展流程插件配置
                attrList: [
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
                    },
                    {
                        name: `节点表单`,
                        code: '0201',
                        isFold: false
                    },
                    {
                        name: `节点人员`,
                        code: '0202',
                        isFold: false
                    },
                    {
                        name: `节点按钮`,
                        code: '0203',
                        isFold: false
                    },
                    {
                        name: `节点属性`,
                        code: '0204',
                        isFold: false
                    }
                ]
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    .attr-content {
        height: 100%;
        overflow: auto;
    }
</style>
