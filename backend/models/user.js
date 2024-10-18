const { DataTypes } = require('sequelize'); 

const User = (sequelize) => {
  const user = sequelize.define('User', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nickname: {
      type: DataTypes.CHAR(20),
      allowNull: false
    },
    member_pw: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    dotory: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 10
    }
  }, {
    tableName: 'user',
    timestamps: false, // 기본적으로 생성되는 createdAt, updatedAt 필드 제거
  });

  return user;
};

module.exports = User;
