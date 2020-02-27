var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();
var params = {
  TableName: "NodeJSBaseBallStats",
  KeySchema: [
    { AttributeName: "TeamID", KeyType: "HASH" }, //Partition Key
    { AttributeName: "SK", KeyType: "RANGE" } //Sort Key
  ],
  AttributeDefinitions: [
    { AttributeName: "TeamID", AttributeType: "S" },
    { AttributeName: "SK", AttributeType: "S" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
};

dynamodb.createTable(params,(err,data)=>{
    if(err){
        console.log("Unable to create database due to error" + JSON.stringify(err));
    }else{
        console.log("Table Created");
    }
})