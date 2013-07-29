var express = require('express');
var RedisStore = require('connect-redis')(express),
    Db = require('mongodb').Db,
    Server = require('mongodb').Server,
    log4js = require('log4js'),
    mongoose = require('mongoose');

exports.apply = function (app) {
    app.configure('development', function () {
        app.use(express.errorHandler({
            dumpExceptions : true,
            showStack : true
        }));
        app.use(express.session({secret : 'salt12541251', store : new RedisStore(), cookie : { httpOnly : false }}));


        mongoose.connect('mongodb://admin:admin@ds031628.mongolab.com:31628/tolgadb', function (err) {
            if (err) {
                log4js.getLogger().error('Can not connect to database');
                throw err;
            }

            log4js.getLogger().info('Successfully connected to database');
        });

        app.set('port', process.env.PORT || 3004);
    });
};