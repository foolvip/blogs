// 当用户登录后返回一个标识即cookie
let express = require("express");
let app = new express();
let path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname))); // 当前目录

let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
let svgCaptcha = require("svg-captcha");

app.use(cookieParser()); // req.cookie['connect.sid]
app.use(bodyParser.urlencoded({ extended: false }));

let userList = [
  {
    username: "zq",
    password: "zq",
    money: 10000,
  },
  {
    username: "zz",
    password: "zzpw",
    money: 20,
  },
];
let SESSION_ID = "connect.sid";
let session = {}; // 登录后请求数据时使用
app.post("/api/login", function (req, res) {
  let { username, password } = req.body;
  let user = userList.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    // 服务器需要在用户登录后给一个信息
    let cardId = Math.random() + Date.now();
    session[cardId] = { user };
    res.cookie(SESSION_ID, cardId, { httpOnly: true });
    res.json({ code: 0 });
  } else {
    res.json({ code: 1, error: "用户不存在" });
  }
});

// 反射型 http://localhost:3000/welcome?type=<script>alert(document.cookie)</script>
// chrome发现路径存在异常会有xss屏蔽功能
// 一般情况下会让cookie在前端不可以获取【res.cookie(SESSION_ID, cardId, { httpOnly: true });】，但并不是解决xss的方案，只是降低受损的范围
// 这种方案是诱导用户自己点开，是一次性的，点开就中招，不点就没事。
// 查询方式可以加上encodeURIComponent方式解决
app.get("/welcome", function (req, res) {
  res.send(`${encodeURIComponent(req.query.type)}`);
});

// xss存储型 恶意的脚本存储到了服务器上，所有人访问时都会造成攻击，比反射型和DOM-Based范围更大
// 解决方案：1.客户端传递给服务器时需要交验先过滤一下2.服务端再做一次过滤。3.直接在输出的时候过滤

// 用户评论信息
let comments = [
  { username: "zq", content: "欢迎蜗牛" },
  { username: "zs", content: "测试数据" },
];
app.get("/api/list", function (req, res) {
  res.json({
    code: 0,
    comments,
  });
});
app.post("/api/addcomment", function (req, res) {
  // 当你访问添加留言时，就执行到这里了
  let r = session[req.cookies[SESSION_ID]] || {}; // {user: { username: password }}】
  let user = r.user;
  if (user) {
    // 这个人登录过
    comments.push({
      username: user.username,
      content: req.body.content,
    });
    res.json({ code: 0 });
  } else {
    res.json({ code: 1, error: "用户未登录" });
  }
});

app.get("/api/userinfo", function (req, res) {
  let r = session[req.cookies[SESSION_ID]] || {};
  // data:svg内容；text表示的是验证码对应的结果
  let { data, text } = svgCaptcha.create();
  r.text = text; // 下次请求时应该拿到返回的结果和上次存好的结果做对比
  let user = r.user;
  if (user) {
    res.json({
      code: 0,
      user: { username: user.username, money: user.money, svg: data },
    });
  } else {
    res.json({ code: 1, error: "用户未登录" });
  }
});

app.post("/api/transfer", function (req, res) {
  let r = session[req.cookies[SESSION_ID]] || {};
  let user = r.user;
  // referer 不靠谱 可以通过node自己发请求来实现伪造。
  let referer = req.headers["referer"] || "";
  if (referer.includes("http://localhost:3000")) {
    if (user) {
      let { target, money, code, token } = req.body;
      if ("my_" + req.cookies[SESSION_ID] === token) {
        if (code && code === r.text) {
          money = Number(money);
          userList.forEach((u) => {
            if (u.username === user.username) {
              u.money -= money;
            }
            if (u.username === target) {
              u.money += money;
            }
          });
          res.json({ code: 0 });
        } else {
          res.json({ code: 1, error: "验证码不正确" });
        }
      } else {
        res.json({ code: 1, error: "没有token" });
      }
    } else {
      res.json({ code: 1, error: "用户未登录" });
    }
  } else {
    res.json({ code: 1, error: "被人攻击了" });
  }
});

app.listen(3000, function () {
  console.log("服务启在3000上");
});
