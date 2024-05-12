// 当用户登录后返回一个标识即cookie
let express = require('express');
let app = new express();
let path = require('path');
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname))) // 当前目录

let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
app.use(cookieParser()); // req.cookie['connect.sid]
app.use(bodyParser.urlencoded({ extended: false }))


app.listen(3001, function () {
  console.log('服务启在3001上');
});
