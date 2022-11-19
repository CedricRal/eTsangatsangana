const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const Schema = require('./schema/index')

const app = express()

app.use('/graphql',graphqlHTTP({
    schema: Schema,
    graphiql: true
}))

app.listen(4000, () => console.log('The server is running in port 4000'))