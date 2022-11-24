const { GraphQLID,
    GraphQLObjectType,
    GraphQLString } = require("graphql")

const connexion_user = new GraphQLObjectType({
    name: 'connexion',
    fields : () =>({
        mail : {type : GraphQLString},
        token : {type : GraphQLString},
        id : {type : GraphQLString}
    })
})

module.exports = connexion_user