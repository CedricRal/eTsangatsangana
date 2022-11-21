require('dotenv').config()
const { Client } = require('pg')

const client = new Client({
    ssl: false,
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: 'etsangatsangana',
    password: 'vinamaster',
    database: 'postgres'
});

client.connect((err) => {
    if(err)
        console.log('Unable to connect with the DataBase, error = '+ err)
    else
        console.log('Connexion to the DataBase successful')      
});


module.exports = client