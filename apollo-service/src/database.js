const AWS = require("aws-sdk");

AWS.config.update({
  endpoint: `http://${process.env.DATABASE_SERVICE_HOST}:${process.env.DATABASE_SERVICE_PORT}`,
  region: "us-east-1",
});

const documents = new AWS.DynamoDB.DocumentClient();

async function addPost(args) {
  const created = new Date().toISOString();
  const post = { ...args, created };

  await documents
    .put({
      TableName: "Posts",
      Item: post,
    })
    .promise();

  return post;
}

async function posts({ cursor }) {
  const data = await documents
    .scan({
      TableName: "Posts",
      ProjectionExpression: "author, created, #cm",
      ExpressionAttributeNames: {
        "#cm": "comment",
      },
      ExclusiveStartKey: cursor,
    })
    .promise();

  return {
    posts: data.Items,
    nextCursor: data.LastEvaluatedKey,
  };
}

module.exports = {
  addPost,
  posts,
};
