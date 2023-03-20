const client = require('../../../services/connection')

module.exports = {
    getOneProd:{
        entreprise:(parent,args)=>{
            return new Promise((resolve,reject)=>{
                client.query('SELECT id FROM "Entreprises" WHERE id=$1',[parent.id_etp],function(err,result){
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(result.rows[0]['id'])
                    }
                })
            })
        },
        image: (parent,args)=>{
            return new Promise((resolve,reject)=>{
                client.query('SELECT titre FROM "Image_produits" WHERE id_produits=$1',[parent.id],function(err,result){
                    if (err){
                        reject(err)
                    }
                    else{
                        console.log(result.rows[0]['titre']);
                        resolve(result.rows[0]['titre'])
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