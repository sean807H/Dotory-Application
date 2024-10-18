const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_DATABASE, 
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 3306,
      dialect: 'mysql'
    }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connected to ${process.env.DB_DATABASE} at ${process.env.DB_HOST}:${process.env.DB_PORT}`);
  } catch (err) {
    console.error(`Unable to connect to the database at ${process.env.DB_HOST}:${process.env.DB_PORT}`, err);
  }
};

testConnection();

module.exports = sequelize;