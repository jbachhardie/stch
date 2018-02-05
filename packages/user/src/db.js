const lodashId = require('lodash-id');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

db._.mixin(lodashId);
db.defaults({ users: [] }).write();

const getAllUsers = () => db.get('users').value();

const getUserById = id =>
  db
    .get('users')
    .getById(id)
    .value();

const addUser = user =>
  db
    .get('users')
    .insert(user)
    .write();

const removeUser = id =>
  db
    .get('users')
    .removeById(id)
    .write();

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  removeUser,
};
