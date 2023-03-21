const client = require('../../../services/connection')

module.exports = {
    delProduit:(parent,args,context) =>{
        try{
            if (context.token==false){
                return new GraphQLError('token invalid',{
                    extensions:{
                        code:"token invalide"
                    }
            })
            }
            else{
                return new Promise((resolve,reject) => {
                    client.query('SELECT * FROM "Produits" WHERE ("id"=$1 AND "archive"<>$2)',[args.id,1],function(err,result){
                        console.log(result);
                        if(!(result.rows[0])){
                            reject(new GraphQLError('Id etp invalid',{
                                extensions:{
                                    code:"Input invalide"
                                }   
                        }))
                        }
                        else{
                            resolve(new Promise((resolve,reject)=>{
                                client.query('UPDATE "Produits" SET archive=$1 WHERE (id=$2) RETURNING *',[1,args.id],function(err,result){
                                    if (err){
                                        reject(new Error(err))
                                    }
                                    else{
                                        const res = result.rows[0]
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