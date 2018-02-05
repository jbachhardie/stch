const { GraphQLServer } = require('graphql-yoga');
const db = require('./db');

const typeDefs = 'schema.graphql';
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

const server = new GraphQLServer({ typeDefs, resolvers });
const port = 6002;
server.start({ port }, () =>
  console.log('Server is running on localhost:', port)
);
