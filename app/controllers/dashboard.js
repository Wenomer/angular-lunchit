module.exports = {
    index: function(req, res){
        res.render('index', { title: 'LunchIt!' });
    },

    login: function(req, res) {
        res.render('login', { title: 'LunchIt!' });
    }
};