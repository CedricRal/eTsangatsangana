const {ApolloServer, ApolloError} = require('apollo-server')
const {makeExecutableSchema} = require('@graphql-tools/schema')
const {ApolloServerPluginLandingPageGraphQLPlayground, AuthenticationError} = require('apollo-server-core')
const jwt = require('jsonwebtoken')
const {isJwtExpired} = require('jwt-check-expiration')
const typeDefs = require('./schema/index')
const { createClient } = require('redis')
const client_redis = createClient()

client_redis.on("connect", function () {
    console.log("Connected to Redis");
});
  
client_redis.on("error", function (err) {
console.log("Error: " + err);
})

const resolvers = require('./resolvers/index')

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
    context: ({req}) => {
      if (!(req.headers['authorization'])){
        return 0
      }
      else{
        return new Promise((resolve,reject) =>{
          try{
            const token = req.headers['authorization']
            console.log('TokenExpired is:', isJwtExpired(token))
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
    }
})

server.listen(4000).then(({url}) => {
    console.log(`🚀 Server ready at ${url}`);
})