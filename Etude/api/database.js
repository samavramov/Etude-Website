const {
  DynamoDBClient,
  CreateTableCommand,
  ListTablesCommand,
} = require("@aws-sdk/client-dynamodb");

const {
  PutCommand,
  DeleteCommand,
  GetCommand,
  ScanCommand,
  DynamoDBDocumentClient,
} = require("@aws-sdk/lib-dynamodb");


const ddb = DynamoDBDocumentClient.from(new DynamoDBClient(require("./aws_config")));
const mockdata = require("./mock_data");
const tableName = "Gymnasts";

async function listTables() {
  return ddb.send(new ListTablesCommand({}));
}

async function createTable(params) {
  return ddb.send(new CreateTableCommand(params));
}

async function getItem(item) {
  return ddb.send(
    new GetCommand({
      TableName: tableName,
      Key: item,
    })
  );
}

async function putItem(item) {
  return ddb.send(
    new PutCommand({
      TableName: tableName,
      Item: item
    })
  );
}

async function deleteItem(item) {
  return ddb.send(
    new DeleteCommand({
      TableName: tableName,
      Key: item,
    })
  );
}

async function scanItems(lastEvaluatedKey="") {
  return ddb.send(
    new ScanCommand({
      TableName: tableName,
      ...(lastEvaluatedKey) && {ExclusiveStartKey: lastEvaluatedKey} // optional
    })
  );
}

async function _createGymnastsTable() {
  // creates the gymnasts table.
  return createTable({
    TableName: tableName,
    KeySchema: [
      { AttributeName: "id", KeyType: "HASH" }, //Partition key
    ],
    AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
    BillingMode: "PAY_PER_REQUEST",
  })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      if (err.name === "ResourceInUseException") {
        console.log("No need to create table - it already exists");
      } else {
        console.log(err);
      }
    });
}

async function _createMockData() {
  var proms = [];
  for (const gymnast of mockdata) {
    proms.push(putItem(gymnast));
  }
  return Promise.all(proms);
}

async function init() {
  return _createGymnastsTable()
    .then(() => _createMockData())
    .then(() => console.log("database has been initialized"))
    .then(()=> scanItems())
    .then((resp) => {
        for (const item of resp.Items) {
            console.log(item);
        }
    });
}

module.exports = {
  listTables,
  createTable,
  init,
  getItem,
  putItem,
  deleteItem,
  scanItems
};
