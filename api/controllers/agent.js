/**
 * Created with JetBrains WebStorm.
 * User: Admin
 * Date: 28.06.13
 * Time: 17:10
 * To change this template use File | Settings | File Templates.
 */
var _ = require('underscore');

module.exports = {

    list : function (req, res) {
        Schemas.Agent.find({}, function (err, agent) {
            if (err) {
                res.send({
                    error : err
                });
                return false;
            } else {
                res.send({
                    Agent : _.map(agent, function (agent) {
                        return agent.exportToApi()
                    })
                });
            }
        });
    },

    view : function (req, res) {
        var id = req.param('id');
        Schemas.Agent.findById(id, function (err, agent) {
            if (err) {
                res.send({
                    error : err
                });

            } else {
                res.send({
                    Agent : agent.exportToApi()
                });
            }
        });
    },

    create : function (req, res) {
        var data = req.param('agent', null);

        if (data == null) {
            res.send({
                error : 'error'
            });
            return false;
        }

        var agent = new Schemas.Agent(Schemas.Agent.filterRequestData(data));

        agent.save(function (err, result) {
            if(err){
                res.send({
                    error: err
                });
                return false;
            } else {
                res.send({
                    Agent: agent.exportToApi()
                });
            }
        });
    },

    update : function (req, res) {
        var agentData = Schemas.Agent.filterRequestData(req.param('agent', {}));
        var id = req.param('id');

        if (!_.isEmpty(agentData)) {
            Schemas.Agent.findById(id, function (err, agent) {
                if (err) {
                    res.send({
                        error : err
                    });
                    return false;
                } else {
                    agent.set(agentData);
                    agent.save(function (err, result) {
                        if (err) {
                            res.send({
                                error : err
                            });
                            return false;
                        } else {
                            res.send({
                                user : agent.exportToApi()
                            });
                        }
                    });
                }
            });
        } else {
            res.send({
                error : "error"
            });
        }

    },

    remove : function (req, res) {
        var id = req.param('id');
        Schemas.Agent.remove({_id : id}, function (err, result) {
            if (err) {
                res.send({
                    error : err
                });
            } else {
                res.send({
                    id : id
                });
            }
        });
    }
}
