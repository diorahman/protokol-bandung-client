var joi = require('joi');

module.exports = function (val, schema, cb) {
  if (schema == 'echo') {
    if (typeof val != 'string')
      return cb(new Error('Not string'));
    return cb(null, val);
  }
  joi.validate(val, schemas[schema], cb);
}

var schemas = {
  topup : joi.object().keys({
    reqid: joi.string().max(20).required(),
    productid: joi.string().max(10).required(),
    msisdn: joi.string().max(20).required(),
    userid: joi.string().max(32).required(),
    signature: joi.string().required(),
    trxtime: joi.date().required() // todo: min today
  }),
  status : joi.object().keys({
    reqid: joi.string().max(20).required(),
    userid: joi.string().max(32).required(),
    signature: joi.string().required()
  }),
  balance : joi.object().keys({
    reqid: joi.string().max(20).required(),
    userid: joi.string().max(32).required(),
    signature: joi.string().required()
  }),
  product : joi.object().keys({
    reqid: joi.string().max(20).required(),
    userid: joi.string().max(32).required(),
    signature: joi.string().required(),
    operator: joi.string().required()
  })
}
