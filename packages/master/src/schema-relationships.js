const schemaExtensions = `
  extend type User {
    todos: [Todo]
  }

  extend type Todo {
    author: User
  }
`;

const relationshipResolvers = mergeInfo => ({
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

module.exports = {
  schemaExtensions,
  relationshipResolvers,
};
