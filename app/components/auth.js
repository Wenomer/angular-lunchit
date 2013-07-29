var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var BrowserIDStrategy = require('passport-browserid').Strategy;

exports.apply = function (app, passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        Schemas.User.findById(id).populate('baby').exec(function (err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy(
        function (username, password, done) {
            Schemas.User.findOne({ email: username}, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { message : 'Incorrect username.' });
                }
                if (!user.isValidPassword(password)) {
                    return done(null, false, { message : 'Incorrect password.' });
                }
                return done(null, user);
            });
        }
    ));

    passport.use(new BearerStrategy(
        function(token, done) {
            Schemas.User.findOne({ _id: token }).populate('baby').exec(function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                return done(null, user, { scope: 'read' });
            });
        }
    ));

    passport.use(new BrowserIDStrategy({
            audience: 'http://newbly.local'
        },
        function(email, done) {
            Schemas.User.findOne({ email: email }).populate('baby').exec(function (err, user) {
                return done(err, user);
            });
        }
    ));
};