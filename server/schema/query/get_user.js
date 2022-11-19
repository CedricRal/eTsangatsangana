const {GraphQLObjectType, GraphQLID,GraphQLString} = require('graphql')
const user_type = require('../../Type/users')
const {resolve} = require('../../resolvers/mutation/inscription_user')

module.exports = {
    get_user: {
        type : user_type,
        resolve
    }
}