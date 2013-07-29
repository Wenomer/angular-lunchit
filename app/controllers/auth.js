module.exports = {

    login : function (req, res) {
        var user = req.user;

        res.send({
            user: user ? user.exportToApi() : null
        });
    },

    logout: function (req, res) {
        req.logout();
        res.redirect('/');
    }
};