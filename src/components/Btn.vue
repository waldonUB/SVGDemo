<template>
    <button :class="btnType">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: "Btn",
        props: {
            btnType: {
                require: true,
                type: String,
                default: 'success'
            }
        },
        data() {
            return {}
        }
    }
</script>

<style scoped>
    .success {
        background-color: rgb(43, 153, 57);
    }
    .warning {
        background-color: rgb(222, 73, 67);
    }
</style>
