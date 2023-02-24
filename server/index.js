const {ApolloServer, ApolloError} = require('apollo-server')
const {makeExecutableSchema} = require('@graphql-tools/schema')
const {ApolloServerPluginLandingPageGraphQLPlayground, AuthenticationError} = require('apollo-server-core')
const jwt = require('jsonwebtoken')
const {isJwtExpired} = require('jwt-check-expiration')
const typeDefs = require('./schema/index')
const client_redis = require('./services/redis')
const { GraphQLError } = require('graphql')
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
            jwt.verify(token, 'RANDOM_TOKEN_SECRET',function(err,decoded){
              if (err){
                reject(new GraphQLError('token invalid',{
                  extensions:{
                      code:"token invalide"
                  }
              }))
              }
              else{
                resolve(new Promise((resolve,reject)=>{
                  console.log("jwt verifié");
                const userId = decoded.id
                if (!userId){
                  reject(new Error('Le token est invalide'))
                }
                else{
                  async function redis(){
                    await client_redis.connect()
                    const value = await client_redis.get(token)
                    console.log("token prise");
                    if (value==null){
                      console.log("context failed");
                      await client_redis.quit()
                      console.log("redis déconnecté");
                      reject(new Error('Le token est invalide'))
                    }
                    else{
                      console.log("context success");
                      await client_redis.quit()
                      console.log("redis déconnecté")
                      resolve({ userId })
                    }
                  }
                  redis()
                }
                }))
              }
            })              
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