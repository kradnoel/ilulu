// Require the needed functions
const { sendResponse } = require('../helpers');
const models = require('../models');
//const { store } = require('./EquipamentController');
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
	},
	async store(req,res){
		const data = req.body
		const visitor = {}
		visitor.fullName = data.fullName
		visitor.docNumber = data.docNumber
		visitor.entryDate = data.entryDate

		
		const visitors = await models.Visitors.create(visitor)
		sendResponse(res)(
			Promise.resolve(
				visitors
			).then((visitors) => (visitors))
		);
	}
}