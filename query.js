var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var tablename = "NodeJSBaseBallStats";
var dynamodb = new AWS.DynamoDB();

// getGame = (teamID, datestr) => {
//   return new Promise((resolve, reject) => {
//     var params = {
//       KeyConditionExpression: "TeamID = :t and SK = :sk",
//       ExpressionAttributeValues: {
//         ":t": { S: "GAMES_" + teamID },
//         ":sk": { S: datestr }
//       },
//       TableName: tablename
//     };
//     dynamodb.query(params, (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// };
// getGame("LAA", "20190415")
//   .then(game => {
//     console.log(JSON.stringify(game));
//   })
//   .catch(exp => {
//     console.log(exp);
//   });

getGames = (teamID, startdate, enddate, opposingteamid) => {
  return new Promise((resolve, reject) => {
    var params = {
      KeyConditionExpression:
        "TeamID = :t and SK BETWEEN :startdate AND :enddate",
      FilterExpression: "OpposingTeamID = :opp",
      ExpressionAttributeValues: {
        ":t": { S: "GAMES_" + teamID },
        ":startdate": { S: startdate },
        ":enddate": { S: enddate },
        ":opp": { S: opposingteamid }
      },

      TableName: tablename
    };
    dynamodb.query(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

getGames("LAA", "20190401", "20190501", "SEA")
  .then(game => {
    console.log(JSON.stringify(game));
  })
  .catch(exp => {
    console.log(exp);
  });
