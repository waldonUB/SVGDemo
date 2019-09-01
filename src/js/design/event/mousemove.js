import vm from '../variable/variable'

/**
 * 放置左边工具栏选择的元素
 * */
const bodyMoveFn = (function () {
  let flag = true
  return function (e) {
    if (flag) {
      flag = false
      setTimeout(function () {
        if (vm.selectNode) {
          vm.selectNode.style.left = e.clientX + 'px'
          vm.selectNode.style.top = e.clientY + 'px'
        }
        flag = true
      }, 15)
    }
  }
})()

export { bodyMoveFn }
