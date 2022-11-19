const client = require('../../services/connection')


module.exports = {
    resolve: (parent,args) => {
        const user = {id : args.id, nom : args.nom, prenom : args.prenom, num_tel : args.num_tel, mail : args.mail, adresse : args.adresse, photo : args.photo, mdp : args.mdp, adr_fb : args.adr_fb, adr_mail : args.adr_gmail, id_apple : args.id_apple}
        try{
            return new Promise((resolve, reject) => {
                client.query('INSERT INTO "Users" ("id", "nom", "prenom", "num_tel", "mail", "adresse", "photo", "mdp", "adr_fb", "adr_gmail", "id_apple") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',[user.id, user.nom, user.prenom, user.num_tel, user.mail, user.adresse, user.photo, user.mdp, user.adr_fb, user.adr_gmail, user.id_apple], function (err, result) {
                    if (err) {
                        console.log(err)
                        reject(new Error("Insert failed : " + err))
                    }
                    else {
                        resolve(true)
                    }
                })
            })
        }
        catch(e){
            console.log(e)
        }
        return user
}
}