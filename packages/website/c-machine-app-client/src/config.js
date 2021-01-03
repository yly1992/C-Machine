const config = {
    s3: {
      REGION: "us-east-1",
      BUCKET: "cashmachinewebsite",
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://nh60l2c9ok.execute-api.us-east-1.amazonaws.com/prod",
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_0S3C9k12y",
      APP_CLIENT_ID: "16a45nhsj5a1nol6sm50i5tqvv",
      IDENTITY_POOL_ID: "us-east-1:76f8f3a8-e398-47c8-8d3c-ce65a36600c0",
    },
  };
  
  export default config;