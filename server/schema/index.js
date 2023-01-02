const fs = require('fs')
const entreprise = fs.readFileSync("./schema/Type/entreprises.graphql",{encoding:'utf-8'})
const users = fs.readFileSync('./schema/Type/users.graphql',{encoding:'utf-8'})
const produits = fs.readFileSync('./schema/Type/produits.graphql',{encoding:'utf-8'})
const publicites = fs.readFileSync('./schema/Type/publicités.graphql',{encoding: 'utf-8'})
const typeDefs = entreprise + users + produits + publicites
module.exports = typeDefs