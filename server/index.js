const {ApolloServer, ApolloError} = require('apollo-server')
const {makeExecutableSchema} = require('@graphql-tools/schema')
const {ApolloServerPluginLandingPageGraphQLPlayground, AuthenticationError} = require('apollo-server-core')
const jwt = require('jsonwebtoken')
const {isJwtExpired} = require('jwt-check-expiration')
const typeDefs = require('./schema/index')
const client_redis = require('./services/redis')
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
        return {token:false}
      }
      else{
        return new Promise((resolve,reject) =>{
          try{
            const token = req.headers['authorization']
            console.log('TokenExpired is:', isJwtExpired(token))
            jwt.verify(token, 'RANDOM_TOKEN_SECRET',function(err,decoded){
              if (err){
                resolve({token:false})
              }
              else{
                resolve(new Promise((resolve,reject)=>{
                  console.log("jwt verifié");
                const userId = decoded.id
                if (!userId){
                  console.log("token invalide");
                  resolve({token:false})
                }
                else{
                  async function redis(){
                    if (client_redis.connected){
                      await client_redis.quit()
                    }
                    else{
                      await client_redis.connect()
                    }
                    const value = await client_redis.get(token)
                    await client_redis.quit()
                    await console.log("redis déconnecté");
                    if (client_redis.connected){
                      await client_redis.quit()
                    }
                    else{
                        await console.log("token prise");
                      if (value==null){
                        await console.log("token non stocké dans le redis");
                        
                        await resolve({token:false})
                      }
                      else{
                        await console.log("context success");
                        await console.log("redis déconnecté")
                        await resolve({token:true, userId })
                      }
                    }
                    
                  }
                  redis()
                }
                }))
              }
            })              
          }
          catch(err){
            client_redis.quit()
          }
        })
      }
    }
})

server.listen(4000).then(({url}) => {
    console.log(`🚀 Server ready at ${url}`);
})