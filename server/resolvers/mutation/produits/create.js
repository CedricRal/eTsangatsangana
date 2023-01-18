const client = require('../../../services/connection')
const { v4: uuidv4 } = require('uuid')
const { GraphQLError } = require('graphql')
const cloudinary = require('cloudinary').v2

module.exports = {
    createProduit: (parent,args) => {
        try{
            return new Promise((resolve, reject) => {
                client.query('SELECT id FROM "Entreprises" WHERE id=$1',[args.id_etp],function(err,result){
                    if (!(result.rows[0])){
                        reject(new GraphQLError('Id etp invalid',{
                            extensions:{
                                code:"Input invalide"
                            }
                    }))
                    }
                    else{
                        resolve(new Promise((resolve,reject)=>{
                            const id = uuidv4()
                            cloudinary.config({
                                cloud_name: "dbcebkda2",
                                api_key: "274284662788553",
                                api_secret: "j8mpmKXIDlGU5xBgPK8RJhQhaoE"
                            })
                            cloudinary.uploader.upload(args.image, { public_id: id}, (error, results)=>{
                                if(error){
                                    reject(new GraphQLError('Url image invalide',{
                                        extensions:{
                                            code:"Input invalide"
                                        }
                                }))
                                }
                                else{
                                    resolve(new Promise((resolve,reject)=>{
                                        client.query('INSERT INTO "Produits" ("id","titre", "resume", "qt", "prix", "livraison", "place_dispo", "id_etp") VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',[id, args.titre, args.resume, args.qt, args.prix, args.livraison, args.place_dispo, args.id_etp], function (err, result) {
                                            if (err) {
                                                console.log(err)
                                                reject(new Error("Insert failed : " + err))
                                            }
                                            else {
                                                const res = result.rows[0]
                                                const id = uuidv4()
                                                resolve(new Promise((resolve,reject)=>{
                                                    client.query('INSERT INTO "Image_produits" ("id","titre","id_produits") VALUES($1,$2,$3) RETURNING *',[id,results['url'],res['id']],function(err,result){
                                                        if(err){
                                                            reject(new Error('Error: '+err))
                                                        }
                                                        else{
                                                            resolve({image:results['url'] ,items: res})
                                                        }
                                                    })
                                                }))
                                            }
                                        })
                                    }))
                                    
                                    
                                }
                            })
                            
                        }) 
                        )
                    }
                })
            })
    }
        catch(e){
            console.log(e)
        }  
}
}