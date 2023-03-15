const nodemailer = require("nodemailer");
const client = require('../../../services/connection')
const { GraphQLError } = require('graphql')
const { client_redis } = require('../../../services/redis')
const lodash = require('lodash')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'andovinamaster@gmail.com',
    pass: 'efhqwtiqkcpkrpod'
  }
});

module.exports = {
  send_mail: (parent, args, context) => {
    try {
      return (new Promise((resolve, reject) => {
        client.query('SELECT id FROM "Users" WHERE mail=$1', [args.mail], function (err, result) {
          if (!result.rows[0]) {
            reject(new GraphQLError('mail invalid', {
              extensions: {
                code: "Input invalide"
              }
            }))
          }
          else {
            const code = lodash.random(100000, 999999)
            console.log(result.rows[0]['id']);
            const mailOptions = {
              from: 'Ando Ramamonjizafy <andovinamaster@gmail.com>',
              to: args.mail,
              subject: 'Code de validation',
              text: `Voici votre code de validation ${code}`
            }

            transporter.sendMail(mailOptions, function (error, info) {
              async function redis(){
                if (error) {
                  console.log(error);
                  reject(new GraphQLError("Erreur d‘envoie"))
                } else {
                  console.log('Email sent: ' + info.response);
                  await client_redis.set(result.rows[0]['id'],code)
                  resolve({id:result.rows[0]['id']})
                }
              }
              redis()
            })
          }
        })
      }))
    }
    catch (err) {
      console.log(err)
    }
  }
}