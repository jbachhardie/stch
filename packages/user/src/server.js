const { GraphQLServer } = require('graphql-yoga');
const bcrypt = require('bcrypt');
const db = require('./db');

const typeDefs = 'schema.graphql';
const resolvers = {
  Query: {
    allUsers: () => db.getAllUsers(),
    user: (_obj, { id }) => db.getUserById(id),
  },
  Mutation: {
    createUser: async (_obj, { name, password }) => {
      const passwordHash = await bcrypt.hash(password, 10);
      return db.addUser({ name, passwordHash });
    },
    deleteUser: (_obj, { id }) => db.removeUser(id),
    login: async (_obj, { name, password }) => {
      const user = db.getUserByName(name);
      if (!user) throw new Error('User not found');
      if (!await bcrypt.compare(password, user.passwordHash))
        throw new Error('Invalid password');
      return true;
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
const port = 6001;
server.start({ port }, () =>
  console.log('Server is running on localhost:', port)
);
