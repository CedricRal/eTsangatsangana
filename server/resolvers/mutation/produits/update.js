const client = require('../../../services/connection')
const { GraphQLError } = require('graphql')
const { v4: uuidv4 } = require('uuid')

const cloudinary = require('cloudinary').v2

module.exports = {
    updateProduit: (parent, args, context) => {
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
                    client.query('SELECT status FROM "Produits" WHERE id=$1', [args.id], function (err, result) {
                        if (!(result.rows[0])) {
                            reject(new GraphQLError('Id invalid', {
                                extensions: {
                                    code: "Input invalide"
                                }
                            }))
                        }
                        else {
                            const status = result.rows[0]['status']
                            resolve(new Promise((resolve, reject) => {
                                client.query('SELECT adresse FROM "Entreprises" WHERE id=$1', [args.id_etp], function (err, result) {
                                    if (!(result.rows[0])) {
                                        reject(new GraphQLError('Id etp invalid', {
                                            extensions: {
                                                code: "Input invalide"
                                            }
                                        }))
                                    }
                                    else {
                                        const adresse = result.rows[0]['adresse']
                                        if (args.image) {
                                            console.log('#################Misy args.image#####################')
                                            resolve(new Promise((resolve, reject) => {
                                                cloudinary.config({
                                                    cloud_name: "dbcebkda2",
                                                    api_key: "274284662788553",
                                                    api_secret: "j8mpmKXIDlGU5xBgPK8RJhQhaoE"
                                                })
                                                cloudinary.uploader.destroy(args.id, (error, results) => {
                                                    if (error) {
                                                        reject(error)
                                                    }
                                                    else {
                                                        console.log('##################image détruis#################');
                                                        resolve(new Promise((resolve, reject) => {
                                                            cloudinary.uploader.upload(args.image, { public_id: args.id }, (error, results) => {
                                                                if (error) {
                                                                    reject(new GraphQLError('Url image invalide', {
                                                                        extensions: {
                                                                            code: "Input invalide"
                                                                        }
                                                                    }))
                                                                }
                                                                else {
                                                                    console.log('#############image upload vers cloud####################');
                                                                    console.log('id:' + args.id + ' image:' + args.image);
                                                                    resolve(new Promise((resolve, reject) => {
                                                                        client.query('UPDATE "Image_produits" SET titre=$1 WHERE id_produits=$2 RETURNING *', [results['url'], args.id], function (err, result) {
                                                                            if (err) {
                                                                                reject(err)
                                                                            }
                                                                            else {
                                                                                console.log("#########Update table image terminé################");
                                                                                if ((status == 0) && (args.status == 1)) {
                                                                                    console.log("###########status 0 >> 1 ###############");
                                                                                    const id_prod = uuidv4()
                                                                                    resolve((new Promise((resolve, reject) => {
                                                                                        client.query('INSERT INTO "Publicités" ("id","titre","resume","description","prix","lieu","id_produits","id_etp") VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *', [id_prod, args.titre, args.resume, args.description, args.prix, adresse, args.id, args.id_etp], function (err, result) {
                                                                                            if (err) {
                                                                                                reject(err)
                                                                                            }
                                                                                            else {
                                                                                                console.log('#########Insert Publicités#############');
                                                                                                resolve(new Promise((resolve, reject) => {
                                                                                                    client.query('UPDATE "Produits" SET ("titre", "resume", "description", "qt", "prix", "livraison", "place_dispo", "status", "id_etp") = ($1,$2,$3,$4,$5,$6,$7,$8,$9) WHERE (id=$10) RETURNING *', [args.titre, args.resume, args.description, args.qt, args.prix, args.livraison, args.place_dispo, args.status, args.id_etp, args.id], function (err, result) {
                                                                                                        if (err) {
                                                                                                            reject(err)
                                                                                                        }
                                                                                                        else {
                                                                                                            console.log(result.rows[0]);
                                                                                                            console.log('############Fin résolve##############');
                                                                                                            resolve(result.rows[0])
                                                                                                        }
                                                                                                    })
                                                                                                }))
                                                                                            }
                                                                                        })
                                                                                    })))
                                                                                }
                                                                                else {
                                                                                    if ((status == 1) && (args.status == 0)) {
                                                                                        console.log('#################Status 1 >> 0############');
                                                                                        resolve(new Promise((resolve, reject) => {
                                                                                            client.query('DELETE FROM "Publicités" WHERE (id_produits=$1) RETURNING *', [args.id], function (err, result) {
                                                                                                if (err) {
                                                                                                    console.log(err);
                                                                                                    reject(err)
                                                                                                }
                                                                                                else {
                                                                                                    console.log(result.rows[0]);
                                                                                                    console.log('###########Delete Publicités terminé###############');
                                                                                                    resolve(new Promise((resolve, reject) => {
                                                                                                        client.query('UPDATE "Produits" SET ("titre", "resume", "description", "qt", "prix", "livraison", "place_dispo", "status", "id_etp") = ($1,$2,$3,$4,$5,$6,$7,$8,$9) WHERE (id=$10) RETURNING *', [args.titre, args.resume, args.description, args.qt, args.prix, args.livraison, args.place_dispo, args.status, args.id_etp, args.id], function (err, result) {
                                                                                                            if (err) {
                                                                                                                console.log(err);
                                                                                                                reject(err)
                                                                                                            }
                                                                                                            else {
                                                                                                                console.log('#############Resolve terminé###############');
                                                                                                                resolve(result.rows[0])
                                                                                                            }
                                                                                                        })
                                                                                                    })
                                                                                                    )
                                                                                                }
                                                                                            })
                                                                                        }))
                                                                                    }
                                                                                    else {
                                                                                        resolve(new Promise((resolve, reject) => {
                                                                                            client.query('UPDATE "Produits" SET ("titre", "resume","description", "qt", "prix", "livraison", "place_dispo", "status", "id_etp") = ($1,$2,$3,$4,$5,$6,$7,$8,$9) WHERE (id=$10) RETURNING *', [args.titre, args.resume, args.description, args.qt, args.prix, args.livraison, args.place_dispo, status, args.id_etp, args.id], function (err, result) {
                                                                                                if (err) {
                                                                                                    console.log(err);
                                                                                                    reject(err)
                                                                                                }
                                                                                                else {
                                                                                                    console.log('#############Resolve terminé###############');
                                                                                                    resolve(result.rows[0])
                                                                                                }
                                                                                            })
                                                                                        })
                                                                                        )
                                                                                    }
                                                                                }
                                                                            }
                                                                        })
                                                                    })
                                                                    )
                                                                }
                                                            })
                                                        }))
                                                    }
                                                })
                                            }))
                                        }
                                        else {
                                            if ((status == 0) && (args.status == 1)) {
                                                const id_prod = uuidv4()
                                                client.query('INSERT INTO "Publicités" ("id","titre","resume","description","prix","lieu","id_produits","id_etp") VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *', [id_prod, args.titre, args.resume, args.description, args.prix, adresse, args.id, args.id_etp], function (err, result) {
                                                    if (err) {
                                                        reject(err)
                                                    }
                                                })
                                            }
                                            if ((status == 1) && (args.status == 0)) {
                                                client.query('DELETE FROM "Publicités" WHERE (id_produits=$1) RETURNING *', [args.id], function (err, result) {
                                                    if (err) {
                                                        reject(err)
                                                    }
                                                })
                                            }
                                            resolve(new Promise((resolve, reject) => {
                                                client.query('UPDATE "Produits" SET ("titre", "resume", "description", "qt", "prix", "livraison", "place_dispo", "status", "id_etp") = ($1,$2,$3,$4,$5,$6,$7,$8,$9) WHERE (id=$10) RETURNING *', [args.titre, args.resume, args.description, args.qt, args.prix, args.livraison, args.place_dispo, args.status, args.id_etp, args.id], function (err, result) {
                                                    if (err) {
                                                        reject(err)
                                                    }
                                                    else {
                                                        resolve(result.rows[0])
                                                    }
                                                })
                                            })
                                            )
                                        }
                                    }
                                })
                            }))
                        }
                    })
                })
            }
        }
        catch (err) {
            console.log(err)
        }
    }
}

