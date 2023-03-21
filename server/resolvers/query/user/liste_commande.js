const client = require('../../../services/connection')
const { GraphQLError } = require('graphql')

module.exports = {
    listeCommandeUsers(parent,args,context){
        try{
            if (context.token==false){
                return (new GraphQLError('Id invalid',{
                    extensions:{
                        code:"Input invalide"
                    }
            }))
            }
            else{
                return new Promise((resolve,reject)=>{
                    client.query('SELECT * FROM "Users" WHERE id=$1',[args.id_users],function(err,result){
                        if(!(result.rows[0])){
                            reject(new GraphQLError('Id_etp invalid',{
                                extensions:{
                                    code:"Input invalide"
                                }
                        }))
                        }
                        else{
                            resolve(new Promise((resolve,reject)=>{
                                client.query('SELECT * FROM "Commandes" WHERE id_users=$1 LIMIT 10 OFFSET $2',[result.rows[0]['id'], (args.page * 10)],function(err,result){
                                    if(err){
                                        reject(err)
                                    }
                                    else{
                                        resolve(result.rows)
                                    }
                                })
                            }))
                        }
                    })
                })
            }
        }
        catch(err){
            console.log(err)
        }
    }
}