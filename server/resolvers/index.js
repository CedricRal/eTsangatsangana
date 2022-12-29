const {auth_user} = require('./query/user/authentification_user')
const {profil_user} = require('./query/user/profil_user')
const {inscri_user} = require('./mutation/user/inscription_user')
const {create_role} = require('./mutation/user/create_roles')
const {get_role} = require('./query/user/get_role')
const {create_entreprise} = require('./mutation/entreprise/create')
const {delEtp} = require('./mutation/entreprise/delete')
const {updateEtp} = require('./mutation/entreprise/update')
const {getOneEtp} = require('./query/entreprise/getOne')
const {getAllEtp} = require('./query/entreprise/getAll')
const {createProduit} = require('./mutation/produits/create')
const {delProduit} = require('./mutation/produits/delete')
const {updateProduit} = require('./mutation/produits/update')
const {getAllProduit} = require('./query/produits/getAll')
const {getOneProduit} = require('./query/produits/getOne')
const {createPublicites} = require('./mutation/publicités/create')
const {delPublicites} = require('./mutation/publicités/delete')
const {updatePublicites} = require('./mutation/publicités/update')
const {getAllPublicites} = require('./query/publicités/getAll')
const {getOnePublicites} = require('./query/publicités/getOne')

const Query = {
    auth_user,
    profil_user,
    get_role,
    getOneEtp,
    getAllEtp,
    getAllProduit,
    getOneProduit,
    getAllPublicites,
    getOnePublicites
}

const Mutation = {
    inscri_user,
    create_role,
    create_entreprise,
    delEtp,
    updateEtp,
    createProduit,
    delProduit,
    updateProduit,
    createPublicites,
    delPublicites,
    updatePublicites
}

module.exports = {Query,Mutation}