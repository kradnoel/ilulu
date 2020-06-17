module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "iluludb",
  dialect: "mariadb",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

//module.exports = {
//  dialect: 'sqlite',
//  storage: './database.sqlite'
//}

