const { gql } = require("apollo-server");

const typeDefs = gql`
  type Subscription {
    postAdded: Post
  }

  type Query {
    posts(cursor: String): PostConnection
  }

  type Mutation {
    addPost(author: String, comment: String): Post
  }

  type Post {
    author: String
    created: String
    comment: String
  }

  type PostConnection {
    posts: [Post]
    nextCursor: String
  }
`;

module.exports = typeDefs;
