require('./_hooks');

var mongoose = require("mongoose");

var agentModel = require('./schemas/agent.js');
var authentificationModel = require('./schemas/authentification.js');

exports.Schemas = {
    Agent: agentModel,
    Authentification : authentificationModel,
};