const client = require('../../../services/connection')


module.exports = {
        getOnePublicites(root,args){
        try{
            return new Promise((resolve,reject) => {
                client.query('SELECT * FROM "Publicités" WHERE ("id" = $1)',[args.id],function(err,result){
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
            console.log(err)
        }
    },
}