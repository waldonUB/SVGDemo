var libA = 1
var libB = {
    libC: 3
}
var showCurrentVal = function () {
    console.log(`lib.js中libA的值为${libA}`)
    console.log(`lib.js中libC的值为${libB.libC}`)
}
export default {
    libA,
    libB,
    showCurrentVal
}
