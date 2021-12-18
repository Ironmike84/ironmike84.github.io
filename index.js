const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const uuid = require('uuid');

let movieObject = [{}]

//-----------------------------------------------------------------------------------------------------// USE MORGAN (Not sure WHY?)
app.use(morgan('public'));

//-----------------------------------------------------------------------------------------------------// EXPRESS-IN PUBLIC FOLDER
app.use(express.static('public'));

app.use('/public', express.static('public'));

//-------------------------------------------------------------------------------------// GET ALL Movies
app.get('/Movies/:movies', (req, res) => {
    res.send('Here is the Movie wou were searching for!');
  })

//--------------------------------------------------------------------------------------// Single Movie
app.get('/Movies/:movie', (req, res) => {
    res.send('Here is the Movie wou were searching for!');
  });
  
//--------------------------------------------------------------------------------------// Find Actor
app.get('/Movies/actors/:actor', (req, res) => {
    res.send('Here is the Actor you were searching for!');
  });

//--------------------------------------------------------------------------------------// Find Genre
app.get('/Movies/genres/:genre', (req, res) => {
      res.send('Here is the Genre you were searching for!');
  });

//--------------------------------------------------------------------------------------// Find Actor Details
app.get('/Movies/actors/bio/:bio', (req, res) => {
      res.send('Here is the Actors Bio you were Searching for!!');
  });


//-----------------------------------------------------------------------------------------------------// GET MOVIE TITLE
app.get('/Movies/titles/:title', (req, res) => { 
  res.send('Here is the Title you were Searching for!!');
});

//--------------------------------------------------------------------------------------------------------// GET FAV MOVIE
app.get('/Users/favorites/movies/:movie', (req, res) => {
  res.send('Here is the Movie you were Searching for!!');
});

//-----------------------------------------------------------------------------------------------------// POST NEW FAV MOVIE
  app.post('/Users/favorites/movies/:movie', (req, res) => {
    res.send('New Movie Added!!');
  });
  
//--------------------------------------------------------------------------------------------------------// GET FAV ACTOR
app.get('/Users/favorites/actors/:actor', (req, res) => {
    res.send('Here is the Actor you were Searching for!!');
});

//-----------------------------------------------------------------------------------------------------// POST NEW FAV ACTOR
app.post('/Users/favorites/actors/:actor', (req, res) => {
  res.send('New Actor Added');
  });

//--------------------------------------------------------------------------------------// Delete Favorite Actor
app.delete('/Users/favorites/actors/:actor', (req, res) => {
  res.send('Actor Deleted!!');
  });

//--------------------------------------------------------------------------------------// Delete Favorite Movie
app.delete('/Users/favorites/movies/:movie', (req, res) => {
  res.send('Movie Deleted!!');
  });
  
//=================================================================================================== USER REGISTRY   

//-----------------------------------------------------------------------------------------------------// CREATE NEW USER
app.post('/Users/userNames/:username', (req, res) => {
    res.send('New User Created');
  });
//---------------------------------------------------------------------------------// Allow users to update their user information
app.put('/Users/userNames/:username', (req, res) => {
  res.send('Information Updated!!');
  });

  //---------------------------------------------------------------------------------// Allow users to update their user information
app.delete('/Users/userNames/:username', (req, res) => {
  res.send('User Deleted!!');
  });
//-----------------------------------------------------------------------------------------------------// ERROR MESSAGE
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
//-----------------------------------------------------------------------------------------------------// PORT CALL
app.listen(PORT, ()=>(console.log(`Listening On Port: ${PORT}`)));