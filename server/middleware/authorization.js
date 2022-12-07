const jwt = require('jsonwebtoken');
const express = require('express')
const {graphqlHTTP} = require('express-graphql')

const app = express()

const token_user = jwt.sign(
    { id: 1 },
    'RANDOM_TOKEN_SECRET',
    { expiresIn: '24h' }
    )

const validation = (req, res, next) => {
    const { authorization } = req.headers
        console.log(req.headers)
        const decodedToken = jwt.verify(authorization, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
    if(!userId){
        res.status(401).json('Erreur user')
    }
    else{
	    next()
    }*/
    console.log(req.headers)
    next()
}

module.exports = {validation}