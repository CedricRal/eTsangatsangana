const client = require('../../../services/connection')
const { GraphQLError } = require('graphql')

module.exports = {
        getOnePublicites(root,args){
        try{
            return new Promise((resolve,reject) => {
                client.query('SELECT * FROM "Publicités" WHERE ("id" = $1)',[args.id],function(err,result){
                    if (!(result.rows[0])){
                        reject(new GraphQLError('Id invalid',{
                            extensions:{
                                code:"Input invalide"
                            }
                    }))
                    }
                    else{
                        const res = result.rows[0]
                        resolve({
                            image:(new Promise((resolve,reject)=>{
                            client.query('SELECT * FROM "Image_produits" WHERE id_produits=$1',[res['id_produits']],function(err,result){
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
                       })),
                       items:res
                    })
                    }
                })
            })
        }
        catch(err){
            console.log(err)
        }
    },
}