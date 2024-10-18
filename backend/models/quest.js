const { DataTypes } = require('sequelize'); 

const Quest = (sequelize) => {
const quest = sequelize.define('Quest', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  quest_name: {
    type: DataTypes.STRING(20), 
    allowNull: false
  },
  deadline_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  deadline_time: {
    type: DataTypes.TIME,
    allowNull: false
  }
}, {
  tableName: 'quest',
  timestamps: false,
});

quest.associate = (models) => {
  quest.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
};

  return quest;
};

module.exports = Quest;
