<template>
    <div>
        <input type="text" v-model="state">
        {{$store.state.persistentTest}}
    </div>
</template>

<script>
  export default {
    name: "PersistentTest",
    data() {
      return {
        state: ''
      }
    },
    watch: {
      state (newVal) {
        this.$store.commit('persistentTest', newVal)
      }
    }
  }
</script>

<style scoped>

</style>
