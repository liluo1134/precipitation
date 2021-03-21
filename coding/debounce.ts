/** debounce实现
 * 防抖：事件被触发n秒后执行，该时间内再次触发，重新计时
 * 简易版本
 */
function debounce(func, wait) {
  let timeout

  /** 使用闭包，是为了在它所在的作用域保存setTimeout返回的id，以便于在设定时间内点击时清除上一次的setTimeout
   * 当函数执行完被回收，依然可以访问到上一次的timeout
   */
  return function () {
    // this需要正确指向，否则指向windows
    const context = this
    // 需要正确获取到events
    const args = arguments

    clearTimeout(timeout)
    // timeout = setTimeout(func, wait) 一开始这样写存在this指向跟获取event出错问题
    timeout = setTimeout(function() {
      func.apply(context, args)
    }, wait)
  }
}

/**
 * 点击后立即执行函数，等到停止触发n秒后，才可以重新触发
 * 增加函数返回值
 */
 function debounce1(func, wait, immediate){
   let timeout
   // 函数可能有返回值
   let result
   
   return function() {
     const context = this
     const args = arguments

     if (timeout) clearTimeout(timeout)

     if (immediate) {
       // 立即执行，若是已经执行过，便不再执行
       const callNow = !timeout
       timeout = setTimeout(function() {
         timeout = null
       }, wait)
       if (callNow) result = func.apply(context, args)
     } else {
       timeout = setTimeout(function() {
         func.apply(context, args)
       }, wait)
     }

     return result
   }
 }

 /**
  * 增加取消防抖的功能
  */
function debounce2(func, wait, immediate) {
  let timeout
  let result

  const debounce = function () {
    const context = this
    const args = arguments

    if (timeout) clearTimeout(timeout)

    if (immediate) {
      const callNow = !timeout
      timeout = setTimeout(function() {
        timeout = null
      }, wait)
      if (callNow) result = func.apply(context, args)
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args)
      }, wait)
    }
    return result
  }

  debounce.cancel = function() {
    clearTimeout(timeout)
    timeout = null
  }

  return debounce
}
