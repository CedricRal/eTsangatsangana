const client = require('../../../services/connection')

module.exports = {
    getAllPublicites(root,args){
        try{
            return new Promise((resolve,reject) =>{
                client.query('SELECT * FROM "Publicités"',[],function(err,result){
                    if (err){
                        reject(err)
                    }
                    else{
                        resolve(result.rows)
                    }
                })
            })
        }
        catch(err){
            console.log(err)
        }
    }
}