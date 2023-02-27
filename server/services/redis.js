const redis = require('redis');
const client_redis = redis.createClient();

client_redis.connect()

client_redis.on('connect', function() {
    console.log('Connecté au serveur Redis');
})

client_redis.on('error', function (err) {
    console.log('Erreur Redis: ' + err);
})

module.exports = {client_redis}
