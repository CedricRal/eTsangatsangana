const client = require('../../../services/connection')

module.exports ={
    getOneEtp:{
        users:(parent,args)=>{
            return new Promise((resolve,reject)=>{
                client.query('SELECT id FROM "Users" WHERE id_etp=$1',[parent.id],function(err,result){
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(result.rows[0]['id'])
                    }
                })
            })
        }
    },
    getAllEtp:{
        nbr_page:(parent,args)=>{
            return new Promise((resolve,reject) =>{
                client.query('SELECT COUNT(*) FROM "Entreprises"',[],function(err,result){
                    if (err){
                        reject(err)
                    }
                    else{                                    
                        resolve(parseInt(result.rows[0]['count']/10))
                    }
                })
            })
        }
    },
    listeCmdEtp:{
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