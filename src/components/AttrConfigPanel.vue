<!--属性面板的各个panel-->
<template>
    <div class="container">
        <div class="panel-header">
            <slot name="attrName"></slot>
            <i class="iconfont iconxiala1 icon-panel-header" :class="foldState" @click="toggleFold"></i>
        </div>
        <!--循环列表中DOM结构变化比较复杂，在子组件控制panelBody-->
        <div class="panel-body">
            <div class="input-group" v-if="attrInfo.code === '01'">
                <div class="input-form">
                    <label for="processName">名称</label>
                    <input class="attr-input" id="processName" type="text" v-model="processInfo.processName">
                </div>
                <div class="input-form">
                    <label for="describe">描述</label>
                    <input class="attr-input" id="describe" type="text" v-model="processInfo.describe">
                </div>
            </div>

            <div class="input-group" v-if="attrInfo.code === '02'">
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
            <div v-else-if="attrInfo.code === '0201'">
                <button class="success">设置所有表单</button>
            </div>
            <div v-else-if="attrInfo.code === '0202'">
                <button class="success">设置所有节点人员</button>
            </div>
            <div v-else-if="attrInfo.code === '0203'">
                <button class="success">设置所有节点按钮</button>
            </div>
            <div v-else-if="attrInfo.code === '0204'">
                005
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AttrConfigPanel",
        props: {
            attrInfo: {
                require: true,
                type: Object
            }
        },
        data() {
            return {
                foldState: 'unfold',
                processInfo: {
                    processName: '',
                    describe: ''
                },
                nodeInfo: {
                    nodeId: '',
                    nodeName: '',
                    nodeDescribe: '',
                }
            }
        },
        watch: {
            'processInfo.processName'(newVal) {
                this.$emit('editProcessName', newVal)
            },
            'nodeInfo.nodeName'(newVal) {
                this.$emit('editNodeName', newVal)
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
    @import "../css/base.scss";
    .panel-header{
        @include attr-panel-header;
        .icon-panel-header{
            position: absolute;
            right: 20px;
            font-size: 20px;
            cursor: pointer;
        }
        .fold{
            animation: to-fold 0.5s;
            transform: rotate(0.25turn);
        }
        .unfold{
            animation: to-unfold 0.5s;
            transform: rotate(0);
        }
    }
    .panel-body{
        min-height: 80px;
        background: rgba(209, 222, 239, 0.1);
        .input-group {
            @include to-flex(column);
            height: 100%;
            align-items: center;
            .input-form {
                margin-top: 10px;
                label {
                    display: inline-block;
                    width: 30px;
                    margin: 0 5px;
                    text-align: center;
                    color: rgb(52, 73, 94);
                }
                .attr-input {
                    @include attr-input;
                }
            }
            &:last-child {
                margin-bottom: 10px;
            }
        }
    }
    @keyframes to-fold {
        0%   {transform: rotate(0);}
        100% {transform: rotate(0.25turn);}
    }
    @keyframes to-unfold {
        0%   {transform: rotate(0.25turn);}
        100% {transform: rotate(0);}
    }
</style>
