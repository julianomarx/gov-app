const express = require('express');
const path = require('path');
const getToken = require('./src/getToken');


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(express.json())
app.get('/', (req, res) => {
    
});

app.get('/home', (req, res) => {
    res.redirect('/home.html'); 
});

app.post('/get-token', async (req, res) =>{
    try {

        const {username, password} = req.body

        const token = await getToken(username, password)

        res.send(token)
        
    } catch (error) {
    console.log(error)
    }
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log('running on port 3000!')
})
