// Require the needed functions
const { sendResponse } = require('../helpers');
const models = require('../models');
const Language = require('../lang.js')

module.exports = {
	async index(req,res) {
		sendResponse(res)(models.TypeDocuments.findAll({
		  attributes: ['type', 'id']
  	}));
	}
}
