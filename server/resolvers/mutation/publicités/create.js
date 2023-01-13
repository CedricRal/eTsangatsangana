const client = require('../../../services/connection')
const {v4: uuidv4} = require('uuid')
const { GraphQLError } = require('graphql')

module.exports = {
    createPublicites:(parent,args) =>{
        try{
            const id = uuidv4()
            return new Promise((resolve,reject) =>{
                client.query('SELECT id FROM "Produits" WHERE id=$1',[args.id_produits],function(err,result){
                    if (!(result.rows[0])){
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
                                        client.query('INSERT INTO "Publicités" ("id","titre","resume","description","prix","date_debut","date_fin","lieu","id_produits","id_etp") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *',[id, args.titre, args.resume, args.description, args.prix, args.date_deb, args.date_fin, args.lieu, args.id_produits, args.id_etp],function(err,result){
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
                
            })
        }
        catch(err){
            console.log(err)
        }
    }
}