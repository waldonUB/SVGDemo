export default {
  nodes: null, // 获取的所有流程节点
  headerNode: null, // 头部容器
  toolBox: null, // 左边工具栏
  center: null, // 画布的wrapper
  designArea: null, // 流程设计画布
  collideLineX: null, // SVG节点相交的X轴的线
  collideLineY: null, // SVG节点相交的Y轴的线
  collideNodeX: null, // SVG中在X轴相交的节点
  collideNodeY: null, // SVG中在Y轴相交的节点
  D_VALUE: 10, // 相交允许的差值
  STROKE_WIDTH: 2, // 不同分辨率svg元素stroke的宽度可能会呈现不同像素
  currentX: null, // 鼠标当前在画布内的横坐标
  currentY: null, // 鼠标当前在画布内的横坐标
  selectNode: null, // 工具栏中被选中的节点
  isInDesignArea: false, // 是否放到流程画布中
  toolBar: null, // 点击画布中流程节点显示的工具栏
  dragShape: null, // 按下svg元素时，复制的元素
  currentXYInShape: null, // 当前鼠标在复制元素内的位置，先看看能不能用drag实现？尝试过drag，目前解决不了的是他鼠标下面有个小矩形的显示
  isDrop: null, // drag元素是否被放下
  /* -------------------------- 流程内的svg节点相关 -------------------------- */
  processInfo: null, // 设置当前流程信息
  svgNode: null,
  isArrowDown: false, // 判断箭头是否被按下
  dottedLine: null, // 箭头按下的虚线
  svgNodesInfo: [], // 画布上所有svg节点的信息数组
  startNodeInfo: {}, // 连线开始的svg节点的信息
  endNodeInfo: {}, // 连线结束的svg节点的信息
  linesInfo: [] // 连接线信息集合
}
