// Require dependencies
const _ = require('lodash')

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
    .then(data => res.json({ status: "success", code: res.statusCode, data }))
    .catch(({ status: code = 500 }) =>
      res.status(code).json({ status: "failure", code, message: code == 404 ? `Not found!`: `Request failure!` })
    )
}

module.exports = {
  compose,
  composeAsync,
  sendResponse,
  withoutNulls
}
