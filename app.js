require('dotenv').config(); // importa o dotenv para poder utilizar as variáveis de ambiente pelo process.env
const express = require('express');
const path = require('path');
const getToken = require('./src/getToken');
const authenticateToken = require('./src/authenticateToken')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { strict } = require('assert');

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(express.json())

const SECRET_KEY = process.env.JWT_SECRET // secret que vem o .env

app.post('/get-token', async (req, res) =>{
    try {

        const {username, password} = req.body //recebe usuario e senha do front-end

        const apiToken = await getToken(username, password) //Bate na API OHIP e recebe o Token se o login for válido

        if(!apiToken){ //valida se recebeu o token
            return res.status(401).json({ error: 'Autenticação com API externa falhou' })
        }

        console.log('bateu na api E GEROU O TOKEN   :', apiToken)

        const jwtToken = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' }); // faz assinatura do token usando o username e a secret que eu criei

        console.log('gerou o toke jwt : ' ,jwtToken)

        res.cookie('jwtToken', jwtToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 3600000
        });

        res.status(200).json({ message: 'Autenticado com sucesso!' })
        
    } catch (error) {
    console.error("Erro no login: ", error);
    res.status(500).json({ error: 'Erro interno no servidor' })
    }
})

// Definicao de rotas abaixo:

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/home', authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html')); 
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log('running on port 3000!')
})
