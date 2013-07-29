//var passport = require('passport');

exports.apply = function (app) {
//    require('../components/auth').apply(app, passport);

//    var acl = $.component('acl');

    app.all('*', $.beforeAction);

    var apiBaseUrl = '/api/v1/';

    app.get(apiBaseUrl+'agent', $.controller('agent').list);
    app.get(apiBaseUrl+'agent/:id', $.controller('agent').view);
    app.post(apiBaseUrl+'agent', $.controller('agent').create);
    app.delete(apiBaseUrl+'agent/:id', $.controller('agent').remove);
    app.put(apiBaseUrl+'agent/:id', $.controller('agent').update);
};