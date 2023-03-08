const client = require('../../../services/connection')
const { GraphQLError } = require('graphql')

module.exports = {
    getAllProduit(root,args,context){
        try{
            return new Promise((resolve,reject) =>{
                client.query('SELECT * FROM "Produits" WHERE (id_etp=$1) LIMIT 10 OFFSET $2',[args.id_etp,(args.page*10)],function(err,result){
                    if (err){
                        reject(err)
                    }
                    else{
                        const res=result.rows
                        resolve({produits:res})
                    }
                })
            })
        }
        catch(err){
            console.log(err)
        }
    }
}