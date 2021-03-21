/**
 * throttle节流
 * 在一个单位时间内执行一次事件。
 * 根据首次是否执行（leading）以及结束后（trailing）是否执行，效果不同，实现方式不同。
 * 
 * 时间戳实现
 */

function throttle(func, wait) {
  let previous = 0

  return function() {
    // 当前时间
    const now = +new Date()
    const context = this
    const args = arguments

    if (now - previous > wait) {
      func.apply(context, args)
      previous = now
    }
  }
}

/** 
 * 使用定时器实现
 * 事件触发时，设置一个定时器，再触发的时候判断定时器，执行完函数清空定时器，重新设置下一个定时器
 */

function throttle1(func, wait) {
  let timeout

  return function() {
    const context = this
    const args = arguments

    if (!timeout) {
      timeout = setTimeout(function() {
        // 清空定时器
        timeout = null
        func.apply(context, args)
      }, wait)
    }
  }
}

/**
 * 上述两种方式比较：
 * 1、第一种立即执行，第二种事件会在n秒后第一次执行
 * 2、第一种停止触发后不会再执行。第二种事件停止触发后仍然会再执行一次
 * 
 * 综合：触发能立即执行，结束后再执行一次
 */

function throttle3(func, wait) {
  let timeout, result, context, args
  let previous = 0
  

  const later = function () {
    previous = +new Date()
    timeout = null
    func.apply(context, args)
  }

  const throttle = function () {
    const now = +new Date()
    // 下次触发 func 剩余的时间
    const remaining = wait - (now - previous)
    context = this
    args = arguments

    // 如果没有剩余的时间了或者改了系统时间
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(context, args)
    } else if (!timeout) {
      timeout = setTimeout(later, remaining)
    }
  }

  return throttle
}

/**
 * 优化：灵活实现 有头无尾 / 无头有尾
 * 设置options为第三个参数，根据传入值判断
 * leading -- false, 禁用第一次执行
 * trailing -- false, 禁用停止触发时的回调
 * 
 * leading：false 和 trailing: false 不能同时设置
 */

function throttle4(func, wait, options) {
  let timeout, result, context, args
  let previous = 0
  const _options = options || {}

  const later = function() {
    previous = options.leading ? +new Date() : 0
    timeout = null
    func.apply(context, args)
    if (!timeout) context = args = null
  }

  const throttle = function() {
    const now = +new Date()

    // 控制第一次的执行
    if (!previous && !options.leading) previous = now
    const remaining = wait - (now - previous)

    context = this
    args = arguments

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(context, args)
      
      if (!timeout) context = args = null  // 置为空是为了js的垃圾回收
    } else if (!timeout && options.trailing) {
      // 结束后的执行
      timeout = setTimeout(later, remaining)
    }
  }

  throttle.cancel = function() {
    clearTimeout(timeout)
    previous = 0
    timeout = null
}

  return throttle
}
