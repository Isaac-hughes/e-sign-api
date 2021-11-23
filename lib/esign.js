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
function makeRequest(method, path, headers, data, parameters){
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
                responseType: 'stream'
            }).then(function(res){
                console.log(res)
                return res
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
                responseType: 'stream'
            }).then(function(res){
                console.log(res)
                return res
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
            responseType: 'stream'
          }).then(function(res){
            console.log(res)  
            return res
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
                responseType: 'stream'
            }).then(function(res){
                console.log(res)
                return res
            }).catch(function(error){
                console.log(error)
                return error
            })
        }
        
    }
}


// This function is the gateway to all functions
const esign = function async (apiKey, call, data, sandbox){

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
        let method = callData.method;
        let path = callData.path;
        let headers = {'Authorization': `Token ${apiKey}`};

        // Makes two differernt calls depending on whether parameters or needed
        if(callData.parameters){
            console.log('call has parameters')
            let parameters = data.parameters;
            if(data == {}){
                console.log('call has no data')
                makeRequest(method, path, headers, null, parameters);
            } else{
                console.log('call has data')
                makeRequest(method, path, headers, data, parameters);
            }
        } else{
            console.log('call has no parameters')
            if(data == {}){
                console.log('call has no data')
                makeRequest(method, path, headers, null, null);
            } else{
                console.log('call has data')
                makeRequest(method, path, headers, data, null);
            }
        }

    } else{
        return {message: "Please pass an approprite endpoint as the call paramenter"}
    }
}

// This function takes the path and parameters and returns the completed path for the request
function getPath(path, paramenters){
    
}

// Assign the data fir the http call
function getCallData(call){

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
        

            // Default
        default:
            return "undefined";
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
    path : "accounts",
    parameters: true
}
// GET Recent events 'accounts/'{id}/events'

// GET List Extensions'accounts/{id}extensions'

// PATCH Enable Extension 'accounts/{id}/extensions'

// DELETE Disable extension 'accounts/{id}/extensions'

// ===============
// == Envelopes ==
// ===============

// POST Create envelope 'envelopes'
// GET Retrive envelopes 'envelopes'
// DELETE Achive envelopes 'envelopes'
// PATCH Restore archived envelopes 'envelopes'
// GET Retrive signed envelopes 'envelopes/signed'
// GET Retrive completed envelopes 'envelopes/completed'
// GET Retrive pending envelopes 'envelopes/pending'
// GET Retrive declined envelopes 'envelopes/declined'
// GET Retrive inbox envelopes 'envelopes/inbox'
// GET Retrive achived envelopes 'envelopes/archived'
// GET Retrive envelope 'envelopes/{id}'
// DELETE Permanently delete envelope 'envelopes/{id}'
// GET Retrive signer envelope 'envelopes/{id}/signer/{signer_id}'
// GET Retrive Audit Trail 'envelopes/{id}/audits'
// GET Retrive attachments 'envelopes/{id}/attachments'

// ===========
// == OAuth ==
// ===========

// POST Create an OAuth application 'oauth/applications'
// GET Get oauth apps 'oauth/applications'
// GET Show oauth app 'oauth/applications/{id}'
// DELETE Delete oauth app 'oauth/applications/{id}'
// POST Create Authorization code 'oauth/authorize'
// POST Create Authorization code 'oauth/authorize'
// POST Create Access token 'oauth/token'
// POST Create Revoke Access token 'oauth/revoke'
// GET Get token info 'oauth/token/info'

// ==============
// == Payments ==
// ==============

// POST add payment details 'payments/cards'
// DELETE delete payment details 'payments/cards'
// POST set up directs debit 'payments/direct_debits'
// PATCH confirms direct debit 'payments/direct_debits'
// DELETE cancel direct debit 'payments/direct_debits'
// GET get plans 'payments/plans'
// PATCH change plan 'payments/plans'
// POST payment charge 'payments'
// GET get invoices 'payments'
// GET get invoice 'payments/{id}'

// ==========
// == SAML ==
// ==========

// GET SSO organisation Login 'saml/auth/login'
// POST SSO organisation callback 'saml/auth/callback'

// =============
// == Signers ==
// =============

// POST create reminder 'signers/{id}/reminders'
// GET get reminder 'signers/{id}/reminders'
// DELETE destroy reminder 'signers/{id}/reminders'
// POST Sign Document 'signers/{id}/doumnets/{document_id}'
// GET get signer envelope 'signers/{id}'
// PATCH update signer 'signers/{id}'

// ==========
// == Tags ==
// ==========

// POST Create tag 'tags'
// GET get tags 'tags'
// PATCH Update tag 'tags/{id}'
// DELETE delete tag 'tags/{id}'

// ===============
// == Templates ==
// ===============

// POST create template 'templates'
// POST generate envelope template 'templates/{id}'

// =============
// == Uploads ==
// =============

// POST upload files 'uploads'
// DELETE archive files 'uploads'
// GET upload files 'uploads/list/{type}'
// GET upload file by id 'uploads/{id}'
// POST upload csv file 'uploads/csv'

// ===========
// == Users ==
// ===========

// POST login 'users/login'
// DELETE logout 'users/logout'
// POST create contact 'users/contacts'
// GET get contacts 'users/contacts'
// PATCH update contact 'users/contacts/{id}'
// DELETE delete contact 'users/contacts/{id}'
// POST request reset password 'users/passwords'
// PATCH reset password 'users/passwords/update'
// GET  redirect to password edit page 'users/passwords/edit'
// POST create signature 'users/signatures'
// PATCH update signature 'users/signatures/{id}'
// GET get signature 'users/signatures/{id}'
// DELETE delete signature 'users/signatures/{id}'
// POST invite user 'users'
// GET get user 'users/{id}'
// PATCH updates a user 'users/{id}'
// DELETE remove user 'users/{id}'
// POST resend token 'users/confirms'
// GET confirms a user 'users/{id}/confirms/{token}'
// PATCH confirms an invite 'users/{id}/invites/{token}'

// ===============
// == Web Hooks ==
// ===============

// POST Create webhok 'webhooks'
// GET get webhok 'webhooks'
// DELETE delete webhok 'webhooks/{id}'


module.exports = esign