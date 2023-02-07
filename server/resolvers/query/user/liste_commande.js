const client = require('../../../services/connection')
const { GraphQLError } = require('graphql')

module.exports = {
        listeCommandeUsers(root,args,context){
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
                    client.query('SELECT * FROM "Commandes" WHERE ("id_users" = $1)',[args.id_users],function(err,result){
                        if (err){
                            console.log(err);
                            reject(err)
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
