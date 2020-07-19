// Require the needed functions
const { sendResponse } = require('../helpers');
const models = require('../models');
const _ = require('lodash')

module.exports = {
  async index(req, res) {
    const user = req.user
    if (user.role === "OPERATOR" || user.role === "ADMIN") {
      sendResponse(res)(models.Residents.findAll({
    	  attributes: ['id', 'firstName', 'lastName', 'type', 'AccountId'],
    	  order: ['id'],
    	  include: [
    	    {
    	      model: models.Accounts,
            attributes: ['id', 'username', 'role'],
            required: false
    	    }
    	  ]
    	}));
    } else {
      const message = "User Client dont have permission to add residents";
	    res.statusCode = 400
	    sendResponse(res)(
		    Promise.resolve(message).then((message) => (message))
		  );
    }
  },



  async store(req, res) {
    const user = req.user
    if (user.role === 'OPERATOR' || user.role === 'ADMIN') {

      const {
        firstName,
        lastName,
        type,
        birthDate,
        docNumber,
        docType,
        account
      } = req.body

      const resident = {}
      let tx;

      try {

        tx = await models.sequelize.transaction();

        const TypeDocument = await models.TypeDocuments.findOne({
          attributes: ['id'],
          where: {
            type: docType
          }
        }, {transaction: tx})

        resident.firstName = firstName
        resident.lastName = lastName
        resident.type = type
        resident.birthDate = birthDate
        resident.docNumber = docNumber
        resident.TypeDocumentId = TypeDocument.id

        if (_.isNull(account)) {
          resident.AccountId = null
        } else {
          const Account = await models.Accounts.findOne({
            attributes: ['id'],
            where:{
              username: account
            }
          },{transaction: tx})
          resident.AccountId = Account.id
        }

		    await models.Residents.create(resident, {transaction: tx})

		    await tx.commit()
		    const message = "Residente gravado com sucesso";
	      //res.statusCode = 400
	      sendResponse(res)(
		      Promise.resolve(message).then((message) => (message))
		    );

      } catch (err) {
        await tx.rollback()
        console.log(err)
        const message = `Resident nao gravado. Erro na gravacao: ${err}`;
	      res.statusCode = 400
        sendResponse(res)(
		      Promise.resolve(message).then((message) => (message))
		    );
      }

    } else {
      const message = "Utilizador sem permissoes para adicionar residentes";
	    //res.statusCode = 400
	    sendResponse(res)(
		    Promise.resolve(message).then((message) => (message))
		  );
    }
  },

  async update(req, res) {},

  async remove(req, res) {
    const account = req.user

    if (account.role === "ADMIN") {
      const { id } = req.query
      const tx = await models.sequelize.transaction()

      try {
        const resident =  await models.Residents.findOne({
          where: {
	          id: id
	        }
        }, {tx})

        await resident.destroy({tx})
        await tx.commit()
        const message = "Residente removido com sucesso";
	      sendResponse(res)(
		      Promise.resolve(message).then((message) => (message))
		    );

      } catch (err) {
        await tx.rollback()
        console.log(err)
        const message = `${err.Error}`;
        res.statusCode = 400
	      sendResponse(res)(
		      Promise.resolve(message).then((message) => (message))
		    );
      }
    }
  }
}
