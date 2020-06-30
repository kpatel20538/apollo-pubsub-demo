const AWS = require("aws-sdk");
// const fs = require("fs"); 
const { backoff } = require("./src/utilty");

AWS.config.update({
  endpoint: `http://${process.env.DATABASE_SERVICE_HOST}:${process.env.DATABASE_SERVICE_PORT}`,
  region: "us-east-1",
});

const database = new AWS.DynamoDB();
// const documents = new AWS.DynamoDB.DocumentClient();

(async () => {
  try {
    await backoff(() =>
      database
        .createTable({
          TableName: "Posts",
          KeySchema: [
            {
              AttributeName: "author",
              KeyType: "HASH",
            },
            {
              AttributeName: "created",
              KeyType: "RANGE",
            },
          ],
          AttributeDefinitions: [
            {
              AttributeName: "author",
              AttributeType: "S",
            },
            {
              AttributeName: "created",
              AttributeType: "S",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10,
          },
        })
        .promise()
    );
    /* 
    const posts = JSON.parse(
      await fs.promises.readFile("./data/documents.json", { encoding: "utf-8" })
    );
    console.log(posts);
    await documents
      .batchWrite({
        RequestItems: {
          Posts: posts.map((Item) => {
            console.log(Item);
            return { PutRequest: { Item } };
          }),
        },
      })
      .promise(); 
    */
  } catch (err) {}
})();
