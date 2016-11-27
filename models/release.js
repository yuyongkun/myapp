var mongodb = require('./db');

function Release(title, content) {
    this.title = title;
    this.content = content;
};
module.exports = Release;
Release.prototype.save = function save(callback) {
    var release = {
        title: this.title,
        content: this.content
    };
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        // 读取 release 集合
        db.collection('release', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            // 写入 release 集合
            collection.insert(release, { safe: true }, function(err, user) {
                mongodb.close();
                callback(err, release);
            });
        });
    });
}
Release.get = function(callback) {
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        // 读取 release 集合
        db.collection('release', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.find().toArray(function(err, docs) {
                mongodb.close();
                if (err) {
                    callback(err, null);
                }
                var list = [];
                docs.forEach(function(doc, index) {
                    var release = new Release(doc.title, doc.content);
                    list.push(release);
                });
                callback(err, list);
            });

        });
    });
}
