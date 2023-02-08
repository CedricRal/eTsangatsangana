const client = require('../../../services/connection')

module.exports = {
    getOneProd:{
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
        image: (parent,args)=>{
            return new Promise((resolve,reject)=>{
                client.query('SELECT * FROM "Image_produits" WHERE id_produits=$1',[parent.id],function(err,result){
                    if (err){
                        reject(err)
                    }
                    else{
                        resolve(result.rows)
                    }
                })
       })
        }
    },
    getAllProd:{
        nbr_page:(parent,args)=>{
            return new Promise((resolve,reject) =>{
                client.query('SELECT COUNT(*) FROM "Produits"',[],function(err,result){
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