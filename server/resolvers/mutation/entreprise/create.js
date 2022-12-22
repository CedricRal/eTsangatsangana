const client = require('../../../services/connection')
const { v4: uuidv4 } = require('uuid')

module.exports = {
    create_entreprise: (parent,args) => {
        try{
            return new Promise((resolve, reject) => {
                const id = uuidv4()
                client.query('INSERT INTO "Entreprises" ("id","nom", "logo", "adresse", "tel", "adr_fb", "type_service", "NIFSTAT", "slogan", "description", "date_abonnement", "type_abonnement", "mode_payement", "date_payement", "id_users") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *',[id, args.nom, args.logo, args.adresse, args.tel, args.adr_fb, args.type_service, args.NIF_STAT, args.slogan, args.description, args.date_abonnement, args.type_abonnement, args.mode_payement,args.date_payement, args.id_users], function (err, result) {
                    if (err) {
                        console.log(err)
                        reject(new Error("Insert failed : " + err))
                    }
                    else {
                        resolve(result.rows[0])
                    }
                })
            })
    }
        catch(e){
            console.log(e)
        }  
}
}