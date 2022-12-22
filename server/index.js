const {ApolloServer, ApolloError} = require('apollo-server')
const {makeExecutableSchema} = require('@graphql-tools/schema')
const { createClient } = require('redis')
const {ApolloServerPluginLandingPageGraphQLPlayground, AuthenticationError} = require('apollo-server-core')
const jwt = require('jsonwebtoken')
const typeDefs = require('./schema/index')

const resolvers = require('./resolvers/index')

const client_redis = createClient()

const schema = makeExecutableSchema({
  typeDefs: typeDefs ,
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
    /*context: ({req}) => {
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
        catch(err){
          new Error(err)
        }
      })
    }
})

server.listen(4000).then(({url}) => {
    console.log(`🚀 Server ready at ${url}`);
})