// include the ENV file with database parameters
require('dotenv').config({ path: __dirname + `/../.env` });

// set up Sequelize
// This is the main class, the entry point to sequelize
// To connect to the database, you must create a Sequelize instance
const Sequelize = require('sequelize');

let sequelize;
// Option 3: Passing parameters separately (other dialects)
// this is for the public constructor
// which instantiates sequelize with name of database, username and password
// NOTE: 'JAWSDB' is for Heroku database setups
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;