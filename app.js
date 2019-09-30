var express = require('express');
var path = require('path');
var app = express();
var dbHelper = require('./db/dbHelper');

//设置模板引擎
app.engine('html', require('express-art-template'));
app.set('view engine', 'html')

//设置静态资源目录
app.use(express.static(path.resolve(__dirname, './public')));

//配置路由
var indexRouter = require('./routes/index.js');
var backendRouter = require('./routes/backend.js');
var test2Router = require('./routes/abs.js');
var dbResponser = require('./db/dbResponser.js');

//使用路由
app.use(indexRouter);
app.use(backendRouter);
app.use(test2Router);
app.use(dbResponser);

//开启服务器
var port = 5000; //设置端口号
app.listen(port, function () {  //监听端口
    console.log(`server is running at port ${port}!`);
})