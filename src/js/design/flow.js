'use strict'
import { getUUID, getInitBpmn } from '../common/util'
import store from '../../store/index'

let nodes // 获取的所有流程节点
let headerNode // 头部容器
let toolBox // 左边工具栏
let center // 画布的wrapper
let designArea // 流程设计画布
let collideLineX // SVG节点相交的X轴的线
let collideLineY // SVG节点相交的Y轴的线
let collideNodeX // SVG中在X轴相交的节点
let collideNodeY // SVG中在Y轴相交的节点
const D_VALUE = 10 // 相交允许的差值
const STROKE_WIDTH = 2 // 不同分辨率svg元素stroke的宽度可能会呈现不同像素
let currentX // 鼠标当前在画布内的横坐标
let currentY // 鼠标当前在画布内的横坐标
let selectNode // 工具栏中被选中的节点
let isInDesignArea = false // 是否放到流程画布中
let toolBar // 点击画布中流程节点显示的工具栏
let dragShape // 按下svg元素时，复制的元素
let currentXYInShape // 当前鼠标在复制元素内的位置，先看看能不能用drag实现？尝试过drag，目前解决不了的是他鼠标下面有个小矩形的显示
let isDrop // drag元素是否被放下
/* -------------------------- 流程内的svg节点相关 -------------------------- */
let processInfo // 设置当前流程信息
let svgNode
let isArrowDown = false // 判断箭头是否被按下
let dottedLine // 箭头按下的虚线
let svgNodesInfo = [] // 画布上所有svg节点的信息数组
let startNodeInfo = {} // 连线开始的svg节点的信息
let endNodeInfo = {} // 连线结束的svg节点的信息
const linesInfo = [] // 连接线信息集合

/* --------------监听事件开始-------------- */
// 鼠标弹起事件

/**
 * body内的鼠标弹起事件
 * */
function bodyMouseup (e) {
  // 从左边工具栏拖拽进画布
  const x = e.clientX - toolBox.offsetWidth
  const y = e.clientY - headerNode.offsetHeight
  getOffsetXY(e)
  if (selectNode) {
    document.body.removeChild(selectNode)
    if (isInDesignArea) {
      const id = selectNode.id
      const node = processNodeFactory(id, x, y)
      const nodeInfoId = id + '-' + getUUID()
      node.setAttribute('id', nodeInfoId)
      designArea.appendChild(node)
      svgNodesInfo.push(getSvgNodeInfo(node.getBBox(), nodeInfoId))
    }
    selectNode = null
    document.body.style.overflow = 'auto'
  }
  // 有元素被选中并且被放下时
  if (!isDrop && svgNode) {
    isDrop = true
    const dragShapeX = dragShape.style.left.slice(0, -2)
    const dragShapeY = dragShape.style.top.slice(0, -2)
    setSvgNodePosition(dragShapeX, dragShapeY)
    // 添加节点操作栏
    const nodeInfo = svgNode.getBBox()
    toolBar = getToolBar(nodeInfo)
    center.appendChild(toolBar)
  }
  const isInSvg = isMouseupInSvg(e)
  // 鼠标弹起时，箭头按钮也被按下
  if (isArrowDown) {
    if (isInSvg) {
      const nodeInfoId = e.target.getAttribute('id')
      endNodeInfo = svgNodesInfo.find(item => item.id === nodeInfoId)
      const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
      const points = startNodeInfo['right']['x'] + ',' + startNodeInfo['right']['y'] + ' ' +
                endNodeInfo['left']['x'] + ',' + endNodeInfo['left']['y']
      polyline.setAttribute('stroke', '#000')
      polyline.setAttribute('marker-end', 'url(#myArrow)')
      polyline.setAttribute('points', points)
      designArea.appendChild(polyline)
      // let lineInfo = line.getBBox()
      linesInfo.push(polyline)
      startNodeInfo = {}
      endNodeInfo = {}
      svgNode = e.target
      // 添加节点操作栏
      const nodeInfo = svgNode.getBBox()
      toolBar = getToolBar(nodeInfo)
      center.appendChild(toolBar)
      // 添加拖拽图形
      dragShape.style.left = nodeInfo.x - STROKE_WIDTH + 'px'
      dragShape.style.top = nodeInfo.y - STROKE_WIDTH + 'px'
    }
    if (dottedLine && dottedLine.parentNode) {
      dottedLine.parentNode.removeChild(dottedLine)
    }
    isArrowDown = false
  } else {
    collideLineX.style.display = 'none'
    collideLineY.style.display = 'none'
    if (collideNodeX) {
      // 设置节点的纵坐标值
      setSvgNodePosition(currentX, collideNodeX.center.y)
      // 弹起时，再去除一次自身的值
      svgNodesInfo = svgNodesInfo.filter(item => item.id !== svgNode.id)
    }
    if (collideNodeY) {
      // 设置节点的横坐标值
      setSvgNodePosition(collideNodeY.center.x, currentY)
      // 弹起时，再去除一次自身的值
      svgNodesInfo = svgNodesInfo.filter(item => item.id !== svgNode.id)
    }
  }
}
// 鼠标按下事件

/**
 * 鼠标在body按下事件
 */
function bodyMouseDown (e) {
  const isInLi = isMouseupInLi(e)
  const isInSvg = isMouseupInSvg(e)
  // 按下位置在画布中并且不再SVG元素和工具栏内，属性栏信息变回当前流程（这个留着点击空白区域的时候情况）
  if (isInDesignArea && !isInLi && !isInSvg) {
    // 设置当前流程信息
    store.commit('changeCurrent', processInfo)
  }
  if (toolBar && toolBar.parentNode && !isInLi && !isInSvg) {
    toolBar.parentNode.removeChild(toolBar)
  }
}

/**
 * 工具栏arrow按下的触发事件
 * */
function arrowDownFn () {
  const nodeInfo = svgNode.getBBox()
  const nodeInfoId = svgNode.getAttribute('id')
  startNodeInfo = svgNodesInfo.find(item => item.id === nodeInfoId)
  isArrowDown = true
  if (!dottedLine) {
    dottedLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    dottedLine.setAttribute('stroke', '#000')
    dottedLine.setAttribute('stroke-dasharray', '1 2')
  }
  const nodeCenterX = nodeInfo.x + (nodeInfo.width / 2)
  const nodeCenterY = nodeInfo.y + (nodeInfo.height / 2)
  dottedLine.setAttribute('x1', nodeCenterX.toString())
  dottedLine.setAttribute('y1', nodeCenterY.toString())
}
// 鼠标移动事件
/* --------------监听事件结束-------------- */

/* --------------判断元素位置开始-------------- */

/* --------------判断元素位置结束-------------- */

function initNodes () {
  nodes = document.getElementsByClassName('b-node') // 获取的所有流程节点
  headerNode = document.getElementById('headerNode') // 头部容器
  toolBox = document.getElementById('toolBox')// 左边工具栏
  center = document.getElementById('center')// 画布的wrapper
  designArea = document.getElementById('designArea') // 流程设计画布
  collideLineX = document.getElementById('collideLineX') // SVG节点相交的X轴的线
  collideLineY = document.getElementById('collideLineY') // SVG节点相交的Y轴的线
  dragShape = document.getElementById('dragShape') // 移动SVG时复制的drag元素
  // 监听事件集合开始
  document.body.addEventListener('mousemove', bodyMove)
  document.body.addEventListener('mouseup', bodyMouseup, false)
  document.body.addEventListener('mousedown', bodyMouseDown)
  center.addEventListener('mousemove', designAreaMove)
  center.addEventListener('mousedown', designAreaDown)
  // 监听头部鼠标移进事件
  headerNode.addEventListener('mouseover', function () {
    if (svgNode) { // 防止从头部移除window窗口的监听范围
      svgNode = null
    }
  })
  for (const node of nodes) {
    node.addEventListener('mousedown', function (e) {
      e.preventDefault() // 阻止默认事件
      selectNode = node.cloneNode(true)
      selectNode.style.position = 'fixed'
      selectNode.style.listStyle = 'none'
      selectNode.style.border = '2px solid rgba(131, 208, 242, 1)'
      selectNode.style.backgroundColor = 'rgba(131, 208, 242, 0.2)'
      selectNode.style.borderRadius = '4px'
      selectNode.style.padding = '4px 8px'
      selectNode.style.left = e.clientX
      selectNode.style.top = e.clientY
      document.body.style.overflow = 'hidden'
      document.body.appendChild(selectNode)
    })
  }
  processInfo = {
    id: getUUID(),
    type: 'process'
  }
  store.commit('changeCurrent', processInfo)
  // 初始化单例中的异步返回
  getInitBpmn()
}

// 用事件代理的方法代替多个绑定事件
// toolBox.addEventListener('mousedown', function (e) {
//     if (e.target.nodeName.toLowerCase() === 'li') {
//         selectNode = e.target.cloneNode(true)
//     } else if(e.target.nodeName.toLowerCase() === 'span') {
//         可以获取parent的node，考虑到各个浏览器属性名不一样，暂时不用
//         selectNode = e.target.cloneNode(true)
//     } else if(e.target.nodeName.toLowerCase() === 'img') {
//         selectNode = e.target.cloneNode(true)
//     }
//     e.preventDefault() // 阻止默认事件
//     initSelectNode()
// })
// 以坐标计算的方式代替绑定移入移除
// designArea.addEventListener('mouseover', function () {
//     isInDesignArea = true
// })
// designArea.addEventListener('mouseout', function () {
//     isInDesignArea = false
// })

/**
 * 以坐标计算的方式监听元素放的位置，避免绑定多个移入移除事件
 * */
function getOffsetXY (e) {
  const startX = toolBox.offsetWidth
  const startY = headerNode.offsetHeight
  const endX = toolBox.offsetWidth + designArea.clientWidth
  const endY = headerNode.offsetHeight + designArea.clientHeight
  isInDesignArea = e.clientX > startX && e.clientY > startY && e.clientX < endX && e.clientY < endY
}

/**
 * 放置左边工具栏选择的元素
 * */
var bodyMove = (function () {
  let flag = true
  return function (e) {
    if (flag) {
      flag = false
      setTimeout(function () {
        if (selectNode) {
          selectNode.style.left = e.clientX + 'px'
          selectNode.style.top = e.clientY + 'px'
        }
        flag = true
      }, 15)
    }
  }
})()

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
  isDrop = false
  currentX = e.clientX - toolBox.offsetWidth
  currentY = e.clientY - headerNode.offsetHeight
  svgNode = e.target
  const nodeInfo = svgNode.getBBox()
  currentXYInShape = {
    x: currentX - nodeInfo.x,
    y: currentY - nodeInfo.y
  }
  startDragShape(nodeInfo)
  // 添加节点操作栏
  toolBar = getToolBar(nodeInfo)
  center.appendChild(toolBar)
  store.commit('changeCurrent', getCurrentNodeInfo(svgNode))
  // 可以改变，并且在组件内监听到，但是vuex无法追踪这种变化
  // store.state.currentNodeInfo = getCurrentNodeInfo(svgNode)
}
/**
 * 按下svg节点时，复制的移动元素
 * */
function startDragShape (nodeInfo) {
  dragShape.style.display = 'block' // 减少重排次数
  dragShape.style.width = nodeInfo.width + STROKE_WIDTH + 'px'
  dragShape.style.height = nodeInfo.height + STROKE_WIDTH + 'px'
  dragShape.style.left = nodeInfo.x - STROKE_WIDTH + 'px'
  dragShape.style.top = nodeInfo.y - STROKE_WIDTH + 'px'
}
/**
 * 鼠标在画布上移动
 * */
var designAreaMove = (function () {
  let flag = true
  return function (e) {
    if (svgNode && flag) { // 避免定义不必要的定时器
      flag = false
      setTimeout(function () { // 节流用的
        currentX = e.clientX - toolBox.offsetWidth
        currentY = e.clientY - headerNode.offsetHeight
        if (svgNode && !isDrop) {
          // collideComputed()
          // setSvgNodePosition()
          dragover()
        } else if (svgNode && isArrowDown) {
          dottedLine.setAttribute('x2', currentX)
          dottedLine.setAttribute('y2', currentY)
          if (!dottedLine.parentNode) {
            designArea.appendChild(dottedLine)
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
  // if (toolBar && toolBar.parentNode && !isInLi && !isInSvg) {
  //     toolBar.parentNode.removeChild(toolBar)
  // }
  // 弹起位置在画布中并且不再SVG元素和工具栏内，属性栏信息变回当前流程（这个留着点击空白区域的时候情况）
  // if (isInDesignArea && !isInLi && !isInSvg) {
  //     // 设置当前流程信息
  //     store.commit('changeCurrent', processInfo)
  // }
}
/**
 * 画布内节点相交线操作
 * */
function collideComputed () {
  // 画布中除去自身的svg节点，用来做相交计算
  // let otherSvgNodesInfo = svgNodesInfo.filter(item => item.id !== svgNode.id)
  svgNodesInfo = svgNodesInfo.filter(item => item.id !== svgNode.id)
  collideNodeY = svgNodesInfo.find(item => {
    if (Math.abs(item.center.x - currentX) < D_VALUE) {
      return true
    }
  })
  if (collideNodeY) {
    collideLineY.style.left = collideNodeY.center.x + 'px'
    collideLineY.style.display = 'block'
  } else {
    collideLineY.style.display = 'none'
  }
  collideNodeX = svgNodesInfo.find(item => {
    if (Math.abs(item.center.y - currentY) < D_VALUE) {
      return true
    }
  })
  if (collideNodeX) {
    collideLineX.style.top = collideNodeX.center.y + 'px'
    collideLineX.style.display = 'block'
  } else {
    collideLineX.style.display = 'none'
  }
}

/**
 * 移动时，设置拷贝节点的坐标
 * */
function dragover () {
  dragShape.style.left = currentX - currentXYInShape.x - STROKE_WIDTH + 'px'
  dragShape.style.top = currentY - currentXYInShape.y - STROKE_WIDTH + 'px'
}
/**
 * 在移动或弹起时，设置流程节点位置
 * */
function setSvgNodePosition (x, y) {
  currentX = x || currentX
  currentY = y || currentY
  // let nodeInfo = svgNode.getBBox()
  switch (svgNode.nodeName) {
    case 'circle':
      svgNode.setAttribute('cx', Number(currentX) + Number(svgNode.getAttribute('r')) + STROKE_WIDTH)
      svgNode.setAttribute('cy', Number(currentY) + Number(svgNode.getAttribute('r')) + STROKE_WIDTH)
      break
    case 'rect':
      svgNode.setAttribute('x', Number(currentX) + STROKE_WIDTH)
      svgNode.setAttribute('y', Number(currentY) + STROKE_WIDTH)
      break
  }
  // const currentNodeId = svgNode.getAttribute("id")
  const currentSvgNodeInfo = getSvgNodeInfo(svgNode.getBBox(), svgNode.id)
  const index = svgNodesInfo.findIndex(item => item.id === svgNode.id)
  svgNodesInfo.splice(index, 1, currentSvgNodeInfo)
  // svgNodesInfo.push(currentSvgNodeInfo)
  console.log(svgNodesInfo)
}

/**
 * 创建跟随svg元素移动的单例工具栏
 * */
const getToolBar = (function () {
  let toolBar
  if (!toolBar) {
    toolBar = document.createElement('div')
    const arrow = document.createElement('li')
    const trash = document.createElement('li')
    arrow.setAttribute('class', 'iconfont icon-config iconarrow_')
    trash.setAttribute('class', 'iconfont icon-config icontrash')
    toolBar.style.width = '100px'
    toolBar.style.height = '30px'
    toolBar.style.position = 'absolute'
    toolBar.appendChild(arrow)
    toolBar.appendChild(trash)
    trash.addEventListener('click', trashFn, false)
    arrow.addEventListener('mousedown', arrowDownFn)
  }
  return function (nodeInfo) {
    toolBar.style.left = (nodeInfo.x + nodeInfo.width) + 'px'
    toolBar.style.top = (nodeInfo.y - 30) + 'px'
    return toolBar
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
  if (svgNode && svgNode.parentNode) {
    svgNode.parentNode.removeChild(svgNode)
    svgNode = null
  }
  const currentToolBar = e.target.parentNode
  const currentArea = e.target.parentNode.parentNode
  if (currentToolBar && currentArea) {
    currentArea.removeChild(currentToolBar)
  }
  dragShape.style.display = 'none'
}

export default { initNodes }
