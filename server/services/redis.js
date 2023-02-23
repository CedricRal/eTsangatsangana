const redis = require('redis');
const client = redis.createClient();

client.on('connect', function() {
    console.log('Connecté au serveur Redis');
})

client.on('error', function (err) {
    console.log('Erreur Redis: ' + err);
})

module.exports = client
