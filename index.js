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

//-------------------------------------------------------------------------------------// GET ALL Movies
app.get('/Movies:name', (req, res) => {
  app.json(movieObject)
  let responseText = 'This will get your all your Movies!.';
  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);
})

//--------------------------------------------------------------------------------------// Single Movie
app.get('/Movies[id]:name', (req, res) => {
  app.json(movieObject)
  res.send('Here is your Movie!');
});

//--------------------------------------------------------------------------------------// Find Actor
app.get('/Movies[actor]:name', (req, res) => {
  app.json(movieObject)
  res.send('Here is the Actor Your were searching for!');
});

//--------------------------------------------------------------------------------------// Find Genre
app.get('/Movies[genre]:name', (req, res) => {
  app.json(movieObject)
  res.send('Here is the Genre Your were searching for!');
});


//--------------------------------------------------------------------------------------// Find Actor Details
app.get('/Movies[actor][id][bio]:name', (req, res) => {
  app.json(movieObject)
  res.send('Favorite Actor Has been Added!');
});


//--------------------------------------------------------------------------------------// Add Favorite Actor
app.post('/Movies[favorites][actor]:name', (req, res) => {
  app.json(movieObject)
  res.send('Favorite Actor Has been Added!');
});

//--------------------------------------------------------------------------------------// Add Favorite Movie
app.post('/Movies[favorites][movie]:name', (req, res) => {
  app.json(movieObject)
  res.send('Favorite Movie Has been Added!');
});

//--------------------------------------------------------------------------------------// Delete Favorite Actor
app.delete('/Movies[favorites][actor]:name', (req, res) => {
  app.json(movieObject)
  res.send('Favorite Actor Has been Deleted!');
});

//--------------------------------------------------------------------------------------// Delete Favorite Movie
app.delete('/Movies[favorites][movie]:name', (req, res) => {
  app.json(movieObject)
  res.send('Favorite Movie has been Deleted!');
});

//-------------------------------------------------------------------------------------// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
//-------------------------------------------------------------------------------------// Listen Request 
app.listen(3000)
