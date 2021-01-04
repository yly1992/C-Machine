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
var dynamodb = new AWS.DynamoDB();

exports.main = async function(event, context) {
  try {
    var method = event.httpMethod;

    if (method === "PUT") {
      console.log(event);
      console.log(tableName);
      var params = {
        Key: {
         "username": {
           S: event.username
          }
        }, 
        TableName: 'TEST'
       };
  

      const data = await dynamodb.getItem(params).promise()
      console.log("success")
      console.log(data)
      return data
    }
    // We only accept GET for now
    return {
      statusCode: 400,
      headers: {},
      body: "We only accept GET /"
    };
  } catch(error) {
    var body = error.stack || JSON.stringify(error, null, 2);
    return {
      statusCode: 400,
        headers: {},
        body: JSON.stringify(body)
    }
  }
}