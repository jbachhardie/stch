const { GraphQLServer } = require('graphql-yoga');
const fetch = require('node-fetch');
const { HttpLink } = require('apollo-link-http');
const {
  introspectSchema,
  makeRemoteExecutableSchema,
  mergeSchemas,
} = require('graphql-tools');

const userLink = new HttpLink({ uri: 'http://localhost:6001', fetch });
const userSchema = await introspectSchema(userLink)

const server = new GraphQLServer({ schema });
const port = 6000;
server.start({ port }, () =>
  console.log('Server is running on localhost:', port)
);
