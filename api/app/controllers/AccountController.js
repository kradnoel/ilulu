// Require the needed functions
const { sendResponse, Password, JwtAccessToken } = require('../helpers');
const models = require('../models');
const Language = require('../lang.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


module.exports = {
    // Retorna uma lista de contas, so para Web
    async index(req, res) {
      sendResponse(res)(models.Accounts.findAll({
  	    attributes: ['id', 'username', 'role', 'isActive'],
  	    order: ['id']
  	  }));
   },

  // Registra uma nova conta. So pode registrar quem e Operador ou Administrador, so para web
  async register(req, res) {
    const account = req.user

    if (account.role === "OPERATOR" || account.role === "ADMIN") {
      const { username, password, role, isActive } = req.body;
      const users = await models.Accounts.findAll({
        attributes: ['username'],
	      where: {
	        username: username
	      }
	    })

      if(users.length == 0) {
        let user = {
          'username': username,
          'password': password,
          'role': role,
          'isActive': isActive
        }

        user.password = await Password.hash(user.password)

        const message = `${Language.ACCOUNT_ADD_SUCCESS}`;
        user = await models.Accounts.create(user)

        //  sendResponse(res)(
		    //    Promise.resolve(
		    //      JwtAccessToken({username: user.username, role: user.role})
		    //  ).then((token) => (token)));
		    sendResponse(res)(
		      Promise.resolve(message).then((message) => (message)));
	    }else {
	      const message = `${Language.ACCOUNT_EXISTS_ERROR}`;
	      res.statusCode = 400
	      sendResponse(res)(
		      Promise.resolve(message).then((message) => (message)));
	    }

    }else {
      const message = `${Language.ACCOUNT_ADD_PERMISSION_ERROR}`;
	    res.statusCode = 400
	    sendResponse(res)(
		    Promise.resolve(message).then((message) => (message))
		  );
    }
  },

  // Login e retorna JWT Token. Web e Mobile
  async login(req, res) {
    const { username, password } = req.body;
    const users = await models.Accounts.findAll({
      attributes: ['username', 'password', 'role', 'isActive'],
      include: [
          {
            model: models.Residents,
            attributes: ['id', 'firstName', 'lastName', 'type'],
            required: false
          },
          {
            model: models.Operators,
            attributes: ['id', 'firstName', 'lastName'],
            //required: false
          }
        ],
        where: {
	        username: username
	      }
      //include: [
     // {
		 //   model: models.Persons,
		 //   attributes: ['id', 'firstName', 'lastName'],
		 //   required: true
		 // },
		 // {
		 //   model: models.Residents,
		 //   required: true
		 // }],
     // attributes: ['username', 'password', 'role'],
	  })

	  //console.log(users[0])
	  //const u = users[0]
	  //console.log(u.Person.Resident)

	  if(users.length == 0) {
	    const message = `${Language.ACCOUNT_NOT_FOUND_ERROR}`;
	    res.statusCode = 400

	    sendResponse(res)(
		    Promise.resolve(message).then((message) => (message)));
	  } else {

	    const user = users[0]

	    if (user.isActive === false) {
	      const message = `${Language.ACCOUNT_NOT_ACTIVE_ERROR}`;
	      res.statusCode = 400
	      sendResponse(res)(
		      Promise.resolve(message).then((message) => (message))
		    );

		  return;

	    }

	    const isEqual = await Password.compare(password, user.password)

	    if(isEqual === true) {
        sendResponse(res)(
		      Promise.resolve(
		        JwtAccessToken({username: user.username, role: user.role})
		      ).then((token) => (token)));
      } else {
          const message = `${Language.ACCOUNT_USER_PASSWORD_ERROR}`;
          res.statusCode = 401

	        sendResponse(res)(
		        Promise.resolve(message).then((message) => (message)));
      }
	  }
  },
  // Faz update de uma conta. So pode fazer quem e Administrador
  async modify(req, res) {

    const account = req.user

    if (account.role === "ADMIN") {
      console.log(req)
      const { id, username, password, role, isActive } = req.body;

      let tx;

      try {
        tx = await models.sequelize.transaction()

        const account = await models.Accounts.findOne({
          attributes: ['id', 'password', 'role', 'isActive'],
          where: {
	          username: username,
	          // id: id
	        }
        }, {transaction: tx})

        account.password = await Password.hash(password)
        account.role = role
        account.isActive = (isActive === 1) ? true : false

        account.save({transaction: tx}).then( async () => {
          await tx.commit()
          const message = `${Language.ACCOUNT_MODIFY_SUCCESS}`;
          sendResponse(res)(
		        Promise.resolve(message).then((message) => (message))
		      );
        })
      } catch (err) {
        await tx.rollback()
        const message = `${err.Error}`;
        console.log(err)
        res.statusCode = 400
	      sendResponse(res)(
		      Promise.resolve(message).then((message) => (message))
		    );
      }

    } else {
      const message = `${Language.ACCOUNT_MODIFY_PERMISSION_ERROR}`;
	    res.statusCode = 400
	    sendResponse(res)(
		    Promise.resolve(message).then((message) => (message))
		  );
    }

  },

  // Remove uma conta. So pode quem e Administrador. Web
  async remove(req, res) {
   const account = req.user

    if (account.role === "ADMIN") {
      const { id } = req.query
      let tx;

      try {
        tx = await models.sequelize.transaction()

        const residents = await models.Residents.findAll({
          attributes: ['id', 'AccountId'],
          where: {
	          AccountId: id
	        }
        }, {transaction: tx})

        residents.forEach( async (resident) => {
          resident.AccountId = null
          await resident.save({transaction: tx})
        });

        const user =  await models.Accounts.findOne({
          where: {
	          id: id
	        }
        }, {transaction: tx})

        await user.destroy({transaction: tx})

        await tx.commit()
        const message = `${Language.ACCOUNT_REMOVE_SUCCESS}`;
	      sendResponse(res)(
		      Promise.resolve(message).then((message) => (message))
		    );

      } catch (err) {
        await tx.rollback()
        const message = `${err.Error}`;
        console.log(err)
        res.statusCode = 400
	      sendResponse(res)(
		      Promise.resolve(message).then((message) => (message))
		    );
      }

    }else {
      const message = `${Language.ACCOUNT_REMOVE_PERMISSION_ERROR}`;
	    res.statusCode = 400
	    sendResponse(res)(
		    Promise.resolve(message).then((message) => (message))
		  );
    }
  }
}
