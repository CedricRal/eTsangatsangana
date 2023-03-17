const client = require('../../../services/connection')
const { GraphQLError } = require('graphql')
const bcrypt = require('bcryptjs')
const regexMail = require('../../../regex/mail')

module.exports = {
    update_user: (parent, args, context) => {
        try {
            if (context.token == false) {
                return new GraphQLError('token invalid', {
                    extensions: {
                        code: "token invalide"
                    }
                })
            }
            else {
                return (new Promise((resolve, reject) => {
                    client.query('SELECT mail FROM "Users" WHERE id=$1', [args.id_user], function (err, result) {
                        console.log(result.rows);
                        if (!(result.rows[0]['mail'])) {
                            reject(new GraphQLError('Id Users invalid', {
                                extensions: {
                                    code: "Input invalide"
                                }
                            }))
                        }
                        else {
                            if (!(regexMail.test(args.mail))) {
                                reject(new GraphQLError('mail invalid', {
                                    extensions: {
                                        code: "Input invalide"
                                    }
                                }))
                            }
                            else {
                                resolve(new Promise((resolve, reject) => {
                                    client.query('SELECT mail FROM "Users" WHERE (mail<>$1 AND mail=$2)', [result.rows[0]['mail'], args.mail], function (err, result) {
                                        console.log(result.rows);
                                        if (result.rows[0]) {
                                            reject(new GraphQLError('email déja éxisté', {
                                                extensions: {
                                                    code: "Input invalide"
                                                }
                                            }))
                                        }
                                        else {
                                            const salt = bcrypt.genSaltSync(10)
                                            const hash = bcrypt.hashSync(args.mdp, salt)
                                            resolve(new Promise((resolve, reject) => {
                                                client.query('UPDATE "Users" SET ("nom", "prenom", "num_tel", "mail", "adresse", "photo", "mdp", "adr_fb", "adr_gmail", "id_apple")=($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) WHERE id=$11 RETURNING *', [args.nom, args.prenom, args.num_tel, args.mail, args.adresse, args.photo, hash, args.adr_fb, args.adr_gmail, args.id_apple, args.id_user], function (err, result) {
                                                    if (err) {
                                                        reject(new Error(err))
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
                        }
                    })
                }))
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}
