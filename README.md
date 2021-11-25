<pre>
# This is the npm package for the E-Sign API

Created By Isaac Hughes

Run npm i e-sign-api to install the npm package

To access the functionality, import the function in the following format
const eSignNPM = require('e-sign-api')


The function takes four parameters
firstly your api Key, make sure this is valid for the environment you are testing
then the required call route, these are listed further down
then the relavent data, if none is reuired, pass an empty object,
finally a boolean value to select the environment, true is sandbox, false is live
Make sure all testing is done in sandbox
eSignNPM('apikey', 'call', data, true)

If the route takes parameters, these should be passed as part of the data object in the form
If the call takes a json body, this too should be passed in the data object

```
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
https://api.e-sign.co.uk/v3/index.html


## Accounts

createAccount
retrieveAccount
updateAccount
deleteAccount
getAccountWithAllUsers
getAccountStats
getRecentEvents
getExtensionsList
enableExtension
disableExtension

## Envelopes

createEnvelope
retrieveEnvelope
archiveEnvelope
restoreEnvelope
redirectToWebApp
getSignedEnvelopes
getCompletedEnvelopes
getPendingEnvelopes
getDeclinedEnvelopes
getInboxEnvelopes
getArchivedEnvelopes
getEnvelope
permanentlyDeleteEnvelope
getSignerEnvelope
getAuditTrail
getAttachments

## OAuth

createOauthApp
getOauthApps
getOauthApp
deleteOauthApp
createAuthCode
retrieveAccessToken
revokeAccessToken
getTokenInfo

## Payments

addPaymentDetails
deletePaymentDetails
setupDirectDebit
confirmDirectDebit
cancelDirectDebit
getPlans
changePlan
paymentCharge
getInvoices
getInvoice

## saml

ssoLogin
ssoCallback
            
## signers

createReminder
getReminder
destroyReminder
signDocument
getSignerEnvelopeFromSigners
updateSigner

## Tags

createTag
getTags
updateTag
deleteTag
getResourcesByTagAndType

## Templates

createTemplate
getTemplates
generateEnvelopeRequest
updateTemplate
retrieveTemplate
deleteTemplate

## uploads

uploadFiles
archiveFiles
getFilesByType
getFileByID
uploadCSVFile

## Users

userLogin
userLogout
createContact
getContact
updateContact
deleteContact
requestPasswordReset
resetPassword
redirectToPasswordReset
createSignature
updateSignature
getSignature
deleteSignature
inviteUser
retrieveUsers
getUserByID
updateUser
removeUser
resendToken
confirmUser
confirmInvite

## webhooks

createWebhook
getWebhooks
deleteWebhook

</pre>