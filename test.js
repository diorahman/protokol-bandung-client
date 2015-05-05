var config = require('./config.json');
var request = require('./')(config);
var lastReqId;

describe ('protokol bandung xmlrpc test', function(){
  it ('should echo your message plus dot prefix and suffix', function(done) {
    var message = 'haha';
    request.echo(message, function(err, value){
      if (err)
        return done(err);
      value.should.equal('.' + message + '.');
      done();
    });
  });

  it ('should check your balance', function(done) {
    var data = {
      userid: config.userid,
      pin: config.pin
    };
    request.balance(data, function(err, value){
      if (err)
        return done(err);
      // '000' means success!
      value.status.should.equal('000');
      done();
    });
  });

  it ('should check operator pricing', function(done){
    var data = {
      userid: config.userid,
      pin: config.pin,
      operator: 'telkomsel'
    };
    request.product(data, function(err, value){
      if (err)
        return done(err);
      value.status.should.equal('000');
      done();
    });
  });

  it ('should try to topup a number', function(done){
    // WARNING: it can take very long time
    var data = {
      userid: config.userid,
      pin: config.pin,
      msisdn: '08122039966',
      productid: 'S50',
      trxtime: new Date()
    };

    request.topup(data, function(err, value){
      if (err) 
        return done(err);
      console.log(value);
      lastReqId = value.reqid
      done();
    });
  });

  it ('should check the last request status', function(done){
    var data = {
      userid: config.userid,
      pin: config.pin,
      reqid: lastReqId
    }

    request.status(data, function(err, value){
      if (err)
        return done(err);
      console.log(value);
      done();
    });
  });
});
