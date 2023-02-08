const client = require('../../../services/connection')
const { GraphQLError } = require('graphql')

module.exports = {
    getAllPublicites(root,args,context){
        try{
            if (!(context.userId)){
                return new GraphQLError('token invalid',{
                    extensions:{
                        code:"token invalide"
                    }
            })
            }
            else{
                return new Promise((resolve,reject) =>{
                    client.query('SELECT * FROM "Publicités" LIMIT 10 OFFSET $1',[(args.page*10)],function(err,result){
                        if (err){
                            reject(err)
                        }
                        else{
                            const res = result.rows
                            resolve({items:res})
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