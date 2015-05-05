function print(err, val) {
  if (err)
    return console.log(err);
  console.log(val);
}

var protokolBandung = require('./')({
  host: '60.253.117.181',
  port: '7022',
  path: '/'
});

var message = 'hihi';
// protokol bandung in Voucha4 is fun, when you do echo, it will put '.' as prefix and suffix
protokolBandung.echo(message, print);

var request = {
  userid: '00000089',
  pin: 'test',
}

protokolBandung.balance(request, print);


