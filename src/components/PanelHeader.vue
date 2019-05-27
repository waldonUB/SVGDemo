<template>
<div class="panel-header">
    <h4 class="title-text">
        <slot name="headName"></slot>
    </h4>
</div>
</template>

<script>
    export default {
        name: "PanelHeader"
    }
</script>

<style lang="scss" scoped>
@import "../css/base.scss";
    .panel-header{
        width: 100%;
        height: 5%;
        position: relative;
        background-color: rgba(237, 237, 237, 0.8);
        box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
    }
    .title-text{
        color: rgb(70, 94, 105);
        font-weight: bold;
        position: absolute;
        top: 50%;
        transform: translate(20%, -50%);
    }
</style>
