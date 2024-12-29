require('dotenv').config(); // importa o dotenv para poder utilizar as variáveis de ambiente pelo process.env
const express = require('express');
const path = require('path');
const getToken = require('./src/getToken');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(express.json())

const SECRET_KEY = process.env.JWT_SECRET // secret que vem o .env

// function authenticateToken(req, resp, next) {

//     const token = 

// }


app.post('/get-token', async (req, res) =>{
    try {

        const {username, password} = req.body //recebe usuario e senha do front-end

        const apiToken = await getToken(username, password) //Bate na API OHIP e recebe o Token se o login for válido

        if(!apiToken){ //valida se recebeu o token
            return res.status(401).json({ error: 'Autenticação com API externa falhou' })
        }

        const jwtToken = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' }); // faz assinatura do token usando o username e a secret que eu criei

        console.log(jwtToken)
        console.log(apiToken)

        res.json({
            token: jwtToken
        });

        
    } catch (error) {
    console.log(error)
    }
})

// Definicao de toras abaixo:

app.get('/', (req, res) => {
    res.redirect('/')
});

app.get('/home', (req, res) => {
    res.redirect('/home.html'); 
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log('running on port 3000!')
})
