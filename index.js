const express = require('express');
const app = express()
const PORT = 3000

app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.send('HELLO MIKE!!!')
})

app.listen(PORT, ()=> console.log(`Listening on ${PORT}`))