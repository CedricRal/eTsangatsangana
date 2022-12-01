const {GraphQLObjectType, GraphQLID,GraphQLString} = require('graphql')
const user_type = require('../../Type/user_type')
const {resolve} = require('../../resolvers/mutation/inscription_user')

module.exports = {
    add_users: {
            type: user_type,
            args : {
                nom: {type : GraphQLString},
                prenom: {type : GraphQLString},
                num_tel: {type : GraphQLString},
                mail: {type : GraphQLString},
                adresse: {type : GraphQLString},
                photo: {type : GraphQLString},
                mdp: {type : GraphQLString},
                adr_fb : {type : GraphQLString},
                adr_gmail: {type : GraphQLString},
                id_apple : {type : GraphQLString}
            },
            resolve
    }
}