const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Book {
    title: String!
    author: Author
  }

  type Author {
    id: ID
    name: String!
    age: Int!
    books: [Book]
  }

  type User {
    id: ID!
    name: String!
    age: Int!
  }

  type Query {
    books: [Book]
    authors: [Author]
    users: [User!]!
  }

  type Mutation {
    createUser(id: Int!, name: String!, age: Int!): User!
    deleteUser(id: Int!): User!
  }
`;

const Kate = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "Twilight",
    author: "Kate Chopin",
  },
];

const Paul = [
  {
    title: "Potter",
    author: "Paul Auster",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const authors = [
  {
    name: "Kate Chopin",
    age: 21,
    books: Kate,
  },
  {
    name: "Paul Auster",
    age: 30,
    books: Paul,
  },
];

const books = [
  {
    title: "The Awakening",
    author: authors[0],
  },
  {
    title: "City of Glass",
    author: authors[1],
  },
  {
    title: "Twilight",
    author: authors[0],
  },
  {
    title: "Potter",
    author: authors[1],
  },
];

const users = [
  {
    id: 1,
    name: "Rakesh Paul",
    age: 21,
  },
  {
    id: 2,
    name: "Ramesh Auster",
    age: 30,
  },
];

const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors,
    users: () => users,
  },
  Mutation: {
    createUser(parent, args) {
      const newUser = args;
      users.push(newUser);
      return newUser;
    },
    deleteUser(parent, args) {
      const tempUser = users.find((user) => user.id === args.id);
      users.splice(users.indexOf(tempUser), 1);
      return tempUser;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
