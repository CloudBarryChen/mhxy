var express = require('express');
var router = express.Router();
// var fs = require('fs');
// var path = require('path');
var dbHelper = require('../db/dbHelper.js');


router.get('/abs',function(req,res){
    // var filePath = path.resolve(__dirname,'../json','index.json');
    // fs.readFile(filePath,'UTF-8',function(err,data){
    //     if(err) throw err;
    //     //console.log(data);
    //     var newdata = JSON.parse(data);
    //     res.render('index.html',{'data':newdata.data});
    // })
 
    res.render('test2.html');

})

module.exports = router;