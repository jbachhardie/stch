const { GraphQLServer } = require('graphql-yoga');

const port = 6060;

const main = async () => {
  const schema = await require('./schema');
  const server = new GraphQLServer({ schema });
  server.start({ port }, () =>
    console.log('Server is running on localhost:', port)
  );
};

main().catch(console.error);
