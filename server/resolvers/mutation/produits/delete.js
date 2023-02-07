const client = require('../../../services/connection')

module.exports = {
    delProduit:(parent,args,context) =>{
        try{
            if (!(context.userId)){
                return new GraphQLError('token invalid',{
                    extensions:{
                        code:"token invalide"
                    }
            })
            }
            else{
                return new Promise((resolve,reject) => {
                    client.query('SELECT * FROM Produits WHERE (id=$1)',[args.id],function(err,result){
                        if(!(result.rows[0])){
                            reject(new GraphQLError('Id etp invalid',{
                                extensions:{
                                    code:"Input invalide"
                                }
                        }))
                        }
                        else{
                            resolve(new Promise((resolve,reject)=>{
                                client.query('DELETE FROM "Produits" WHERE (id=$1) RETURNING *',[args.id],function(err,result){
                                    if (err){
                                        reject(new Error(err))
                                    }
                                    else{
                                        resolve(result.rows[0])
                                    }
                                })
                            }))
                        }
                    })
                })
            }
        }
        catch(err){
            console.log(err)
        }
    }
}