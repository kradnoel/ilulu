// Require the needed functions
const { sendResponse } = require('../helpers');
const models = require('../models');
//const Visitor = db.Visitor;
//const Op = db.Sequelize.Op;

module.exports = {
	async index(req,res) {
		sendResponse(res)(models.Visitors.findAll({
  		order: ['entryDate', 'fullName']
  	}));
	},
	
	//async store(req,res) => {}

	async get(req, res) {
		var id = req.params.id;
		sendResponse(res)(models.Visitors.findAll({
  		where: { 
  			id: `${id}` 
  		}
  	}));
	}
}