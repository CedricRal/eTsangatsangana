const client = require('../../../services/connection')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const { GraphQLError } = require('graphql')
const regexMail = require('../../../regex/mail')

module.exports = {
    inscri_user: (parent,args,context) => {
        try{
            return new Promise((resolve, reject) => {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(args.mdp, salt)
                const id = uuidv4()
                if(!(regexMail.test(args.mail))){
                    reject(new GraphQLError('mail invalid',{
                        extensions:{
                            code:"Input invalide"
                        }
                }))
                }
                else{
                    resolve(new Promise((resolve,reject)=>{
                        client.query('SELECT * FROM "Users" WHERE (mail=$1)',[args.mail],function(err,result){
                            if(result.rows[0]){
                                reject(new GraphQLError('mail déja existé',{
                                    extensions:{
                                        code:"Input invalide"
                                    }
                                }))
                            }
                            else{
                                resolve(new Promise((resolve,reject)=>{
                                    client.query('INSERT INTO "Users" ("id","nom", "prenom", "num_tel", "mail", "adresse", "photo", "mdp", "adr_fb", "adr_gmail", "id_apple") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11) RETURNING *',[id,args.nom, args.prenom, args.num_tel, args.mail, args.adresse, args.photo, hash, args.adr_fb, args.adr_gmail, args.id_apple], function (err, result) {
                                        if (err) {
                                            console.log(err)
                                            reject(new Error("Insert failed : " + err))
                                        }
                                        else {
                                            resolve(result.rows[0])
                                        }
                                    })
                                }))
                            }
                        })
                    }))
                }      
            })
        }
        catch(e){
            console.log(e)
        }  
}
}