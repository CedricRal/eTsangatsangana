const client = require('../../../services/connection')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { createClient } = require('redis')
const client_redis = createClient()

client_redis.on("connect", function () {
    console.log("Connected to Redis");
});
  
client_redis.on("error", function (err) {
console.log("Error: " + err);
})

const { GraphQLError } = require('graphql')


module.exports = {
    auth_user: (parent,args,context) => {
            try{
                return new Promise((resolve,reject) => {
                    client.query('SELECT id FROM "Users" WHERE ("mail" = $1)', [args.mail], function(err,result){
                        if(!(result)){
                            reject(reject(new GraphQLError('mail invalid',{
                                extensions:{
                                    code:"Input invalide"
                                }
                        })))
                        }
                        else{
                            resolve(new Promise((resolve,reject) => {client.query('SELECT mdp,id FROM "Users" WHERE ("id" = $1)',[result.rows[0].id],function(err,result) {
                                if(err){
                                    reject(new GraphQLError('Mail invalide'))
                                        }
                                else{
                                    resolve(new Promise((resolve,reject)=>{
                                        if (bcrypt.compareSync(args.mdp , result.rows[0].mdp)){
                                            const token_user = jwt.sign(
                                            { id: result.rows[0].id },
                                            'RANDOM_TOKEN_SECRET',
                                            {}
                                            )
                                            const user = {
                                                token: token_user,
                                                id : result.rows[0].id
                                            }
                                            async function redis(){
                                                await client_redis.connect()
                                                await client_redis.set(token_user, '1')
                                                client_redis.disconnect()
                                            }
                                            redis()
                                            resolve(user)
                                        }
                                        else{
                                            reject(reject(new GraphQLError('mot de passe invalid',{
                                                extensions:{
                                                    code:"Input invalide"
                                                }
                                        })))
                                        }
                                }))
                                }
                                })}))
                            }
                                })
                            })
            }
            catch(e){
                console.log(e);
            }
        }
    }