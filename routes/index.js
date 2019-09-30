var express = require('express');
var router = express.Router();
// var fs = require('fs');
// var path = require('path');
var dbHelper = require('../db/dbHelper.js');


router.get('/', function (req, res) {
    // var filePath = path.resolve(__dirname,'../json','index.json');
    // fs.readFile(filePath,'UTF-8',function(err,data){
    //     if(err) throw err;
    //     //console.log(data);
    //     var newdata = JSON.parse(data);
    //     res.render('index.html',{'data':newdata.data});
    // })
    /* dbHelper.AbilityModel.find(function(err,data){
        console.log(data);
        if(err) throw err;
        //var newdata = JSON.parse(data);
        res.render('index.html',{'abdata':data});
    }) */
    dbHelper.bbsModel.find(function (err, bbdata) {
        // console.log(data);
        if (err) throw err;
        //var newdata = JSON.parse(data);
        dbHelper.AbilityModel.find(function (err, abdata) {
            // console.log(data);
            if (err) throw err;
            //var newdata = JSON.parse(data);
            res.render('index.html', { 'bbdata': bbdata, 'abdata': abdata });
        })
    })


})

module.exports = router;