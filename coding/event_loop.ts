setTimeout(() => {
  console.log(1);
}, 0);

new Promise((resolve) => {
  console.log(2);
  resolve(null);
}).then(() => {
  console.log(3);
});

console.log(4);
// 输出最后的结果

// 宏：s1
// 微：then

// 2 4 3 1

setTimeout(() => {
  console.log('begin')
})

new Promise((resolve) => {
  console.log('promise begin')
  for (let i = 0; i < 1000; i++) {
    i == 999 && resolve(null)
  }
}).then(() => {
  console.log('then begin')
})

console.log('end')

/**
 * 宏：s1
 * 微：then1
 * 
 * console -- promise begin -> end -> then begin -> begin
 */

// https://juejin.cn/post/6844903577891291143
console.log('golb1');

setTimeout(function () {
  console.log('timeout1');
  process.nextTick(function () {
    console.log('timeout1_nextTick');
  })
  new Promise(function (resolve) {
    console.log('timeout1_promise');
    resolve(null);
  }).then(function () {
    console.log('timeout1_then')
  })
})

setImmediate(function () {
  console.log('immediate1');
  process.nextTick(function () {
    console.log('immediate1_nextTick');
  })
  new Promise(function (resolve) {
    console.log('immediate1_promise');
    resolve(null);
  }).then(function () {
    console.log('immediate1_then')
  })
})

process.nextTick(function () {
  console.log('glob1_nextTick');
})

new Promise(function (resolve) {
  console.log('glob1_promise');
  resolve(null);
}).then(function () {
  console.log('glob1_then')
})

setTimeout(function () {
  console.log('timeout2');
  process.nextTick(function () {
    console.log('timeout2_nextTick');
  })
  new Promise(function (resolve) {
    console.log('timeout2_promise');
    resolve(null);
  }).then(function () {
    console.log('timeout2_then')
  })
})

process.nextTick(function () {
  console.log('glob2_nextTick');
})

new Promise(function (resolve) {
  console.log('glob2_promise');
  resolve(null);
}).then(function () {
  console.log('glob2_then')
})

setImmediate(function () {
  console.log('immediate2');
  process.nextTick(function () {
    console.log('immediate2_nextTick');
  })
  new Promise(function (resolve) {
    console.log('immediate2_promise');
    resolve(null);
  }).then(function () {
    console.log('immediate2_then')
  })
})

/**
 * 宏：s1, s2, s3, s4
 * 微：(glob1_then, glob2_then)
 * 
 * 宏：s2, s3, s4
 * 微：timeout1_then
 * 
 * 宏：s3, s4
 * 微：timeout2_then
 * 
 * console -- golb1 -> glob1_nextTick -> glob1 promise -> glob2_nextTick -> glob2_promise -> glob1_then -> glob2_then
 * -> timeout1 -> timeout1_nextTick -> timeout1_promise -> timeout1_then -> timeout2 -> timeout2_nextTick -> timeout2_promise
 * -> timeout2_then -> 
*/

// 位置 1
setTimeout(function () {
  console.log('timeout1');
}, 1000);

// 位置 2
console.log('start');

// 位置 3
Promise.resolve().then(function () {
  // 位置 5
  console.log('promise1');
  // 位置 6
  Promise.resolve().then(function () {
    console.log('promise2');
  });
  // 位置 7
  setTimeout(function () {
    // 位置 8
    Promise.resolve().then(function () {
      console.log('promise3');
    });
    // 位置 9
    console.log('timeout2')
  }, 0);
});

// 位置 4
console.log('done');

/**
 * 执行栈：start -> done
 * 任务队列：s1
 * 宏：s1, 
 * 微：then1, 执行
 * 
 * 宏：s1, s2, (这里需要看两者谁先走)
 * 微：then2
 * 
 * console -- start -> done -> promise1 -> promise2 -> timeout2 -> promise3 -> timeout1
 */

console.log("script start");


setTimeout(function () {
  console.log("setTimeout---0");
}, 0);

setTimeout(function () {
  console.log("setTimeout---200");
  setTimeout(function () {
    console.log("inner-setTimeout---0");
  });
  Promise.resolve().then(function () {
    console.log("promise5");
  });
}, 200);

Promise.resolve()
  .then(function () {
    console.log("promise1");
  })
  .then(function () {
    console.log("promise2");
  });
Promise.resolve().then(function () {
  console.log("promise3");
});
console.log("script end");

/**
 * 
 * 宏：s1, s2, 
 * 微：then1, then3, then2, 
 * 
 * 宏：s3
 * 微：then5
 * 
 * console -- script start -> script end -> (执行微任务) promise1 -> promise3 -> promise2 -> (剩下谁先走)
 * setTimeout---0 -> setTimeout---200 -> promise5 -> inner-setTimeout---0
 */

setTimeout(function () {
  console.log(4);
}, 0);

const promise = new Promise(function executor(resolve) {
  console.log(1);
  for (var i = 0; i < 10000; i++) {
    i == 9999 && resolve();
  }
  console.log(2);
}).then(function () {
  console.log(5);
});

console.log(3);

/**
 * 宏：s
 * 微： then
 * 
 * console -- 1 -> 2 -> 3 -> 5 -> 4
 * 
 */

setTimeout(function () {
  console.log(1);
});
console.log(2);
process.nextTick(() => {
  console.log(3);
});
new Promise(function (resolve, rejected) {
  console.log(4);
  resolve()
}).then(res=>{
  console.log(5);
})
setImmediate(function () {
  console.log(6)
})
console.log('end');

/**
 * node上面的执行顺序
 * 
 * 宏：s1, s2, 
 * 微：then
 * n1, 
 * 
 * console -- 2 -> 4 -> end -> 3 -> 5 -> 1 -> 6
 */

