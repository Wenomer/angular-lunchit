var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , Query = mongoose.Query
    , Model = mongoose.Model
    , ObjectId = Schema.ObjectId
    , async = require('async')
    , _ = require('underscore');

Query.prototype.with = function (method, params) {
    this.options.with = this.options.with || [];
    this.options.with.push({
        method:method,
        params:params || []
    });

    return this;
};

var execFind = Query.prototype.execFind;

Query.prototype.execFind = function (callback) {

    var query = this;
    query.options.with = query.options.with || [];

    return execFind.call(this, function (err, items) {
        if (!err) {
            async.map(items, function (item, next) {
                async.reduce(query.options.with, item, function (item, withMethod, afterWith) {
                    params = withMethod.params.slice(0); // clone params
                    params.push(function (err, modifiedItem) {
                        afterWith(err, modifiedItem);
                    });
                    item[withMethod.method].apply(item, params);
                }, function (err, item) {
                    next(err, item);
                });
            }, function (err, items) {
                callback(err, items);
            });
        } else {
            callback(err, items);
        }

    });
};

Model.findByIdOrCreate = function (id, callback) {
    if (id == null) {
        return callback(null, new this());
    } else {
        return this.findById(id, callback);
    }
};

mongoose.Query = Query;
mongoose.Model = Model;