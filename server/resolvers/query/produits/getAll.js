const client = require('../../../services/connection')
const { GraphQLError } = require('graphql')

module.exports = {
    getAllProduit(root,args,context){
        try{
            return new Promise((resolve,reject) =>{
                client.query('SELECT * FROM "Produits" WHERE (id_etp=$1 AND archive <> $2) LIMIT 10 OFFSET $3',[args.id_etp,1,(args.page*10)],function(err,result){
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