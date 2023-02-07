const client = require('../../../services/connection')

module.exports = {
    delPublicites:(parent,args,context) =>{
        try{
            if (!(context.userId)){
                return new GraphQLError('token invalid',{
                    extensions:{
                        code:"token invalide"
                    }
            })
            }
            else{
                return new Promise((resolve,reject) =>{
                    client.query('DELETE FROM "Publicités" WHERE (id=$1) RETURNING *',[args.id],function(err,result){
                        if(err){
                            reject(err)
                        }
                        else{
                            resolve(result.rows[0])
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