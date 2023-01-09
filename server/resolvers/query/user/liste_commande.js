const client = require('../../../services/connection')

module.exports = {
        listeCommandeUsers(root,args){
        try{
            return new Promise((resolve,reject) => {
                client.query('SELECT * FROM "Commandes" WHERE ("id_users" = $1)',[args.id_users],function(err,result){
                    if (err){
                        console.log(err);
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
    },
}
