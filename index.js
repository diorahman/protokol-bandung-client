var debug = require('debug')('pb');
var xmlrpc = require('xmlrpc');
var crypto = require('crypto');
var randomstring = require('randomstring');
var validate = require('./validate');
var methods = ['topup', 'status', 'balance', 'product', 'echo'];

xmlrpc.dateFormatter.setOpts({
  colons: true,
  hypens: true,
  local: true,
  ms: true,
  offset: true
});

module.exports = protokolBandung;

function protokolBandung(options){
  var self = this;
  self.xmlrpc = xmlrpc.createClient(options);
  methods.forEach(function(method) {
    self[method] = function(params, cb) {
      params.reqid = params.reqid || randomstring.generate(20);
      if (params.reqid && params.pin) {
        params.signature = createSignature(params.reqid, params.pin);
        delete params.pin;
      }
      validate(params, method, function(err, value) {
        if (err) {
          err.params = params;
          return cb(err);
        }
        debug("%s", params.reqid);
        self.xmlrpc.methodCall.apply(self.xmlrpc, [method, [value], cb]);
      });
    }
  });
  this.methods = methods;
  return this;
}

function createSignature(id, pin) {
  return crypto.createHash('md5').update(pin + id).digest('hex');
}
