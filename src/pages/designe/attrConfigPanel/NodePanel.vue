<!--节点属性面板-->
<template>
    <div>
        <div class="attr-panel">
            <attr-panel-header>
                <span>节点：</span>{{nodeInfo.nodeName}}
            </attr-panel-header>
            <div class="panel-body">
                <div class="input-group">
                    <div class="input-form">
                        <label for="nodeId">ID</label>
                        <input class="attr-input" id="nodeId" type="text" v-model="nodeInfo.nodeId">
                    </div>
                    <div class="input-form">
                        <label for="nodeName">名称</label>
                        <input class="attr-input" id="nodeName" type="text" v-model="nodeInfo.nodeName">
                    </div>
                    <div class="input-form">
                        <label for="nodeDescribe">描述</label>
                        <input class="attr-input" id="nodeDescribe" type="text" v-model="nodeInfo.nodeDescribe">
                    </div>
                </div>
            </div>
        </div>
        <div class="attr-panel">
            <attr-panel-header>
                <span>节点表单</span>
            </attr-panel-header>
            <div class="panel-body">
                <button class="success">设置所有表单</button>
            </div>
        </div>
        <div class="attr-panel">
            <attr-panel-header>
                <span>节点人员</span>
            </attr-panel-header>
            <div class="panel-body">
                <button class="success">设置所有节点人员</button>
            </div>
        </div>
        <div class="attr-panel">
            <attr-panel-header>
                <span>节点按钮</span>
            </attr-panel-header>
            <div class="panel-body">
                <button class="success">设置所有节点按钮</button>
            </div>
        </div>
        <div class="attr-panel">
            <attr-panel-header>
                <span>节点属性</span>
            </attr-panel-header>
            <div class="panel-body">
                005
            </div>
        </div>
    </div>
</template>

<script>
    import AttrPanelHeader from "@pages/designe/attrConfigPanel/AttrPanelHeader"
    export default {
        name: "NodePanel",
        components: {AttrPanelHeader},
        props: {
            nodeType: {
                require: true,
                type: String
            }
        },
        data() {
            return {
                nodeInfo: {
                    nodeId: '',
                    nodeName: '',
                    nodeDescribe: '',
                }
            }
        },
        activated() {
            console.log(`我进了activated：` + this.nodeType)
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../css/attrConfig/attrpanel";
</style>
