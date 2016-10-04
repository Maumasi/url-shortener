const Sequelize = require('sequelize');
// const bcrypt = require('bcrypt-nodejs');
require('localenvironment');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_SCHEMA,
  port: process.env.DB_PORT,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  logging: false,
});

const user = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  tokenreq: {
    type: Sequelize.BOOLEAN,
  },
}
// ,
  // {
  //   hooks: {
  //     beforeCreate: () => {
  //       bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
  //     },
  //     afterValidate: () => {
  //       bcrypt.compareSync(user.password, this.localpassword);
  //     },
  //   },
  // }
);

const url = sequelize.define('url', {
  url: {
    type: Sequelize.STRING,
  },
  shortURL: {
    type: Sequelize.STRING,
  },
});

user.hasMany(url, {
  foreignKey: 'userID',
});

sequelize.sync();

exports.sequelize = sequelize;
exports.user = user;
exports.url = url;
