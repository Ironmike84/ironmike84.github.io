const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
morgan = require('morgan');

app.use(morgan('public'));

app.use(express.static('public'));

app.use('/public', express.static('public'));

app.get('/', (req, res)=>{
    res.send('This Works!!!!')
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });



app.listen(PORT, ()=>(console.log(`Listening On Port: ${PORT}`)))