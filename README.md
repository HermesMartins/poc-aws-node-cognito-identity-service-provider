# Serverless Framework Node REST API on AWS

This is a proof of concept for aws node cognito identity service provider.

## Documentation

https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html

## Setup

First, setup the profile inside serverless.yml

After deployed, you'll need to setup the environment variables: COGNITO_USER_POOL_ID and COGNITO_CLIENT_ID (you can find theses values in your User Pool on AWS).

### Deployment

```bash
sls deploy
```
### Local development

You can invoke your function using the following command:

```bash
sls invoke -f cognito
```

Which should result in a created user in your client pool.
