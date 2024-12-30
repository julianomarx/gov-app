require('dotenv').config(); // importa o dotenv para poder utilizar as variáveis de ambiente pelo process.env
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;


function authenticateToken(req, res, next) {

    const token = req.cookies.jwtToken; // Token que vem dos cookies


    if(!token) { //Valida se houve entrega de token na requisicao
        return res.status(401).json({ error: 'Token não fornecido' })
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if(err) {
            return res.status(403).json({ error: 'Token inválido ou expirado' })
        }

        req.user = user;
        next()
    })

}

module.exports = authenticateToken;