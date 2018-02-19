const { mergeSchemas } = require('graphql-tools');
const { once } = require('lodash');
const {
  schemaExtensions,
  relationshipResolvers,
} = require('./schema-relationships');
const fetchRemoteSchemas = require('./fetch-remote-schemas');

const getSchema = async () => {
  const remoteSchemas = await fetchRemoteSchemas([
    'http://localhost:6001/',
    'http://localhost:6002/',
  ]);
  return mergeSchemas({
    schemas: [...remoteSchemas, schemaExtensions],
    resolvers: relationshipResolvers,
  });
};

module.exports = once(getSchema);
