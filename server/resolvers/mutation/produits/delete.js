const client = require('../../../services/connection')

module.exports = {
    delProduit:(parent,args) =>{
        try{
            return new Promise((resolve,reject) => {
                client.query('DELETE FROM "Produits" WHERE (id=$1) RETURNING *',[args.id],function(err,result){
                    if (err){
                        reject(new Error(err))
                    }
                    else{
                        resolve(result.rows[0])
                    }
                })
            })
        }
        catch(err){
            console.log(err)
        }
    }
}