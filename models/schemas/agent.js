var mongoose = require('mongoose');
var mongooseTypes = require("mongoose-types");
mongooseTypes.loadTypes(mongoose, "email");
mongooseTypes.loadTypes(mongoose, "url");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Email = mongoose.SchemaTypes.Email;


var AgentSchema = new Schema({
    status: {
        type: String,
        enum: [0,1,2],
        default: 1,
        required: true
    },
    score: Number,
    location: String,
    balance: {
        amount: {
            type: Number,
            min: 0
        },
        company_name: {
            type: String,
            required: true
        }
    },

    agent_profile: {type: Schema.ObjectId, ref: 'AgentProfile'}
});

AgentSchema.methods.exportToApi = function() {
    var agent  = {
        id: this.id,
        agent_profile: this. agent_profile.ExportToApi(),
        status: this.status,
        score: this.score,
        location: this.location,
        balance: this.balance
    };
    return agent;
};

AgentSchema.methods.getLevel = function(){
       return this.score;
};

AgentSchema.statics.filterRequestData = function (data) {
    return {
        score: data.score ? data.score : null,
        status: data.status ? data.status : null,
        location: data.location ? data.location : null,
        balance: {
            company_name: data.balance && data.balance.company_name ? data.balance.company_name : null,
            amount: data.balance && data.balance.amount ? data.balance.amount : null
        }

    }
};

var AgentModel = mongoose.model('Agent', AgentSchema, 'agent');

module.exports = AgentModel;
