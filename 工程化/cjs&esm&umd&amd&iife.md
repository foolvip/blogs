
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