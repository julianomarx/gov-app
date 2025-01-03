require('dotenv').config(); // importa o dotenv para poder utilizar as variáveis de ambiente pelo process.env
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;


function authenticateToken(req, res, next) {

    const token = req.cookies.jwtToken; // Token que vem dos cookies


    if(!token) { //Valida se houve entrega de token na requisicao
        return res.redirect('/');
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if(err) {
            return res.redirect('/'); // Se o o jwt.verify retornar erro ira redirecionar para /
        }

        req.user = user;
        next()
    })

}

module.exports = authenticateToken;