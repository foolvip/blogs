
# 1. XSS(Cross-Site Script)

- 是一种代码注入攻击。攻击者往网页里注入恶意脚本代码，当用户访问包含恶意代码的网页时，攻击者通过恶意脚本可以获取和控制用户信息。

## 1.1 反射型(非持久型)XSS

诱导用户点击恶意链接来造成一次性攻击

攻击步骤：

1. 攻击者把**带有恶意脚本参数的**URL地址发送给用户，
2. **用户点击此链接**
3. 服务器端获取请求参数并且直接使用，服务器反射回结果页面

- 反射型XSS攻击是一次性的，**必须要通过用户点击链接**才能发起
- 一些浏览器如Chrome其内置了一些XSS过滤器，可以防止大部分反射型XSS攻击
- 反射型XSS其实就是服务器没有对**恶意的用户输入**进行安全处理就直接反射响应内容，导致恶意代码在浏览器中执行的一种XSS漏洞

```js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'public')));
// 带参数的URL请求：http://localhost:3000/list?category=<script>alert(1)</script>
app.get('/list', function (req, res) {
    let { category } = req.query;
    res.header('Content-Type', 'text/html;charset=utf-8');
    res.send(`你输入的分类是: ${category}`); // 服务器返回给客户端，执行<script>alert(1)</script>
});
app.listen(3000, () => console.log('The server is starting at port 3000'));
```

## 1.2 存储型(持久型)XSS

攻击者将代码存储到漏洞服务器中，用户浏览相关页面发起攻击。

攻击步骤：

1. 攻击者将恶意脚本代码上传或存储到漏洞服务器
2. 当正常客户访问服务器时，服务器会读取恶意数据并且直接使用
3. 服务器会返回含有恶意脚本的页面给客户端

## 1.3 DOM-Based型XSS

不需要服务器端支持，是由于DOM结构修改导致的，基于浏览器DOM解析的攻击

1. 用户打开带有恶意的链接
2. 浏览器在DOM解析的时候直接使用恶意数据
3. 用户中招

常见的触发场景就是在修改innerHTML，outerHTML，document.write的时候

## 1.4 payload

实现XSS攻击的恶意脚本被称为 XSS payload

- 窃取用户的Cookie document.cookie
- 识别用户浏览器 navigator.userAgent
- 伪造请求 GET POST请求
- XSS钓鱼 通过XSS向网页上注入钓鱼链接，让用户访问假冒的网站

## 1.5 如何防御XSS

给cookie设置httpOnly属性 脚本无法读取该Cookie,自己也不能用，非根本解决XSS

- HttpOnly 并非为了对抗 XSS，HttpOnly 解决的是 XSS 后的 Cookie 劫持攻击。
- 输入检查、输出检查 （用户格式判断-白名单， 过滤危险字符去除）
- 会触发 DOM Based XSs 的地方有很多，以下几个地方是 JavaScript 输出到 HTML 页面的必经之路。
<!-- 
document.write()
document.writeln()
xxx.innerHTML=
xxx.outerHTML=
innerHTML.replacee(）
document.attachEvent(）
window.attachEvent()
document.location.replace(）
document.location.assign()
 -->
# 2. CSRF（跨站请求伪造）

攻击者诱导用户进入一个第三方网站，然后该网站向被攻击网站发送跨站请求。如果用户在被攻击网站中保存了登录状态，那么攻击者就可以利用这个登录状态，绕过后台的用户验证，冒充用户向服务器执行一些操作。

## 2.1 攻击方式

1. 用户A登录银行网站，登录成功后会设置cookie
2. 攻击者诱导用户A登录到攻击者的站点，然后会返回一个页面
3. 用户访问这个页面时，这个页面会伪造一个转账请求到银行网站

## 2.2 攻击类型

常见的 CSRF 攻击有三种：

- GET 类型的 CSRF 攻击，比如在网站中的一个 img 标签里构建一个请求，当用户打开这个网站的时候就会自动发起提交。
- POST 类型的 CSRF 攻击，比如构建一个表单，然后隐藏它，当用户进入页面时，自动提交这个表单。
- 链接类型的 CSRF 攻击，比如在 a 标签的 href 属性里构建一个请求，然后诱导用户去点击。

## 2.3 防御方法

### 2.3.1 验证码

只能作为防御 CSRF 的一种辅助手段，而不能作为最主要的解决方案

### 2.3.2 Referer Check进行同源检测

服务器根据 http 请求头中 origin 或者 referer 信息来判断请求是否为允许访问的站点，从而对请求进行过滤。（Referer Check 的缺陷在于，服务器并非什么时候都能取到 Referer。）无法依赖于 Referer Check 作为防御 CSRF 的主要手段。但是通过 Referer Check 来监控 CSRF 攻击的发生，倒是一种可行的方法。

### 2.3.3 使用 CSRF Token 进行验证

服务器向用户返回一个随机数 Token ，当网站再次发起请求时，在请求参数中加入服务器端返回的 token ，然后服务器对这个 token 进行验证。

```javascript
// bank.html
function getClientToken() {
            let result = document.cookie.match(/token=([^;]+)/);
            return result ? result[1] : '';
        }
function transfer(event) {
            event.preventDefault();
            let target = $('#target').val();
            let amount = $('#amount').val();
            let captcha = $('#captcha').val();
            $.post('/api/transfer', {
                target,
                amount,
                captcha,
                clientToken: getClientToken()
            }).then(data => {
                if (data.code == 0) {
                    alert('转账成功');
                    location.reload();
                } else {
                    alert('用户未登录');
                    location.href = '/login.html';
                }
            });
}

// server.js

app.post('/api/transfer', function (req, res) {
    // let referer = req.headers['referer'];
    //if (/^https?:\/\/localhost:3000/.test(referer)) {
    let { target, amount, clientToken, captcha } = req.body;
    amount = isNaN(amount) ? 0 : Number(amount);
    let { username, token } = userSessions[req.cookies.sessionId];
    if (username) {
        if (clientToken == token) {
            let user;
            for (let i = 0; i < users.length; i++) {
                if (username == users[i].username) {
                    users[i].money -= amount;
                } else if (target == users[i].username) {
                    users[i].money += amount;
                }
            }
            res.json({ code: 0 });
        } else {
            res.json({ code: 1, error: '违法操作' });
        }
    } else {
        res.json({ code: 1, error: '用户没有登录' });
    }
    //} else {
    res.json({ code: 1, error: 'referer不正确' });
    //}
})
```

# 3. 点击劫持(Clickjacking )

点击劫持是一种视觉上的欺骗手段。攻击者使用一个透明的、不可见的 iframe，覆盖在一个网页上,然后诱使用户在该网页上进行操作,此时用户将在不知情的情况下点击透明的 ifame页面。通过调整 ifame 页面的位置,可以诱使用户恰好点击在 ifame 页面的一些功能性按钮上。

点击劫持攻击与 CSRF 攻击有异曲同工之妙，都是在用户不知情的情况下诱使用户完成一些动作。但是在 CSRF 攻击的过程中，如果出现用户交互的页面，则攻击可能会无法顺利完成。与之相反的是，点击劫持没有这个顾虑，它利用的就是与用户产生交互的页面。

## 3.1 攻击类型

### 3.1.1 Flash点击劫持

### 3.1.2 图片覆盖攻击

### 3.1.2 拖拽劫持与数据窃取

### 3.1.2 ClickJacking 3.0：触屏劫持

## 3.2 防御类型

ClickJacking 是一种视觉上的欺骗，针对传统的 ClickJacking，一般是通过禁止跨域的 iframe 来防范。

### 3.2.1 frame busting

### 3.2.2 X-Frame-Options

因为 frame busting 存在被绕过的可能，所以我们需要寻找其他更好的解决方案。一个比较好的方案是使用一个 HTTP 头--X-Frame-Options。X-Frame-Options 可以说是为了解决 ClickJacking 而生的，它有三个可选值：

- DENY
- SAMEORIGIN
- ALLOW-FROM origin

# 4. DDOS攻击：分布式拒绝服务(Distribute Denial Of Service)

攻击者控制大量的肉鸡向受害主机发送非正常请求，导致目标主机耗尽资源不能为合法用户提供服务

## 防御方法

- 验证码能够有效地防止多次重复请求的行为。
- 限制请求频率是我们最常见的针对 DDOS 攻击的防御措施。其原理为设置每个客户端的请求频率的限制
- 增加机器增加服务带宽。只要超过了攻击流量便可以避免服务瘫痪
- 设置自己的业务为分布式服务，防止单点失效。
- 使用主流云系统和 CDN（云和 CDN 其自身有 DDOS 的防范作用）
- 优化资源使用提高 web server 的负载能力

# 5. HTTP劫持

- 在用户的客户端与其要访问的服务器经过网络协议协调后，二者之间建立了一条专用的数据通道，用户端程序在系统中开放指定网络端口用于接收数据报文，服务器端将全部数据按指定网络协议规则进行分解打包，形成连续数据报文。
- 用户端接收到全部报文后，按照协议标准来解包组合获得完整的网络数据。其中传输过程中的每一个数据包都有特定的标签，表示其来源、携带的数据属性以及要到何处，所有的数据包经过网络路径中ISP的路由器传输接力后，最终到达目的地，也就是客户端。
- HTTP劫持是在**使用者与其目的网络服务所建立的**专用数据通道中，监视特定数据信息，提示当满足设定的条件时，就会在正常的数据流中**插入精心设计的网络数据报文**，目的是让用户端程序解释“错误”的数据，并以弹出新窗口的形式在使用者界面展示宣传性广告或者直接显示某网站的内容。

# 6. 中间人攻击

中间⼈ (Man-in-the-middle attack, MITM) 是指攻击者与通讯的两端分别创建独⽴的联系, 并交换其所收到的数据, 使通讯的两端认为他们正在通过⼀个私密的连接与对⽅直接对话, 但事实上整个会话都被攻击者完全控制。在中间⼈攻击中，攻击者可以拦截通讯双⽅的通话并插⼊新的内容。

攻击过程如下:

- 客户端发送请求到服务端，请求被中间⼈截获 
- 服务器向客户端发送公钥 
- 中间⼈截获公钥，保留在⾃⼰⼿上。然后⾃⼰⽣成⼀个伪造的公钥，发给客户端 
- 客户端收到伪造的公钥后，⽣成加密hash值发给服务器 
- 中间⼈获得加密hash值，⽤⾃⼰的私钥解密获得真秘钥,同时⽣成假的加密hash值，发给服务器 
- 服务器⽤私钥解密获得假密钥,然后加密数据传输给客户端 

# 7. 网络劫持有哪几种，如何防范？

⽹络劫持分为两种

## （1）DNS劫持

输⼊京东被强制跳转到淘宝这就属于dns劫持

- DNS强制解析: 通过修改运营商的本地DNS记录，来引导⽤户流量到缓存服务器
- 302跳转的⽅式: 通过监控⽹络出⼝的流量，分析判断哪些内容是可以进⾏劫持处理的,再对劫持的内存发起302跳转的回复，引导⽤户获取内容

## （2）HTTP劫持

 (访问⾕歌但是⼀直有贪玩蓝⽉的⼴告),由于http明⽂传输,运营商会修改你的http响应内容(即加⼴告) 

DNS劫持由于涉嫌违法，已经被监管起来，现在很少会有DNS劫持，⽽http劫持依然⾮常盛⾏，最有效的办法就是全站HTTPS，将HTTP加密，这使得运营商⽆法获取明⽂，就⽆法劫持你的响应内容