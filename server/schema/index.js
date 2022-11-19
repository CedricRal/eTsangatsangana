const {GraphQLSchema, GraphQLObjectType,GraphQLID,GraphQLString} = require('graphql')
const { add_users } = require('./mutation/inscription_user')
const {get_user} = require('./query/get_user')

const queryAll = new GraphQLObjectType({
    name : 'query',
    fields : () => ({
        get_user
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

