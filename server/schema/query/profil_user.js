const {GraphQLObjectType, GraphQLID,GraphQLString} = require('graphql')
const user_type = require('../../Type/user_type')
const {resolve} = require('../../resolvers/query/profil_user')

module.exports = {
    profil_user: {
        type : user_type,
        args : {
            id : {type : GraphQLString}
        },
        resolve
    }
}