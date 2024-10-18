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
    type: DataTypes.STRING(20),
    allowNull: false
  },
  member_pw: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dotory: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 10
  }
}, {
  tableName: 'user',
  timestamps: false,
});

 // 비밀번호 해시 처리
 user.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

  return user;
};

module.exports = User;
