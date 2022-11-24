const {GraphQLSchema, GraphQLObjectType,GraphQLID,GraphQLString} = require('graphql')
const { add_users } = require('./mutation/inscription_user')
const {profil_user} = require('./query/profil_user')
const {auth_user} = require('./query/authentification_user')

const queryAll = new GraphQLObjectType({
    name : 'query',
    fields : () => ({
        profil_user,
        auth_user
    })
})

const mutationAll = new GraphQLObjectType({
    name: 'mutation',
    fields: () => ({
        add_users
    })
})

const Schema = new GraphQLSchema({
    query : queryAll,
    mutation : mutationAll
})

module.exports = Schema

