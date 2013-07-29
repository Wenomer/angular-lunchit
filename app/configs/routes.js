var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
        if(username == 'admin' && password == 'admin'){
            return done(null, {username: username});
        } else {
            return done(null, false, { message: 'Incorrect username.' });
        }
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.username);
});
passport.deserializeUser(function(id, done) {
    done(null, {username: id});
});


exports.apply = function (app) {
    var acl = $.component('acl');

    app.all('*', $.beforeAction);
    app.all('/',acl.allow('admin'));

    app.get('/', $.controller('dashboard').index);
    app.get('/login', $.controller('dashboard').login);
    app.post('/login', passport.authenticate('local', { successRedirect: '/',
        failureRedirect: '/login' }));
    app.get('/logout', $.controller('auth').logout);

};