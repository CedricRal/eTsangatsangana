const client = require('../../../services/connection')
const {v4: uuidv4} = require('uuid')
const { GraphQLError } = require('graphql')

module.exports = {
    create_role:(parent,args,context) =>{
        try{
            if (!(context.userId)){
                return new GraphQLError('token invalid',{
                    extensions:{
                        code:"token invalide"
                    }
            })
            }
            else{
                return new Promise((resolve,reject) => {
                    const id = uuidv4()
                    client.query('SELECT id FROM "Users" WHERE id=$1',[args.id_user],function(err,result){
                        if (!(result.rows[0])){
                            reject(new GraphQLError('Id Users invalid',{
                                extensions:{
                                    code:"Input invalide"
                                }
                        }))
                        }
                        else{
                            resolve(new Promise((resolve,reject)=>{
                                client.query('SELECT id FROM "Rôles" WHERE id=$1',[args.id_role],function(err,result){
                                    if (!(result.rows[0])){
                                        reject(new GraphQLError('Id etp invalid',{
                                            extensions:{
                                                code:"Input invalide"
                                            }
                                    }))
                                    }
                                    else{
                                        resolve(new Promise((resolve,reject)=>{
                                            client.query('INSERT INTO "Users_Roles" ("id","id_user","id_role") VALUES ($1,$2,$3) RETURNING *',[id, args.id_user, args.id_role],function (err,result){
                                                if (err){
                                                    reject(err)
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
                    })
                })
            }
        }
        catch(err){
            console.log(err);
        }
    }
}