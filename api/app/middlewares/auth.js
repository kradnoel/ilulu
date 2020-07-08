// Require dependencies
const jwt = require('jsonwebtoken');
const { sendResponse } = require('../helpers');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(authHeader) {
    const jwtToken = authHeader.split(' ')[1];

    jwt.verify(jwtToken, "token", (err, user) => {
      if(err) {
        res.statusCode = 403
        const message = "Authrization token is invalid";
	      sendResponse(res)(
		      Promise.resolve(message).then((message) => (message))
		    );
		    return;
      }
      req.user = user;
      next();
    });
  } else {
    res.statusCode = 401;
    const message = "Authrization token is missing";
	  sendResponse(res)(
		  Promise.resolve(message).then((message) => (message))
		);
		return;
  }
}

module.exports = auth;
