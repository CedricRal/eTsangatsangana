const {auth_user} = require('./query/user/authentification_user')
const {profil_user} = require('./query/user/profil_user')
const {inscri_user} = require('./mutation/user/inscription_user')
const {create_entreprise} = require('./mutation/entreprise/create')
const {delEtp} = require('./mutation/entreprise/delete')
const {updateEtp} = require('./mutation/entreprise/update')
const {getOneEtp} = require('./query/entreprise/getOne')
const {getAllEtp} = require('./query/entreprise/getAll')

const Query = {
    auth_user,
    profil_user,
    getOneEtp,
    getAllEtp
}

const Mutation = {
    inscri_user,
    create_entreprise,
    delEtp,
    updateEtp
}

module.exports = {Query,Mutation}