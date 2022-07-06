const mysql = require('mysql2');

// Connect to the database
const db = mysql.createConnection(
    {
        host: 'localHost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'BibbityWibbity?!4',
        database: 'card_game'
    },
    console.log('Connected to the card_game database.')
); 

module.exports = db;