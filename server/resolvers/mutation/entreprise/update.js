const client = require('../../../services/connection')
const { GraphQLError } = require('graphql')
const cloudinary = require('cloudinary').v2

module.exports = {
    updateEtp: (parent, args, context) => {
        try {
            if (context.token == false) {
                return new GraphQLError('token invalid', {
                    extensions: {
                        code: "token invalide"
                    }
                })
            }
            else {
                return new Promise((resolve, reject) => {
                    client.query('SELECT id FROM "Entreprises" WHERE id=$1', [args.id], function (err, result) {
                        if (!(result.rows[0])) {
                            reject(new GraphQLError('Id invalid', {
                                extensions: {
                                    code: "Input invalide"
                                }
                            }))
                        }
                        else {
                            if (!args.logo) {
                                resolve(
                                    resolve(new Promise((resolve, reject) => {
                                        client.query('UPDATE "Entreprises" SET ("nom", "adresse", "tel", "adr_fb", "type_service", "NIFSTAT", "slogan", "description", "date_abonnement", "type_abonnement", "mode_payement", "date_payement")=($1,$2,$4.$5,$6,$7,$8,$9,$10,$11,$12,$13) WHERE id=$14 RETURNING *', [args.nom, args.adresse, args.tel, args.adr_fb, args.type_service, args.NIF_STAT, args.slogan, args.description, args.date_abonnement, args.type_abonnement, args.mode_payement, args.date_payement, args.id], function (err, result) {
                                            if (err) {
                                                reject(new Error(err))
                                            }
                                            else {
                                                resolve(result.rows[0])
                                            }
                                        })
                                    }))
                                )
                            }
                            else {
                                resolve(
                                    new Promise((resolve, reject) => {
                                        resolve(new Promise((resolve, reject) => {
                                            cloudinary.config({
                                                cloud_name: "dbcebkda2",
                                                api_key: "274284662788553",
                                                api_secret: "j8mpmKXIDlGU5xBgPK8RJhQhaoE"
                                            })
                                            cloudinary.uploader.destroy(args.id, (error, results) => {
                                                if (error) {
                                                    reject(error);
                                                }
                                                else {
                                                    resolve(new Promise((resolve, reject) => {
                                                        cloudinary.uploader.upload(args.logo, { public_id: args.id }, (error, results) => {
                                                            if (error) {
                                                                reject(new GraphQLError('Url image invalide', {
                                                                    extensions: {
                                                                        code: "Input invalide"
                                                                    }
                                                                }))
                                                            }
                                                            else {
                                                                resolve(new Promise((resolve, reject) => {
                                                                    client.query('UPDATE "Entreprises" SET ("nom", "logo", "adresse", "tel", "adr_fb", "type_service", "NIFSTAT", "slogan", "description", "date_abonnement", "type_abonnement", "mode_payement", "date_payement")=($1,$2,$4.$5,$6,$7,$8,$9,$10,$11,$12,$13) WHERE id=$14 RETURNING *', [args.nom, results['url'], args.adresse, args.tel, args.adr_fb, args.type_service, args.NIF_STAT, args.slogan, args.description, args.date_abonnement, args.type_abonnement, args.mode_payement, args.date_payement, args.id], function (err, result) {
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
                                            })
                                        }))
                                    })
                                )
                            }
                        }
                    })
                })
            }
        }
        catch (e) {
            console.log(e)
        }
    }
}