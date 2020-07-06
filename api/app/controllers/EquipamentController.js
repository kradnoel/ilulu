// Require the needed functions
const { sendResponse } = require('../helpers');
const models = require('../models');
const { v4: uuidv4 } = require('uuid');

//const Visitor = db.Visitor;
//const Op = db.Sequelize.Op;

module.exports = {

async index(req,res) {
  const user = req.user;

  //console.log(user);

  //if(user.role == 'CLIENT') {
  //  console.log(`Cliente leshe`);
  // }


  sendResponse(res)(models.Equipaments.findAll({
  	attributes: ['id', 'description', 'code', 'state'],
  	order: ['state']
  }));
 },

async store(req,res) {

  const data = req.body
  const equipament = {}
  equipament.description = data.description
  equipament.state = data.state
  equipament.code = uuidv4()

  const equipaments = await models.Equipaments.create(equipament)
  sendResponse(res)(
  	Promise.resolve(
  		equipaments
  	).then((equipaments) => (equipaments))
  );
},

async modify(req, res) {
  const data = req.body
  const equipament = await models.Equipaments.findByPk(data.id)

  if (equipament == null) {
    sendResponse(res)(
  	  Promise.resolve(
  		  equipament
  	  ).then((equipaments) => (equipaments))
    );
  }else{
    equipament.description = data.description
    equipament.state = data.state
    equipament.save()
    sendResponse(res)(
  	  Promise.resolve(
  		  equipament
  	  ).then((equipament) => (equipament))
    );
  }

}



}
