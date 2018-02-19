const fp = require('lodash/fp');
const fetch = require('node-fetch');
const { HttpLink } = require('apollo-link-http');
const {
  introspectSchema,
  makeRemoteExecutableSchema,
} = require('graphql-tools');

module.exports = fp.flow(
  fp.map(uri => new HttpLink({ uri, fetch })),
  fp.map(async link => ({ schema: await introspectSchema(link), link })),
  fp.map(async data => makeRemoteExecutableSchema(await data)),
  schemas => Promise.all(schemas)
);
