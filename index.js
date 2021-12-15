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
  const movieObject = {title: "Harry Potter", characters:["Harry Potter, Ron Weasley"]}
   app.json(movieObject)
  let responseText = 'This will get your all your Movies!.';
  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);
})


//-------------------------------------------------------------------------------------// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
//-------------------------------------------------------------------------------------// Listen Request 
app.listen(3000, console.log('now listening on port 3000'))
