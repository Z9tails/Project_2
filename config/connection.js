require('dotenv').config();
const fs = require("fs");
const Sequelize = require('sequelize');

console.log(process.env.DB_user)

// create connection to db
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      process.env.DB_name,
      process.env.DB_user,
      process.env.DB_password,
      {
        host: "hangover.mysql.database.azure.com",
        dialect: "mysql",
        port: 3306,
        ssl: {
          ca:fs.readFileSync('DigiCertGlobalRootCA.crt.pem')
      }
      }
    );

module.exports = sequelize;
