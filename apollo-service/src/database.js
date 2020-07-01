const AWS = require("aws-sdk");
const { nanoid } = require("nanoid");

AWS.config.update({
  endpoint: `http://${process.env.DATABASE_SERVICE_HOST}:${process.env.DATABASE_SERVICE_PORT}`,
  region: "us-east-1",
});

const documents = new AWS.DynamoDB.DocumentClient();

async function addPost(args) {
  const created = new Date().toISOString();
  const post = { ...args, created, id: nanoid() };

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
      ProjectionExpression: "author, created, #cm, #id",
      ExpressionAttributeNames: {
        "#cm": "comment",
        "#id": "id",
      },
      ExclusiveStartKey: cursor && JSON.parse(cursor),
      Limit: 10,
    })
    .promise();

  return {
    posts: data.Items,
    nextCursor: JSON.stringify(data.LastEvaluatedKey),
  };
}

module.exports = {
  addPost,
  posts,
};
