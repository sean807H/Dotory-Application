const sequelize = require('../config/sequelize');   

const User = require('./user')(sequelize);
const Quest = require('./quest')(sequelize);

module.exports = {
  sequelize,
  User,
  Quest
};
