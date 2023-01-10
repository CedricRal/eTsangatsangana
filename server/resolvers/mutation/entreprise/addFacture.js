const client = require('../../../services/connection')
const { v4: uuidv4 } = require('uuid')

module.exports = {
    createFacture: (parent,args) => {
        try{
            return new Promise((resolve, reject) => {
                const id = uuidv4()
                client.query('INSERT INTO "Factures" ("id","date_debut", "date_fin", "montant", "statut", "id_etp") VALUES($1, $2, $3, $4, $5, $6) RETURNING *',[id, args.date_debut, args.date_fin, args.montant, args.statut, args.id_etp], function (err, result) {
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