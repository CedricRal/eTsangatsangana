const client = require('../../../services/connection')

module.exports = {
    get_role(parent,args){
        try{
            return new Promise((resolve,reject)=>{
                client.query('SELECT "id_role" FROM "Users_Roles" WHERE (id_user=$1)',[args.id_user],function (err,result){
                    if(err){
                        console.log(err);
                        reject(err)
                    }
                    else{
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
        catch(err){
            console.log(err);
        }
    }
}