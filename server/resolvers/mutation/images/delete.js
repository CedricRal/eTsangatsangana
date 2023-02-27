const client = require('../../../services/connection')
const {GraphQLError} = require('graphql')
const cloudinary = require('cloudinary').v2

module.exports = {
    delImg:(parent,args,context)=>{
        if (context.token==false){
            return new GraphQLError('token invalid',{
                extensions:{
                    code:"token invalide"
                }
        })
        }
        else{
            return new Promise((resolve,reject)=>{
                cloudinary.config({
                    cloud_name: "dbcebkda2",
                    api_key: "274284662788553",
                    api_secret: "j8mpmKXIDlGU5xBgPK8RJhQhaoE"
                  })
                  cloudinary.uploader.destroy(args.id, (error, results)=>{
                    if(error){
                        reject(new GraphQLError('Id invalide',{
                            extensions:{
                                code:'Input invalide'
                            }
                        }))
                    }
                    else{
                      resolve(new Promise((resolve,reject)=>{
                        client.query('DELETE FROM "Image_produits" WHERE (id=$1) RETURNING *',[args.id],function(err,result){
                            if(err){
                                reject(new Error(err))
                            }
                            else{
                                resolve(result.rows[0])
                            }
                        })
                      }))
                    }
                  })
            })
        }
    }
}