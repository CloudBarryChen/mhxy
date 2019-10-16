var express = require('express');
var path = require('path');
var app = express();
var dbHelper = require('./dbHelper');
var url = require('url');
var querystring = require('querystring');
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/bbs', function (req, res) {
  console.log("主頁GET請求");
  // console.log(req.url);
  // console.log(url.parse(req.url).query);
  // console.log(querystring.parse(url.parse(req.url).query));

  var bbObj = querystring.parse(url.parse(req.url).query);

  console.log(bbObj);

  if (bbObj.bbLevel % 5 !== 0) {
    res.end('格式不正确！');
    return;
  }

  dbHelper.bbsModel.find(function (err, data) {
    console.log(data);
    if (err) throw err;

    //判断数据库中是否已存在宝宝
    var exist = data.some(function (item, index) {
      return item.name === bbObj.bbName;
    })

    if (!exist) { //不存在，则保存数据
      var newBB = new dbHelper.bbsModel({
        name: bbObj.bbName,
        level: bbObj.bbLevel
      })

      newBB.save(function (err, res) {
        if (err) {
          console.log(err);
        } else {
          console.log('-------------------------');
          console.log('数据插入成功！');
          console.log(res);
          console.log('-------------------------');
        }
      })
      res.end(bbObj.bbName + ' 数据插入成功！');
    } else {
      res.end('数据已存在！');
    }
    // res.render('index.html', { 'data': data });
    // res.json(data);
  })


  /* dbHelper.BBModel.find(function (err, data) {
      //console.log(res);
      if (err) throw err;
      // res.render('index.html', { 'data': data });
      res.json(data);
  }) */
})

app.get('/bblist', function (req, res) {
  console.log("主頁GET請求");

  var newBB = new dbHelper.BBModel({
    name: '大海龟',
    fiveElements: '金', // 金 木 水 火 土
    source: '宝宝', //野生，宝宝，变异
    cerification: false,
    ablities: '水属性吸收',
  })

  newBB.save(function (err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log('-------------------------');
      console.log('数据插入成功！');
      console.log(res);
      console.log('-------------------------');
    }
  })

  dbHelper.BBModel.find(function (err, data) {
    //console.log(res);
    if (err) throw err;
    // res.render('index.html', { 'data': data });
    res.json(data);
  })
})

app.post('/bbmodel', urlencodedParser, function (req, res) {

  // console.log(req.body);
  // console.log(JSON.parse(req.body['abs'])); 
  var bb = JSON.parse(req.body['obj']);
  // console.log(bb)

  if (bb.abilities.length !== 0) {
    var newBB = new dbHelper.BBModel({
      name: bb.bbName,
      fiveElements: bb.bbFE, // 金 木 水 火 土
      source: bb.source, //野生，宝宝，变异
      certification: bb.certification,
      abilities: bb.abilities,
    })
    newBB.save(function (err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log('-------------------------');
        console.log('数据插入成功！');
        console.log(res);
        console.log('-------------------------');
      }
    })
  }

  res.end("数据插入成功！")
  // console.log(url.parse(req.url).query);
  // console.log(querystring.parse(url.parse(req.url).query));
  // res.json(req.body)
})

/* app.post('/abs', urlencodedParser, function (req, res) {
  console.log("主頁GET請求");
  // console.log(req.body);
  // console.log(JSON.parse(req.body['abs'])); 
  var abs = JSON.parse(req.body['abs']);
  console.log(abs)

  if(!false){
    abs.forEach(element => {
    var newBB = new dbHelper.AbilityModel({
      name: element.name,
      imgUrl: element.imgUrl,
    })
    newBB.save(function (err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log('-------------------------');
        console.log('数据插入成功！');
        console.log(res);
        console.log('-------------------------');
      }
    })
  });
  }
  
  // console.log(url.parse(req.url).query);
  // console.log(querystring.parse(url.parse(req.url).query));
  // res.json(req.body)
}) */

//返回符合条件的数据
app.get('/bbsmatch', function (req, res) {

  var obj = querystring.parse(url.parse(req.url).query)
  obj.abs = JSON.parse(obj.abs);
  console.log(obj)

  dbHelper.BBModel.find(function (err, data) {
    if (err) throw err;
    // console.log(data);
    var newData = data.filter((item) => {
      return checkAbs(item.abilities, obj.abs, item.name, obj.name);
    })
    // console.log(newData);
    res.send(newData)
  })


})

function checkAbs(existAbs, checkAbs, existName, checkName) {
  if (checkName !== existName && checkName !== '') {
    return false;
  }
  for (let i = 0; i < checkAbs.length; i++) {

    if ((checkAbs[i] !== existAbs[i || 0]) && (checkAbs[i] !== '空')) {
      return false;
    }
  }
  return true;
}

//返回技能仓库
app.get('/abslab', function (req, res) {

  dbHelper.AbilityModel.find(function (err, data) {
    if (err) throw err;
    res.send(data)
  })

})


module.exports = app;