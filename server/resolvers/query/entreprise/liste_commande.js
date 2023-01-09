const client = require('../../../services/connection')

module.exports = {
        listeCommandeEtp(root,args){
        try{
            return new Promise((resolve,reject) => {
                client.query('SELECT * FROM "Commandes" WHERE ("id_etp" = $1)',[args.id_etp],function(err,result){
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
