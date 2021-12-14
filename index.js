// module.exports = require('./lib/express');
const express = require('express')
const app = express()


// app.use('C:/Users/TRDFRG/School/Movie_API/Documentation.html', express.static('public'));




app.get('/', function (req, res) {
  app.use('/documentation.html', express.static(__dirname + '/documentation.html'));
  res.send('Hello World')
})

app.get('/Movies', (req, res) => {
  let responseText = 'This will get your movies!.';
  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);
})

app.listen(3000)