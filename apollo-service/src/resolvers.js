const pubsub = require("./pubsub");
const postController = require("./database");

const POST_ADDED = "POST_ADDED";

const resolvers = {
  Subscription: {
    postAdded: {
      subscribe: () => pubsub.asyncIterator([POST_ADDED]),
    },
  },
  Query: {
    async posts(root, args, context) {
      return postController.posts(args);
    },
  },
  Mutation: {
    async addPost(root, args, context) {
      const post = await postController.addPost(args);
      pubsub.publish(POST_ADDED, { postAdded: post });
      return post;
    },
  },
};

module.exports = resolvers;
