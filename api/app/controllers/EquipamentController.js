// Require the needed functions
const { sendResponse } = require('../helpers');
const models = require('../models');
const { v4: uuidv4 } = require('uuid');

//const Visitor = db.Visitor;
//const Op = db.Sequelize.Op;

module.exports = {

async index(req,res) {
  sendResponse(res)(models.Equipaments.findAll({
  	attributes: ['id', 'description', 'code', 'state'],
  	order: ['state']
  }));
 },

async store(req,res) {
  var value = req.body
  value.code = uuidv4()

  const equipaments = await models.Equipaments.create(value)
  sendResponse(res)(
  	Promise.resolve(
  		equipaments
  	).then((equipaments) => (equipaments))
  );
},



}
