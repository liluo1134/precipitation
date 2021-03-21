// 只拷贝对象
function copy(obj) {
  if (typeof obj !== 'object') return obj

  const newObj = obj instanceof Array ? [] : {}

  // 遍历obj, 判断是obj的属性才拷贝
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key]
    }
  }

  return newObj
}

function deepCopy(obj) {
  if (typeof obj !== 'object') return obj

  const newObj = obj instanceof Array ? [] : {}

  for(let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
    }
  }

  return newObj
}

// ts
function dpc<T>(data: T): T {
  const isObj = (v: any): boolean => Object.prototype.toString.call(v).slice(8, -1) === 'object'

  function _dpc(val: any) {
    if (Array.isArray(val)) {
      const source = val as any[]

      return source.reduce((res, item) => {
        res.push(_dpc(item))
        return res
      }, [])
    }

    if (isObj(val)) {
      const source = val as object
      return Object.keys(val).reduce((res, key) => {
        res[key] = _dpc(source[key])
        return res
      }, [])
    }

    return val
  }

  return _dpc(data) as T
}

function isObject(obj) {
  return (typeof obj === 'object' || typeof obj === 'function') && obj !== null
}
function isFunc(obj) {
  return typeof obj === 'function'
}
function isArray(obj) {
  return Array.isArray(obj)
}
function isDate(obj) {
  return Object.prototype.toString.call(obj) === '[object Date]'
}
function isMap(obj) {
  return Object.prototype.toString.call(obj) === '[object Map]'
}
function isSet(obj) {
  return Object.prototype.toString.call(obj) === '[object Set]'
}
function isRegExp(obj) {
  return Object.prototype.toString.call(obj) === '[object RegExp]'
}

function FdeepCopy(obj,weakMap = new WeakMap()) {
  if (!isObject(obj)) return obj
  if (weakMap.get(obj)) return weakMap.get(obj)
  // 如果是函数
  if (isFunc(obj)) {
      let result = null
      // 获得函数的主体
      const bodyReg = /(?<={)(.|\n)+(?=})/m;
      // 获得参数
      const paramReg = /(?<=\().+(?=\)\s+{)/;
      const funcString = obj.toString();
      // 判断是否是箭头函数
      if (obj.prototype) {
          const param = paramReg.exec(funcString);
          const body = bodyReg.exec(funcString);
          if (body) {
              if (param) {
                  const paramArr = param[0].split(',');
                  result = new Function(...paramArr, body[0]);
              } else {
                  result = new Function(body[0]);
              }
          }
      } else {
          result = eval(funcString);
      }
      weakMap.set(obj,result)
      return result
  }

  // 如果是数组
  if (Array.isArray(obj)) {
      let result = []
      for (let val of obj) {
          result.push(FdeepCopy(val, weakMap))
      }
      weakMap.set(obj,result)
      return result
  }
  // 如果是Date
  if (isDate(obj)) {
      let result = new obj.constructor(obj)
      weakMap.set(obj,result)
      return result
  }
  // 如果是map
  if (isSet(obj)) {
      let result = new Set()
      obj.forEach((val)=> {
          result.add(FdeepCopy(val, weakMap))
      })
      weakMap.set(obj,result)
      return result
  }
  // 如果是set
  if (isMap(obj)) {
      let result = new Map()
      obj.forEach((val, key) => {
          result.set(key, FdeepCopy(key, weakMap))
      })
      weakMap.set(obj,result)
      return result
  }
  // 如果是正则
  if (isRegExp(obj)) {
      const reFlags = /\w*$/;
      const result = new obj.constructor(obj.source, reFlags.exec(obj));
      result.lastIndex = obj.lastIndex;
      weakMap.set(obj,result)
      return result;
  }
  let result = {}
  weakMap.set(obj,result)
  // 考虑symbol类型的属性名
  let symbols = Object.getOwnPropertySymbols(obj)
  if(symbols.length > 0) {
      for(let key of symbols) {
          let val = obj[key]
          result[key] = isObject(val) ? FdeepCopy(val, weakMap) : val
      }
  }
  // 非symbol类型属性名
  for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
          let val = obj[key]
          result[key] = isObject(val) ? FdeepCopy(val, weakMap) : val
      }
  }
  return result
}

var map = new Map()
map.set(1,1)
map.set(2,2)
var obj = {
  a: 1,
  b: '1',
  c: Symbol(),
  d: undefined,
  e: null,
  f: true,
  g: {
      g1: 1,
      g2: '2',
      g3: undefined
  },
  [Symbol()]: 'symbol',
  h: function (a) {
      console.log(a)
  },
  i: [1,2,3],
  j: new Date(),
  k: new Set([1,2,3,4]),
  l: map,
  m: /\w*$/g,
}
obj.x = obj.i

var deepObj = deepCopy(obj)
console.log(deepObj.x === deepObj.i) // true
console.log(deepObj)
