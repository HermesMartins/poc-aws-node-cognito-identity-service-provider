const AWS = require('aws-sdk');

class Cognito {
  constructor({ username }) {
    this.username = username
    this.userAttributes = []
    this.cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider()
    this.userPoolId = process.env.COGNITO_USER_POOL_ID
  }

  setUserAttributes(userAttributes) {
    this.userAttributes = userAttributes
  }

  adminDeleteUser() {
    const params = {
      UserPoolId: this.userPoolId,
      Username: this.username
    }

    return new Promise((resolve, reject) => {
      this.cognitoidentityserviceprovider.adminDeleteUser(
        params,
        function (err, data) {
          if (err) reject(err)
          else resolve(data)
        })
    })
  }

  adminCreateUser() {
    const params = {
      UserPoolId: this.userPoolId,
      Username: this.username,
      DesiredDeliveryMediums: ['EMAIL'],
      UserAttributes: this.userAttributes,
      TemporaryPassword: '!yVX9a4!uH5F'
    }

    return new Promise((resolve, reject) => {
      this.cognitoidentityserviceprovider.adminCreateUser(
        params,
        function (err, data) {
          if (err) reject(err)
          else resolve(data)
        })
    })
  }
}

// factory
const cognito = new Cognito({
  username: 'EMAIL'
})

const userAttributes = [
  { Name: 'email', Value: 'EMAIL' },
  { Name: 'email_verified', Value: 'True' }
]

cognito.setUserAttributes(userAttributes)

module.exports.cognito = cognito.adminCreateUser.bind(cognito)
// module.exports.cognito = cognito.adminDeleteUser.bind(cognito)

