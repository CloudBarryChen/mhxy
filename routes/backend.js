var express = require('express');
var router = express.Router();
// var fs = require('fs');
// var path = require('path');
var dbHelper = require('../db/dbHelper.js');


router.get('/backend',function(req,res){
    // var filePath = path.resolve(__dirname,'../json','index.json');
    // fs.readFile(filePath,'UTF-8',function(err,data){
    //     if(err) throw err;
    //     //console.log(data);
    //     var newdata = JSON.parse(data);
    //     res.render('index.html',{'data':newdata.data});
    // })
    dbHelper.BBModel.find(function(err,data){
        //console.log(res);
        if(err) throw err;
        //var newdata = JSON.parse(data);
        res.render('backend.html',{'data':data});
    })
})

module.exports = router;