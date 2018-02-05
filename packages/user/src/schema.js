const { importSchema } = require('graphql-import');
const { makeExecutableSchema } = require('graphql-tools');
const db = require('./db');

const typeDefs = importSchema('schema.graphql');
const resolvers = {
  Query: {
    allUsers: () => db.getAllUsers(),
    user: (_obj, { id }) => db.getUserById(id),
  },
  Mutation: {
    createUser: (_obj, { name }) => db.addUser({ name }),
    deleteUser: (_obj, { id }) => db.removeUser(id),
  },
};

module.exports = makeExecutableSchema({ typeDefs, resolvers });
