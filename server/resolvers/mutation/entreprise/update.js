const client = require('../../../services/connection')
const { GraphQLError } = require('graphql')

module.exports = {
    updateEtp: (parent,args,context) => {
        try{
            return new Promise((resolve, reject) => {
                client.query('SELECT id FROM "Entreprises" WHERE id=$1',[args.id],function(err,result){
                    if (!(result.rows[0])){
                        reject(new GraphQLError('Id invalid',{
                            extensions:{
                                code:"Input invalide"
                            }
                    }))
                    }
                    else{
                        resolve(new Promise((resolve,reject)=>{
                            client.query('SELECT id FROM "Users" WHERE id=$1',[args.id_users],function(err,result){
                                if (!(result.rows[0])){
                                    reject(new GraphQLError('Id users invalid',{
                                        extensions:{
                                            code:"Input invalide"
                                        }
                                }))
                                }
                                else{
                                    resolve(new Promise((resolve,reject)=>{
                                        client.query('UPDATE "Entreprises" SET ("nom", "logo", "adresse", "tel", "adr_fb", "type_service", "NIFSTAT", "slogan", "description", "date_abonnement", "type_abonnement", "mode_payement", "date_payement", "id_users") = ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) WHERE (id=$15) RETURNING *',[args.nom, args.logo, args.adresse, args.tel, args.adr_fb, args.type_service, args.NIF_STAT, args.slogan, args.description, args.date_abonnement, args.type_abonnement, args.mode_payement,args.date_payement, args.id_users, args.id], function (err, result) {
                                            if (err) {
                                                console.log(err)
                                                reject(new Error("update failed : " + err))
                                            }
                                            else {
                                                resolve(result.rows[0])
                                            }
                                        })
                                    }))
                                }
                            })
                        })
                        )
                    }
                })
            })
    }
        catch(e){
            console.log(e)
        }  
}
}