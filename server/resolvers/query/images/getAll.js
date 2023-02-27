const client = require('../../../services/connection')
const { GraphQLError } = require('graphql')

module.exports = {
    getAllImg(root,args,context){
        try{
            if (context.token==false){
                return new GraphQLError('token invalid',{
                    extensions:{
                        code:"token invalide"
                    }
            })
            }
            else{
                return new Promise((resolve,reject) =>{
                    client.query('SELECT * FROM "Image_produits" LIMIT 10 OFFSET $1',[(args.page*10)],function(err,result){
                        if (err){
                            reject(err)
                        }
                        else{
                            const res = result.rows
                            
                            resolve({nbr_page: (new Promise((resolve,reject) =>{
                                client.query('SELECT COUNT(*) FROM "Image_produits"',[],function(err,result){
                                    if (err){
                                        reject(err)
                                    }
                                    else{                                    
                                        resolve(parseInt(result.rows[0]['count']/10))
                                    }
                                })
                            })
                            ) , items:res})
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