//引入mongoose包
var mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://localhost/mhxy', {
    useNewUrlParser: true, useUnifiedTopology: true
});

//判断是否连接成功
var db = mongoose.connection;
db.on('error', function () {
    console.log('db connetion error');
})
db.once('open', function () {
    console.log('db connetion succeed');
})

//定义模型
var BBModel = mongoose.model('Bblist', {
    name: String,
    fiveElements: String, // 金 木 水 火 土
    source: String, //野生，宝宝，变异
    certification: Boolean,
    abilities: Array,
})
var bbsModel = mongoose.model('Bbs', {
    name: String,
    level: Number,
})
var AbilityModel = mongoose.model('Abilities', {
    name: String,
    imgUrl: String,
})

// mongoose.disconnect(function(){
//     console.log('connetion interrupted')
// });

module.exports = {
    mongoose,
    BBModel,
    bbsModel,
    AbilityModel
}