<template>
  <div>
    <button @click="showMsg">export default</button>
  </div>
</template>

<script>
  import lib from './lib'
  import {normalVal, normalObj, showCurrentVal} from './lib2'
    export default {
        name: 'index',
        methods: {
            showMsg () {
                console.log(`export default中libA的值为：` + lib.libA)
                console.log(`export default中libC的值为：` + lib.libB.libC)
                lib.showCurrentVal()
                lib.libA = 666
                lib.libB.libC = 888
                lib.showCurrentVal()
                console.log(`export中normalVal的值为：` + normalVal)
                console.log(`export中normalObj.child的值为：` + normalObj.child)
                // normalVal = 'xxx' // 会报错，export不能修改非对象的值
                normalObj.child = 'xxx' // 对象的值也不建议修改
                showCurrentVal()
            }
        }
    }
</script>

<style scoped>

</style>
