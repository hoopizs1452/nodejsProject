// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// // db.once('open', function(){
// //   console.log('Connected!');
// // });

// var testSchema = new mongoose.Schema({
//   date: Date,
//   name: String,
//   price: String
// });

// testSchema.set('collation', 'consumption'); //新增需要這行，查詢不需要這行
//var testModel = mongoose.model('consumption', testSchema);

var express = require('express');
var router = express.Router();
var consumptionmodel = require('../models/consumptionmodel.js');

// var sip = require('underscore').chain(require('os').networkInterfaces()).values()
//     .flatten().find({family: 'IPv4', internal: false}).values().address;
// console.log('Server IP='+sip);

var ip = require("ip");
console.log(ip.address());

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index.ejs', { title: '專案首頁' });
});

router.get('/consumption', function(req, res){
  res.render('consumption.ejs', {title:"消費紀錄操作網頁"});
});

// router.get('/addconsumption', function(req, res){
//   var newconsumption = new consumptionmodel({date:2021-11-21, 
//     Name:"lunch", price:"100"});

//     newconsumption.save(function(err, data) {
//       if(err) {
//           console.log(error);
//       }
//       else {
//           res.send("Data inserted");
//       }
//   });
// });

//新增消費紀錄
router.post('/consumption/add', function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*'); // 允許其他網站的網頁存取此服務
  //testSchema.set('collation', 'consumption');
  var item = new consumptionmodel({
    date: req.body.date,
    name: req.body.name,
    price: req.body.price
  });

  item.save(function(err, data){
    if(err){
      res.json({"status":1,"msg":"error"});
      console.log('add error!');
    }
    else{
      res.json({ "status": 0, "msg": "success", data: data });
      console.log('add success!');
    }
  });

  console.log(req.body.date);
  console.log(req.body.name);
  console.log(req.body.price);

  res.set(
    {
      'charset': 'utf-8'  
    });

  res.send({result: "Thank for submit the form"});
});

//取得消費紀錄
router.get('/consumption/get', function(req, res){
  consumptionmodel.find(function(err, data){
    if(err) console.log(err);
    res.json(data);
  });
});

//修改更新紀錄
router.post('/consumption/update', function(req, res){
  var id = req.body.id;
  consumptionmodel.findById(id, function(req, data){
    if(err){
      console.log(err);
      res.json({"status": 1, "msg": "error"});
    }
    else{
      data.date = req.body.date;
      data.name = req.body.name;
      data.price = req.body.price;
      data.save(function(err){
        if(err){
          console.log(err);
          res.json({"status": 1, "msg": "error"});
        }
        else{
          res.json({"status": 0, "msg": "success"});
        }
      });
    }
  });
});

//刪除消費紀錄
router.post('/consumption/delete', function(req, res){
  var id = req.body.id;
  consumptionmodel.remove({_id: id}, function(err, data){
    if(err){
      console.log(err);
      res.json({"status": 1, "msg": "error"});
    }
    else{
      res.json({"status": 0, "msg": "success"});
    }
  });
});

router.get('/drink', function(req, res){
  res.render('drink.ejs', {title:"酒櫃管理操作網頁"});
});

//router.post('')

module.exports = router;