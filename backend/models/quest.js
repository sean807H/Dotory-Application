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
      type: DataTypes.CHAR(20),
      allowNull: false
    },
    DeadlineDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    DeadlineTime: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    tableName: 'quest',
    timestamps: false, // 기본적으로 생성되는 createdAt, updatedAt 필드 제거
  });

  return quest;
};

module.exports = Quest;
