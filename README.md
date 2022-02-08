
# This is the npm package for the E-Sign API

Created By Isaac Hughes

Github repo [click here](https://github.com/Isaac-hughes/e-sign-api)

# Stable Version ~ 1.3.6

## Table of Contents

 - [Feautures](#features)
 - [Installing](#installing)
 - [Usage](#Usage)
 - [Calls](#Calls)
    - [Accounts](#Accounts)
    - [Envelopes](#Envelopes)
    - [Oauth](#Oauth)
    - [Payments](#Payments)
    - [Saml](#Saml)
    - [Signers](#Signers)
    - [Tags](#Tags)
    - [Templates](#Templates)
    - [Uploads](#Uploads)
    - [Users](#Users)
    - [Webhooks](#Webhooks)
 - [Example](#example)

## Installing

Using npm:

```bash
$ npm install e-sign-api
```

To access the functionality, import the function in the following format

```js
import { esign } from 'e-sign-api';
```

## Usage
The function takes four parameters
Firstly your api Key (make sure this is valid for the environment you are using)
Then the required call route, these are listed further down
Then the relavent data, if none is required, pass an empty object
Finally a boolean value to select the environment, true is sandbox, false is live
Make sure all testing is done in sandbox!
```js

let data = {
    ...
}

esign('apikey', 'call', data, true)
```
If the route takes parameters, these should be passed as part of the data object
If the call takes a json body, this too should be passed in the data object

```js
let data = {
    parameter : {
        id : "exampleID",
        signerID: "exampleSignerID"
    },
    body : {
        id: "objectID"
    }
}
```


All the calls follow a logical naming convention
If an undefined call is passed, you will be alerted in the console

All the calls are listed below
Please view the swagger to see what data should be passed with each call and the correct parameter id's
[click here](https://api.e-sign.co.uk/v3/index.html)

## Calls

### Accounts

- createAccount
- retrieveAccount
- updateAccount
- deleteAccount
- getAccountWithAllUsers
- getAccountStats
- getRecentEvents
- getExtensionsList
- enableExtension
- disableExtension

### Envelopes

- createEnvelope
- retrieveEnvelope
- archiveEnvelope
- restoreEnvelope
- redirectToWebApp
- getSignedEnvelopes
- getCompletedEnvelopes
- getPendingEnvelopes
- getDeclinedEnvelopes
- getInboxEnvelopes
- getArchivedEnvelopes
- getEnvelope
- permanentlyDeleteEnvelope
- getSignerEnvelope
- getAuditTrail
- getAttachments

### OAuth

- createOauthApp
- getOauthApps
- getOauthApp
- deleteOauthApp
- createAuthCode
- retrieveAccessToken
- revokeAccessToken
- getTokenInfo

### Payments

- addPaymentDetails
- deletePaymentDetails
- setupDirectDebit
- confirmDirectDebit
- cancelDirectDebit
- getPlans
- changePlan
- paymentCharge
- getInvoices
- getInvoice

### Saml

- ssoLogin
- ssoCallback
            
### Signers

- createReminder
- getReminder
- destroyReminder
- signDocument
- getSignerEnvelopeFromSigners
- updateSigner

### Tags

- createTag
- getTags
- updateTag
- deleteTag
- getResourcesByTagAndType

### Templates

- createTemplate
- getTemplates
- generateEnvelopeRequest
- updateTemplate
- retrieveTemplate
- deleteTemplate

### uploads

- uploadFiles
- archiveFiles
- getFilesByType
- getFileByID
- uploadCSVFile

### Users

- userLogin
- userLogout
- createContact
- getContact
- updateContact
- deleteContact
- requestPasswordReset
- resetPassword
- redirectToPasswordReset
- createSignature
- updateSignature
- getSignature
- deleteSignature
- inviteUser
- retrieveUsers
- getUserByID
- updateUser
- removeUser
- resendToken
- confirmUser
- confirmInvite

### Webhooks

- createWebhook
- getWebhooks
- deleteWebhook


## Example

```js
import { esign } from 'e-sign-api';

let data = {
    parameters: {
        id : 'b791c2f7-8aab-4450-bfe3-d1af87ce465c'
    }
}

let response = await esign('demo12345678', 'retrieveAccount', data, true)
```

resonse data (collapsed objects)
```js
{
    json : {
        account: {
            id: 'b791c2f7-8aab-4450-bfe3-d1af87ce456c',
            company_name: 'Demo Account',
            shared: false,
            parent_account_id: '77e41daa-6513-4f3e-b8d8-e7d5ce936492',
            users: [ [Object] ],
            subscription: {
            state: 'active',
            days_until_trial_expires: null,
            currency: [Object],
            credits: [Object],
            payment: [Object]
            },
            additional_info: { documents_sent_this_month: 0, enabled_extensions: [] },
            limits: { document_sends_per_month: 3000 }
        },
        links: [
            {
            method: 'get',
            rel: 'accounts.getAccountAllUsers',
            uri: '/accounts/includes/users'
            },
            { method: 'patch', rel: 'users.createUser', uri: '/users' }
        ]
    },
    status: 200,
    statusText: "OK",
    headers: {
        'content-type': 'application/json',
        'transfer-encoding': 'chunked',
        connection: 'close',
        status: '200 OK',
        'cache-control': 'max-age=0, private, must-revalidate, no-cache',
        vary: 'Origin',
        'strict-transport-security': 'max-age=63072000; includeSubDomains, max-age=31536000; includeSubdomains; preload',
        'referrer-policy': 'strict-origin-when-cross-origin, strict-origin',
        'x-permitted-cross-domain-policies': 'none',
        'x-xss-protection': '1; mode=block, 1; mode=block',
        'x-request-id': 'cb9567ff-bb96-4def-ba33-ada48',
        'x-download-options': 'noopen',
        etag: 'W/"b766bd2e02bac59bcd50eb8406"',
        'x-frame-options': 'SAMEORIGIN',
        'x-runtime': '0.039731',
        'x-content-type-options': 'nosniff, nosniff',
        date: 'Thu, 25 Nov 2021 15:22:22 GMT',
        'x-powered-by': 'Phusion Passenger 6.0.4',
        server: 'nginx + Phusion Passenger 6.0.4'
    }
}
```