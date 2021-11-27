var express = require('express');
var router = express.Router();
var consumptionmodel = require('../models/consumptionmodel.js');
var drinkmodel = require('../models/drink.js');

// var sip = require('underscore').chain(require('os').networkInterfaces()).values()
//     .flatten().find({family: 'IPv4', internal: false}).values().address;
// console.log('Server IP='+sip);

var ip = require("ip");
console.log(ip.address());

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index.ejs', { title: '專案首頁' });
});

//消費紀錄
router.get('/consumption', function(req, res){
  res.render('consumption.ejs', {title:"消費紀錄操作網頁"});
});

//新增消費紀錄
router.post('/consumption/add', function(req, res){
  var message;
  var item = new consumptionmodel({
    date: req.body.date,
    name: req.body.name,
    price: req.body.price
  });

  item.save(function(err, data){
    if(err){
      //res.json({status:1,msg:"error"});
      message = "無法除存此筆消費紀錄";
      res.send({result: message});
      console.log('add error!');
    }
    else{
      //res.json({ status: 0, msg: "success", data: data });
      message = "消費紀錄儲存成功";
      res.send({result: message});
      console.log('add success!');
    }
  });

  console.log(req.body.date);
  console.log(req.body.name);
  console.log(req.body.price);
});

//取得消費紀錄
router.get('/consumption/get', function(req, res){
  consumptionmodel.find(function(err, data){
    if(err) console.log(err);
    res.json(data);
  });
});

//刪除消費紀錄
router.post('/consumption/delete', function(req, res){
  var date = req.body.date;
  var name = req.body.name;
  var price = req.body.price;
  var message;

  consumptionmodel.remove({date: date, name: name, price: price}, function(err, data){
    if(err){
      console.log(err);
      message = "查無此筆消費紀錄";
      res.send({result: message});
    }
    else{
      message = "消費紀錄刪除成功";
      res.send({result: message});
    }
  });
});

//酒櫃管理
router.get('/drink', function(req, res){
  res.render('drink.ejs', {title:"酒櫃管理操作網頁"});
});

//新增酒類
router.post('/drink/add', function(req, res){
  var message;
  var item = new drinkmodel({
    name: req.body.name,
    year: req.body.year
  });

  item.save(function(err, data){
    if(err){
      //res.json({"status":1,"msg":"error"});
      message = "無法儲存此筆酒櫃紀錄";
      res.send({result: message});
      console.log('add error!');
    }
    else{
      //res.json({ "status": 0, "msg": "success", data: data });
      message = "酒櫃紀錄儲存成功";
      res.send({result: message});
      console.log('add success!');
    }
  });

  console.log(req.body.name);
  console.log(req.body.year);
});

//取得酒類
router.get('/drink/get', function(req, res){
  drinkmodel.find(function(err, data){
    if(err) console.log(err);
    res.json(data);
  });
});

//刪除酒類
router.post('/drink/delete', function(req, res){
  var name = req.body.name;
  var year = req.body.year;
  var message;

  drinkmodel.remove({name: name, year: year}, function(err, data){
    if(err){
      console.log(err);
      //res.json({"status": 1, "msg": "error"});
      message = "查無此筆酒櫃紀錄";
      res.send({result: message});
    }
    else{
      //res.json({"status": 0, "msg": "success"});
      message = "酒櫃紀錄刪除成功";
      res.send({result: message});
    }
  });
});

module.exports = router;