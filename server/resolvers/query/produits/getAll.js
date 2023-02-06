const client = require('../../../services/connection')

module.exports = {
    getAllProduit(root,args){
        try{
            return new Promise((resolve,reject) =>{
                client.query('SELECT * FROM "Produits" LIMIT 10 OFFSET $1',[(args.page*10)],function(err,result){
                    if (err){
                        reject(err)
                    }
                    else{
                        const res = result.rows
                        resolve({nbr_page: (new Promise((resolve,reject) =>{
                            client.query('SELECT COUNT(*) FROM "Produits"',[],function(err,result){
                                if (err){
                                    reject(err)
                                }
                                else{                                    
                                    resolve(parseInt(result.rows[0]['count']/10))
                                }
                            })
                        })
                        ) , produit:res,
                            image:(new Promise((resolve,reject)=>{
                                client.query('SELECT * FROM "Image_produits"',[],function(err,result){
                                    if (err){
                                        reject(new Error(err))
                                    }
                                    else{
                                        resolve(result.rows)
                                    }
                                })
                            }))
                        })
                    }
                })
            })
        }
        catch(err){
            console.log(err)
        }
    }
}