const config = {
    s3: {
      REGION: "us-east-1",
      BUCKET: "cashmachinewebsite",
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://4ftwxqmg1g.execute-api.us-east-1.amazonaws.com/prod",
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_1hfgNVlIV",
      APP_CLIENT_ID: "696c83l4j49qkrvibpra546d5i",
      IDENTITY_POOL_ID: "us-east-1:8d959a32-eaf1-4f32-9e71-d1b458ffb5d9",
    },
  };
  
  export default config;