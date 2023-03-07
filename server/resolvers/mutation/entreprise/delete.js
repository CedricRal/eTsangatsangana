const client = require('../../../services/connection')


module.exports = {
        delEtp: (root,args,context) => {
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
                    client.query('UPDATE "Entreprises" SET status=$1 WHERE ("id" = $2) RETURNING *',[1,args.id],function(err,result){
                        if (err){
                            console.log(err);
                            reject('Id of entreprise is undefined')
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
    },
}