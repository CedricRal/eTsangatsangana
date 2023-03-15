const { client_redis } = require('../../../services/redis')
const { GraphQLError } = require('graphql')

module.exports = {
    verification_code: (parent, args, context) => {
        try {
            return (new Promise((resolve, reject) => {
                async function redis(){
                    const code = await client_redis.get(args.id)
                console.log(code);
                if (code == '') {
                    reject(new GraphQLError('id invalide', {
                        extensions: {
                            code: "Input invalide"
                        }
                    }))
                }
                else {
                    if (code != args.code) {
                        reject(new GraphQLError('code invalide', {
                            extensions: {
                                code: "Input invalide"
                            }
                        }))
                    }
                    else {
                        await client_redis.del(args.id)
                        await client_redis.set(args.id, 'success')
                        resolve({id:args.id})
                    }
                }
                }
                redis()
            }))
        }
        catch (err) {
            console.log(err);
        }
    }
}