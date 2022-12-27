const client = require('../../../services/connection')
const { v4: uuidv4 } = require('uuid')

module.exports = {
    createProduit: (parent,args) => {
        try{
            return new Promise((resolve, reject) => {
                const id = uuidv4()
                client.query('INSERT INTO "Produits" ("id","titre", "resume", "qt", "prix", "livraison", "place_dispo", "id_etp") VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',[id, args.titre, args.resume, args.qt, args.prix, args.livraison, args.place_dispo, args.id_etp], function (err, result) {
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