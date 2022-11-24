const client = require('../../services/connection')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { createClient } = require('redis')
const client_redis = createClient()



module.exports = {
    resolve(parent,args){
        try{
            return new Promise((resolve,reject) => {
                    client.query('SELECT id FROM "Users" WHERE ("mail" = $1)', [args.mail], function(err,result){
                        if(result.rowCount == 0){
                            reject(new Error("Mail " + args.mail + " est invalide"))
                        }
                        else{
                            resolve(new Promise((resolve,reject) => {client.query('SELECT mdp,id FROM "Users" WHERE ("id" = $1)',[result.rows[0].id],function(err,result) {
                                if(err){
                                    reject(new Error('Mail invalide'))
                                        }
                                else{
                                    resolve(new Promise((resolve,reject)=>{
                                        console.log(args.mail);
                                        console.log(result.rows[0].mdp);
                                        if (bcrypt.compareSync(args.mdp , result.rows[0].mdp)){
                                            const token_user = jwt.sign(
                                            { id: result.rows[0].id },
                                            'RANDOM_TOKEN_SECRET',
                                            { expiresIn: '24h' }
                                            )
                                            const user = {
                                                token: token_user,
                                                id : result.rows[0].id
                                            }
                                            async function redis(){
                                                await client_redis.connect()
                                                await client_redis.set('1', token_user)
                                                const value = await client_redis.get('1')
                                                console.log("La valeur du token qui est stocker dans le redis: "+value)
                                                client_redis.disconnect()
                                            }
                                            redis()
                                            resolve(user)
                                        }
                                        else{
                                            reject(new Error("Mot de passe de "+args.mail+" est invalide"))
                                        }
                                    }))}
                                })}))
                                    }
                                })
                            })
            }
            catch(e){
                console.log(e);
            }
        }
    }
        
    