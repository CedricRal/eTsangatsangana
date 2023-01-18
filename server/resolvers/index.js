const {auth_user} = require('./query/user/authentification_user')
const {profil_user} = require('./query/user/profil_user')
const {inscri_user} = require('./mutation/user/inscription_user')
const {create_role} = require('./mutation/user/create_roles')
const {listeCommandeUsers} = require('./query/user/liste_commande')
const {get_role} = require('./query/user/get_role')
const {create_entreprise} = require('./mutation/entreprise/create')
const {delEtp} = require('./mutation/entreprise/delete')
const {updateEtp} = require('./mutation/entreprise/update')
const {createFacture} = require('./mutation/entreprise/addFacture')
const {getOneEtp} = require('./query/entreprise/getOne')
const {getAllEtp} = require('./query/entreprise/getAll')
const {listeCommandeEtp} = require('./query/entreprise/liste_commande')
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
const {createCommande} = require('./mutation/commandes/create')
const {getCommande} = require('./query/commandes/détails')
const {createImg} = require('./mutation/images/create')
const {delImg} = require('./mutation/images/delete')
const {editImg} = require('./mutation/images/edit')
const {getAllImg} = require('./query/images/getAll')
const {getOneImg} = require('./query/images/getOne')

const Query = {
    auth_user,
    profil_user,
    get_role,
    getOneEtp,
    getAllEtp,
    getAllProduit,
    getOneProduit,
    getAllPublicites,
    getOnePublicites,
    listeCommandeEtp,
    listeCommandeUsers,
    getCommande,
    getAllImg,
    getOneImg
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
    updatePublicites,
    createCommande,
    createFacture,
    createImg,
    delImg,
    editImg
}

module.exports = {Query,Mutation}