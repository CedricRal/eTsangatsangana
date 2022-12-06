const {auth_user} = require('./query/user/authentification_user')
const {profil_user} = require('./query/user/profil_user')
const {inscri_user} = require('./mutation/user/inscription_user')

const Query = {
    auth_user,
    profil_user
}

const Mutation = {
    inscri_user
}

module.exports = {Query,Mutation}