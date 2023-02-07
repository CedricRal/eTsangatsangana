const client = require('../../../services/connection')
const { GraphQLError } = require('graphql')

module.exports = {
        listeCommandeEtp(root,args,context){
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
                    client.query('SELECT * FROM "Commandes" WHERE ("id_etp" = $1)',[args.id_etp],function(err,result){
                        if (!(result.rows[0])){
                            reject(new GraphQLError('Id invalid',{
                                extensions:{
                                    code:"Input invalide"
                                }
                        }))
                        }
                        else{
                           resolve(result.rows)
                        }
                    })
                }) 
            }
        }
        catch(err){
            console.log(err)
        }
    },
}
