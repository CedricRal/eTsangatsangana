const client = require('../../../services/connection')
const { GraphQLError } = require('graphql')

module.exports = {
    updatePublicites:(parent,args) =>{
        try{
            return new Promise((resolve,reject) =>{
                client.query('SELECT id FROM "Publicités" WHERE id=$1',[args.id],function(err,result){
                    if(!(result.rows[0])){
                        reject(new GraphQLError('Id invalid',{
                            extensions:{
                                code:"Input invalide"
                            }
                    }))
                    }
                    else{
                        resolve(new Promise((resolve,reject)=>{
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
                                                    client.query('UPDATE "Publicités" SET ("titre","resume","description","prix","date_debut","date_fin","lieu","id_produits","id_etp") = ($2,$3,$4,$5,$6,$7,$8,$9,$10) WHERE (id=$1) RETURNING *',[args.id,args.titre,args.resume,args.description,args.prix,args.date_deb,args.date_fin,args.lieu,args.id_produits,args.id_etp],function(err,result){
                                                        if(err){
                                                            reject(err)
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
        catch(err){
            console.log(err)
        }
    }
}