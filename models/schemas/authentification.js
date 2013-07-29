var mongoose = require('mongoose');
var mongooseTypes = require("mongoose-types");
var Schema = mongoose.Schema;

var AuthentificationSchema = new Schema({
    client: { type : Schema.ObjectId, ref : 'Client' },
    login: String,
    password: String

});

AuthentificationSchema.methods.exportToApi = function() {
    var authentification  = {
        client: this.client,
        login: this.login,
        password: this.password
    };
    return authentification;
};

AuthentificationSchema.statics.filterRequestData = function (data) {
    return {
        client: data.client ? data.client : null,
        login: data.login ? data.login : null,
        password: data.password ? data.password : null
    }
};

var AuthentificationModel = mongoose.model('Authentification', AuthentificationSchema, 'authentification');

module.exports = AuthentificationModel;
