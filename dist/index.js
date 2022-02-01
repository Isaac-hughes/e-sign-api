// This NPM package was created by Isaac Hughes
// https://www.linkedin.com/in/isaac-hughes-software-developer/
// Github Repo
// https://github.com/Isaac-hughes/e-sign-api
// E-Sign API for enterprise customers of e-sign
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ESign = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ESign = /*#__PURE__*/_createClass(function ESign() {
  var _this = this;

  _classCallCheck(this, ESign);

  _defineProperty(this, "SANDBOX_ROOT_URL", "https://sandbox.e-sign.co.uk/v3/");

  _defineProperty(this, "ROOT_URL", "https://api.e-sign.co.uk/v3/");

  _defineProperty(this, "environment", this.SANDBOX_ROOT_URL);

  _defineProperty(this, "makeRequest", function (method, path, headers, data, parameters) {
    // Two seprate calls depending on if parameters are defined
    if (parameters != null) {
      // Function construsts the path from the path and the path parameters
      var pathAndParameters = _this.getPath(path, parameters);

      if (data != null) {
        // Axios http call
        (0, _axios["default"])({
          method: method,
          url: _this.environment + pathAndParameters,
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
          url: _this.environment + pathAndParameters,
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
          url: _this.environment + path,
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
          url: _this.environment + path,
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
  });

  _defineProperty(this, "esign", /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(apiKey, call, data, sandbox) {
      var callData, method, path, headers, body, parameters, pathWithParameters;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // set the environment based on a boolean balue for sandbox
              if (sandbox) {
                _this.environment = _this.SANDBOX_ROOT_URL;
              } else if (!sandbox) {
                _this.environment = _this.ROOT_URL;
              } else {
                _this.environment = _this.SANDBOX_ROOT_URL;
              } // how this function works
              // Check all the parameters are valid
              // Select the correct object 


              if (!(call != undefined && call != null && call != "")) {
                _context.next = 16;
                break;
              }

              _context.next = 4;
              return _this.getCallData(call);

            case 4:
              callData = _context.sent;

              if (!(callData == undefined)) {
                _context.next = 9;
                break;
              }

              return _context.abrupt("return", {
                message: "The call you passed does not match any defined call",
                call: call
              });

            case 9:
              method = callData.method;
              path = callData.path;
              headers = {
                'Authorization': "Token ".concat(apiKey)
              };
              body = data.body; // Makes two differernt calls depending on whether parameters or needed

              if (callData.parameters) {
                parameters = data.parameters;
                pathWithParameters = _this.getPath(path, parameters);

                if (body == {} || body == undefined) {
                  _this.makeRequest(method, pathWithParameters, headers, null, parameters);
                } else {
                  _this.makeRequest(method, pathWithParameters, headers, data, parameters);
                }
              } else {
                if (body == {} || body == undefined) {
                  _this.makeRequest(method, path, headers, null, null);
                } else {
                  _this.makeRequest(method, path, headers, data, null);
                }
              }

            case 14:
              _context.next = 18;
              break;

            case 16:
              console.log("The call you passed does not match any defined call", call);
              return _context.abrupt("return", {
                message: "The call you passed does not match any defined call"
              });

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }());

  _defineProperty(this, "getPath", function (path, parameters) {
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
  });

  _defineProperty(this, "getCallData", function (call) {
    var returnData;

    switch (call) {
      // Accounts
      case 'createAccount':
        returnData = _this.createAccount;
        break;

      case 'retrieveAccount':
        returnData = _this.retrieveAccount;
        break;

      case 'updateAccount':
        returnData = _this.updateAccount;
        break;

      case 'deleteAccount':
        returnData = _this.deleteAccount;
        break;

      case 'getAccountWithAllUsers':
        returnData = _this.getAccountWithAllUsers;
        break;

      case 'getAccountStats':
        returnData = _this.getAccountStats;
        break;

      case 'getRecentEvents':
        returnData = _this.getRecentEvents;
        break;

      case 'getExtensionsList':
        returnData = _this.getExtensionsList;
        break;

      case 'enableExtension':
        returnData = _this.enableExtension;
        break;

      case 'disableExtension':
        returnData = _this.disableExtension;
        break;
      // Envelopes

      case 'createEnvelope':
        returnData = _this.createEnvelope;
        break;

      case 'retrieveEnvelope':
        returnData = _this.retrieveEnvelope;
        break;

      case 'archiveEnvelope':
        returnData = _this.archiveEnvelope;
        break;

      case 'restoreEnvelope':
        returnData = _this.restoreEnvelope;
        break;

      case 'redirectToWebApp':
        returnData = _this.redirectToWebApp;
        break;

      case 'getSignedEnvelopes':
        returnData = _this.getSignedEnvelopes;
        break;

      case 'getCompletedEnvelopes':
        returnData = _this.getCompletedEnvelopes;
        break;

      case 'getPendingEnvelopes':
        returnData = _this.getPendingEnvelopes;
        break;

      case 'getDeclinedEnvelopes':
        returnData = _this.getDeclinedEnvelopes;
        break;

      case 'getInboxEnvelopes':
        returnData = _this.getInboxEnvelopes;
        break;

      case 'getArchivedEnvelopes':
        returnData = _this.getArchivedEnvelopes;
        break;

      case 'getEnvelope':
        returnData = _this.getEnvelope;
        break;

      case 'permanentlyDeleteEnvelope':
        returnData = _this.permanentlyDeleteEnvelope;
        break;

      case 'getSignerEnvelope':
        returnData = _this.getSignerEnvelope;
        break;

      case 'getAuditTrail':
        returnData = _this.getAuditTrail;
        break;

      case 'getAttachments':
        returnData = _this.getAttachments;
        break;
      // OAuth

      case 'createOauthApp':
        returnData = _this.createOauthApp;
        break;

      case 'getOauthApps':
        returnData = _this.getOauthApps;
        break;

      case 'getOauthApp':
        returnData = _this.getOauthApp;
        break;

      case 'deleteOauthApp':
        returnData = _this.deleteOauthApp;
        break;

      case 'createAuthCode':
        returnData = _this.createAuthCode;
        break;

      case 'retrieveAccessToken':
        returnData = _this.retrieveAccessToken;
        break;

      case 'revokeAccessToken':
        returnData = _this.revokeAccessToken;
        break;

      case 'getTokenInfo':
        returnData = _this.getTokenInfo;
        break;
      // Payments

      case 'addPaymentDetails':
        returnData = _this.addPaymentDetails;
        break;

      case 'deletePaymentDetails':
        returnData = _this.deletePaymentDetails;
        break;

      case 'setupDirectDebit':
        returnData = _this.setupDirectDebit;
        break;

      case 'confirmDirectDebit':
        returnData = _this.confirmDirectDebit;
        break;

      case 'cancelDirectDebit':
        returnData = _this.cancelDirectDebit;
        break;

      case 'getPlans':
        returnData = _this.getPlans;
        break;

      case 'changePlan':
        returnData = _this.changePlan;
        break;

      case 'paymentCharge':
        returnData = _this.paymentCharge;
        break;

      case 'getInvoices':
        returnData = _this.getInvoices;
        break;

      case 'getInvoice':
        returnData = _this.getInvoice;
        break;
      // saml

      case 'ssoLogin':
        returnData = _this.ssoLogin;
        break;

      case 'ssoCallback':
        returnData = _this.ssoCallback;
        break;
      // signers

      case 'createReminder':
        returnData = _this.createReminder;
        break;

      case 'getReminder':
        returnData = _this.getReminder;
        break;

      case 'destroyReminder':
        returnData = _this.destroyReminder;
        break;

      case 'signDocument':
        returnData = _this.signDocument;
        break;

      case 'getSignerEnvelopeFromSigners':
        returnData = _this.getSignerEnvelopeFromSigners;
        break;

      case 'updateSigner':
        returnData = _this.updateSigner;
        break;
      // Tags

      case 'createTag':
        returnData = _this.createTag;
        break;

      case 'getTags':
        returnData = _this.getTags;
        break;

      case 'updateTag':
        returnData = _this.updateTag;
        break;

      case 'deleteTag':
        returnData = _this.deleteTag;
        break;

      case 'getResourcesByTagAndType':
        returnData = _this.getResourcesByTagAndType;
        break;
      // Templates

      case 'createTemplate':
        returnData = _this.createTemplate;
        break;

      case 'getTemplates':
        returnData = _this.getTemplates;
        break;

      case 'generateEnvelopeRequest':
        returnData = _this.generateEnvelopeRequest;
        break;

      case 'updateTemplate':
        returnData = _this.updateTemplate;
        break;

      case 'retrieveTemplate':
        returnData = _this.retrieveTemplate;
        break;

      case 'deleteTemplate':
        returnData = _this.deleteTemplate;
        break;
      // uploads

      case 'uploadFiles':
        returnData = _this.uploadFiles;
        break;

      case 'archiveFiles':
        returnData = _this.archiveFiles;
        break;

      case 'getFilesByType':
        returnData = _this.getFilesByType;
        break;

      case 'getFileByID':
        returnData = _this.getFileByID;
        break;

      case 'uploadCSVFile':
        returnData = _this.uploadCSVFile;
        break;
      // Users

      case 'userLogin':
        returnData = _this.userLogin;
        break;

      case 'userLogout':
        returnData = _this.userLogout;
        break;

      case 'createContact':
        returnData = _this.createContact;
        break;

      case 'getContact':
        returnData = _this.getContact;
        break;

      case 'updateContact':
        returnData = _this.updateContact;
        break;

      case 'deleteContact':
        returnData = _this.deleteContact;
        break;

      case 'requestPasswordReset':
        returnData = _this.requestPasswordReset;
        break;

      case 'resetPassword':
        returnData = _this.resetPassword;
        break;

      case 'redirectToPasswordReset':
        returnData = _this.redirectToPasswordReset;
        break;

      case 'createSignature':
        returnData = _this.createSignature;
        break;

      case 'updateSignature':
        returnData = _this.updateSignature;
        break;

      case 'getSignature':
        returnData = _this.getSignature;
        break;

      case 'deleteSignature':
        returnData = _this.deleteSignature;
        break;

      case 'inviteUser':
        returnData = _this.inviteUser;
        break;

      case 'retrieveUsers':
        returnData = _this.retrieveUsers;
        break;

      case 'getUserByID':
        returnData = _this.getUserByID;
        break;

      case 'updateUser':
        returnData = _this.updateUser;
        break;

      case 'removeUser':
        returnData = _this.removeUser;
        break;

      case 'resendToken':
        returnData = _this.resendToken;
        break;

      case 'confirmUser':
        returnData = _this.confirmUser;
        break;

      case 'confirmInvite':
        returnData = _this.confirmInvite;
        break;
      // webhooks

      case 'createWebhook':
        returnData = _this.createWebhook;
        break;

      case 'getWebhooks':
        returnData = _this.getWebhooks;
        break;

      case 'deleteWebhook':
        returnData = _this.deleteWebhook;
        break;
      // Default

      default:
        return undefined;
    }

    console.log('return data:', returnData);
    return returnData;
  });

  _defineProperty(this, "createAccount", {
    method: "POST",
    path: "accounts",
    parameters: false
  });

  _defineProperty(this, "retrieveAccount", {
    method: "GET",
    path: "accounts",
    parameters: false
  });

  _defineProperty(this, "updateAccount", {
    method: "UPDATE",
    path: "accounts",
    parameters: false
  });

  _defineProperty(this, "deleteAccount", {
    method: "DELETE",
    path: "accounts",
    parameters: false
  });

  _defineProperty(this, "getAccountWithAllUsers", {
    method: "GET",
    path: "accounts/includes/user",
    parameters: false
  });

  _defineProperty(this, "getAccountStats", {
    method: "GET",
    path: "accounts/{id}/stats",
    parameters: true
  });

  _defineProperty(this, "getRecentEvents", {
    method: "GET",
    path: "accounts/{id}/events",
    parameters: true
  });

  _defineProperty(this, "getExtensionsList", {
    method: "GET",
    path: "accounts/{id}extensions",
    parameters: true
  });

  _defineProperty(this, "enableExtension", {
    method: "PATCH",
    path: "accounts/{id}extensions",
    parameters: true
  });

  _defineProperty(this, "disableExtension", {
    method: "DELETE",
    path: "accounts/{id}extensions",
    parameters: true
  });

  _defineProperty(this, "createEnvelope", {
    method: "POST",
    path: "envelopes",
    parameters: false
  });

  _defineProperty(this, "retrieveEnvelope", {
    method: "GET",
    path: "envelopes",
    parameters: false
  });

  _defineProperty(this, "archiveEnvelope", {
    method: "DELETE",
    path: "envelopes",
    parameters: false
  });

  _defineProperty(this, "restoreEnvelope", {
    method: "PATCH",
    path: "envelopes",
    parameters: false
  });

  _defineProperty(this, "redirectToWebApp", {
    method: "POST",
    path: "envelopes/redirect",
    parameters: false
  });

  _defineProperty(this, "getSignedEnvelopes", {
    method: "GET",
    path: "envelopes/signed",
    parameters: false
  });

  _defineProperty(this, "getCompletedEnvelopes", {
    method: "GET",
    path: "envelopes/completed",
    parameters: false
  });

  _defineProperty(this, "getPendingEnvelopes", {
    method: "GET",
    path: "envelopes/pending",
    parameters: false
  });

  _defineProperty(this, "getDeclinedEnvelopes", {
    method: "GET",
    path: "envelopes/declined",
    parameters: false
  });

  _defineProperty(this, "getInboxEnvelopes", {
    method: "GET",
    path: "envelopes/inbox",
    parameters: false
  });

  _defineProperty(this, "getArchivedEnvelopes", {
    method: "GET",
    path: "envelopes/archived",
    parameters: false
  });

  _defineProperty(this, "getEnvelope", {
    method: "GET",
    path: "envelopes/{id}",
    parameters: true
  });

  _defineProperty(this, "permanentlyDeleteEnvelope", {
    method: "DELETE",
    path: "envelopes/{id}",
    parameters: true
  });

  _defineProperty(this, "getSignerEnvelope", {
    method: "GET",
    path: "envelopes/{id}/signer/{signer_id}",
    parameters: true
  });

  _defineProperty(this, "getAuditTrail", {
    method: "GET",
    path: "envelopes/{id}/audits",
    parameters: true
  });

  _defineProperty(this, "getAttachments", {
    method: "GET",
    path: "envelopes/{id}/attachments",
    parameters: true
  });

  _defineProperty(this, "createOauthApp", {
    method: "POST",
    path: "oauth/applications",
    parameters: false
  });

  _defineProperty(this, "getOauthApps", {
    method: "GET",
    path: "oauth/applications",
    parameters: false
  });

  _defineProperty(this, "getOauthApp", {
    method: "GET",
    path: "oauth/applications/{id}",
    parameters: true
  });

  _defineProperty(this, "deleteOauthApp", {
    method: "DELETE",
    path: "oauth/applications/{id}",
    parameters: true
  });

  _defineProperty(this, "createAuthCode", {
    method: "POST",
    path: "oauth/authorize",
    parameters: false
  });

  _defineProperty(this, "retrieveAccessToken", {
    method: "POST",
    path: "oauth/token",
    parameters: false
  });

  _defineProperty(this, "revokeAccessToken", {
    method: "POST",
    path: "oauth/revoke",
    parameters: false
  });

  _defineProperty(this, "getTokenInfo", {
    method: "GET",
    path: "oauth/token/info",
    parameters: false
  });

  _defineProperty(this, "addPaymentDetails", {
    method: "POST",
    path: "payments/cards",
    parameters: false
  });

  _defineProperty(this, "deletePaymentDetails", {
    method: "DELETE",
    path: "payments/cards",
    parameters: false
  });

  _defineProperty(this, "setupDirectDebit", {
    method: "POST",
    path: "payments/direct_debits",
    parameters: false
  });

  _defineProperty(this, "confirmDirectDebit", {
    method: "PATCH",
    path: "payments/direct_debits",
    parameters: false
  });

  _defineProperty(this, "cancelDirectDebit", {
    method: "DELETE",
    path: "payments/direct_debits",
    parameters: false
  });

  _defineProperty(this, "getPlans", {
    method: "GET",
    path: "payments/plans",
    parameters: false
  });

  _defineProperty(this, "changePlan", {
    method: "GET",
    path: "payments/plans",
    parameters: false
  });

  _defineProperty(this, "paymentCharge", {
    method: "POST",
    path: "payments",
    parameters: false
  });

  _defineProperty(this, "getInvoices", {
    method: "GET",
    path: "payments",
    parameters: false
  });

  _defineProperty(this, "getInvoice", {
    method: "GET",
    path: "payments/{id}",
    parameters: true
  });

  _defineProperty(this, "ssoLogin", {
    method: "GET",
    path: "saml/auth/login",
    parameters: false
  });

  _defineProperty(this, "ssoCallback", {
    method: "POST",
    path: "saml/auth/callback",
    parameters: false
  });

  _defineProperty(this, "createReminder", {
    method: "POST",
    path: "signers/{id}/reminders",
    parameters: true
  });

  _defineProperty(this, "getReminder", {
    method: "GET",
    path: "signers/{id}/reminders",
    parameters: true
  });

  _defineProperty(this, "destroyReminder", {
    method: "DELETE",
    path: "signers/{id}/reminders",
    parameters: true
  });

  _defineProperty(this, "signDocument", {
    method: "POST",
    path: "signers/{id}/doumnets/{document_id}",
    parameters: true
  });

  _defineProperty(this, "getSignerEnvelopeFromSigners", {
    method: "GET",
    path: "signers/{id}",
    parameters: true
  });

  _defineProperty(this, "updateSigner", {
    method: "GET",
    path: "signers/{id}",
    parameters: true
  });

  _defineProperty(this, "createTag", {
    method: "POST",
    path: "tags",
    parameters: false
  });

  _defineProperty(this, "getTags", {
    method: "GET",
    path: "tags",
    parameters: false
  });

  _defineProperty(this, "updateTag", {
    method: "PATCH",
    path: "tags/{id}",
    parameters: true
  });

  _defineProperty(this, "deleteTag", {
    method: "DELETE",
    path: "tags/{id}",
    parameters: true
  });

  _defineProperty(this, "getResourcesByTagAndType", {
    method: "GET",
    path: "tags/{id}/{resource_type}",
    parameters: true
  });

  _defineProperty(this, "createTemplate", {
    method: "POST",
    path: "templates",
    parameters: false
  });

  _defineProperty(this, "getTemplates", {
    method: "GET",
    path: "templates",
    parameters: false
  });

  _defineProperty(this, "generateEnvelopeRequest", {
    method: "POST",
    path: "templates/{id}",
    parameters: true
  });

  _defineProperty(this, "updateTemplate", {
    method: "PATCH",
    path: "templates/{id}",
    parameters: true
  });

  _defineProperty(this, "retrieveTemplate", {
    method: "POST",
    path: "templates/{id}",
    parameters: true
  });

  _defineProperty(this, "deleteTemplate", {
    method: "DELETE",
    path: "templates/{id}",
    parameters: true
  });

  _defineProperty(this, "uploadFiles", {
    method: "POST",
    path: "uploads",
    parameters: false
  });

  _defineProperty(this, "archiveFiles", {
    method: "DELETE",
    path: "uploads",
    parameters: false
  });

  _defineProperty(this, "getFilesByType", {
    method: "GET",
    path: "uploads/list/{type}",
    parameters: true
  });

  _defineProperty(this, "getFileByID", {
    method: "GET",
    path: "uploads/{id}",
    parameters: true
  });

  _defineProperty(this, "uploadCSVFile", {
    method: "POST",
    path: "uploads/csv",
    parameters: false
  });

  _defineProperty(this, "userLogin", {
    method: "POST",
    path: "users/login",
    parameters: false
  });

  _defineProperty(this, "userLogout", {
    method: "DELETE",
    path: "users/logout",
    parameters: false
  });

  _defineProperty(this, "createContact", {
    method: "POST",
    path: "users/contacts",
    parameters: false
  });

  _defineProperty(this, "getContact", {
    method: "POST",
    path: "users/contacts",
    parameters: false
  });

  _defineProperty(this, "updateContact", {
    method: "PATCH",
    path: "users/contacts/{id}",
    parameters: true
  });

  _defineProperty(this, "deleteContact", {
    method: "DELETE",
    path: "users/contacts/{id}",
    parameters: true
  });

  _defineProperty(this, "requestPasswordReset", {
    method: "POST",
    path: "users/passwords",
    parameters: false
  });

  _defineProperty(this, "resetPassword", {
    method: "PATCH",
    path: "users/passwords/update",
    parameters: false
  });

  _defineProperty(this, "redirectToPasswordReset", {
    method: "POST",
    path: "users/passwords/edit",
    parameters: false
  });

  _defineProperty(this, "createSignature", {
    method: "POST",
    path: "users/signatures",
    parameters: false
  });

  _defineProperty(this, "updateSignature", {
    method: "PATCH",
    path: "users/signatures/{id}",
    parameters: true
  });

  _defineProperty(this, "getSignature", {
    method: "GET",
    path: "users/signatures/{id}",
    parameters: true
  });

  _defineProperty(this, "deleteSignature", {
    method: "DELETE",
    path: "users/signatures/{id}",
    parameters: true
  });

  _defineProperty(this, "inviteUser", {
    method: "POST",
    path: "users",
    parameters: false
  });

  _defineProperty(this, "retrieveUsers", {
    method: "GET",
    path: "users",
    parameters: false
  });

  _defineProperty(this, "getUserByID", {
    method: "GET",
    path: "users/{id}",
    parameters: true
  });

  _defineProperty(this, "updateUser", {
    method: "PATCH",
    path: "users/{id}",
    parameters: true
  });

  _defineProperty(this, "removeUser", {
    method: "DELETE",
    path: "users/{id}",
    parameters: true
  });

  _defineProperty(this, "resendToken", {
    method: "POST",
    path: "users/confirms",
    parameters: false
  });

  _defineProperty(this, "confirmUser", {
    method: "GET",
    path: "users/{id}/confirms/{token}",
    parameters: true
  });

  _defineProperty(this, "confirmInvite", {
    method: "PATCH",
    path: "users/{id}/confirms/{token}",
    parameters: true
  });

  _defineProperty(this, "createWebhook", {
    method: "POST",
    path: "webhooks",
    parameters: false
  });

  _defineProperty(this, "getWebhooks", {
    method: "GET",
    path: "webhooks",
    parameters: false
  });

  _defineProperty(this, "deleteWebhook", {
    method: "DELETE",
    path: "webhooks/{id}",
    parameters: true
  });
} // end of class
);

exports.ESign = ESign;