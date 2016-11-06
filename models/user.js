var mongodb = require('./db');
function User(user) {
    this.username = user.username;
    this.password = user.password;
};
module.exports = User;
User.prototype.save = function save(callback) {
// 存入 Mongodb 的文档
    var user = {
        username: this.username,
        password: this.password
    };
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        // 读取 user 集合
        db.collection('user', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            // 为username属性添加索引
            collection.ensureIndex({"username": 1}, {"unique": true, "dropDups": true})
            // 写入 user 文档
            collection.insert(user, {safe: true}, function (err, user) {
                mongodb.close();
                callback(err, user);
            });
        });
    });
};
User.get = function get(username, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        // 读取 user 集合
        db.collection('user', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            // 查找 name 属性为 username 的文档
            collection.findOne({username: username}, function (err, doc) {
                mongodb.close();
                if (doc) {
                    // 封装文档为 User 对象
                    var user = new User(doc);
                    callback(err, user);
                } else {
                    callback(err, null);
                }
            });
        });
    });
};