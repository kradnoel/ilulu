// Require the needed functions
const { sendResponse } = require('../helpers');
const models = require('../models');
//const Visitor = db.Visitor;
//const Op = db.Sequelize.Op;

class VisitorController {
  static all = async(req, res) => {
    sendResponse(res)(models.Visitors.findAll({
  		order: ['entryDate', 'fullName']
  	}));
  }

  static one = async(req, res) => {
  	var id = req.params.id;

    //var values = await models.Visitors.findAll({
    //  where: {
    //    id: `${id}`
    //  }
    //});

  	sendResponse(res)(models.Visitors.findAll({
      where: {
        id: `${id}`
      }
  	}));

    //if(values == null) {
    //  sendResponse(res)();
    //}else{
    //  sendResponse(res)(values[0]);
   // }

  	console.log(id);
  	//visitor = req.body;
  }

  static add = async(req, res) => {
  	visitor = req.body;
  }
}

/*
INSERT INTO `Visitors` (`id`, `fullName`, `docNumber`, `entryDate`, `createdAt`, `updatedAt`, `TypeDocumentId`)
VALUES ('1', 'Leon Dark', '1BCD1ASA123', '2020-06-16 00:00:00', '2020-06-16 00:00:00', '2020-06-16 00:00:00', '1'),
('2', 'Djamal dos Santos', '1BCD1ASA145', '2020-06-15 00:00:00', '2020-06-15 00:00:00', '2020-06-15 00:00:00', '1');
*/

module.exports = VisitorController;
