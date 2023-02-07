const client = require('../../../services/connection')
const { GraphQLError } = require('graphql')

module.exports = {
    updateProduit:(parent,args,context) =>{
        try{
            if (!(context.userId)){
                return new GraphQLError('token invalid',{
                    extensions:{
                        code:"token invalide"
                    }
            })
            }
            else{
                return new Promise((resolve,reject)=>{
                    client.query('SELECT id FROM "Produits" WHERE id=$1',[args.id],function(err,result){
                        if(!(result.rows[0])){
                            reject(new GraphQLError('Id invalid',{
                                extensions:{
                                    code:"Input invalide"
                                }
                        }))
                        }
                        else{
                            resolve(new Promise((resolve,reject)=>{
                                client.query('SELECT id FROM "Entreprises" WHERE id=$1',[args.id_etp],function(err,result){
                                    if(!(result.rows[0])){
                                        reject(new GraphQLError('Id etp invalid',{
                                            extensions:{
                                                code:"Input invalide"
                                            }
                                    }))
                                    }
                                    else{
                                        resolve(new Promise((resolve,reject)=>{
                                            client.query('UPDATE "Produits" SET ("titre", "resume", "qt", "prix", "livraison", "place_dispo", "id_etp") = ($1,$2,$3,$4,$5,$6,$7) WHERE (id=$8) RETURNING *',[args.titre, args.resume, args.qt, args.prix, args.livraison, args.place_dispo, args.id_etp,args.id],function(err,result){
                                                if(err){
                                                    reject(err)
                                                }
                                                else{
                                                    resolve(result.rows[0])
                                                }
                                            })
                                        })
                                        )
                                    }
                                })
                            }))
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