const client = require('../../../services/connection')


module.exports = {
        delEtp: (root,args) => {
        try{
            return new Promise((resolve,reject) => {
                client.query('DELETE FROM "Entreprises" WHERE ("id" = $1) RETURNING *',[args.id],function(err,result){
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
        catch(err){
            console.log(err)
        }
    },
}