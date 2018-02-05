const { importSchema } = require('graphql-import');
const { makeExecutableSchema } = require('graphql-tools');
const db = require('./db');

const typeDefs = importSchema('schema.graphql');
const resolvers = {
  Query: {
    todosByAuthor: (_obj, { authorId }) => db.getTodosByAuthor(authorId),
  },
  Mutation: {
    createTodo: (_obj, { authorId, title }) => db.addTodo({ authorId, title }),
    completeTodo: (_obj, { id }) => db.complete(id),
    uncompleteTodo: (_obj, { id }) => db.uncomplete(id),
  },
};

module.exports = makeExecutableSchema({ typeDefs, resolvers });
