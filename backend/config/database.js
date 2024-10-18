const Sequelize = require('sequelize');
require('dotenv').config();

const DB_HOST="localhost";
const DB_USERNAME="root";
const DB_PASSWORD="392766";
const DB_DATABASE="mydb";
const DB_PORT="3306";
const DEFAULT_DOTORY = "10";

const sequelize = new Sequelize(
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  {
    host: DB_HOST || '127.0.0.1',
    port: DB_PORT || 3306,
    dialect: 'mysql'
  }
);
// const sequelize = new Sequelize(
//   process.env.DB_DATABASE,
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST || '127.0.0.1',
//     port: process.env.DB_PORT || 3306,
//     dialect: 'mysql'
//   }
// );

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection established successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

testConnection();

module.exports = sequelize;