//-----------------------------------------------INDEX.JS------------------------------------------------------------//

//-------------------------------------------------------------------------------------// Variables
const express = require('express')
const app = express()
var morgan = require('morgan')


//-------------------------------------------------------------------------------------// USE MORGAN


app.get('/', function (req, res) {
app.use(morgan('combined'));
res.send('hello, world!')
})

//-------------------------------------------------------------------------------------// GET Documentation
app.get('/', function (req, res) {
  app.use('/documentation.html', express.static(__dirname + '/documentation.html'));
  res.send('This is the Documentation Page.')
})

//-------------------------------------------------------------------------------------// GET Movies
app.get('/movies', (req, res) => {
  app.json(movieObject)
  let responseText = 'This will get your movies!.';
  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);
})

//-------------------------------------------------------------------------------------// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
//-------------------------------------------------------------------------------------// Listen Request 
app.listen(3000)