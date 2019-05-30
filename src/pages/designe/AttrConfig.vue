<template>
    <div class="right">
        <panel-header>
            <template v-slot:headName>
                属性配置
            </template>
        </panel-header>
        <div>
            <slot :attrList="attrList"></slot>
        </div>
    </div>
</template>

<script>
    import PanelHeader from "components/PanelHeader"
    import AttrConfigPanel from "components/AttrConfigPanel"
    export default {
        name: "AttrConfig",
        components: {PanelHeader, AttrConfigPanel},
        data() {
            return {
                // 针对流程面板和流程节点渲染出不同的属性，未来再扩展流程插件配置
                attrList: [
                    {
                        name: `流程：`,
                        code: '001',
                        isFold: false
                    },
                    {
                        name: `节点表单`,
                        code: '002',
                        isFold: false
                    },
                    {
                        name: `节点人员`,
                        code: '003',
                        isFold: false
                    },
                    {
                        name: `节点按钮`,
                        code: '004',
                        isFold: false
                    },
                    {
                        name: `节点属性`,
                        code: '005',
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

</style>
