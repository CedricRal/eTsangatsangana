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
        },
        nbr_page:(parent,args)=>{
            console.log(parent.id_users);
            return new Promise((resolve,reject)=>{
                client.query('SELECT COUNT(*) FROM "Commandes" WHERE id_users=$1',[parent.id_users],function(err,result){
                    if (err){
                        reject(err)
                    }
                    else{    
                        console.log(parseInt(result.rows[0]['count']/10));                                
                        resolve(parseInt(result.rows[0]['count']/10))
                    }
                })
            })
        }
    }
}