const client = require('../../../services/connection')
module.exports = {
    getAllEtp(root,args){
        try{
            return new Promise((resolve,reject) =>{
                client.query('SELECT * FROM "Entreprises" LIMIT 10 OFFSET $1',[(args.page*10)],function(err,result){
                    if (err){
                        reject(err)
                    }
                    else{
                        const res = result.rows
                        
                        resolve({nbr_page: (new Promise((resolve,reject) =>{
                            client.query('SELECT COUNT(*) FROM "Entreprises"',[],function(err,result){
                                if (err){
                                    reject(err)
                                }
                                else{                                    
                                    resolve(parseInt(result.rows[0]['count']/10))
                                }
                            })
                        })
                        ) , items:res})
                    }
                })
            })
        }
        catch(err){
            console.log(err)
        }
    }
}