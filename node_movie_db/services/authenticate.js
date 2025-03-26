const jwt = require('jsonwebtoken');
const users = require('../db/users');
const bcrypt = require('bcrypt');

const key = process.env.SECRET_KEY;
if (!key) {
    return res.status(404).json({message: "SECRET_KEY is not set in the .env file"});
};
// User login
const login = (req, res) => {
    //extract email and password from the request body
    const { email, password } = req.body;

    const loginUser = users.getUserByEmail(email, (user) => {
        if (user.length > 0) {
            const hashpwd = user[0].password;
            // create a jwt token
            const token = jwt.sign({userId: email}, key);
            // if password match sent the token
            if (bcrypt.compareSync(password, hashpwd)) {
                res.send({token});
            } else {
                res.sendStatus(400).end();
            }
        } else {
            res.sendStatus(400).end();
        }
    });
}

// User authentication
const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    if(!token) {
        res.sendStatus(400).end();
    }
    //verify the received token
    jwt.verify(token, key, (err, decoded) => {
        if(err) {
            res.sendStatus(400).end();
        } else {
            next();
        }
    });
}

module.exports = {
    authenticate: authenticate,
    login: login
}