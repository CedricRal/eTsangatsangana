const client = require('../../../services/connection')
const { GraphQLError } = require('graphql')

module.exports = {
        getOnePublicites(root,args,context){
        try{
            return new Promise((resolve,reject) => {client.query('SELECT * FROM "Publicités" WHERE ("id" = $1)',[args.id],function(err,result){
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
            })
            }
        catch(err){
            console.log(err)
        }
    }
}