var express = require('express'),
fs = require('fs'),
ParseServer = require('parse-server').ParseServer,
https = require('https'),
app = express();

var options = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem'),
};
var api = new ParseServer({
    databaseURI: "mongodb://127.0.0.1:27017/parse",
    cloud: "./cloud/main",
    appId: "APP_ID_HERE",
    masterKey: "MASTER_KEY_HERE",
    //fileKey: "3035f7cc560bf7ca1f4c3b722cdff112c17a3f63",
    serverURL: "https://localhost:1337/parse"
});
// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);

var port = 1337;
https.createServer(options, app).listen(port, function() {
        console.log('parse-server running on port ' + port);
});

//Parse Dashboard
var ParseDashboard = require('parse-dashboard');
var dashboard = new ParseDashboard({
    apps: [
        {
            appName: "APP_NAME_HERE",
            appId: "APP_ID_HERE",
            masterKey: "MASTER_KEY_HERE",
            //fileKey: "3035f7cc560bf7ca1f4c3b722cdff112c17a3f63",
            production: true,
            serverURL: "https://localhost:4040/parse"
        }
    ],
    users: [
        {
            user: "admin",
            pass: "admin123!"
        }
    ]
},{
  allowInsecureHTTP: false,
trustProxy: 1,
cookieSessionSecret: '545ddd'
});

// Serve the Parse Dashboard on the /parsedashboard URL prefix
app.use('/', dashboard);

var portdash = 4040;
https.createServer(options, app).listen(portdash, function() {
    console.log('parse-dashboard running on port ' + portdash);
});