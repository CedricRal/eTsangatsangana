const client = require('../../../services/connection')

module.exports={
    listeCmdUsers:{
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