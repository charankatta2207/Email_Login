const sequelize = require('sequelize');
const connection = new sequelize('Email', 'root', '', {
  dialect: 'mysql',
});
exports.Conn = () => {
  connection
    .authenticate()
    .then(() => {
      console.log('connection established:');
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    });
};
const Email = connection.define('email', {
  userEmail: sequelize.STRING,
  userPassword: sequelize.STRING,
});
Email.sync().then(() => {
  console.log('table created');
});
exports.Create = function (userEmail, userPassword) {
  return Email.create({
    userEmail: userEmail,
    userPassword: userPassword,
  }).then(() => {
    return 'created';
  });
};
exports.FindAll = function () {
  return Email.findAll().then((email) => {
    return email;
  });
};
exports.FindByName = function (name) {
  return Email.findOne({where: {userEmail: name}}).then((email) => {
    if (email) {
      return 'exitsiting';
    }
    return 'not';
  });
};
exports.ValidUser = function (name, password) {
  return Email.findOne({where: {userEmail: name}}).then((user) => {
    if (user && user.dataValues.userPassword === password) {
      return 200;
    }
    return user ? 401 : 404;
  });
};
