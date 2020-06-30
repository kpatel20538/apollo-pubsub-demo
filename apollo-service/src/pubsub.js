const { RedisPubSub } = require("graphql-redis-subscriptions");
const Redis = require("ioredis");

const options = {
  host: process.env.PUBSUB_SERVICE_HOST,
  port: process.env.PUBSUB_SERVICE_PORT,
  retryStrategy: (times) => {
    console.log({
      host: process.env.PUBSUB_SERVICE_HOST,
      port: process.env.PUBSUB_SERVICE_PORT,
    });
    return Math.min(times * 50, 2000)
  },
};

const pubsub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options),
});

module.exports = pubsub;
