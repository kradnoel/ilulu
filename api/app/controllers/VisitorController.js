// Require the needed functions
const { sendResponse } = require('../helpers');
const models = require('../models');
//const { store } = require('./EquipamentController');
//const Visitor = db.Visitor;
//const Op = db.Sequelize.Op;

module.exports = {
	async index(req,res) {
		sendResponse(res)(models.Visitors.findAll({
		  include: {
		    model: models.TypeDocuments,
		    attributes: ['type', 'id'],
		  },
  		order: ['entryDate', 'fullName', ]
  	}));
	},

	//async store(req,res) => {}

	async get(req, res) {
		var id = req.params.id;
		sendResponse(res)(models.Visitors.findOne({
		  include: {
		    model: models.TypeDocuments,
		    attributes: ['type', 'id'],
		  },
  		where: {
  			id: `${id}`
  		}
  	}));
	},
	async store(req,res){
		const { fullName, docNumber, typeDocument, entryDate } = req.body
		const data = {}
		//visitor.fullName = data.fullName
		//visitor.docNumber = data.docNumber
		//visitors.TypeDocumentId = data.typeDocument
		//visitor.entryDate = data.entryDate
    data.fullName = fullName
    data.docNumber = docNumber
    data.TypeDocumentId = typeDocument
    data.entryDate = entryDate

		const visitors = await models.Visitors.create(data)
		sendResponse(res)(
			Promise.resolve(
				visitors
			).then((visitors) => (visitors))
		);
	}
}
