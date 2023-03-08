const client = require('../../../services/connection')
const { GraphQLError } = require('graphql')

module.exports = {
    getAllEntreprise(root, args, context) {
        try {
            return new Promise((resolve, reject) => {
                client.query('SELECT * FROM "Entreprises" WHERE (status=$1) LIMIT 10 OFFSET $2', [0, (args.page * 10)], function (err, result) {
                    if (err) {
                        reject(err)
                    }
                    else {
                        const res = result.rows
                        resolve({ items: res })
                    }
                })
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}