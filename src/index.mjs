// This NPM package was created by Isaac Hughes
// https://www.linkedin.com/in/isaac-hughes-software-developer/
// Github Repo
// https://github.com/Isaac-hughes/e-sign-api

// E-Sign API for enterprise customers of e-sign
"use strict";

import axios from 'axios'

export class ESign{
    // Roots for all calls
    SANDBOX_ROOT_URL = "https://sandbox.e-sign.co.uk/v3/";
    ROOT_URL = "https://api.e-sign.co.uk/v3/";
    
    // the environment can either be sandbox or live
    // defaults to sandbox
    environment = this.SANDBOX_ROOT_URL;

    
    
    
    // Axios has been installed to facilitate the HTTP requests
    // This package is designed to run off constants rather than many functions
    // This makes the package more efficient, and much quicker to write...
    makeRequest = (method, path, headers, data, parameters) => {
        // Two seprate calls depending on if parameters are defined
        if(parameters != null){
            // Function construsts the path from the path and the path parameters
            let pathAndParameters = this.getPath(path, parameters)
            if(data != null){
                // Axios http call
                axios({
                    method: method,
                    url: this.environment + pathAndParameters,
                    headers: headers,
                    data: data,
                    responseType: 'json'
                }).then(function(response){
                    let responseObject = {
                        json: response.data,
                        status: response.status,
                        statusText: response.statusText,
                        headers: response.headers
                    }
                    return responseObject
                }).catch(function(error){
                    console.log(error)
                    return error
                })
            }else{
                // Axios http call
                axios({
                    method: method,
                    url: this.environment + pathAndParameters,
                    headers: headers,
                    responseType: 'json'
                }).then(function(response){
                    let responseObject = {
                        json: response.data,
                        status: response.status,
                        statusText: response.statusText,
                        headers: response.headers
                    }                
                    return responseObject
                }).catch(function(error){
                    console.log(error)
                    return error
                })
            }
    
            
        } else {
            if(data != null){
                // Axios http call
            axios({
                method: method,
                url: this.environment + path,
                headers: headers,
                data: data,
                responseType: 'json'
              }).then(function(response){
                let responseObject = {
                    json: response.data,
                    status: response.status,
                    statusText: response.statusText,
                    headers: response.headers
                }
                return responseObject
              }).catch(function(error){
                  console.log(error)
                  return error
              })
            } else {
                // Axios http call
                axios({
                    method: method,
                    url: this.environment + path,
                    headers: headers,
                    responseType: 'json'
                }).then(function(response){
                    let responseObject = {
                        json: response.data,
                        status: response.status,
                        statusText: response.statusText,
                        headers: response.headers
                    }
                    return responseObject
                }).catch(function(error){
                    console.log(error)
                    return error
                })
            }
            
        }
    }


    // This function is the gateway to all functions
    esign =  async (apiKey, call, data, sandbox) => {
    
        // set the environment based on a boolean balue for sandbox
        if(sandbox){
            this.environment = this.SANDBOX_ROOT_URL;
        } else if (!sandbox){
            this.environment = this.ROOT_URL;
        } else{
            this.environment = this.SANDBOX_ROOT_URL;
        }
    
        // how this function works
        // Check all the parameters are valid
        // Select the correct object 
        if(call != undefined && call != null && call != ""){
            // get the data for the call
            let callData = await this.getCallData(call); 
            if(callData == undefined){
                return({
                    message:"The call you passed does not match any defined call",
                    call: call
                })
            } else {
                let method = callData.method;
                let path = callData.path;
                let headers = {'Authorization': `Token ${apiKey}`};
                let body = data.body
        
                // Makes two differernt calls depending on whether parameters or needed
                if(callData.parameters){
                    let parameters = data.parameters;
                    let pathWithParameters = this.getPath(path, parameters)
                    if(body == {} || body == undefined){
                        this.makeRequest(method, pathWithParameters, headers, null, parameters);
                    } else{
                        this.makeRequest(method, pathWithParameters, headers, data, parameters);
                    }
                } else{
                    if(body == {} || body == undefined){
                        this.makeRequest(method, path, headers, null, null);
                    } else{
                        this.makeRequest(method, path, headers, data, null);
                    }
                }
            }
    
        } else{
            console.log("The call you passed does not match any defined call", call)
            return {message: "The call you passed does not match any defined call"}
        }
    }

    getPath = (path, parameters) => {
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




      // This function takes the path and parameters and returns the completed path for the request
        
      
      // Assign the data fir the http call
        getCallData = (call) =>{
      
          let returnData;
      
          switch (call) {
      
              // Accounts
              case 'createAccount':
                  returnData = this.createAccount;
                  break;
              case 'retrieveAccount':
                  returnData = this.retrieveAccount;
                  break;
              case 'updateAccount':
                  returnData = this.updateAccount;
                  break;
              case 'deleteAccount':
                  returnData = this.deleteAccount;
                  break;
              case 'getAccountWithAllUsers':
                  returnData = this.getAccountWithAllUsers;
                  break;
              case 'getAccountStats':
                  returnData = this.getAccountStats;
                  break;
              case 'getRecentEvents':
                  returnData = this.getRecentEvents;
                  break;
              case 'getExtensionsList':
                  returnData = this.getExtensionsList;
                  break;
              case 'enableExtension':
                  returnData = this.enableExtension;
                  break;
              case 'disableExtension':
                  returnData = this.disableExtension;
                  break;
      
                  // Envelopes
              case 'createEnvelope':
                  returnData = this.createEnvelope;
                  break;
              case 'retrieveEnvelope':
                  returnData = this.retrieveEnvelope;
                  break;
              case 'archiveEnvelope':
                  returnData = this.archiveEnvelope;
                  break;
              case 'restoreEnvelope':
                  returnData = this.restoreEnvelope;
                  break;
              case 'redirectToWebApp':
                  returnData = this.redirectToWebApp;
                  break;
              case 'getSignedEnvelopes':
                  returnData = this.getSignedEnvelopes;
                  break;
              case 'getCompletedEnvelopes':
                  returnData = this.getCompletedEnvelopes;
                  break;
              case 'getPendingEnvelopes':
                  returnData = this.getPendingEnvelopes;
                  break;
              case 'getDeclinedEnvelopes':
                  returnData = this.getDeclinedEnvelopes;
                  break;
              case 'getInboxEnvelopes':
                  returnData = this.getInboxEnvelopes;
                  break;
              case 'getArchivedEnvelopes':
                  returnData = this.getArchivedEnvelopes;
                  break;
              case 'getEnvelope':
                  returnData = this.getEnvelope;
                  break;
              case 'permanentlyDeleteEnvelope':
                  returnData = this.permanentlyDeleteEnvelope;
                  break;
              case 'getSignerEnvelope':
                  returnData = this.getSignerEnvelope;
                  break;
              case 'getAuditTrail':
                  returnData = this.getAuditTrail;
                  break;
              case 'getAttachments':
                  returnData = this.getAttachments;
                  break;
      
                  // OAuth
              case 'createOauthApp':
                  returnData = this.createOauthApp;
                  break;
              case 'getOauthApps':
                  returnData = this.getOauthApps;
                  break;
              case 'getOauthApp':
                  returnData = this.getOauthApp;
                  break;
              case 'deleteOauthApp':
                  returnData = this.deleteOauthApp;
                  break;
              case 'createAuthCode':
                  returnData = this.createAuthCode;
                  break;
              case 'retrieveAccessToken':
                  returnData = this.retrieveAccessToken;
                  break;
              case 'revokeAccessToken':
                  returnData = this.revokeAccessToken;
                  break;
              case 'getTokenInfo':
                  returnData = this.getTokenInfo;
                  break;
      
                  // Payments
              case 'addPaymentDetails':
                  returnData = this.addPaymentDetails;
                  break;
              case 'deletePaymentDetails':
                  returnData = this.deletePaymentDetails;
                  break;
              case 'setupDirectDebit':
                  returnData = this.setupDirectDebit;
                  break;
              case 'confirmDirectDebit':
                  returnData = this.confirmDirectDebit;
                  break;
              case 'cancelDirectDebit':
                  returnData = this.cancelDirectDebit;
                  break;
              case 'getPlans':
                  returnData = this.getPlans;
                  break;
              case 'changePlan':
                  returnData = this.changePlan;
                  break;
              case 'paymentCharge':
                  returnData = this.paymentCharge;
                  break;
              case 'getInvoices':
                  returnData = this.getInvoices;
                  break;
              case 'getInvoice':
                  returnData = this.getInvoice;
                  break;
      
                  // saml
              case 'ssoLogin':
                  returnData = this.ssoLogin;
                  break;
              case 'ssoCallback':
                  returnData = this.ssoCallback;
                  break;
                  
                  // signers
              case 'createReminder':
                  returnData = this.createReminder;
                  break;
              case 'getReminder':
                  returnData = this.getReminder;
                  break;
              case 'destroyReminder':
                  returnData = this.destroyReminder;
                  break;
              case 'signDocument':
                  returnData = this.signDocument;
                  break;
              case 'getSignerEnvelopeFromSigners':
                  returnData = this.getSignerEnvelopeFromSigners;
                  break;
              case 'updateSigner':
                  returnData = this.updateSigner;
                  break;
      
                  // Tags
              case 'createTag':
                  returnData = this.createTag;
                  break;
              case 'getTags':
                  returnData = this.getTags;
                  break;
              case 'updateTag':
                  returnData = this.updateTag;
                  break;
              case 'deleteTag':
                  returnData = this.deleteTag;
                  break;
              case 'getResourcesByTagAndType':
                  returnData = this.getResourcesByTagAndType;
                  break;
      
                  // Templates
              case 'createTemplate':
                  returnData = this.createTemplate;
                  break;
              case 'getTemplates':
                  returnData = this.getTemplates;
                  break;
              case 'generateEnvelopeRequest':
                  returnData = this.generateEnvelopeRequest;
                  break;
              case 'updateTemplate':
                  returnData = this.updateTemplate;
                  break;
              case 'retrieveTemplate':
                  returnData = this.retrieveTemplate;
                  break;
              case 'deleteTemplate':
                  returnData = this.deleteTemplate;
                  break;
      
                  // uploads
              case 'uploadFiles':
                  returnData = this.uploadFiles;
                  break;
              case 'archiveFiles':
                  returnData = this.archiveFiles;
                  break;
              case 'getFilesByType':
                  returnData = this.getFilesByType;
                  break;
              case 'getFileByID':
                  returnData = this.getFileByID;
                  break;
              case 'uploadCSVFile':
                  returnData = this.uploadCSVFile;
                  break;
      
                  // Users
              case 'userLogin':
                  returnData = this.userLogin;
                  break;
              case 'userLogout':
                  returnData = this.userLogout;
                  break;
              case 'createContact':
                  returnData = this.createContact;
                  break;
              case 'getContact':
                  returnData = this.getContact;
                  break;
              case 'updateContact':
                  returnData = this.updateContact;
                  break;
              case 'deleteContact':
                  returnData = this.deleteContact;
                  break;
              case 'requestPasswordReset':
                  returnData = this.requestPasswordReset;
                  break;
              case 'resetPassword':
                  returnData = this.resetPassword;
                  break;
              case 'redirectToPasswordReset':
                  returnData = this.redirectToPasswordReset;
                  break;
              case 'createSignature':
                  returnData = this.createSignature;
                  break;
              case 'updateSignature':
                  returnData = this.updateSignature;
                  break;
              case 'getSignature':
                  returnData = this.getSignature;
                  break;
              case 'deleteSignature':
                  returnData = this.deleteSignature;
                  break;
              case 'inviteUser':
                  returnData = this.inviteUser;
                  break;
              case 'retrieveUsers':
                  returnData = this.retrieveUsers;
                  break;
              case 'getUserByID':
                  returnData = this.getUserByID;
                  break;
              case 'updateUser':
                  returnData = this.updateUser;
                  break;
              case 'removeUser':
                  returnData = this.removeUser;
                  break;
              case 'resendToken':
                  returnData = this.resendToken;
                  break;
              case 'confirmUser':
                  returnData = this.confirmUser;
                  break;
              case 'confirmInvite':
                  returnData = this.confirmInvite;
                  break;
      
                  // webhooks
              case 'createWebhook':
                  returnData = this.createWebhook;
                  break;
              case 'getWebhooks':
                  returnData = this.getWebhooks;
                  break;
              case 'deleteWebhook':
                  returnData = this.deleteWebhook;
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
        createAccount = {
          method : "POST",
          path : "accounts",
          parameters: false
      }
      // GET Retrive Account 'accounts'
       retrieveAccount = {
          method : "GET",
          path : "accounts",
          parameters: false
      }
      // PATCH Update Account 'accounts'
       updateAccount = {
          method : "UPDATE",
          path : "accounts",
          parameters: false
      }
      // DELETE Delete Account 'accounts'
       deleteAccount = {
          method : "DELETE",
          path : "accounts",
          parameters: false
      }
      // GET Account With All Users 'accounts/includes/user'
       getAccountWithAllUsers = {
          method: "GET",
          path: "accounts/includes/user",
          parameters: false
      }
      // GET Account Stats 'accounts/{id}/stats'
       getAccountStats = {
          method : "GET",
          path : "accounts/{id}/stats",
          parameters: true
      }
      // GET Recent events 'accounts/{id}/events'
       getRecentEvents = {
          method : "GET",
          path : "accounts/{id}/events",
          parameters: true
      }
      // GET List Extensions'accounts/{id}extensions'
       getExtensionsList = {
          method : "GET",
          path : "accounts/{id}extensions",
          parameters: true
      }
      // PATCH Enable Extension 'accounts/{id}/extensions'
       enableExtension = {
          method : "PATCH",
          path : "accounts/{id}extensions",
          parameters: true
      }
      // DELETE Disable extension 'accounts/{id}/extensions'
       disableExtension = {
          method : "DELETE",
          path : "accounts/{id}extensions",
          parameters: true
      }
      // ===============
      // == Envelopes ==
      // ===============
      
      // POST Create envelope 'envelopes'
       createEnvelope = {
          method : "POST",
          path : "envelopes",
          parameters: false
      }
      // GET Retrive envelopes 'envelopes'
    retrieveEnvelope = {
          method : "GET",
          path : "envelopes",
          parameters: false
      }
      // DELETE Achive envelopes 'envelopes'
       archiveEnvelope = {
          method : "DELETE",
          path : "envelopes",
          parameters: false
      }
      // PATCH Restore archived envelopes 'envelopes'
       restoreEnvelope = {
          method : "PATCH",
          path : "envelopes",
          parameters: false
      }
      // PATCH Redirect to web add
       redirectToWebApp = {
          method : "POST",
          path : "envelopes/redirect",
          parameters: false
      }
      // GET Retrive signed envelopes 'envelopes/signed'
       getSignedEnvelopes = {
          method : "GET",
          path : "envelopes/signed",
          parameters: false
      }
      // GET Retrive completed envelopes 'envelopes/completed'
       getCompletedEnvelopes = {
          method : "GET",
          path : "envelopes/completed",
          parameters: false
      }
      // GET Retrive pending envelopes 'envelopes/pending'
       getPendingEnvelopes = {
          method : "GET",
          path : "envelopes/pending",
          parameters: false
      }
      // GET Retrive declined envelopes 'envelopes/declined'
       getDeclinedEnvelopes = {
          method : "GET",
          path : "envelopes/declined",
          parameters: false
      }
      // GET Retrive inbox envelopes 'envelopes/inbox'
       getInboxEnvelopes = {
          method : "GET",
          path : "envelopes/inbox",
          parameters: false
      }
      // GET Retrive achived envelopes 'envelopes/archived'
       getArchivedEnvelopes = {
          method : "GET",
          path : "envelopes/archived",
          parameters: false
      }
      // GET Retrive envelope 'envelopes/{id}'
       getEnvelope = {
          method : "GET",
          path : "envelopes/{id}",
          parameters: true
      }
      // DELETE Permanently delete envelope 'envelopes/{id}'
       permanentlyDeleteEnvelope = {
          method : "DELETE",
          path : "envelopes/{id}",
          parameters: true
      }
      // GET Retrive signer envelope 'envelopes/{id}/signer/{signer_id}'
       getSignerEnvelope = {
          method : "GET",
          path : "envelopes/{id}/signer/{signer_id}",
          parameters: true
      }
      // GET Retrive Audit Trail 'envelopes/{id}/audits'
       getAuditTrail = {
          method : "GET",
          path : "envelopes/{id}/audits",
          parameters: true
      }
      // GET Retrive attachments 'envelopes/{id}/attachments'
       getAttachments = {
          method : "GET",
          path : "envelopes/{id}/attachments",
          parameters: true
      }
      
      // ===========
      // == OAuth ==
      // ===========
      
      // POST Create an OAuth application 'oauth/applications'
       createOauthApp = {
          method : "POST",
          path : "oauth/applications",
          parameters: false
      }
      // GET Get oauth apps 'oauth/applications'
       getOauthApps = {
          method : "GET",
          path : "oauth/applications",
          parameters: false
      }
      // GET Show oauth app 'oauth/applications/{id}'
       getOauthApp = {
          method : "GET",
          path : "oauth/applications/{id}",
          parameters: true
      }
      // DELETE Delete oauth app 'oauth/applications/{id}'
       deleteOauthApp = {
          method : "DELETE",
          path : "oauth/applications/{id}",
          parameters: true
      }
      // POST Create Authorization code 'oauth/authorize'
       createAuthCode = {
          method : "POST",
          path : "oauth/authorize",
          parameters: false
      }
      // POST Retrieve Access token 'oauth/token'
       retrieveAccessToken = {
          method : "POST",
          path : "oauth/token",
          parameters: false
      }
      // POST Revoke Access token 'oauth/revoke'
       revokeAccessToken = {
          method : "POST",
          path : "oauth/revoke",
          parameters: false
      }
      // GET Get token info 'oauth/token/info'
       getTokenInfo = {
          method : "GET",
          path : "oauth/token/info",
          parameters: false
      }
      
      // ==============
      // == Payments ==
      // ==============
      
      // POST add payment details 'payments/cards'
       addPaymentDetails = {
          method : "POST",
          path : "payments/cards",
          parameters: false
      }
      // DELETE delete payment details 'payments/cards'
       deletePaymentDetails = {
          method : "DELETE",
          path : "payments/cards",
          parameters: false
      }
      // POST set up directs debit 'payments/direct_debits'
       setupDirectDebit = {
          method : "POST",
          path : "payments/direct_debits",
          parameters: false
      }
      // PATCH confirms direct debit 'payments/direct_debits'
       confirmDirectDebit = {
          method : "PATCH",
          path : "payments/direct_debits",
          parameters: false
      }
      // DELETE cancel direct debit 'payments/direct_debits'
       cancelDirectDebit = {
          method : "DELETE",
          path : "payments/direct_debits",
          parameters: false
      }
      // GET get plans 'payments/plans'
       getPlans = {
          method : "GET",
          path : "payments/plans",
          parameters: false
      }
      // PATCH change plan 'payments/plans'
       changePlan = {
          method : "GET",
          path : "payments/plans",
          parameters: false
      }
      // POST payment charge 'payments'
       paymentCharge = {
          method : "POST",
          path : "payments",
          parameters: false
      }
      // GET get invoices 'payments'
       getInvoices = {
          method : "GET",
          path : "payments",
          parameters: false
      }
      // GET get invoice 'payments/{id}'
       getInvoice = {
          method : "GET",
          path : "payments/{id}",
          parameters: true
      }
      
      // ==========
      // == SAML ==
      // ==========
      
      // GET SSO organisation Login 'saml/auth/login'
       ssoLogin = {
          method : "GET",
          path : "saml/auth/login",
          parameters: false
      }
      // POST SSO organisation callback 'saml/auth/callback'
       ssoCallback = {
          method : "POST",
          path : "saml/auth/callback",
          parameters: false
      }
      
      // =============
      // == Signers ==
      // =============
      
      // POST create reminder 'signers/{id}/reminders'
       createReminder = {
          method : "POST",
          path : "signers/{id}/reminders",
          parameters: true
      }
      // GET get reminder 'signers/{id}/reminders'
       getReminder = {
          method : "GET",
          path : "signers/{id}/reminders",
          parameters: true
      }
      // DELETE destroy reminder 'signers/{id}/reminders'
       destroyReminder = {
          method : "DELETE",
          path : "signers/{id}/reminders",
          parameters: true
      }
      // POST Sign Document 'signers/{id}/doumnets/{document_id}'
       signDocument = {
          method : "POST",
          path : "signers/{id}/doumnets/{document_id}",
          parameters: true
      }
      // GET get signer envelope 'signers/{id}'
       getSignerEnvelopeFromSigners = {
          method : "GET",
          path : "signers/{id}",
          parameters: true
      }
      // PATCH update signer 'signers/{id}'
       updateSigner = {
          method : "GET",
          path : "signers/{id}",
          parameters: true
      }
      
      // ==========
      // == Tags ==
      // ==========
      
      // POST Create tag 'tags'
       createTag = {
          method : "POST",
          path : "tags",
          parameters: false
      }
      // GET get tags 'tags'
       getTags = {
          method : "GET",
          path : "tags",
          parameters: false
      }
      // PATCH Update tag 'tags/{id}'
       updateTag = {
          method : "PATCH",
          path : "tags/{id}",
          parameters: true
      }
      // DELETE delete tag 'tags/{id}'
       deleteTag = {
          method : "DELETE",
          path : "tags/{id}",
          parameters: true
      }
      
       getResourcesByTagAndType = {
          method : "GET",
          path : "tags/{id}/{resource_type}",
          parameters: true
      }
      
      // ===============
      // == Templates ==
      // ===============
      
      // POST create template 'templates'
       createTemplate = {
          method : "POST",
          path : "templates",
          parameters: false
      }
      // GET get templates 'templates
       getTemplates = {
          method : "GET",
          path : "templates",
          parameters: false
      }
      // POST generate envelope template 'templates/{id}'
       generateEnvelopeRequest = {
          method : "POST",
          path : "templates/{id}",
          parameters: true
      }
      // PATCH update template 'templates/{id}'
       updateTemplate = {
          method : "PATCH",
          path : "templates/{id}",
          parameters: true
      }
      // GET retrieve template 'templates/{id}'
       retrieveTemplate = {
          method : "POST",
          path : "templates/{id}",
          parameters: true
      }
      // DELETE delete template 'templates/{id}'
       deleteTemplate = {
          method : "DELETE",
          path : "templates/{id}",
          parameters: true
      }
      
      // =============
      // == Uploads ==
      // =============
      
      // POST upload files 'uploads'
       uploadFiles = {
          method : "POST",
          path : "uploads",
          parameters: false
      }
      // DELETE archive files 'uploads'
       archiveFiles = {
          method : "DELETE",
          path : "uploads",
          parameters: false
      }
      // GET get files 'uploads/list/{type}'
       getFilesByType = {
          method : "GET",
          path : "uploads/list/{type}",
          parameters: true
      }
      // GET upload file by id 'uploads/{id}'
       getFileByID = {
          method : "GET",
          path : "uploads/{id}",
          parameters: true
      }
      // POST upload csv file 'uploads/csv'
       uploadCSVFile = {
          method : "POST",
          path : "uploads/csv",
          parameters: false
      }
      
      // ===========
      // == Users ==
      // ===========
      
      // POST login 'users/login'
       userLogin = {
          method : "POST",
          path : "users/login",
          parameters: false
      }
      // DELETE logout 'users/logout'
       userLogout = {
          method : "DELETE",
          path : "users/logout",
          parameters: false
      }
      // POST create contact 'users/contacts'
       createContact = {
          method : "POST",
          path : "users/contacts",
          parameters: false
      }
      // GET get contacts 'users/contacts'
       getContact = {
          method : "POST",
          path : "users/contacts",
          parameters: false
      }
      // PATCH update contact 'users/contacts/{id}'
       updateContact = {
          method : "PATCH",
          path : "users/contacts/{id}",
          parameters: true
      }
      // DELETE delete contact 'users/contacts/{id}'
       deleteContact = {
          method : "DELETE",
          path : "users/contacts/{id}",
          parameters: true
      }
      // POST request reset password 'users/passwords'
       requestPasswordReset = {
          method : "POST",
          path : "users/passwords",
          parameters: false
      }
      // PATCH reset password 'users/passwords/update'
       resetPassword = {
          method : "PATCH",
          path : "users/passwords/update",
          parameters: false
      }
      // GET  redirect to password edit page 'users/passwords/edit'
       redirectToPasswordReset = {
          method : "POST",
          path : "users/passwords/edit",
          parameters: false
      }
      // POST create signature 'users/signatures'
       createSignature = {
          method : "POST",
          path : "users/signatures",
          parameters: false
      }
      // PATCH update signature 'users/signatures/{id}'
       updateSignature = {
          method : "PATCH",
          path : "users/signatures/{id}",
          parameters: true
      }
      // GET get signature 'users/signatures/{id}'
       getSignature = {
          method : "GET",
          path : "users/signatures/{id}",
          parameters: true
      }
      // DELETE delete signature 'users/signatures/{id}'
       deleteSignature = {
          method : "DELETE",
          path : "users/signatures/{id}",
          parameters: true
      }
      // POST invite user 'users'
       inviteUser = {
          method : "POST",
          path : "users",
          parameters: false
      }
      // GET retrieve users 'users
       retrieveUsers = {
          method : "GET",
          path : "users",
          parameters: false
      }
      // GET get user 'users/{id}'
       getUserByID = {
          method : "GET",
          path : "users/{id}",
          parameters: true
      }
      // PATCH updates a user 'users/{id}'
       updateUser = {
          method : "PATCH",
          path : "users/{id}",
          parameters: true
      }
      // DELETE remove user 'users/{id}'
       removeUser = {
          method : "DELETE",
          path : "users/{id}",
          parameters: true
      }
      // POST resend token 'users/confirms'
       resendToken = {
          method : "POST",
          path : "users/confirms",
          parameters: false
      }
      // GET confirms a user 'users/{id}/confirms/{token}'
       confirmUser = {
          method : "GET",
          path : "users/{id}/confirms/{token}",
          parameters: true
      }
      // PATCH confirms an invite 'users/{id}/invites/{token}'
       confirmInvite = {
          method : "PATCH",
          path : "users/{id}/confirms/{token}",
          parameters: true
      }
      
      // ===============
      // == Web Hooks ==
      // ===============
      
      // POST Create webhok 'webhooks'
       createWebhook = {
          method : "POST",
          path : "webhooks",
          parameters: false
      }
      // GET get webhok 'webhooks'
       getWebhooks = {
          method : "GET",
          path : "webhooks",
          parameters: false
      }
      // DELETE delete webho0k 'webhooks/{id}'
       deleteWebhook = {
          method : "DELETE",
          path : "webhooks/{id}",
          parameters: true
      }

    // end of class
}       


