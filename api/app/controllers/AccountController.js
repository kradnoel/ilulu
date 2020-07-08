// Require the needed functions
const { sendResponse, Password, JwtAccessToken } = require('../helpers');
const models = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    async index(req, res) {
      sendResponse(res)(models.Accounts.findAll({
  	    attributes: ['id', 'username', 'isActive'],
  	    order: ['id']
  	  }));
   },

  async register(req, res) {
    const { username, password } = req.body;
    const users = await models.Accounts.findAll({
      attributes: ['username'],
	    where: {
	      username: username
	    }
	  })

    if(users.length == 0) {
      let user = {'username': username, 'password': password}

      user.password = await Password.hash(user.password)
      user.isActive = true

      user = await models.Accounts.create(user)

      sendResponse(res)(
		    Promise.resolve(
		      JwtAccessToken({username: user.username, role: user.role})
		    ).then((token) => (token)));
	  }else {
	    const message = "Username already exists in the system";
	    sendResponse(res)(
		    Promise.resolve(message).then((message) => (message)));
	  }
  },

  async login(req, res) {
    const { username, password } = req.body;
    const users = await models.Accounts.findAll({
      attributes: ['username', 'password', 'role'],
	    where: {
	      username: username
	    }
	  })

	  if(users.length == 0) {
	    const message = "User not found";
	    res.statusCode = 400

	    sendResponse(res)(
		    Promise.resolve(message).then((message) => (message)));
	  } else {
	    const user = users[0]
	    const isEqual = await Password.compare(password, user.password)

	    if(isEqual === true) {
        sendResponse(res)(
		      Promise.resolve(
		        JwtAccessToken({username: user.username, role: user.role})
		      ).then((token) => (token)));
      } else {
          const message = "User or Password is incorrect";
          res.statusCode = 401

	        sendResponse(res)(
		        Promise.resolve(message).then((message) => (message)));
      }
	  }

  }
}
