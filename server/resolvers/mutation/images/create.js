const client = require('../../../services/connection')
const {GraphQLError} = require('graphql')
const cloudinary = require('cloudinary').v2
const {v4: uuidv4} = require('uuid')

module.exports = {
    createImg:(parent,args,context)=>{
        if (!(context.userId)){
            return new GraphQLError('token invalid',{
                extensions:{
                    code:"token invalide"
                }
        })
        }
        else{
            return new Promise((resolve,reject)=>{
                const id = uuidv4()
                client.query('SELECT * FROM "Produits" WHERE id=$1',[args.id_produits],function(err,result){
                    if (!(result.rows[0])){
                        reject(new GraphQLError('Id produits invalide',{
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
                            cloudinary.uploader.upload(args.url, { public_id: id}, (error, results)=>{
                                if(error){
                                    console.log(error)
                                    reject(new GraphQLError('Url image invalide',{
                                        extensions:{
                                            code:"Input invalide"
                                        }
                                }))}
                                else{
                                    resolve(new Promise((resolve,reject)=>{
                                        client.query('INSERT INTO "Image_produits" (id,titre,id_produits) VALUES ($1,$2,$3) RETURNING *',[id,results['url'],args.id_produits],function(err,result){
                                            if(err){
                                                console.log(err);
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
        })
        }
    }
}