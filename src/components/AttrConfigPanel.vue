<template>
    <div class="container">
        <div class="panel-header">
            <slot name="attrName"></slot>
            <i class="iconfont iconxiala1 icon-panel-header" :class="foldState" @click="toggleFold"></i>
        </div>
        <div class="panel-body"></div>
    </div>
</template>

<script>
    export default {
        name: "AttrConfigPanel",
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
        min-height: 50px;
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
