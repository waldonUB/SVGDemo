/**
 * 用来提示的指令
 * */
export default {
    bind(el, binding, vNode) {
        let position = el.style.position
        if (!position || position === 'static') {
            el.style.position = 'relative'
        }
        el.classList.add('tip')
        el.setAttribute('data-tip', binding.value)
    },
    inserted() {},
    update() {},
    componentUpdated() {},
    unbind() {}
}
