// Require dependencies
const _ = require('lodash')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const config = require('./config')

///////////////////////////////////////////////////////////////////////////////
// UTILITY FUNCTIONS
///////////////////////////////////////////////////////////////////////////////

/**
 _ Filters null values from array
 _ and returns an array without nulls
**/
const withoutNulls = (arr) =>
  _.isArray(arr) ? arr.filter(val => !_.isNull(val)) : _[_]

/**
 _ Compose function arguments starting from right to left
 _ to an overall function and returns the overall function
**/
const compose = (...fns) => (arg) => {
  return _.flattenDeep(fns).reduceRight((current, fn) => {
    if (_.isFunction(fn)) return fn(current);
    throw new TypeError("compose() expects only functions as parameters.");
  }, arg)
}

/**
 _ Compose async function arguments starting from right to left
 _ to an overall async function and returns the overall async function
**/
const composeAsync = (...fns) => arg => {
  return _.flattenDeep(fns).reduceRight(async (current, fn) => {
    if (_.isFunction(fn)) return fn(await current)
    throw new TypeError("compose() expects only functions as parameters.");
  }, arg)
}

/**
 _ Handles the request(Promise) when it is fulfilled
 _ and sends a JSON response to the HTTP response stream(res).
**/
const sendResponse = (res) => async (request) => {
  return await request
    .then(data => {
      if(res.statusCode === 200) {
        res.json({ status: "success", code: res.statusCode, data })
        return
      }else{
        res.json({ status: "error", code: res.statusCode, data })
      }
    })
    .catch(({ status: code = 500 }) =>
      res.status(code).json({ status: "error", code, message: code == 404 ? `Not found!`: `Request failure!` })
    )
}

/**
 _ Class that handle password encryption and password compare
**/

class Password {
  /**
 _ Recieve password string
 _ and return hashed password.
**/
  static hash = async (password) => {
    const hashed = await bcrypt.hash(password, 10)
    return hashed
  }

  static compare = async (candidatePassword, hashedPassword) => {
    const isEqual = await bcrypt.compare(candidatePassword, hashedPassword)
    return isEqual
  }
}

/**
 _ Recieve Object
 _ and return jwt token.
**/
const JwtAccessToken = (value) => {
  const {username, role } = value
  const token = jwt.sign({username: username, role: role}, config.JWT.SECRET)
  return token
}

module.exports = {
  compose,
  composeAsync,
  sendResponse,
  withoutNulls,
  Password,
  JwtAccessToken
}
