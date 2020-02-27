var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var tablename = "NodeJSBaseBallStats";
var dynamodb = new AWS.DynamoDB();
var teams = require("./teams.json");
var players = require("./players.json");
var games = require("./games.json");

putItems(teams)
  .then(() => {
    putItems(players);
  })
  .then(() => {
    putItems(games);
  })
  .catch(err => {
    console.error(err);
  });

function putItems(items) {
  var insertedCount = 0;
  return new Promise((resolve, reject) => {
    items.forEach(element => {
      var params = {
        TableName: tablename,
        Item: element
      };

      dynamodb.putItem(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          if (++insertedCount == items.length) {
            console.log("Suuccessfully inserted " + items.length + " items");
            resolve(data);
          }
        }
      });
    });
  });
}
