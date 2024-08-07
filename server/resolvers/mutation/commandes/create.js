const client = require('../../../services/connection')
const {GraphQLError} = require('graphql')
const {v4: uuidv4} = require('uuid')
module.exports = {
    createCommande:(parent,args,context) =>{
        try{
            if (context.token==false){
                return new GraphQLError('token invalid',{
                    extensions:{
                        code:"token invalide"
                    }
            })
            }
            else{
                const id = uuidv4()
            return new Promise((resolve,reject) =>{
                client.query('SELECT id FROM "Produits" WHERE id=$1',[args.id_produits],function(err,result){
                    if(!(result.rows[0])){
                        reject(new GraphQLError('Id produits invalid',{
                            extensions:{
                                code:"Input invalide"
                            }
                    }))
                    }
                    else{
                        resolve(new Promise((resolve,reject)=>{
                            client.query('SELECT id FROM "Users" WHERE id=$1',[args.id_users],function(err,result){
                                if(!(result.rows[0])){
                                    reject(new GraphQLError('Id users invalid',{
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
                                            console.log(result.rows)
                                            resolve(new Promise((resolve,reject)=>{client.query('INSERT INTO "Commandes" ("id","qt","lieu_livraison","temps_prepa","choix_place","livraison","date","type_payement","status","id_users","id_etp","id_produits") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *',[id, args.qt, args.lieu_livraison, args.temps_prepa, args.choix_place, args.livraison, args.date, args.type_payement, args.status, args.id_users, args.id_etp, args.id_produits],function(err,result){
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
                                })
                                )
                            }
                        })
                    })
                )
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