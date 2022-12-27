const client = require('../../../services/connection')
const {v4: uuidv4} = require('uuid')

module.exports = {
    create_role:(parent,args) =>{
        try{
            return new Promise((resolve,reject) => {
                const id = uuidv4()
                client.query('INSERT INTO "Users_Roles" ("id","id_user","id_role") VALUES ($1,$2,$3) RETURNING *',[id, args.id_user, args.id_role],function (err,result){
                    if (err){
                        reject(err)
                    }
                    else{
                        resolve(result.rows[0])
                    }
                })
            })
        }
        catch(err){
            console.log(err);
        }
    }
}