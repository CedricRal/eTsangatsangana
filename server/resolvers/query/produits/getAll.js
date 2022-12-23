const client = require('../../../services/connection')

module.exports = {
    getAllProduit(parent,args){
        try{
            return new Promise((resolve,reject)=>{
                client.query('SELECT * FROM "Produits"',[],function(err,result){
                    if (err){
                        reject(new Error(err))
                    }
                    else{
                        resolve(result.rows)
                    }
                })
            })
        }
        catch(err){
            console.log(err)
        }
    }
}