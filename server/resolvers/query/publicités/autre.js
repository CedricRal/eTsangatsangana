const client = require('../../../services/connection')

module.exports={
    getOnePub:{
        entreprise:(parent,args)=>{
            return new Promise((resolve,reject)=>{
                client.query('SELECT nom FROM "Entreprises" WHERE id=$1',[parent.id_etp],function(err,result){
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(result.rows[0]['nom'])
                    }
                })
            })
        },
        produits:(parent,args)=>{
            return new Promise((resolve,reject)=>{
                client.query('SELECT titre FROM "Produits" WHERE id=$1',[parent.id_produits],function(err,result){
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(result.rows[0]['titre'])
                    }
                })
            })
        },
        image:(parent,args)=>{
            return new Promise((resolve,reject)=>{
                client.query('SELECT * FROM "Image_produits" WHERE id_produits=$1',[parent.id_produits],function(err,result){
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(result.rows)
                    }
                })
            })
        }
    },
    getAllPub:{
        nbr_page:(parent,args)=>{
            return new Promise((resolve,reject) =>{
                client.query('SELECT COUNT(*) FROM "Publicités"',[],function(err,result){
                    if (err){
                        reject(err)
                    }
                    else{                                    
                        resolve(parseInt(result.rows[0]['count']/10))
                    }
                })
            })
        }
    }
}