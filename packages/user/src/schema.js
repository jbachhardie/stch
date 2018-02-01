const { importSchema } = require('graphql-import');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = importSchema('schema.graphql');
const resolvers = {};

module.exports = makeExecutableSchema({ typeDefs, resolvers });
