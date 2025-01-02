
# CJS

是commonjs简写， 主要用于node.js

```js
//importing 
const doSomething = require('./doSomething.js');  // 同步导入模块

//exporting
module.exports = function doSomething(n) {
  // do something
}
```
# AMD

异步模块定义, 异步导入模块

```js
define(['dep1', 'dep2'], function (dep1, dep2) {
    //Define the module value by returning a value.
    return function () {};
});

// or

// https://requirejs.org/docs/whyamd.html
define(function (require) {
    var dep1 = require('dep1'),
        dep2 = require('dep2');
    return function () {};
});
```
# UMD
Universal Module Definition：通用模块定义

```js
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery", "underscore"], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(require("jquery"), require("underscore"));
    } else {
        root.Requester = factory(root.$, root._);
    }
}(this, function ($, _) {
    // this is where I defined my module implementation

    var Requester = { // ... };

    return Requester;
}));
```
# ESM
ES Modules, Javascript 提出的实现标准模块系统的提案
 ```js
 import React from 'react';

 import {foo, bar} from './myLib';

...

export default function() {
  // your Function
};
export const function1() {...};
export const function2() {...};
 ```
- 在编译时导入、导出，只能看代码不能执行
- 只能在顶部导入，不能嵌套在条件语句中
- (静态模块结构)[https://exploringjs.com/es6/ch_modules.html#static-module-structure] 可以进行 tree-shaking
- 可以在html中导入，如下
```html
<!-- 注意兼容性 -->
<script type="module">
  import {func1} from 'my-lib';

  func1();
</script>
```
# iife
立即调用函数表达式（IIFE）是一个在定义时就会立即执行的 JavaScript 函数。IIFE 这个名字是由 Ben Alman 在他的[博客](https://web.archive.org/web/20171201033208/http://benalman.com/news/2010/11/immediately-invoked-function-expression/#iife)中提出的

```js
(function () {
  // …
})();

(() => {
  // …
})();

(async () => {
  // …
})();

```
是一种设计模式，也被称为自执行匿名函数，主要包含两部分：
- 用圆括号运算符 () 运算符闭合起来。这样不但阻止了外界访问自执行匿名函数中的变量，而且不会污染全局作用域。
- 创建了一个立即执行函数表达式 ()，通过它，JavaScript 引擎将立即执行该函数。
作用：
- 避免污染全域命名空间。
- 在 JavaScript 中建立闭包
- IIFE 用於建立私有和公有变量和方法。
- 它用於執行async 和await 函數。
- 可用于与require 函数一起使用。

# 总结
- ESM 是最好的模块格式，因为它语法见简单、异步特性和可tree-shaking.
- UMD  适用于所有情况，通常作为 ESM 无法工作时的备用方案
- CJS 是异步的，对后端友好.
- AMD 是同步的，对前端友好.