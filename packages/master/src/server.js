const fp = require('lodash/fp');
const { GraphQLServer } = require('graphql-yoga');
const fetch = require('node-fetch');
const { HttpLink } = require('apollo-link-http');
const {
  introspectSchema,
  makeRemoteExecutableSchema,
  mergeSchemas,
} = require('graphql-tools');
const port = 6060;

const schemaExtensions = `
  extend type User {
    todos: [Todo]
  }

  extend type Todo {
    author: User
  }
`;

const resolverExtensions = mergeInfo => ({
  User: {
    todos: {
      fragment: `fragment UserFragment on User { id }`,
      resolve(parent, args, context, info) {
        const authorId = parent.id;
        return mergeInfo.delegate(
          'query',
          'todosByAuthor',
          {
            authorId,
          },
          context,
          info
        );
      },
    },
  },
  Todo: {
    author: {
      fragment: `fragment TodoFragment on Todo { authorId }`,
      resolve(parent, args, context, info) {
        const id = parent.authorId;
        return mergeInfo.delegate(
          'query',
          'user',
          {
            id,
          },
          context,
          info
        );
      },
    },
  },
});

const fetchRemoteSchemas = fp.flow(
  fp.map(uri => new HttpLink({ uri, fetch })),
  fp.map(async link => ({ schema: await introspectSchema(link), link })),
  fp.map(async data => makeRemoteExecutableSchema(await data)),
  schemas => Promise.all(schemas)
);

const main = async () => {
  const remoteSchemas = await fetchRemoteSchemas([
    'http://localhost:6001/',
    'http://localhost:6002/',
  ]);
  const schema = mergeSchemas({
    schemas: [...remoteSchemas, schemaExtensions],
    resolvers: resolverExtensions,
  });
  const server = new GraphQLServer({ schema });
  server.start({ port }, () =>
    console.log('Server is running on localhost:', port)
  );
};

main().catch(console.error);
