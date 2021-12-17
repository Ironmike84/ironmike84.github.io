const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.use('/documentation', express.static('public'));

app.get('/', (req, res)=>{
    res.send('This Didnt work!!')
})

app.listen(PORT, ()=>(console.log(`Listening On Port: ${PORT}`)))