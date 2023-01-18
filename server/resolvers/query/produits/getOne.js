const client = require('../../../services/connection')
const { GraphQLError } = require('graphql')

module.exports = {
        getOneProduit(parent,args){
        try{
            return new Promise((resolve,reject) => {
                client.query('SELECT * FROM "Produits" WHERE ("id" = $1)',[args.id],function(err,result){
                    if (!(result.rows[0])){
                        reject(new GraphQLError('Id produits invalid',{
                            extensions:{
                                code:"Input invalide"
                            }
                    }))
                    }
                    else{
                        const res = result.rows[0]
                       resolve({image:(new Promise((resolve,reject)=>{
                                client.query('SELECT titre FROM "Image_produits" WHERE id_produits=$1',[res['id']],function(err,result){
                                    if (!(result.rows[0])){
                                        reject(new GraphQLError('Id invalid',{
                                            extensions:{
                                                code:"Input invalide"
                                            }
                                    }))
                                    }
                                    else{
                                        resolve(result.rows[0]['titre'])
                                    }
                                })
                       })),
                                items: res
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