const {makeExecutableSchema} = require('graphql-tools')
const {gql} = require('graphql-tag')
const {ApolloServer} = require('apollo-server')
const {ApolloServerPluginLandingPageGraphQLPlayground} = require('apollo-server-core')

const typeDefs = gql`
    type book{
        titre:String
        author:author
    }
    type author{
        nom:String
    }
    type Query{
        hello:book
    }
`

const resolvers = {
    Query:{
        hello(parent,args){
            return {titre:"title",author:"5"}
        }
    },
    book:{
        author:(parent,args)=>{
            return {nom:"bonjour"}
        }
        
    }
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
})

server.listen(4000).then(()=>{
    console.log('Server ready in host localhost:4000');
})