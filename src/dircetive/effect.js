export default {
  bind: function (el, binding, vnode) {
    vnode._start = function (e) {
      setTimeout(function () {
        el.classList.add('click-effect')
      }, 0)
    }
    vnode._end = function (e) {
      setTimeout(function () {
        el.classList.remove('click-effect')
      }, 0)
    }
    el.addEventListener('mousedown', vnode._start, true)
    el.addEventListener('mouseup', vnode._end, true)
    el.addEventListener('touchstart', vnode._start, true)
    el.addEventListener('touchend', vnode._end, true)
  },
  unbind: function (el, binding, vnode) {
    el.removeEventListener('mousedown', vnode._start)
    el.removeEventListener('mouseup', vnode._end)
    el.removeEventListener('touchstart', vnode._start)
    el.removeEventListener('touchend', vnode._end)
  }
}
