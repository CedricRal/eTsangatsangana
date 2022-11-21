const { GraphQLID,
        GraphQLObjectType,
        GraphQLString } = require("graphql")

const users = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        id: {type : GraphQLID},
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
    })
})

module.exports = users