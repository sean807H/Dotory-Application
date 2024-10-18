// models/index.js
const fs = require('fs');
const path = require('path');
const sequelize = require('../config/database'); // sequelize 인스턴스를 config에서 불러옴
const basename = path.basename(__filename);
const models = {};

// 현재 디렉토리 내 모든 모델 파일을 읽어서 sequelize에 등록
fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize);
    models[model.name] = model;
  });

// 모델 간의 관계 설정
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// sequelize 인스턴스와 모든 모델을 함께 export
models.sequelize = sequelize;

module.exports = models;

