require("dotenv").config();
const Sequelize = require("sequelize");

console.log(process.env.DB_user);

// create connection to db
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      process.env.DB_name,
      process.env.DB_user,
      process.env.DB_password,
      {
        host: "localhost",
        dialect: "mysql",
        port: 3306,
      }
      
    );

module.exports = sequelize;
