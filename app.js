require('dotenv').config();
const express = require('express');
const path = require('path');
const getToken = require('./src/getToken');
const authenticateToken = require('./src/authenticateToken');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();

const SECRET_KEY = process.env.JWT_SECRET;

// Middlewares Globais
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware de Log
app.use((req, res, next) => {
    console.log('📄 Requisição para:', req.method, req.originalUrl);
    next();
});

// Rotas Específicas (devem vir ANTES do express.static)
app.get('/', (req, res) => {
    console.log('✅ Rota / acessada');

    // Obtém o token do cookie
    const token = req.cookies.jwtToken;

    console.log('acessou o bendito token', token);

    if (token) {
        // Tenta verificar o token
        try {
            const user = jwt.verify(token, SECRET_KEY); // Verifica se o token é válido usando a chave secreta
            console.log('Token válido!', user);

            // Se o token for válido, redireciona para /home
            return res.redirect('/home');
        } catch (err) {
            console.log('Token inválido ou expirado!', err.message);
        }
    }

    // Se não houver token ou ele for inválido, retorna a página de login
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post('/get-token', async (req, res) => {
    try {
        const { username, password } = req.body;
        const apiToken = await getToken(username, password);

        if (!apiToken) {
            return res.status(401).json({ error: 'Autenticação com API externa falhou' });
        }

        console.log('Token API:', apiToken);

        const jwtToken = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log('Token JWT:', jwtToken);

        res.cookie('jwtToken', jwtToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 3600000
        });

        res.status(200).json({ message: 'Autenticado com sucesso!', ok: true });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
});

app.get('/home', authenticateToken, (req, res) => {
    console.log('✅ Rota /home acessada');
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/liberar-aptos', authenticateToken, (req, res) => {
    console.log('Acessou rota /liberar-aptos');
    res.sendFile(path.join(__dirname, 'public', 'liberar-aptos.html'))
})

// Middleware de Arquivos Estáticos (deve vir por último)
app.use(express.static('public'));

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log('🚀 Servidor rodando na porta 3000!');
});
