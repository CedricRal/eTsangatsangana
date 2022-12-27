const fs = require('fs')
const entreprise = fs.readFileSync("./schema/Type/entreprises.graphql",{encoding:'utf-8'})
const users = fs.readFileSync('./schema/Type/users.graphql',{encoding:'utf-8'})
const produits = fs.readFileSync('./schema/Type/produits.graphql',{encoding:'utf-8'})
const typeDefs = entreprise + users + produits
module.exports = typeDefs