var debug = require('debug')('pb');
var xmlrpc = require('xmlrpc');
var crypto = require('crypto');
var randomstring = require('randomstring');
var validate = require('./validate');
var methods = ['topup', 'status', 'balance', 'product', 'echo'];

module.exports = protokolBandung;

function protokolBandung(options){
  var self = this;
  self.xmlrpc = xmlrpc.createClient(options);
  actions.forEach(function(action) {
    self[action] = function(params, cb) {
      params.reqid = params.reqid || randomstring.generate(20);
      if (params.reqid && params.pin) {
        params.signature = createSignature(params.reqid, params.pin);
        delete params.pin;
      }
      validate(params, action, function(err, value) {
        if (err)
          return cb(err);
        debug("%s", params.reqid);
        self.xmlrpc.methodCall.apply(self.xmlrpc, [action, [value], cb]);
      });
    }
  });
  this.methods = methods;
  return this;
}

function createSignature(id, pin) {
  return crypto.createHash('md5').update(pin + id).digest('hex');
}
