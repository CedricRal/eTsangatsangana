const client = require('../../../services/connection')
const { v4: uuidv4 } = require('uuid')
const { GraphQLError } = require('graphql')

module.exports = {
    createFacture: (parent,args,context) => {
        try{
            if (context.token==false){
                return new GraphQLError('token invalid',{
                    extensions:{
                        code:"token invalide"
                    }
            })
            }
            else{
                return new Promise((resolve, reject) => {
                    const id = uuidv4()
                    client.query('SELECT id FROM "Entreprises" WHERE id=$1',[args.id_etp],function(err,result){
                        if(!(result.rows[0])){
                            reject(new GraphQLError('Id etp invalid',{
                                extensions:{
                                    code:"Input invalide"
                                }
                        }))
                        }
                        else{
                            resolve(new Promise((resolve,reject)=>{
                                client.query('INSERT INTO "Factures" ("id","date_debut", "date_fin", "montant", "statut", "id_etp") VALUES($1, $2, $3, $4, $5, $6) RETURNING *',[id, args.date_debut, args.date_fin, args.montant, args.statut, args.id_etp], function (err, result) {
                                if (err) {
                                    reject(new GraphQLError("Insert failed : " + err))
                                }
                                else {
                                    resolve(result.rows[0])
                                }
                            })})
                            )
                        }
                    })
                })
            }  
        }
        catch(e){
            console.log(e)
        }  
}
}