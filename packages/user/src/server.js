const { GraphQLServer } = require('graphql-yoga');
const db = require('./db');

const typeDefs = 'schema.graphql';
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

const server = new GraphQLServer({ typeDefs, resolvers });
const port = 6001;
server.start({ port }, () =>
  console.log('Server is running on localhost:', port)
);
