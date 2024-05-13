let express = require('express');
let app = express();

let whiteList = ['http://localhost:3000'];
app.use(function (req, res, next) {
  let origin = req.headers.origin;
  if (whiteList.includes(origin)) {
    // 设置哪个源可以访问我（Access-Control-Allow-Origin设置为*后，不能与Access-Control-Allow-Credentials同时使用）
    res.setHeader('Access-Control-Allow-Origin', origin); // 服务器接收到浏览器的请求了，只是返回的时候被浏览器拦截了并警告跨域
    res.setHeader('Access-Control-Allow-Headers', 'name,age'); // 允许哪个头访问
    res.setHeader('Access-Control-Allow-Methods', 'PUT'); // 允许哪些方法跨域请求
    res.setHeader('Access-Control-Allow-Credentials', true); // 允许携带cookie
    res.setHeader('Access-Control-Expose-Headers', 'name'); // （允许前端获取哪个头）服务端设置请求头，告诉客户端请求头是安全的，客户端可以获取
    res.setHeader('Access-Control-Max-Age', 6) // 单位：秒， 6秒之后再次请求才重新发送预检请求(6秒内只发一次预检请求)
    if (req.method === 'OPTIONS') {
      res.end(); // OPTIONS请求不做任何处理
    }
  }
  next();
})
app.put('/getData', function (req, res) {
  console.log(req.headers);
  res.setHeader('name', 'serverZhouqin');
  res.end('我是服务端');
})
app.get('/getData', function (req, res) {
  console.log(req.headers);
  res.end('我是服务端');
})
app.use(express.static(__dirname));

app.listen(4000);