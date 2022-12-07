const {ApolloServer, ApolloError} = require('apollo-server')
const {makeExecutableSchema} = require('@graphql-tools/schema')
const fs = require('fs')
const resolvers = require('./resolvers/')
const {ApolloServerPluginLandingPageGraphQLPlayground, AuthenticationError} = require('apollo-server-core')
const jwt = require('jsonwebtoken')
const { createClient } = require('redis')
const client_redis = createClient()

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
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: ({req}) => {
      return new Promise((resolve,reject) =>{
        const token = req.headers['authorization']
        try{
          const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
          const userId = decodedToken.id
          if (!userId){
            reject(new Error('Le token est invalide'))
          }
          else{
            async function redis(){
              await client_redis.connect()
              const value = await client_redis.get(token)
              if (value==null){
                reject(new Error('Le token est invalide'))
                client_redis.disconnect()
              }
              else{
                resolve({ userId })
                client_redis.disconnect()
              }
          }
          redis()
          }
        }
        catch{
          reject(new Error('Le token est invalide'))
        }
      })
      
    }
})

server.listen(4000).then(({url}) => {
    console.log(`🚀 Server ready at ${url}`);
})