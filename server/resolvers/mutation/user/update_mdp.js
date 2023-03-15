const {client_redis} = require('../../../services/redis')
const client = require('../../../services/connection')
const { GraphQLError } = require('graphql')
const bcrypt = require('bcryptjs')

module.exports = {
    update_mdp:(parent,args,context)=>{
        return(new Promise((resolve,reject)=>{
            async function redis(){
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(args.mdp, salt)
                const state = await client_redis.get(args.id)
            if (state!='success'){
                reject(new GraphQLError('id invalid', {
                    extensions: {
                      code: "Input invalide"
                    }
                  }))
            }
            else{
                resolve(new Promise((resolve,reject)=>{
                    client.query('SELECT * FROM "Users" WHERE id=$1',[args.id],function(err,result){
                        if(!result.rows){
                            reject(new GraphQLError('id invalid', {
                                extensions: {
                                  code: "Input invalide"
                                }
                              }))
                        }
                        else{
                            resolve(new Promise((resolve,reject)=>{
                                client.query('UPDATE "Users" SET mdp=$1 WHERE id=$2 RETURNING *',[hash,args.id],function(err,result){
                                    if(err){
                                        reject(new GraphQLError(err))
                                    }
                                    else{
                                        resolve(result.rows[0])
                                    }
                                })
                            }))
                        }
                    })
                }))
            }
            }
            redis()
        }))
    }
}