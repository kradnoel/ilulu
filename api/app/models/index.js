'use strict';

//const Sequelize = require('sequelize');

//let dbConfig = require('../config/db.config');

//let sequelize = new Sequelize({
//  dialect: dbConfig.dialect,
//  storage: dbConfig.storage
//});

//let sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//  dialect: dbConfig.dialect,
//  dialectOptions: dbConfig.pool
//});

//let db = {};

//db.sequelize = sequelize;
//db.Sequelize = Sequelize;

//db.conta = require('./conta')(sequelize, Sequelize);
//db.tipoDocumento = require('./tipodocumento')(sequelize, Sequelize);
//db.typeDocument = require('./typeDocument')(sequelize, Sequelize);
//db.visitante = require('./visitante')(sequelize, Sequelize);
//db.individuo = require('./individuo')(sequelize, Sequelize);

//db.visitante.belongsTo(db.typeDocument, {allowNull: false});
//db.individuo.belongsTo(db.conta, {foreignKey: 'contaId', targetKey: 'id'});
//db.individuo.belongsTo(db.typeDocument, {allowNull: false});

//module.exports = db;





/*
sequelize
  .authenticate()
  .then((v) => {
    console.log('Connection has been established successfully.');
  })
  .catch((e) => {
    console.error('Unable to connect to the database:', err);
  });
*/

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require(__dirname + '/../config');

const { Logger } = require(__dirname + '/../logger');

const db = {};

let sequelize;

sequelize = new Sequelize(config.DATABASE.NAME, config.DATABASE.USERNAME, config.DATABASE.PASSWORD, {
  username: config.DATABASE.USERNAME,
  password: config.DATABASE.PASSWORD,
  database: config.DATABASE.NAME,
  host: config.DATABASE.HOSTNAME,
  dialect: config.DATABASE.DIALECT,
  dialectOptions: {
    timezone: 'Etc/GMT+2',
  },
  define: {
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci'
    },
    timestamps: true
  },
  sync: {},
  //logging: (msg) => logger.info(msg),
  logging: (msg) => Logger.verbose(
    `\x1b[36m[sequelize]\x1b[0m ${msg}`,
  ),
});

//sequelize = new Sequelize(config.DATABASE.NAME, config.DATABASE.USERNAME, config.DATABASE.PASSWORD, {
//  host: config.DATABASE.HOSTNAME,
//  dialect: config.DATABASE.DIALECT
//});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
