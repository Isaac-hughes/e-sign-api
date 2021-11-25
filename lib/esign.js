// This NPM package was created by Isaac Hughes
// https://www.linkedin.com/in/isaac-hughes-software-developer/
// Github Repo
// https://github.com/Isaac-hughes/e-sign-api

// E-Sign API for enterprise customers of e-sign
"use strict";

const { default: axios } = require("axios");

// Roots for all calls
const SANDBOX_ROOT_URL = "https://sandbox.e-sign.co.uk/v3/";
const ROOT_URL = "https://api.e-sign.co.uk/v3/";

// the environment can either be sandbox or live
// defaults to sandbox
let environment = SANDBOX_ROOT_URL;


// Axios has been installed to facilitate the HTTP requests
// This package is designed to run off constants rather than many functions
// This makes the package more efficient, and much quicker to write...
let makeRequest = (method, path, headers, data, parameters) => {
    console.log('make request called')
    // Two seprate calls depending on if parameters are defined
    if(parameters != null){
        // Function construsts the path from the path and the path parameters
        let pathAndParameters = getPath(path, parameters)
        if(data != null){
            // Axios http call
            console.log('call made')
            axios({
                method: method,
                url: environment + pathAndParameters,
                headers: headers,
                data: data,
                responseType: 'json'
            }).then(function(response){
                console.log(response.data, 'data');
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                return response
            }).catch(function(error){
                console.log(error)
                return error
            })
        }else{
            // Axios http call
            console.log('call made with no data')
            axios({
                method: method,
                url: environment + pathAndParameters,
                headers: headers,
                responseType: 'json'
            }).then(function(response){
                console.log(response.data, 'data');
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);                
                return response
            }).catch(function(error){
                console.log(error)
                return error
            })
        }

        
    } else {
        if(data != null){
            // Axios http call
            console.log('call made with no parameters')
        axios({
            method: method,
            url: environment + path,
            headers: headers,
            data: data,
            responseType: 'json'
          }).then(function(response){
            console.log(response.data, 'data');
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers); 
            return response
          }).catch(function(error){
              console.log(error)
              return error
          })
        } else {
            // Axios http call
            console.log('call made with no parameters or data')
            axios({
                method: method,
                url: environment + path,
                headers: headers,
                responseType: 'json'
            }).then(function(response){
                console.log(response.data, 'data');
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                return response
            }).catch(function(error){
                console.log(error)
                return error
            })
        }
        
    }
}


// This function is the gateway to all functions
let esign =  async (apiKey, call, data, sandbox) => {

    // set the environment based on a boolean balue for sandbox
    if(sandbox){
        console.log('Envirinment set to sandbox')
        environment = SANDBOX_ROOT_URL;
    } else if (!sandbox){
        console.log('Envirinment set to live')
        environment = ROOT_URL;
    } else{
        console.log('Envirinment set to sandbox')
        environment = SANDBOX_ROOT_URL;
    }

    // how this function works
    // Check all the parameters are valid
    // Select the correct object 
    if(call != undefined && call != null && call != ""){
        console.log('call is defined')
        // get the data for the call
        let callData = await getCallData(call); 
        if(callData == undefined){
            console.log('call is not defined')
            break
        }
        let method = callData.method;
        let path = callData.path;
        let headers = {'Authorization': `Token ${apiKey}`};
        let body = data.body

        // Makes two differernt calls depending on whether parameters or needed
        if(callData.parameters){
            console.log('call has parameters')
            let parameters = data.parameters;
            let pathWithParameters = getPath(path, parameters)
            if(body == {} || body == undefined){
                console.log('call has no data')
                makeRequest(method, pathWithParameters, headers, null, parameters);
            } else{
                console.log('call has data')
                makeRequest(method, pathWithParameters, headers, data, parameters);
            }
        } else{
            console.log('call has no parameters')
            if(body == {} || body == undefined){
                console.log('call has no data')
                makeRequest(method, path, headers, null, null);
            } else{
                console.log('call has data')
                makeRequest(method, path, headers, data, null);
            }
        }

    } else{
        return {message: "Please pass an appropriate endpoint as the call paramenter"}
    }
}

// This function takes the path and parameters and returns the completed path for the request
let getPath = (path, parameters) => {
    // this function takes the path from the call data object and a parameters object
    // It looks through the path string and identifies which parts are parameters
    // It then searches the parameters object for the relevant parameter
    // It returns the completed path as a string
      let arr = path.split('/')
      let returnPath = '';
      for(let i = 0; i < arr.length; i++){
        if (arr[i][0] == '{'){
          let paramSearch = arr[i].slice(1,-1);
          let param = parameters[paramSearch];    
          returnPath = returnPath + '/' + param;      
        } else {
          if (returnPath == ''){
            returnPath = arr[i];
          } else{
            returnPath = returnPath + '/' + arr[i];
          }
        }
      }
    return returnPath
  }
  

// Assign the data fir the http call
let getCallData = (call) =>{

    let returnData;

    switch (call) {

        // Accounts
        case 'createAccount':
            returnData = createAccount;
            break;
        case 'retrieveAccount':
            returnData = retrieveAccount;
            break;
        case 'updateAccount':
            returnData = updateAccount;
            break;
        case 'deleteAccount':
            returnData = deleteAccount;
            break;
        case 'getAccountWithAllUsers':
            returnData = getAccountWithAllUsers;
            break;
        case 'getAccountStats':
            returnData = getAccountStats;
            break;
        case 'getRecentEvents':
            returnData = getRecentEvents;
            break;
        case 'getExtensionsList':
            returnData = getExtensionsList;
            break;
        case 'enableExtension':
            returnData = enableExtension;
            break;
        case 'disableExtension':
            returnData = disableExtension;
            break;

            // Envelopes
        case 'createEnvelope':
            returnData = createEnvelope;
            break;
        case 'retrieveEnvelope':
            returnData = retrieveEnvelope;
            break;
        case 'archiveEnvelope':
            returnData = archiveEnvelope;
            break;
        case 'restoreEnvelope':
            returnData = restoreEnvelope;
            break;
        case 'redirectToWebApp':
            returnData = redirectToWebApp;
            break;
        case 'getSignedEnvelopes':
            returnData = getSignedEnvelopes;
            break;
        case 'getCompletedEnvelopes':
            returnData = getCompletedEnvelopes;
            break;
        case 'getPendingEnvelopes':
            returnData = getPendingEnvelopes;
            break;
        case 'getDeclinedEnvelopes':
            returnData = getDeclinedEnvelopes;
            break;
        case 'getInboxEnvelopes':
            returnData = getInboxEnvelopes;
            break;
        case 'getArchivedEnvelopes':
            returnData = getArchivedEnvelopes;
            break;
        case 'getEnvelope':
            returnData = getEnvelope;
            break;
        case 'permanentlyDeleteEnvelope':
            returnData = permanentlyDeleteEnvelope;
            break;
        case 'getSignerEnvelope':
            returnData = getSignerEnvelope;
            break;
        case 'getAuditTrail':
            returnData = getAuditTrail;
            break;
        case 'getAttachments':
            returnData = getAttachments;
            break;

            // OAuth
        case 'createOauthApp':
            returnData = createOauthApp;
            break;
        case 'getOauthApps':
            returnData = getOauthApps;
            break;
        case 'getOauthApp':
            returnData = getOauthApp;
            break;
        case 'deleteOauthApp':
            returnData = deleteOauthApp;
            break;
        case 'createAuthCode':
            returnData = createAuthCode;
            break;
        case 'retrieveAccessToken':
            returnData = retrieveAccessToken;
            break;
        case 'revokeAccessToken':
            returnData = revokeAccessToken;
            break;
        case 'getTokenInfo':
            returnData = getTokenInfo;
            break;

            // Payments
        case 'addPaymentDetails':
            returnData = addPaymentDetails;
            break;
        case 'deletePaymentDetails':
            returnData = deletePaymentDetails;
            break;
        case 'setupDirectDebit':
            returnData = setupDirectDebit;
            break;
        case 'confirmDirectDebit':
            returnData = confirmDirectDebit;
            break;
        case 'cancelDirectDebit':
            returnData = cancelDirectDebit;
            break;
        case 'getPlans':
            returnData = getPlans;
            break;
        case 'changePlan':
            returnData = changePlan;
            break;
        case 'paymentCharge':
            returnData = paymentCharge;
            break;
        case 'getInvoices':
            returnData = getInvoices;
            break;
        case 'getInvoice':
            returnData = getInvoice;
            break;

            // saml
        case 'ssoLogin':
            returnData = ssoLogin;
            break;
        case 'ssoCallback':
            returnData = ssoCallback;
            break;
            
            // signers
        case 'createReminder':
            returnData = createReminder;
            break;
        case 'getReminder':
            returnData = getReminder;
            break;
        case 'destroyReminder':
            returnData = destroyReminder;
            break;
        case 'signDocument':
            returnData = signDocument;
            break;
        case 'getSignerEnvelopeFromSigners':
            returnData = getSignerEnvelopeFromSigners;
            break;
        case 'updateSigner':
            returnData = updateSigner;
            break;

            // Tags
        case 'createTag':
            returnData = createTag;
            break;
        case 'getTags':
            returnData = getTags;
            break;
        case 'updateTag':
            returnData = updateTag;
            break;
        case 'deleteTag':
            returnData = deleteTag;
            break;
        case 'getResourcesByTagAndType':
            returnData = getResourcesByTagAndType;
            break;

            // Templates
        case 'createTemplate':
            returnData = createTemplate;
            break;
        case 'getTemplates':
            returnData = getTemplates;
            break;
        case 'generateEnvelopeRequest':
            returnData = generateEnvelopeRequest;
            break;
        case 'updateTemplate':
            returnData = updateTemplate;
            break;
        case 'retrieveTemplate':
            returnData = retrieveTemplate;
            break;
        case 'deleteTemplate':
            returnData = deleteTemplate;
            break;

            // uploads
        case 'uploadFiles':
            returnData = uploadFiles;
            break;
        case 'archiveFiles':
            returnData = archiveFiles;
            break;
        case 'getFilesByType':
            returnData = getFilesByType;
            break;
        case 'getFileByID':
            returnData = getFileByID;
            break;
        case 'uploadCSVFile':
            returnData = uploadCSVFile;
            break;

            // Users
        case 'userLogin':
            returnData = userLogin;
            break;
        case 'userLogout':
            returnData = userLogout;
            break;
        case 'createContact':
            returnData = createContact;
            break;
        case 'getContact':
            returnData = getContact;
            break;
        case 'updateContact':
            returnData = updateContact;
            break;
        case 'deleteContact':
            returnData = deleteContact;
            break;
        case 'requestPasswordReset':
            returnData = requestPasswordReset;
            break;
        case 'resetPassword':
            returnData = resetPassword;
            break;
        case 'redirectToPasswordReset':
            returnData = redirectToPasswordReset;
            break;
        case 'createSignature':
            returnData = createSignature;
            break;
        case 'updateSignature':
            returnData = updateSignature;
            break;
        case 'getSignature':
            returnData = getSignature;
            break;
        case 'deleteSignature':
            returnData = deleteSignature;
            break;
        case 'inviteUser':
            returnData = inviteUser;
            break;
        case 'retrieveUsers':
            returnData = retrieveUsers;
            break;
        case 'getUserByID':
            returnData = getUserByID;
            break;
        case 'updateUser':
            returnData = updateUser;
            break;
        case 'removeUser':
            returnData = removeUser;
            break;
        case 'resendToken':
            returnData = resendToken;
            break;
        case 'confirmUser':
            returnData = confirmUser;
            break;
        case 'confirmInvite':
            returnData = confirmInvite;
            break;

            // webhooks
        case 'createWebhook':
            returnData = createWebhook;
            break;
        case 'getWebhooks':
            returnData = getWebhooks;
            break;
        case 'deleteWebhook':
            returnData = deleteWebhook;
            break;

        

            // Default
        default:
            return undefined;
      }
      console.log('return data:', returnData)
      return returnData;

}

// ==============
// == Accounts ==
// ==============

// POST Create Account 'accounts'
let createAccount = {
    method : "POST",
    path : "accounts",
    parameters: false
}
// GET Retrive Account 'accounts'
let retrieveAccount = {
    method : "GET",
    path : "accounts",
    parameters: false
}
// PATCH Update Account 'accounts'
let updateAccount = {
    method : "UPDATE",
    path : "accounts",
    parameters: false
}
// DELETE Delete Account 'accounts'
let deleteAccount = {
    method : "DELETE",
    path : "accounts",
    parameters: false
}
// GET Account With All Users 'accounts/includes/user'
let getAccountWithAllUsers = {
    method: "GET",
    path: "accounts/includes/user",
    parameters: false
}
// GET Account Stats 'accounts/{id}/stats'
let getAccountStats = {
    method : "GET",
    path : "accounts/{id}/stats",
    parameters: true
}
// GET Recent events 'accounts/{id}/events'
let getRecentEvents = {
    method : "GET",
    path : "accounts/{id}/events",
    parameters: true
}
// GET List Extensions'accounts/{id}extensions'
let getExtensionsList = {
    method : "GET",
    path : "accounts/{id}extensions",
    parameters: true
}
// PATCH Enable Extension 'accounts/{id}/extensions'
let enableExtension = {
    method : "PATCH",
    path : "accounts/{id}extensions",
    parameters: true
}
// DELETE Disable extension 'accounts/{id}/extensions'
let disableExtension = {
    method : "DELETE",
    path : "accounts/{id}extensions",
    parameters: true
}
// ===============
// == Envelopes ==
// ===============

// POST Create envelope 'envelopes'
let createEnvelope = {
    method : "POST",
    path : "envelopes",
    parameters: false
}
// GET Retrive envelopes 'envelopes'
let retrieveEnvelope = {
    method : "GET",
    path : "envelopes",
    parameters: false
}
// DELETE Achive envelopes 'envelopes'
let archiveEnvelope = {
    method : "DELETE",
    path : "envelopes",
    parameters: false
}
// PATCH Restore archived envelopes 'envelopes'
let restoreEnvelope = {
    method : "PATCH",
    path : "envelopes",
    parameters: false
}
// GET Retrive signed envelopes 'envelopes/signed'
let getSignedEnvelopes = {
    method : "GET",
    path : "envelopes/signed",
    parameters: false
}
// GET Retrive completed envelopes 'envelopes/completed'
let getCompletedEnvelopes = {
    method : "GET",
    path : "envelopes/completed",
    parameters: false
}
// GET Retrive pending envelopes 'envelopes/pending'
let getPendingEnvelopes = {
    method : "GET",
    path : "envelopes/pending",
    parameters: false
}
// GET Retrive declined envelopes 'envelopes/declined'
let getDeclinedEnvelopes = {
    method : "GET",
    path : "envelopes/declined",
    parameters: false
}
// GET Retrive inbox envelopes 'envelopes/inbox'
let getInboxEnvelopes = {
    method : "GET",
    path : "envelopes/inbox",
    parameters: false
}
// GET Retrive achived envelopes 'envelopes/archived'
let getArchivedEnvelopes = {
    method : "GET",
    path : "envelopes/archived",
    parameters: false
}
// GET Retrive envelope 'envelopes/{id}'
let getEnvelope = {
    method : "GET",
    path : "envelopes/{id}",
    parameters: true
}
// DELETE Permanently delete envelope 'envelopes/{id}'
let permanentlyDeleteEnvelope = {
    method : "DELETE",
    path : "envelopes/{id}",
    parameters: true
}
// GET Retrive signer envelope 'envelopes/{id}/signer/{signer_id}'
let getSignerEnvelope = {
    method : "GET",
    path : "envelopes/{id}/signer/{signer_id}",
    parameters: true
}
// GET Retrive Audit Trail 'envelopes/{id}/audits'
let getAuditTrail = {
    method : "GET",
    path : "envelopes/{id}/audits",
    parameters: true
}
// GET Retrive attachments 'envelopes/{id}/attachments'
let getAttachments = {
    method : "GET",
    path : "envelopes/{id}/attachments",
    parameters: true
}

// ===========
// == OAuth ==
// ===========

// POST Create an OAuth application 'oauth/applications'
let createOauthApp = {
    method : "POST",
    path : "oauth/applications",
    parameters: false
}
// GET Get oauth apps 'oauth/applications'
let getOauthApps = {
    method : "GET",
    path : "oauth/applications",
    parameters: false
}
// GET Show oauth app 'oauth/applications/{id}'
let getOauthApp = {
    method : "GET",
    path : "oauth/applications/{id}",
    parameters: true
}
// DELETE Delete oauth app 'oauth/applications/{id}'
let deleteOauthApp = {
    method : "DELETE",
    path : "oauth/applications/{id}",
    parameters: true
}
// POST Create Authorization code 'oauth/authorize'
let createAuthCode = {
    method : "POST",
    path : "oauth/authorize",
    parameters: false
}
// POST Retrieve Access token 'oauth/token'
let retrieveAccessToken = {
    method : "POST",
    path : "oauth/token",
    parameters: false
}
// POST Revoke Access token 'oauth/revoke'
let revokeAccessToken = {
    method : "POST",
    path : "oauth/revoke",
    parameters: false
}
// GET Get token info 'oauth/token/info'
let getTokenInfo = {
    method : "GET",
    path : "oauth/token/info",
    parameters: false
}

// ==============
// == Payments ==
// ==============

// POST add payment details 'payments/cards'
let addPaymentDetails = {
    method : "POST",
    path : "payments/cards",
    parameters: false
}
// DELETE delete payment details 'payments/cards'
let deletePaymentDetails = {
    method : "DELETE",
    path : "payments/cards",
    parameters: false
}
// POST set up directs debit 'payments/direct_debits'
let setupDirectDebit = {
    method : "POST",
    path : "payments/direct_debits",
    parameters: false
}
// PATCH confirms direct debit 'payments/direct_debits'
let confirmDirectDebit = {
    method : "PATCH",
    path : "payments/direct_debits",
    parameters: false
}
// DELETE cancel direct debit 'payments/direct_debits'
let cancelDirectDebit = {
    method : "DELETE",
    path : "payments/direct_debits",
    parameters: false
}
// GET get plans 'payments/plans'
let getPlans = {
    method : "GET",
    path : "payments/plans",
    parameters: false
}
// PATCH change plan 'payments/plans'
let changePlan = {
    method : "GET",
    path : "payments/plans",
    parameters: false
}
// POST payment charge 'payments'
let paymentCharge = {
    method : "POST",
    path : "payments",
    parameters: false
}
// GET get invoices 'payments'
let getInvoices = {
    method : "GET",
    path : "payments",
    parameters: false
}
// GET get invoice 'payments/{id}'
let getInvoice = {
    method : "GET",
    path : "payments/{id}",
    parameters: true
}

// ==========
// == SAML ==
// ==========

// GET SSO organisation Login 'saml/auth/login'
let ssoLogin = {
    method : "GET",
    path : "saml/auth/login",
    parameters: false
}
// POST SSO organisation callback 'saml/auth/callback'
let ssoCallback = {
    method : "POST",
    path : "saml/auth/callback",
    parameters: false
}

// =============
// == Signers ==
// =============

// POST create reminder 'signers/{id}/reminders'
let createReminder = {
    method : "POST",
    path : "signers/{id}/reminders",
    parameters: true
}
// GET get reminder 'signers/{id}/reminders'
let getReminder = {
    method : "GET",
    path : "signers/{id}/reminders",
    parameters: true
}
// DELETE destroy reminder 'signers/{id}/reminders'
let destroyReminder = {
    method : "DELETE",
    path : "signers/{id}/reminders",
    parameters: true
}
// POST Sign Document 'signers/{id}/doumnets/{document_id}'
let signDocument = {
    method : "POST",
    path : "signers/{id}/doumnets/{document_id}",
    parameters: true
}
// GET get signer envelope 'signers/{id}'
let getSignerEnvelopeFromSigners = {
    method : "GET",
    path : "signers/{id}",
    parameters: true
}
// PATCH update signer 'signers/{id}'
let updateSigner = {
    method : "GET",
    path : "signers/{id}",
    parameters: true
}

// ==========
// == Tags ==
// ==========

// POST Create tag 'tags'
let createTag = {
    method : "POST",
    path : "tags",
    parameters: false
}
// GET get tags 'tags'
let getTags = {
    method : "GET",
    path : "tags",
    parameters: false
}
// PATCH Update tag 'tags/{id}'
let updateTag = {
    method : "PATCH",
    path : "tags/{id}",
    parameters: true
}
// DELETE delete tag 'tags/{id}'
let deleteTag = {
    method : "DELETE",
    path : "tags/{id}",
    parameters: true
}

// ===============
// == Templates ==
// ===============

// POST create template 'templates'
let createTemplate = {
    method : "POST",
    path : "templates",
    parameters: false
}
// GET get templates 'templates
let getTemplates = {
    method : "GET",
    path : "templates",
    parameters: false
}
// POST generate envelope template 'templates/{id}'
let generateEnvelopeRequest = {
    method : "POST",
    path : "templates/{id}",
    parameters: true
}
// PATCH update template 'templates/{id}'
let updateTemplate = {
    method : "PATCH",
    path : "templates/{id}",
    parameters: true
}
// GET retrieve template 'templates/{id}'
let retrieveTemplate = {
    method : "POST",
    path : "templates/{id}",
    parameters: true
}
// DELETE delete template 'templates/{id}'
let deleteTemplate = {
    method : "DELETE",
    path : "templates/{id}",
    parameters: true
}

// =============
// == Uploads ==
// =============

// POST upload files 'uploads'
let uploadFiles = {
    method : "POST",
    path : "uploads",
    parameters: false
}
// DELETE archive files 'uploads'
let archiveFiles = {
    method : "DELETE",
    path : "uploads",
    parameters: false
}
// GET get files 'uploads/list/{type}'
let getFilesByType = {
    method : "GET",
    path : "uploads/list/{type}",
    parameters: true
}
// GET upload file by id 'uploads/{id}'
let getFileByID = {
    method : "GET",
    path : "uploads/{id}",
    parameters: true
}
// POST upload csv file 'uploads/csv'
let uploadCSVFile = {
    method : "POST",
    path : "uploads/csv",
    parameters: false
}

// ===========
// == Users ==
// ===========

// POST login 'users/login'
let userLogin = {
    method : "POST",
    path : "users/login",
    parameters: false
}
// DELETE logout 'users/logout'
let userLogout = {
    method : "DELETE",
    path : "users/logout",
    parameters: false
}
// POST create contact 'users/contacts'
let createContact = {
    method : "POST",
    path : "users/contacts",
    parameters: false
}
// GET get contacts 'users/contacts'
let getContact = {
    method : "POST",
    path : "users/contacts",
    parameters: false
}
// PATCH update contact 'users/contacts/{id}'
let updateContact = {
    method : "PATCH",
    path : "users/contacts/{id}",
    parameters: true
}
// DELETE delete contact 'users/contacts/{id}'
let deleteContact = {
    method : "DELETE",
    path : "users/contacts/{id}",
    parameters: true
}
// POST request reset password 'users/passwords'
let requestPasswordReset = {
    method : "POST",
    path : "users/passwords",
    parameters: false
}
// PATCH reset password 'users/passwords/update'
let resetPassword = {
    method : "PATCH",
    path : "users/passwords/update",
    parameters: false
}
// GET  redirect to password edit page 'users/passwords/edit'
let redirectToPasswordReset = {
    method : "POST",
    path : "users/passwords/edit",
    parameters: false
}
// POST create signature 'users/signatures'
let createSignature = {
    method : "POST",
    path : "users/signatures",
    parameters: false
}
// PATCH update signature 'users/signatures/{id}'
let updateSignature = {
    method : "PATCH",
    path : "users/signatures/{id}",
    parameters: true
}
// GET get signature 'users/signatures/{id}'
let getSignature = {
    method : "GET",
    path : "users/signatures/{id}",
    parameters: true
}
// DELETE delete signature 'users/signatures/{id}'
let deleteSignature = {
    method : "DELETE",
    path : "users/signatures/{id}",
    parameters: true
}
// POST invite user 'users'
let inviteUser = {
    method : "POST",
    path : "users",
    parameters: false
}
// GET retrieve users 'users
let retrieveUsers = {
    method : "GET",
    path : "users",
    parameters: false
}
// GET get user 'users/{id}'
let getUserByID = {
    method : "GET",
    path : "users/{id}",
    parameters: true
}
// PATCH updates a user 'users/{id}'
let updateUser = {
    method : "PATCH",
    path : "users/{id}",
    parameters: true
}
// DELETE remove user 'users/{id}'
let removeUser = {
    method : "DELETE",
    path : "users/{id}",
    parameters: true
}
// POST resend token 'users/confirms'
let resendToken = {
    method : "POST",
    path : "users/confirms",
    parameters: false
}
// GET confirms a user 'users/{id}/confirms/{token}'
let confirmUser = {
    method : "GET",
    path : "users/{id}/confirms/{token}",
    parameters: true
}
// PATCH confirms an invite 'users/{id}/invites/{token}'
let confirmInvite = {
    method : "PATCH",
    path : "users/{id}/confirms/{token}",
    parameters: true
}

// ===============
// == Web Hooks ==
// ===============

// POST Create webhok 'webhooks'
let createWebhook = {
    method : "POST",
    path : "webhooks",
    parameters: false
}
// GET get webhok 'webhooks'
let getWebhooks = {
    method : "GET",
    path : "webhooks",
    parameters: false
}
// DELETE delete webho0k 'webhooks/{id}'
let deleteWebhook = {
    method : "DELETE",
    path : "webhooks/{id}",
    parameters: true
}

module.exports = esign