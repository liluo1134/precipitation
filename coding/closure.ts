/** 闭包相关 */
var a = 10,
    b = 11,
    c = 12;
function test(a) {
    a = 1;
    var b = 2;
    c = 3;
}
test(10);
console.log(a, b, c);

/**
 * 10, 11, 3
 * 函数里面改变的a是参数，不会改变到全局变量
 * b也是在函数里面访问
 * c往上找到外部定义的12， 改为3
 */

var a = 4;
function b(x, y, a) {
    console.log(a);
    arguments[2] = 10;
    console.log(a);
}
a = b(1, 2, 3);
console.log(a);

/**
 * 3 -> 10 -> undefined
 */

function fn(x, y) {
  /!*
   * EC(FN)
   *   作用域链:<EC(FN),EC(G)>
   *   初始ARGUMENTS: {0:10,length:1} 
   *   形参赋值:x=10 y=undefined
   *      「映射关系」  x->arguments[0]
   *   变量提升:--
   *!/
  let arg = arguments;
  x = 100;
  console.log(arg[0]); //=>100

  arg[1] = 200;
  console.log(y); //=>undefined
}
fn(10); 

/**
 * 100 -> undefined
 * y没有传值，这里修改不到
 */

var a = 9;
function fn() {
    a = 0;
    return function (b) {
        return b + a++;
    }
}
var f = fn();
console.log(f(5));
console.log(fn()(5));
console.log(f(5));
console.log(a);

/**
 * f(5) -> 5, fn()(5) -> 5, f(5) -> 6, a -> 2
 */

var x = 4;
function func() {
    return function(y) {
        console.log(y + (--x));
    }
}
var f = func(5);
f(6);
func(7)(8);
f(9);
console.log(x);

/**
 * f(6) -> 6 + 3 = 9, func(7)(8) -> 8 + 2 = 10, f(9) -> 9 + 1 = 10, 1
 */

var x = 5,
    y = 6;
function func() {
    x += y;
    func = function (y) {
        console.log(y + (--x));
    };
    console.log(x, y);
}
func(4);
func(3);
console.log(x, y);

/**
 * 这里答案是错误的
 * func(4): x = 11, 6 + 4 = 10, 11, 6
 * func(3): x = 17, 6 + 16 = 22, 16, 6
 */
