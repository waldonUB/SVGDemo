import vm from '../variable/variable'
import { getUUID } from '../../common/util'

export default {
  /**
   * body内的鼠标弹起事件
   * */
  bodyMouseup (e) {
  // 从左边工具栏拖拽进画布
    const x = e.clientX - vm.toolBox.offsetWidth
    const y = e.clientY - vm.headerNode.offsetHeight
    getOffsetXY(e)
    if (vm.selectNode) {
      document.body.removeChild(vm.selectNode)
      if (vm.isInDesignArea) {
        const id = vm.selectNode.id
        const node = processNodeFactory(id, x, y)
        const nodeInfoId = id + '-' + getUUID()
        node.setAttribute('id', nodeInfoId)
        vm.designArea.appendChild(node)
        vm.svgNodesInfo.push(getSvgNodeInfo(node.getBBox(), nodeInfoId))
      }
      vm.selectNode = null
      document.body.style.overflow = 'auto'
    }
    // 有元素被选中并且被放下时
    if (!vm.isDrop && vm.svgNode) {
      vm.isDrop = true
      const dragShapeX = vm.dragShape.style.left.slice(0, -2)
      const dragShapeY = vm.dragShape.style.top.slice(0, -2)
      setSvgNodePosition(dragShapeX, dragShapeY)
      // 添加节点操作栏
      const nodeInfo = vm.svgNode.getBBox()
      vm.toolBar = getToolBar(nodeInfo)
      vm.center.appendChild(vm.toolBar)
    }
    const isInSvg = isMouseupInSvg(e)
    // 鼠标弹起时，箭头按钮也被按下
    if (vm.isArrowDown) {
      if (isInSvg) {
        const nodeInfoId = e.target.getAttribute('id')
        vm.endNodeInfo = vm.svgNodesInfo.find(item => item.id === nodeInfoId)
        const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
        const points = vm.startNodeInfo['right']['x'] + ',' + vm.startNodeInfo['right']['y'] + ' ' +
                vm.endNodeInfo['left']['x'] + ',' + vm.endNodeInfo['left']['y']
        polyline.setAttribute('stroke', '#000')
        polyline.setAttribute('marker-end', 'url(#myArrow)')
        polyline.setAttribute('points', points)
        vm.designArea.appendChild(polyline)
        // let lineInfo = line.getBBox()
        vm.linesInfo.push(polyline)
        vm.startNodeInfo = {}
        vm.endNodeInfo = {}
        vm.svgNode = e.target
        // 添加节点操作栏
        const nodeInfo = vm.svgNode.getBBox()
        vm.toolBar = getToolBar(nodeInfo)
        vm.center.appendChild(vm.toolBar)
        // 添加拖拽图形
        vm.dragShape.style.left = nodeInfo.x - vm.STROKE_WIDTH + 'px'
        vm.dragShape.style.top = nodeInfo.y - vm.STROKE_WIDTH + 'px'
      }
      if (vm.dottedLine && vm.dottedLine.parentNode) {
        vm.dottedLine.parentNode.removeChild(vm.dottedLine)
      }
      vm.isArrowDown = false
    } else {
      vm.collideLineX.style.display = 'none'
      vm.collideLineY.style.display = 'none'
      if (vm.collideNodeX) {
      // 设置节点的纵坐标值
        setSvgNodePosition(vm.currentX, vm.collideNodeX.center.y)
        // 弹起时，再去除一次自身的值
        vm.svgNodesInfo = vm.svgNodesInfo.filter(item => item.id !== vm.svgNode.id)
      }
      if (vm.collideNodeY) {
      // 设置节点的横坐标值
        setSvgNodePosition(vm.collideNodeY.center.x, vm.currentY)
        // 弹起时，再去除一次自身的值
        vm.svgNodesInfo = vm.svgNodesInfo.filter(item => item.id !== vm.svgNode.id)
      }
    }
  }
}
