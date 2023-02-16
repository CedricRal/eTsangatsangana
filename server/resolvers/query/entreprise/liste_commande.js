const client = require('../../../services/connection')
const { GraphQLError } = require('graphql')

module.exports = {
        listeCommandeEtp(root,args,context){
        try{
            return new Promise((resolve,reject)=>{
                client.query('SELECT * FROM "Entreprises" WHERE id=$1',[args.id_etp],function(err,result){
                    if(!(result.rows[0])){
                        reject(new GraphQLError('Id_etp invalid',{
                            extensions:{
                                code:"Input invalide"
                            }
                    }))
                    }
                    else{
                        resolve(new Promise((resolve,reject)=>{
                            client.query('SELECT * FROM "Commandes" WHERE id_etp=$1',[result.rows[0]['id']],function(err,result){
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
        catch(err){
            console.log(err)
        }
    },
}
