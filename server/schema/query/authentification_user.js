const {GraphQLObjectType,GraphQLString} = require('graphql')
const { resolve } = require('../../resolvers/query/authentification_user')
const connexion_user = require('../../Type/connexion_users')

module.exports = {
    auth_user: {
        type : connexion_user,
        args : {
            mail : {type : GraphQLString},
            mdp : {type : GraphQLString}
        },
        resolve
    }
}