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
  return new Promise((resolve, reject) => {
    var params = {
      TransactItems: []
    };
    items.forEach(element => {
      params.TransactItems.push({
        Put: {
          TableName: tablename,
          Item: element
        }
      });
    });

    dynamodb.transactWriteItems(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        console.log("Suuccessfully inserted " + items.length + " items");
        resolve();
      }
    });
  });
}
