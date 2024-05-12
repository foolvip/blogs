
xss + csrf = xsrf

# xss

## 攻击类型

### 反射型
```js
// 反射型 http://localhost:3000/welcome?type=<script>alert(document.cookie)</script>
// chrome发现路径存在异常会有xss屏蔽功能
// 一般情况下会让cookie在前端不可以获取【res.cookie(SESSION_ID, cardId, { httpOnly: true });】，但并不是解决xss的方案，只是降低受损的范围
// 这种方案是诱导用户自己点开，是一次性的，点开就中招，不点就没事。
// 查询方式可以加上encodeURIComponent方式解决
app.get('/welcome', function (req, res) {
  res.send(`${encodeURIComponent(req.query.type)}`);
})
```

### dom-based

DOM-Based不基于后端, 前端修改属性或者插入内容(document.write),改变了前端代码结构后会造成攻击, 例如对img标签进行组装并插入一些代码造成攻击
```js
$('.box').html(`<img src="${encodeURI($('#web').val())}">`);
// 生成<img src="xxx" onerror="alert(1)" id=""> ，input输入内容为： xxx" onerror="alert(1)" id=" 改变了img的结构，弹出alert框

```

### 存储型
```js
// xss存储型 恶意的脚本存储到了服务器上，所有人访问时都会造成攻击，比反射型和DOM-Based范围更大
// 解决方案：1.客户端传递给服务器时需要交验先过滤一下2.服务端再做一次过滤。3.直接在输出的时候过滤
```

# csrf

## 过程

1. 先登录网站A，访问服务B，不退出登录
2. 然后访问网站C，C会请求服务B并且携带B服务返回给A的标识。
例如，若下操作

1. 启动server.js 3000，登录页面，进入付款页面http://localhost:3000/pay.html
2. 启动server1.js 3001，修改付款页面的路由为http://localhost:3001/fish.html，但是fish.html页面加载的资源会向http://localhost:3000/api/transfer发送请求
