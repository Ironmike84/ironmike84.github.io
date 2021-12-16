const express = require('express');
const { default: regex } = require('uuid/dist/regex');
const app = express()
const PORT = 8080

app.use(express.static('public'));

app.get('/', (req, res)=>{
  res.send('/public/documentation.html')
    res.send('HELLO MIKE!!!')
})

app.listen(PORT, ()=> console.log(`Listening on ${PORT}`))