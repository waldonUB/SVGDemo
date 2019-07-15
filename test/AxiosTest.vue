<template>
    <div>
        这里是axios测试
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AxiosTest',
  methods: {
    postTest () {
      axios.post('api/crossPostTest').then(result => {
        console.log(`返回值：` + result)
      })
    }
  },
  mounted () {
    this.postTest()
  }
}
</script>

<style scoped>

</style>
