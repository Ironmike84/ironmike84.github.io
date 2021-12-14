
const express = require('express')
const app = express()
morgan = require('morgan');

app.use(morgan('common'));


app.get('/', function (req, res) {
  app.use('/documentation.html', express.static(__dirname + '/documentation.html'));
  res.send('This is the Documentation Page.')
})

app.get('/movies', (req, res) => {
  let responseText = 'This will get your movies!.';
  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);
})

app.listen(3000)