const client = require('../../../services/connection')
const { GraphQLError } = require('graphql')

module.exports = {
        getCommande(root,args,context){
        try{
            if (context.token==false){
                return (new GraphQLError('Id invalid',{
                    extensions:{
                        code:"Input invalide"
                    }
            }))
            }
            else{
                return new Promise((resolve,reject) => {
                client.query('SELECT * FROM "Commandes" WHERE ("id" = $1)',[args.id],function(err,result){
                    if (!(result.rows[0])){
                        reject(new GraphQLError('Id invalid',{
                            extensions:{
                                code:"Input invalide"
                            }
                    }))
                    }
                    else{
                       resolve(result.rows[0])
                    }
                })
            })}
        }
        catch(err){
            console.log(err)
        }
    },
}
