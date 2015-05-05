## Protokol Bandung Client

First you need to create a valid `config.json`. An example is provided in `config.example.json`

```js
protokolBandung.echo('hihi', function(err, val){
  console.log(val); // should equal '.hihi.'
});
```

See more on `test.js`.

### Test

As mentioned before, we need a valid `config.json` file.

```
$ npm install
$ npm test
```

### License

MIT
