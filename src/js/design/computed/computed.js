import vm from './variable/variable'

/**
 * 是否在流程画布内
 * 以坐标计算的方式监听元素放的位置，避免绑定多个移入移除事件
 * */
const isInDesignAreaFn = function (e) {
  const startX = vm.toolBox.offsetWidth
  const startY = vm.headerNode.offsetHeight
  const endX = vm.toolBox.offsetWidth + vm.designArea.clientWidth
  const endY = vm.headerNode.offsetHeight + vm.designArea.clientHeight
  return e.clientX > startX && e.clientY > startY && e.clientX < endX && e.clientY < endY
}

export { isInDesignAreaFn }
