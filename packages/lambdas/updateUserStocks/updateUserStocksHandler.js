/* 
This code uses callbacks to handle asynchronous function responses.
It currently demonstrates using an async-await pattern. 
AWS supports both the async-await and promises patterns.
For more information, see the following: 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/calling-services-asynchronously.html
https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html 
*/
const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const tableName = process.env.TABLENAME;
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});


exports.main = async function (event, context) {
  try {
    var method = event.httpMethod;
    if (method === "PUT") {
      let username = event['pathParameters']['username'];
      console.log(username)
      let data = event.body
      var params = {
        Key: {
          "username":  username
        },
        TableName: tableName,
        UpdateExpression: "SET stocks = :stocks, ETFs = :ETFs",
        ExpressionAttributeValues: {
            ":stocks": data.stocks || null,
            ":ETFs": data.ETFs || null,
        },
        ReturnValues: "ALL_NEW"
      };
    

     await docClient.update(params).promise();


      return {
        statusCode: 200,
         headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",  
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: {status : true}
      };
    }
    
  } catch (error) {
    var body = error.stack || JSON.stringify(error, null, 2);
    return {
      statusCode: 400,
      headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify(body)
    }
  }
}
