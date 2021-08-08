// E-Sign API for enterprise customers of e-sign


// Roots for all calls
const SANDBOX_ROOT_URL = "https://sandbox.e-sign.co.uk/v3/"
const ROOT_URL = "https://api.e-sign.co.uk/v3/"

// ==============
// == Accounts ==
// ==============

// POST Create Account 'accounts'
// GET Retrive Account 'accounts'
// PATCH Update Account 'accounts'
// DELETE Delete Account 'accounts'
// GET Account With All Users 'accounts/includes/user'
// GET Account Stats 'accounts/{id}/stats'
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