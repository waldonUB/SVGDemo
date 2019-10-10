var normalVal = 1
var normalObj = {
    child: 1
}
var showCurrentVal = function () {
    console.log(`lib2.js中normalVal的值为${normalVal}`)
    console.log(`lib2.js中normalObj.child的值为${normalObj.child}`)
}
export {
    normalVal,
    normalObj,
    showCurrentVal
}
