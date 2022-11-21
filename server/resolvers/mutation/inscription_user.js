const client = require('../../services/connection')
const users = require('../../Type/users')
const bcrypt = require('bcryptjs')


module.exports = {
    resolve: (parent,args) => {
        try{
            return new Promise((resolve, reject) => {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(args.mdp, salt)
                client.query('INSERT INTO "Users" ("nom", "prenom", "num_tel", "mail", "adresse", "photo", "mdp", "adr_fb", "adr_gmail", "id_apple") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',[args.nom, args.prenom, args.num_tel, args.mail, args.adresse, args.photo, hash, args.adr_fb, args.adr_gmail, args.id_apple], function (err, result) {
                    if (err) {
                        console.log(err)
                        reject(new Error("Insert failed : " + err))
                    }
                    else {
                        resolve(result.rows[0])
                        console.log(result.rows[0]);
                    }
                })
            })
                /*let user = {id : result.rowCount, nom: args.nom , prenom: args.prenom, num_tel: args.num_tel, mail: args.mail, adresse: args.adresse, photo: args.photo, mdp: args.mdp, adr_fb: args.adr_fb, adr_gmail: args.adr_gmail, id_apple: args.id_apple}
                return user*/
    }
        catch(e){
            console.log(e)
        }
        
}
}