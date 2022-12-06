const client = require('../../../services/connection')
const {ApolloServer} = require('apollo-server')
const {makeExecutableSchema} = require('@graphql-tools/schema')


module.exports = {
        profil_user(root,args){
        try{
            return new Promise((resolve,reject) => {
                client.query('SELECT * FROM "Users" WHERE ("id" = $1)',[args.id],function(err,result){
                    if (err){
                        console.log(err);
                        reject(err)
                    }
                    else{
                       console.log(result.rows[0])
                       resolve(result.rows[0])
                    }
                })
            })
        }
        catch(err){
            console.log(err)
        }
    },
}
