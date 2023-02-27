const client = require('../../../services/connection')
const { GraphQLError } = require('graphql')

module.exports = {
    get_role(parent,args,context){
        try{
            if (context.token==false){
                return new GraphQLError('token invalid',{
                    extensions:{
                        code:"token invalide"
                    }
            })
            }
            else{
                return new Promise((resolve,reject)=>{
                    client.query('SELECT "id_role" FROM "Users_Roles" WHERE (id_user=$1)',[args.id_user],function (err,result){
                        if(err){
                            console.log(err);
                            reject(err)
                        }
                        else{
                            console.log(result.rows);
                            resolve(new Promise((resolve,reject)=>{
                                console.log(result.rows[0]['id_role']);
                                client.query('SELECT "description" FROM "Rôles" WHERE (id=$1)',[result.rows[0]['id_role']],function(err,result){
                                    if (err){
                                        console.log(err);
                                        reject(err)
                                    }
                                    else{
                                        resolve(result.rows)
                                    }
                                })
                                
                            })
                            )
                        }
                    })
                })
            }
        }
        catch(err){
            console.log(err);
        }
    }
}