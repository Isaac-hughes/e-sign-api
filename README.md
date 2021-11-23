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