// Require the needed functions
const { sendResponse } = require('../helpers');
const models = require('../models');
//const Visitor = db.Visitor;
//const Op = db.Sequelize.Op;

module.exports = {

 async index(req,res){
    sendResponse(res)(models.Equipaments.findAll({
        order: ['state']
    }));
 },
 async store(req,res){
    const Equipaments = await Equipaments.create(req.body)
    return res.json(Equipaments)
},
 


}
