const client = require('../../../services/connection')

module.exports={
    getCmd:{
        user:(parent,args)=>{
            return new Promise((resolve,reject)=>{
                client.query('SELECT * FROM "Users" WHERE id=$1',[parent.id_users],function(err,result){
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(result.rows[0])
                    }
                })
            })
        },
        entreprise:(parent,args)=>{
            return new Promise((resolve,reject)=>{
                client.query('SELECT * FROM "Entreprises" WHERE id=$1',[parent.id_etp],function(err,result){
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(result.rows[0])
                    }
                })
            })
        },
        produit:(parent,args)=>{
            return new Promise((resolve,reject)=>{
                client.query('SELECT * FROM "Produits" WHERE id=$1',[parent.id_produits],function(err,result){
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(result.rows[0])
                    }
                })
            })
        }
    }
}