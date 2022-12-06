const {ApolloServer} = require('apollo-server')
const {makeExecutableSchema} = require('@graphql-tools/schema')
const fs = require('fs')
const resolvers = require('./resolvers/')

const typeDefs = fs.readFileSync('./schema/Type/users.graphql',{encoding:'utf-8'})

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: resolvers
})

const endpoint = './graphql'
const server = new ApolloServer({
    schema,
    playground: {
        tabs: [
          {
            endpoint
          },
        ],
      },
})

server.listen(4000).then(() => {
    console.log(`🚀 Server ready at https://www.graphqlbin.com/v2/new whith endpoint url = http://localhost:4000/graphql/`);
})