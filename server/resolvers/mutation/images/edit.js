const client = require('../../../services/connection')
const {GraphQLError} = require('graphql')
const cloudinary = require('cloudinary').v2
const {v4: uuidv4} = require('uuid')

module.exports = {
    editImg:(parent,args)=>{
        return new Promise((resolve,reject)=>{
            client.query('SELECT * FROM "Image_produits" WHERE id=$1',[args.id],function(err,result){
                if(!(result.rows[0])){
                    reject(new GraphQLError('Id invalide',{
                        extensions:{
                            code:'Input invalide'
                        }
                    }))
                }
                else{
                    resolve(new Promise((resolve,reject)=>{
                        cloudinary.config({
                            cloud_name: "dbcebkda2",
                            api_key: "274284662788553",
                            api_secret: "j8mpmKXIDlGU5xBgPK8RJhQhaoE"
                          })
                          cloudinary.uploader.destroy(args.id, (error, results)=>{
                            if(error){
                                reject(error);
                            }
                            else{
                              resolve(new Promise((resolve,reject)=>{
                                const id = uuidv4()
                                cloudinary.uploader.upload(args.url, { public_id: id}, (error, results)=>{
                                    if(error){
                                        reject(new GraphQLError('Url image invalide',{
                                            extensions:{
                                                code:"Input invalide"
                                            }
                                    }))}
                                    else{
                                        resolve(new Promise((resolve,reject)=>{
                                            client.query('UPDATE "Image_produits" SET (id,titre)=($1,$2) WHERE id=$3 RETURNING *',[id,results['url'],args.id],function(err,result){
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
                              }))
                            }
                          })
                    }))
                }
            })
        })
    }
}