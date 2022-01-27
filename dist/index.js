// This NPM package was created by Isaac Hughes
// https://www.linkedin.com/in/isaac-hughes-software-developer/
// Github Repo
// https://github.com/Isaac-hughes/e-sign-api
// E-Sign API for enterprise customers of e-sign
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.esign = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Roots for all calls
var SANDBOX_ROOT_URL = "https://sandbox.e-sign.co.uk/v3/";
var ROOT_URL = "https://api.e-sign.co.uk/v3/"; // the environment can either be sandbox or live
// defaults to sandbox

var environment = SANDBOX_ROOT_URL; // Axios has been installed to facilitate the HTTP requests
// This package is designed to run off constants rather than many functions
// This makes the package more efficient, and much quicker to write...

var makeRequest = function makeRequest(method, path, headers, data, parameters) {
  // Two seprate calls depending on if parameters are defined
  if (parameters != null) {
    // Function construsts the path from the path and the path parameters
    var pathAndParameters = getPath(path, parameters);

    if (data != null) {
      // Axios http call
      (0, _axios["default"])({
        method: method,
        url: environment + pathAndParameters,
        headers: headers,
        data: data,
        responseType: 'json'
      }).then(function (response) {
        var responseObject = {
          json: response.data,
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        };
        return responseObject;
      })["catch"](function (error) {
        console.log(error);
        return error;
      });
    } else {
      // Axios http call
      (0, _axios["default"])({
        method: method,
        url: environment + pathAndParameters,
        headers: headers,
        responseType: 'json'
      }).then(function (response) {
        var responseObject = {
          json: response.data,
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        };
        return responseObject;
      })["catch"](function (error) {
        console.log(error);
        return error;
      });
    }
  } else {
    if (data != null) {
      // Axios http call
      (0, _axios["default"])({
        method: method,
        url: environment + path,
        headers: headers,
        data: data,
        responseType: 'json'
      }).then(function (response) {
        var responseObject = {
          json: response.data,
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        };
        return responseObject;
      })["catch"](function (error) {
        console.log(error);
        return error;
      });
    } else {
      // Axios http call
      (0, _axios["default"])({
        method: method,
        url: environment + path,
        headers: headers,
        responseType: 'json'
      }).then(function (response) {
        var responseObject = {
          json: response.data,
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        };
        return responseObject;
      })["catch"](function (error) {
        console.log(error);
        return error;
      });
    }
  }
}; // This function is the gateway to all functions


var esign = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(apiKey, call, data, sandbox) {
    var callData, method, path, headers, body, parameters, pathWithParameters;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // set the environment based on a boolean balue for sandbox
            if (sandbox) {
              environment = SANDBOX_ROOT_URL;
            } else if (!sandbox) {
              environment = ROOT_URL;
            } else {
              environment = SANDBOX_ROOT_URL;
            } // how this function works
            // Check all the parameters are valid
            // Select the correct object 


            if (!(call != undefined && call != null && call != "")) {
              _context.next = 8;
              break;
            }

            _context.next = 4;
            return getCallData(call);

          case 4:
            callData = _context.sent;

            if (callData == undefined) {
              console.log("The call you passed does not match any defined call:", call);
            } else {
              method = callData.method;
              path = callData.path;
              headers = {
                'Authorization': "Token ".concat(apiKey)
              };
              body = data.body; // Makes two differernt calls depending on whether parameters or needed

              if (callData.parameters) {
                parameters = data.parameters;
                pathWithParameters = getPath(path, parameters);

                if (body == {} || body == undefined) {
                  makeRequest(method, pathWithParameters, headers, null, parameters);
                } else {
                  makeRequest(method, pathWithParameters, headers, data, parameters);
                }
              } else {
                if (body == {} || body == undefined) {
                  makeRequest(method, path, headers, null, null);
                } else {
                  makeRequest(method, path, headers, data, null);
                }
              }
            }

            _context.next = 10;
            break;

          case 8:
            console.log("The call you passed does not match any defined call", call);
            return _context.abrupt("return", {
              message: "The call you passed does not match any defined call"
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function esign(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}(); // This function takes the path and parameters and returns the completed path for the request


exports.esign = esign;

var getPath = function getPath(path, parameters) {
  // this function takes the path from the call data object and a parameters object
  // It looks through the path string and identifies which parts are parameters
  // It then searches the parameters object for the relevant parameter
  // It returns the completed path as a string
  var arr = path.split('/');
  var returnPath = '';

  for (var i = 0; i < arr.length; i++) {
    if (arr[i][0] == '{') {
      var paramSearch = arr[i].slice(1, -1);
      var param = parameters[paramSearch];
      returnPath = returnPath + '/' + param;
    } else {
      if (returnPath == '') {
        returnPath = arr[i];
      } else {
        returnPath = returnPath + '/' + arr[i];
      }
    }
  }

  return returnPath;
}; // Assign the data fir the http call


var getCallData = function getCallData(call) {
  var returnData;

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

  console.log('return data:', returnData);
  return returnData;
}; // ==============
// == Accounts ==
// ==============
// POST Create Account 'accounts'


var createAccount = {
  method: "POST",
  path: "accounts",
  parameters: false
}; // GET Retrive Account 'accounts'

var retrieveAccount = {
  method: "GET",
  path: "accounts",
  parameters: false
}; // PATCH Update Account 'accounts'

var updateAccount = {
  method: "UPDATE",
  path: "accounts",
  parameters: false
}; // DELETE Delete Account 'accounts'

var deleteAccount = {
  method: "DELETE",
  path: "accounts",
  parameters: false
}; // GET Account With All Users 'accounts/includes/user'

var getAccountWithAllUsers = {
  method: "GET",
  path: "accounts/includes/user",
  parameters: false
}; // GET Account Stats 'accounts/{id}/stats'

var getAccountStats = {
  method: "GET",
  path: "accounts/{id}/stats",
  parameters: true
}; // GET Recent events 'accounts/{id}/events'

var getRecentEvents = {
  method: "GET",
  path: "accounts/{id}/events",
  parameters: true
}; // GET List Extensions'accounts/{id}extensions'

var getExtensionsList = {
  method: "GET",
  path: "accounts/{id}extensions",
  parameters: true
}; // PATCH Enable Extension 'accounts/{id}/extensions'

var enableExtension = {
  method: "PATCH",
  path: "accounts/{id}extensions",
  parameters: true
}; // DELETE Disable extension 'accounts/{id}/extensions'

var disableExtension = {
  method: "DELETE",
  path: "accounts/{id}extensions",
  parameters: true
}; // ===============
// == Envelopes ==
// ===============
// POST Create envelope 'envelopes'

var createEnvelope = {
  method: "POST",
  path: "envelopes",
  parameters: false
}; // GET Retrive envelopes 'envelopes'

var retrieveEnvelope = {
  method: "GET",
  path: "envelopes",
  parameters: false
}; // DELETE Achive envelopes 'envelopes'

var archiveEnvelope = {
  method: "DELETE",
  path: "envelopes",
  parameters: false
}; // PATCH Restore archived envelopes 'envelopes'

var restoreEnvelope = {
  method: "PATCH",
  path: "envelopes",
  parameters: false
}; // PATCH Redirect to web add

var redirectToWebApp = {
  method: "POST",
  path: "envelopes/redirect",
  parameters: false
}; // GET Retrive signed envelopes 'envelopes/signed'

var getSignedEnvelopes = {
  method: "GET",
  path: "envelopes/signed",
  parameters: false
}; // GET Retrive completed envelopes 'envelopes/completed'

var getCompletedEnvelopes = {
  method: "GET",
  path: "envelopes/completed",
  parameters: false
}; // GET Retrive pending envelopes 'envelopes/pending'

var getPendingEnvelopes = {
  method: "GET",
  path: "envelopes/pending",
  parameters: false
}; // GET Retrive declined envelopes 'envelopes/declined'

var getDeclinedEnvelopes = {
  method: "GET",
  path: "envelopes/declined",
  parameters: false
}; // GET Retrive inbox envelopes 'envelopes/inbox'

var getInboxEnvelopes = {
  method: "GET",
  path: "envelopes/inbox",
  parameters: false
}; // GET Retrive achived envelopes 'envelopes/archived'

var getArchivedEnvelopes = {
  method: "GET",
  path: "envelopes/archived",
  parameters: false
}; // GET Retrive envelope 'envelopes/{id}'

var getEnvelope = {
  method: "GET",
  path: "envelopes/{id}",
  parameters: true
}; // DELETE Permanently delete envelope 'envelopes/{id}'

var permanentlyDeleteEnvelope = {
  method: "DELETE",
  path: "envelopes/{id}",
  parameters: true
}; // GET Retrive signer envelope 'envelopes/{id}/signer/{signer_id}'

var getSignerEnvelope = {
  method: "GET",
  path: "envelopes/{id}/signer/{signer_id}",
  parameters: true
}; // GET Retrive Audit Trail 'envelopes/{id}/audits'

var getAuditTrail = {
  method: "GET",
  path: "envelopes/{id}/audits",
  parameters: true
}; // GET Retrive attachments 'envelopes/{id}/attachments'

var getAttachments = {
  method: "GET",
  path: "envelopes/{id}/attachments",
  parameters: true
}; // ===========
// == OAuth ==
// ===========
// POST Create an OAuth application 'oauth/applications'

var createOauthApp = {
  method: "POST",
  path: "oauth/applications",
  parameters: false
}; // GET Get oauth apps 'oauth/applications'

var getOauthApps = {
  method: "GET",
  path: "oauth/applications",
  parameters: false
}; // GET Show oauth app 'oauth/applications/{id}'

var getOauthApp = {
  method: "GET",
  path: "oauth/applications/{id}",
  parameters: true
}; // DELETE Delete oauth app 'oauth/applications/{id}'

var deleteOauthApp = {
  method: "DELETE",
  path: "oauth/applications/{id}",
  parameters: true
}; // POST Create Authorization code 'oauth/authorize'

var createAuthCode = {
  method: "POST",
  path: "oauth/authorize",
  parameters: false
}; // POST Retrieve Access token 'oauth/token'

var retrieveAccessToken = {
  method: "POST",
  path: "oauth/token",
  parameters: false
}; // POST Revoke Access token 'oauth/revoke'

var revokeAccessToken = {
  method: "POST",
  path: "oauth/revoke",
  parameters: false
}; // GET Get token info 'oauth/token/info'

var getTokenInfo = {
  method: "GET",
  path: "oauth/token/info",
  parameters: false
}; // ==============
// == Payments ==
// ==============
// POST add payment details 'payments/cards'

var addPaymentDetails = {
  method: "POST",
  path: "payments/cards",
  parameters: false
}; // DELETE delete payment details 'payments/cards'

var deletePaymentDetails = {
  method: "DELETE",
  path: "payments/cards",
  parameters: false
}; // POST set up directs debit 'payments/direct_debits'

var setupDirectDebit = {
  method: "POST",
  path: "payments/direct_debits",
  parameters: false
}; // PATCH confirms direct debit 'payments/direct_debits'

var confirmDirectDebit = {
  method: "PATCH",
  path: "payments/direct_debits",
  parameters: false
}; // DELETE cancel direct debit 'payments/direct_debits'

var cancelDirectDebit = {
  method: "DELETE",
  path: "payments/direct_debits",
  parameters: false
}; // GET get plans 'payments/plans'

var getPlans = {
  method: "GET",
  path: "payments/plans",
  parameters: false
}; // PATCH change plan 'payments/plans'

var changePlan = {
  method: "GET",
  path: "payments/plans",
  parameters: false
}; // POST payment charge 'payments'

var paymentCharge = {
  method: "POST",
  path: "payments",
  parameters: false
}; // GET get invoices 'payments'

var getInvoices = {
  method: "GET",
  path: "payments",
  parameters: false
}; // GET get invoice 'payments/{id}'

var getInvoice = {
  method: "GET",
  path: "payments/{id}",
  parameters: true
}; // ==========
// == SAML ==
// ==========
// GET SSO organisation Login 'saml/auth/login'

var ssoLogin = {
  method: "GET",
  path: "saml/auth/login",
  parameters: false
}; // POST SSO organisation callback 'saml/auth/callback'

var ssoCallback = {
  method: "POST",
  path: "saml/auth/callback",
  parameters: false
}; // =============
// == Signers ==
// =============
// POST create reminder 'signers/{id}/reminders'

var createReminder = {
  method: "POST",
  path: "signers/{id}/reminders",
  parameters: true
}; // GET get reminder 'signers/{id}/reminders'

var getReminder = {
  method: "GET",
  path: "signers/{id}/reminders",
  parameters: true
}; // DELETE destroy reminder 'signers/{id}/reminders'

var destroyReminder = {
  method: "DELETE",
  path: "signers/{id}/reminders",
  parameters: true
}; // POST Sign Document 'signers/{id}/doumnets/{document_id}'

var signDocument = {
  method: "POST",
  path: "signers/{id}/doumnets/{document_id}",
  parameters: true
}; // GET get signer envelope 'signers/{id}'

var getSignerEnvelopeFromSigners = {
  method: "GET",
  path: "signers/{id}",
  parameters: true
}; // PATCH update signer 'signers/{id}'

var updateSigner = {
  method: "GET",
  path: "signers/{id}",
  parameters: true
}; // ==========
// == Tags ==
// ==========
// POST Create tag 'tags'

var createTag = {
  method: "POST",
  path: "tags",
  parameters: false
}; // GET get tags 'tags'

var getTags = {
  method: "GET",
  path: "tags",
  parameters: false
}; // PATCH Update tag 'tags/{id}'

var updateTag = {
  method: "PATCH",
  path: "tags/{id}",
  parameters: true
}; // DELETE delete tag 'tags/{id}'

var deleteTag = {
  method: "DELETE",
  path: "tags/{id}",
  parameters: true
};
var getResourcesByTagAndType = {
  method: "GET",
  path: "tags/{id}/{resource_type}",
  parameters: true
}; // ===============
// == Templates ==
// ===============
// POST create template 'templates'

var createTemplate = {
  method: "POST",
  path: "templates",
  parameters: false
}; // GET get templates 'templates

var getTemplates = {
  method: "GET",
  path: "templates",
  parameters: false
}; // POST generate envelope template 'templates/{id}'

var generateEnvelopeRequest = {
  method: "POST",
  path: "templates/{id}",
  parameters: true
}; // PATCH update template 'templates/{id}'

var updateTemplate = {
  method: "PATCH",
  path: "templates/{id}",
  parameters: true
}; // GET retrieve template 'templates/{id}'

var retrieveTemplate = {
  method: "POST",
  path: "templates/{id}",
  parameters: true
}; // DELETE delete template 'templates/{id}'

var deleteTemplate = {
  method: "DELETE",
  path: "templates/{id}",
  parameters: true
}; // =============
// == Uploads ==
// =============
// POST upload files 'uploads'

var uploadFiles = {
  method: "POST",
  path: "uploads",
  parameters: false
}; // DELETE archive files 'uploads'

var archiveFiles = {
  method: "DELETE",
  path: "uploads",
  parameters: false
}; // GET get files 'uploads/list/{type}'

var getFilesByType = {
  method: "GET",
  path: "uploads/list/{type}",
  parameters: true
}; // GET upload file by id 'uploads/{id}'

var getFileByID = {
  method: "GET",
  path: "uploads/{id}",
  parameters: true
}; // POST upload csv file 'uploads/csv'

var uploadCSVFile = {
  method: "POST",
  path: "uploads/csv",
  parameters: false
}; // ===========
// == Users ==
// ===========
// POST login 'users/login'

var userLogin = {
  method: "POST",
  path: "users/login",
  parameters: false
}; // DELETE logout 'users/logout'

var userLogout = {
  method: "DELETE",
  path: "users/logout",
  parameters: false
}; // POST create contact 'users/contacts'

var createContact = {
  method: "POST",
  path: "users/contacts",
  parameters: false
}; // GET get contacts 'users/contacts'

var getContact = {
  method: "POST",
  path: "users/contacts",
  parameters: false
}; // PATCH update contact 'users/contacts/{id}'

var updateContact = {
  method: "PATCH",
  path: "users/contacts/{id}",
  parameters: true
}; // DELETE delete contact 'users/contacts/{id}'

var deleteContact = {
  method: "DELETE",
  path: "users/contacts/{id}",
  parameters: true
}; // POST request reset password 'users/passwords'

var requestPasswordReset = {
  method: "POST",
  path: "users/passwords",
  parameters: false
}; // PATCH reset password 'users/passwords/update'

var resetPassword = {
  method: "PATCH",
  path: "users/passwords/update",
  parameters: false
}; // GET  redirect to password edit page 'users/passwords/edit'

var redirectToPasswordReset = {
  method: "POST",
  path: "users/passwords/edit",
  parameters: false
}; // POST create signature 'users/signatures'

var createSignature = {
  method: "POST",
  path: "users/signatures",
  parameters: false
}; // PATCH update signature 'users/signatures/{id}'

var updateSignature = {
  method: "PATCH",
  path: "users/signatures/{id}",
  parameters: true
}; // GET get signature 'users/signatures/{id}'

var getSignature = {
  method: "GET",
  path: "users/signatures/{id}",
  parameters: true
}; // DELETE delete signature 'users/signatures/{id}'

var deleteSignature = {
  method: "DELETE",
  path: "users/signatures/{id}",
  parameters: true
}; // POST invite user 'users'

var inviteUser = {
  method: "POST",
  path: "users",
  parameters: false
}; // GET retrieve users 'users

var retrieveUsers = {
  method: "GET",
  path: "users",
  parameters: false
}; // GET get user 'users/{id}'

var getUserByID = {
  method: "GET",
  path: "users/{id}",
  parameters: true
}; // PATCH updates a user 'users/{id}'

var updateUser = {
  method: "PATCH",
  path: "users/{id}",
  parameters: true
}; // DELETE remove user 'users/{id}'

var removeUser = {
  method: "DELETE",
  path: "users/{id}",
  parameters: true
}; // POST resend token 'users/confirms'

var resendToken = {
  method: "POST",
  path: "users/confirms",
  parameters: false
}; // GET confirms a user 'users/{id}/confirms/{token}'

var confirmUser = {
  method: "GET",
  path: "users/{id}/confirms/{token}",
  parameters: true
}; // PATCH confirms an invite 'users/{id}/invites/{token}'

var confirmInvite = {
  method: "PATCH",
  path: "users/{id}/confirms/{token}",
  parameters: true
}; // ===============
// == Web Hooks ==
// ===============
// POST Create webhok 'webhooks'

var createWebhook = {
  method: "POST",
  path: "webhooks",
  parameters: false
}; // GET get webhok 'webhooks'

var getWebhooks = {
  method: "GET",
  path: "webhooks",
  parameters: false
}; // DELETE delete webho0k 'webhooks/{id}'

var deleteWebhook = {
  method: "DELETE",
  path: "webhooks/{id}",
  parameters: true
};