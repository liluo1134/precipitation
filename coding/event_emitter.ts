// 我们在绑定事件时，见到比较多的就是 事件名 + callback
class EventEmitter {
  // 这里function为何要定义成[]，可以定义多个函数？？？
  events: { [key: string]: Function[] } = {}

  // 订阅
  on(type: string, callback: Function) {
    if (!this.events) {
      this.events = Object.create(null)
    }

    // 已存在type，直接更新
    if (this.events[type]) {
      this.events[type] = [callback]
    } else {
      this.events[type].push(callback)
    }
  }

  // 取消订阅
  off(type: string) {
    if (!this.events[type]) return 
    delete this.events[type]
  }

  // 只执行一次订阅
  once(type: string, callback: Function) {
    // 这里封装一层，做好取消订阅，只执行一次
    function fn() {
      callback()
      this.off(type)
    }

    this.on(type, fn)
  }

  // 触发事件
  emit(type: string, ...rest) {
    this.events[type] && this.events[type].forEach((fn) => fn(...rest))
  }
}

// 使用情况
const events = new EventEmitter()

events.on('click', (...rest) => {
  console.log(rest)
})

events.emit('click')

events.off('click')

events.once('click', (...rest) => {
  console.log(rest)
})
