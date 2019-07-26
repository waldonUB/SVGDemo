'use strict'
import { getUUID, getInitBpmn } from '../common/util'
import store from '../../store/index'
import vm from './variable/variable'

/* --------------监听事件开始-------------- */
// 鼠标弹起事件

// 鼠标按下事件

/**
 * 鼠标在body按下事件
 */

// 鼠标移动事件
/* --------------监听事件结束-------------- */

/* --------------判断元素位置开始-------------- */

/* --------------判断元素位置结束-------------- */

function initNodes () {
  vm.nodes = document.getElementsByClassName('b-node') // 获取的所有流程节点
  vm.headerNode = document.getElementById('headerNode') // 头部容器
  vm.toolBox = document.getElementById('toolBox')// 左边工具栏
  vm.center = document.getElementById('center')// 画布的wrapper
  vm.designArea = document.getElementById('designArea') // 流程设计画布
  vm.collideLineX = document.getElementById('collideLineX') // SVG节点相交的X轴的线
  vm.collideLineY = document.getElementById('collideLineY') // SVG节点相交的Y轴的线
  vm.dragShape = document.getElementById('dragShape') // 移动SVG时复制的drag元素
  // 监听事件集合开始
  document.body.addEventListener('mousemove', bodyMove)
  document.body.addEventListener('mouseup', bodyMouseup, false)
  document.body.addEventListener('mousedown', bodyMouseDown)
  vm.center.addEventListener('mousemove', designAreaMove)
  vm.center.addEventListener('mousedown', designAreaDown)
  // 监听头部鼠标移进事件
  vm.headerNode.addEventListener('mouseover', function () {
    if (vm.svgNode) { // 防止从头部移除window窗口的监听范围
      vm.svgNode = null
    }
  })
  for (const node of vm.nodes) {
    node.addEventListener('mousedown', function (e) {
      e.preventDefault() // 阻止默认事件
      vm.selectNode = node.cloneNode(true)
      vm.selectNode.style.position = 'fixed'
      vm.selectNode.style.listStyle = 'none'
      vm.selectNode.style.border = '2px solid rgba(131, 208, 242, 1)'
      vm.selectNode.style.backgroundColor = 'rgba(131, 208, 242, 0.2)'
      vm.selectNode.style.borderRadius = '4px'
      vm.selectNode.style.padding = '4px 8px'
      vm.selectNode.style.left = e.clientX
      vm.selectNode.style.top = e.clientY
      document.body.style.overflow = 'hidden'
      document.body.appendChild(vm.selectNode)
    })
  }
  vm.processInfo = {
    id: getUUID(),
    type: 'process'
  }
  store.commit('changeCurrent', vm.processInfo)
  // 初始化单例中的异步返回
  getInitBpmn()
}

// 用事件代理的方法代替多个绑定事件
// vm.toolBox.addEventListener('mousedown', function (e) {
//     if (e.target.nodeName.toLowerCase() === 'li') {
//         vm.selectNode = e.target.cloneNode(true)
//     } else if(e.target.nodeName.toLowerCase() === 'span') {
//         可以获取parent的node，考虑到各个浏览器属性名不一样，暂时不用
//         vm.selectNode = e.target.cloneNode(true)
//     } else if(e.target.nodeName.toLowerCase() === 'img') {
//         vm.selectNode = e.target.cloneNode(true)
//     }
//     e.preventDefault() // 阻止默认事件
//     initvm.selectNode()
// })
// 以坐标计算的方式代替绑定移入移除
// vm.designArea.addEventListener('mouseover', function () {
//     vm.isInDesignArea = true
// })
// vm.designArea.addEventListener('mouseout', function () {
//     vm.isInDesignArea = false
// })

/**
 * 根据传入的流程id和坐标创建对应svg实例
 * */
function processNodeFactory (id, x, y) {
  let node
  switch (id) {
    case 'startEvent':
      node = createStartEvent(x, y)
      break
    case 'endEvent':
      node = createEndEvent(x, y)
      break
    case 'userTask':
      node = createRect(x, y)
  }
  node.addEventListener('mousedown', svgDown)
  // node.addEventListener('mouseup', designAreaUp, false)
  return node
}

/**
 * 创建开始节点
 * */
function createStartEvent (x, y) {
  const startEvent = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
  startEvent.setAttribute('cx', x)
  startEvent.setAttribute('cy', y)
  startEvent.setAttribute('r', '20')
  startEvent.style.stroke = 'rgba(88, 88, 88, 1)'
  startEvent.style.fill = 'transparent' // 这个属性为none时的时候，点不到svg元素中心
  // startEvent.style.pointerEvents = 'pointer'
  return startEvent
}

/**
 * 创建结束节点
 * */
function createEndEvent (x, y) {
  const endEvent = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
  endEvent.setAttribute('cx', x)
  endEvent.setAttribute('cy', y)
  endEvent.setAttribute('r', '20')
  endEvent.style.stroke = 'rgba(88, 88, 88, 1)'
  endEvent.style.fill = 'transparent'
  endEvent.style.strokeWidth = '4px'
  return endEvent
}

/**
 * 创建用户任务图
 * */
function createRect (x, y) {
  const userRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  userRect.setAttribute('x', x)
  userRect.setAttribute('y', y)
  userRect.setAttribute('rx', '10')
  userRect.setAttribute('width', '120')
  userRect.setAttribute('height', '80')
  userRect.style.stroke = 'rgba(88, 88, 88, 1)'
  userRect.style.fill = 'transparent'
  userRect.style.borderRadius = '4px'
  return userRect
}

/**
 * 鼠标按下svg节点
 * */
function svgDown (e) {
  vm.isDrop = false
  vm.currentX = e.clientX - vm.toolBox.offsetWidth
  vm.currentY = e.clientY - vm.headerNode.offsetHeight
  vm.svgNode = e.target
  const nodeInfo = vm.svgNode.getBBox()
  vm.currentXYInShape = {
    x: vm.currentX - nodeInfo.x,
    y: vm.currentY - nodeInfo.y
  }
  startDragShape(nodeInfo)
  // 添加节点操作栏
  vm.toolBar = getToolBar(nodeInfo)
  vm.center.appendChild(vm.toolBar)
  store.commit('changeCurrent', getCurrentNodeInfo(vm.svgNode))
  // 可以改变，并且在组件内监听到，但是vuex无法追踪这种变化
  // store.state.currentNodeInfo = getCurrentNodeInfo(vm.svgNode)
}
/**
 * 按下svg节点时，复制的移动元素
 * */
function startDragShape (nodeInfo) {
  vm.dragShape.style.display = 'block' // 减少重排次数
  vm.dragShape.style.width = nodeInfo.width + vm.STROKE_WIDTH + 'px'
  vm.dragShape.style.height = nodeInfo.height + vm.STROKE_WIDTH + 'px'
  vm.dragShape.style.left = nodeInfo.x - vm.STROKE_WIDTH + 'px'
  vm.dragShape.style.top = nodeInfo.y - vm.STROKE_WIDTH + 'px'
}
/**
 * 鼠标在画布上移动
 * */
var designAreaMove = (function () {
  let flag = true
  return function (e) {
    if (vm.svgNode && flag) { // 避免定义不必要的定时器
      flag = false
      setTimeout(function () { // 节流用的
        vm.currentX = e.clientX - vm.toolBox.offsetWidth
        vm.currentY = e.clientY - vm.headerNode.offsetHeight
        if (vm.svgNode && !vm.isDrop) {
          // collideComputed()
          // setSvgNodePosition()
          dragover()
        } else if (vm.svgNode && vm.isArrowDown) {
          vm.dottedLine.setAttribute('x2', vm.currentX)
          vm.dottedLine.setAttribute('y2', vm.currentY)
          if (!vm.dottedLine.parentNode) {
            vm.designArea.appendChild(vm.dottedLine)
          }
        }
        flag = true
      }, 20)
    }
  }
})()

/**
 * 在画布上鼠标按下
 * */
function designAreaDown (e) {
  // let isInLi = isMouseupInLi(e)
  // let isInSvg = isMouseupInSvg(e)
  // 弹起位置不在svg元素和工具栏内时，清除工具栏（这个留着点击空白区域的时候情况）
  // if (vm.toolBar && vm.toolBar.parentNode && !isInLi && !isInSvg) {
  //     vm.toolBar.parentNode.removeChild(vm.toolBar)
  // }
  // 弹起位置在画布中并且不再SVG元素和工具栏内，属性栏信息变回当前流程（这个留着点击空白区域的时候情况）
  // if (vm.isInDesignArea && !isInLi && !isInSvg) {
  //     // 设置当前流程信息
  //     store.commit('changeCurrent', vm.processInfo)
  // }
}
/**
 * 画布内节点相交线操作
 * */
function collideComputed () {
  // 画布中除去自身的svg节点，用来做相交计算
  // let otherSvgNodesInfo = vm.svgNodesInfo.filter(item => item.id !== vm.svgNode.id)
  vm.svgNodesInfo = vm.svgNodesInfo.filter(item => item.id !== vm.svgNode.id)
  vm.collideNodeY = vm.svgNodesInfo.find(item => {
    if (Math.abs(item.center.x - vm.currentX) < vm.D_VALUE) {
      return true
    }
  })
  if (vm.collideNodeY) {
    vm.collideLineY.style.left = vm.collideNodeY.center.x + 'px'
    vm.collideLineY.style.display = 'block'
  } else {
    vm.collideLineY.style.display = 'none'
  }
  vm.collideNodeX = vm.svgNodesInfo.find(item => {
    if (Math.abs(item.center.y - vm.currentY) < vm.D_VALUE) {
      return true
    }
  })
  if (vm.collideNodeX) {
    vm.collideLineX.style.top = vm.collideNodeX.center.y + 'px'
    vm.collideLineX.style.display = 'block'
  } else {
    vm.collideLineX.style.display = 'none'
  }
}

/**
 * 移动时，设置拷贝节点的坐标
 * */
function dragover () {
  vm.dragShape.style.left = vm.currentX - vm.currentXYInShape.x - vm.STROKE_WIDTH + 'px'
  vm.dragShape.style.top = vm.currentY - vm.currentXYInShape.y - vm.STROKE_WIDTH + 'px'
}
/**
 * 在移动或弹起时，设置流程节点位置
 * */
function setSvgNodePosition (x, y) {
  vm.currentX = x || vm.currentX
  vm.currentY = y || vm.currentY
  // let nodeInfo = vm.svgNode.getBBox()
  switch (vm.svgNode.nodeName) {
    case 'circle':
      vm.svgNode.setAttribute('cx', Number(vm.currentX) + Number(vm.svgNode.getAttribute('r')) + vm.STROKE_WIDTH)
      vm.svgNode.setAttribute('cy', Number(vm.currentY) + Number(vm.svgNode.getAttribute('r')) + vm.STROKE_WIDTH)
      break
    case 'rect':
      vm.svgNode.setAttribute('x', Number(vm.currentX) + vm.STROKE_WIDTH)
      vm.svgNode.setAttribute('y', Number(vm.currentY) + vm.STROKE_WIDTH)
      break
  }
  // const currentNodeId = vm.svgNode.getAttribute("id")
  const currentSvgNodeInfo = getSvgNodeInfo(vm.svgNode.getBBox(), vm.svgNode.id)
  const index = vm.svgNodesInfo.findIndex(item => item.id === vm.svgNode.id)
  vm.svgNodesInfo.splice(index, 1, currentSvgNodeInfo)
  // vm.svgNodesInfo.push(currentSvgNodeInfo)
  console.log(vm.svgNodesInfo)
}

/**
 * 创建跟随svg元素移动的单例工具栏
 * */
const getToolBar = (function () {
  if (!vm.toolBar) {
    vm.toolBar = document.createElement('div')
    const arrow = document.createElement('li')
    const trash = document.createElement('li')
    arrow.setAttribute('class', 'iconfont icon-config iconarrow_')
    trash.setAttribute('class', 'iconfont icon-config icontrash')
    vm.toolBar.style.width = '100px'
    vm.toolBar.style.height = '30px'
    vm.toolBar.style.position = 'absolute'
    vm.toolBar.appendChild(arrow)
    vm.toolBar.appendChild(trash)
    trash.addEventListener('click', trashFn, false)
    arrow.addEventListener('mousedown', arrowDownFn)
  }
  return function (nodeInfo) {
    vm.toolBar.style.left = (nodeInfo.x + nodeInfo.width) + 'px'
    vm.toolBar.style.top = (nodeInfo.y - 30) + 'px'
    return vm.toolBar
  }
}())

/**
 * 判断是否在svg元素内弹起
 * */
function isMouseupInSvg (e) {
  const nodeName = e.target.nodeName
  switch (nodeName) {
    case 'circle':
    case 'rect':
    case 'path':
      return true
    default:
      return false
  }
}

/**
 * 判断是否在工具栏的元素内，默认为li
 * */
function isMouseupInLi (e) {
  const nodeName = e.target.nodeName.toLowerCase()
  return nodeName === 'li'
}

/**
 * 返回svg节点各个方位坐标的点
 * */
function getSvgNodeInfo (currentNodeBBox, nodeInfoId) {
  return {
    id: nodeInfoId,
    top: {
      x: currentNodeBBox.x + currentNodeBBox.width / 2,
      y: currentNodeBBox.y
    },
    right: {
      x: currentNodeBBox.x + currentNodeBBox.width,
      y: currentNodeBBox.y + currentNodeBBox.height / 2
    },
    bottom: {
      x: currentNodeBBox.x + currentNodeBBox.width / 2,
      y: currentNodeBBox.y + currentNodeBBox.height
    },
    left: {
      x: currentNodeBBox.x,
      y: currentNodeBBox.y + currentNodeBBox.height / 2
    },
    center: {
      x: currentNodeBBox.x + currentNodeBBox.width / 2,
      y: currentNodeBBox.y + currentNodeBBox.height / 2
    },
    lines: [{
      direction: '',
      lineId: ''
    }]
  }
}

/**
 * 获取当前节点的信息
 * */
function getCurrentNodeInfo (currentNode) {
  const type = currentNode.id.split('-')[0]
  const id = currentNode.id.split('-')[1]
  return { id, type }
}

/* -------------------------- svg节点工具栏的操作 -------------------------- */
/**
 * 工具栏的trash事件,从画布上移除当前svg节点，并删除引用
 * */
function trashFn (e) {
  if (vm.svgNode && vm.svgNode.parentNode) {
    vm.svgNode.parentNode.removeChild(vm.svgNode)
    vm.svgNode = null
  }
  const currentToolBar = e.target.parentNode
  const currentArea = e.target.parentNode.parentNode
  if (currentToolBar && currentArea) {
    currentArea.removeChild(currentToolBar)
  }
  vm.dragShape.style.display = 'none'
}

export default { initNodes }
