// Require the needed functions
const { sendResponse } = require('../helpers');
const models = require('../models');
const Language = require('../lang.js')

module.exports = {
  async index(req, res) {
    const user = req.user
    if (user.role === "OPERATOR" || user.role === "ADMIN") {
      sendResponse(res)(models.Operators.findAll({
    	  // attributes: ['id', 'firstName', 'lastName', 'AccountId'],
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
      const message = `${Language.OPERATOR_FETCH_ERROR}`;
	    res.statusCode = 400
	    sendResponse(res)(
		    Promise.resolve(message).then((message) => (message))
		  );
    }
  },

  async getById(req, res) {
    const user = req.user
    if (user.role === "OPERATOR" || user.role === "ADMIN") {
      const id = req.params.id
      sendResponse(res)(models.Operators.findOne({
        attributes: [
          'id',
          'firstName',
          'lastName',
          'docNumber',
          'birthDate',
          'AccountId',
          'TypeDocumentId'
        ],
        include: [
    	    {
    	      model: models.Accounts,
            attributes: ['id', 'username', 'role'],
            required: false
    	    }
    	  ],
        where: {
	        id: id
	      }
      }))

    } else {
      const message = `${Language.OPERATOR_FETCH_ERROR}`;
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
        birthDate,
        docNumber,
        TypeDocumentId,
        AccountId
      } = req.body

      const operador = {}
      const transaction = await models.sequelize.transaction();

      try {

		    await models.Operators.create({
		      firstName: firstName,
		      lastName: lastName,
		      docNumber: docNumber,
		      birthDate: birthDate,
		      TypeDocumentId: TypeDocumentId,
		      AccountId: AccountId
		    }, {transaction})

		    await transaction.commit()
		    const message = "Operador criado com sucesso";
	      sendResponse(res)(
		      Promise.resolve(message).then((message) => (message))
		    );

      } catch (err) {
        await transaction.rollback()
        const message = `Operador nao foi criado com sucesso: ${err}`;
	      res.statusCode = 400
        sendResponse(res)(
		      Promise.resolve(message).then((message) => (message))
		    );
      }

    } else {
      const message = "O utilizador nao tem permissoes para adicionar um operador";
	    res.statusCode = 400
	    sendResponse(res)(
		    Promise.resolve(message).then((message) => (message))
		  );
    }
  },

  async modify(req, res) {
    const user = req.user
    if (user.role === 'OPERATOR' || user.role === 'ADMIN') {

      const {
        firstName,
        lastName,
        birthDate,
        docNumber,
        docType,
        account
      } = req.body

    } else {
      const message = "O utilizador nao tem permissoes para modificar dados de um operador";
	    res.statusCode = 400
	    sendResponse(res)(
		    Promise.resolve(message).then((message) => (message))
		  );
    }
  }
}
