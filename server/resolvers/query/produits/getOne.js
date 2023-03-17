const client = require('../../../services/connection')
const { GraphQLError } = require('graphql')

module.exports = {
        getOneProduit(parent,args,context){
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
                    client.query('SELECT * FROM "Produits" WHERE ("id" = $1 AND archive <> $2)',[args.id, 0],function(err,result){
                        if (!(result.rows[0])){
                            reject(new GraphQLError('Id produits invalid',{
                                extensions:{
                                    code:"Input invalide"
                                }
                        }))
                        }
                        else{
                            console.log("-------------"+result.rows[0]);
                            resolve(result.rows[0])
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