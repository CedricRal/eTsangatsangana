const client = require('../../../services/connection')
const { v4: uuidv4 } = require('uuid')
const { GraphQLError } = require('graphql')
const cloudinary = require('cloudinary').v2

module.exports = {
    create_entreprise: (parent,args,context) => {
        try{
            if (context.token==false){
                return new GraphQLError('token invalid',{
                    extensions:{
                        code:"token invalide"
                    }
            })
            }
            else {
                return new Promise((resolve, reject) => {
                    const id = uuidv4()
                    cloudinary.config({
                        cloud_name: "dbcebkda2",
                        api_key: "274284662788553",
                        api_secret: "j8mpmKXIDlGU5xBgPK8RJhQhaoE"
                    })
                    cloudinary.uploader.upload(args.logo, { public_id: id }, (error, results) => {
                        if (error) {
                            console.log(error)
                            reject(new GraphQLError('Url image invalide', {
                                extensions: {
                                    code: "Input invalide"
                                }
                            }))
                        }
                        else{
                            resolve(new Promise((resolve, reject) => {
                                client.query('INSERT INTO "Entreprises" ("id","nom", "logo", "adresse", "tel", "adr_fb", "type_service", "NIFSTAT", "slogan", "description", "date_abonnement", "type_abonnement", "mode_payement", "date_payement","status", "heure_ouverture","heure_fermeture") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,$17) RETURNING *', [id, args.nom, results['url'], args.adresse, args.tel, args.adr_fb, args.type_service, args.NIF_STAT, args.slogan, args.description, args.date_abonnement, args.type_abonnement, args.mode_payement, args.date_payement, 0, args.heure_ouverture, args.heure_fermeture], function (err, result) {
                                    if (err) {
                                        console.log(err)
                                        reject(new Error("Insert failed : " + err))
                                    }
                                    else {
                                        resolve(result.rows[0])
                                    }
                                })
                            })
                            )
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