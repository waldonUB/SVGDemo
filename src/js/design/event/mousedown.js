import vm from '../variable/variable'
// import { getUUID } from '../common/util'

const bodyMousedown = function (e) {
  const isInLi = isMouseupInLi(e)
  const isInSvg = isMouseupInSvg(e)
  // 按下位置在画布中并且不再SVG元素和工具栏内，属性栏信息变回当前流程（这个留着点击空白区域的时候情况）
  if (vm.isInDesignArea && !isInLi && !isInSvg) {
    // 设置当前流程信息
    $store.commit('changeCurrent', vm.processInfo)
  }
  if (vm.toolBar && vm.toolBar.parentNode && !isInLi && !isInSvg) {
    vm.toolBar.parentNode.removeChild(vm.toolBar)
  }
}

/**
 * 工具栏arrow按下的触发事件
 * */
const arrowDownFn = function () {
  const nodeInfo = vm.svgNode.getBBox()
  const nodeInfoId = vm.svgNode.getAttribute('id')
  vm.startNodeInfo = vm.svgNodesInfo.find(item => item.id === nodeInfoId)
  vm.isArrowDown = true
  if (!vm.dottedLine) {
    vm.dottedLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    vm.dottedLine.setAttribute('stroke', '#000')
    vm.dottedLine.setAttribute('stroke-dasharray', '1 2')
  }
  const nodeCenterX = nodeInfo.x + (nodeInfo.width / 2)
  const nodeCenterY = nodeInfo.y + (nodeInfo.height / 2)
  vm.dottedLine.setAttribute('x1', nodeCenterX.toString())
  vm.dottedLine.setAttribute('y1', nodeCenterY.toString())
}

export { bodyMousedown, arrowDownFn }
