//建立数据库连接
var settings = require('../settings.js');
var Db = require('mongodb').Db;
//var Connection=require('mongodb').connect;
//console.log(Connection);
var Server = require('mongodb').Server;
module.exports = new Db(settings.db, new Server(settings.host, 28018, {}));