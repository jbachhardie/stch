const lodashId = require('lodash-id');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

db._.mixin(lodashId);
db.defaults({ todos: [] }).write();

const getTodosByAuthor = authorId =>
  db
    .get('todos')
    .filter({ authorId })
    .value();

const addTodo = todo =>
  db
    .get('todos')
    .insert({ ...todo, isComplete: false })
    .write();

const complete = id =>
  db
    .get('todos')
    .getById(id)
    .assign({ isComplete: true })
    .write();

const uncomplete = id =>
  db
    .get('todos')
    .getById(id)
    .assign({ isComplete: false })
    .write();

module.exports = {
  getTodosByAuthor,
  addTodo,
  complete,
  uncomplete,
};
