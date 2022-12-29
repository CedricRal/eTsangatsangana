const client = require('../../../services/connection')

module.exports = {
    delPublicites:(parent,args) =>{
        try{
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
        catch(err){
            console.log(err)
        }
    }
}