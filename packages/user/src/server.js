const { microGraphiql, microGraphql } = require('apollo-server-micro');
const micro = require('micro');
const { send } = micro;
const { get, post, router } = require('microrouter');
const schema = require('./schema');

const graphqlHandler = microGraphql({ schema });
const graphiqlHandler = microGraphiql({ endpointURL: '/graphql' });

const server = micro(
  router(
    get('/graphql', graphqlHandler),
    post('/graphql', graphqlHandler),
    get('/graphiql', graphiqlHandler),
    (req, res) => send(res, 404, 'not found')
  )
);

server.listen(3000);
