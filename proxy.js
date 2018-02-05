var httpProxy = require('http-proxy');
var http = require('http');
var https = require('https');
var express = require('express');
var app = express();
const fs = require('fs');
const path = require('path');
var dir = path.dirname(fs.realpathSync(__filename));

var commandLineArgs = require('command-line-args');
var options = commandLineArgs([
    { name: 'source-port', alias: 's', type: Number },
    { name: 'source-host', alias: 'h', type: String },
    { name: 'proxy-port', alias: 'p', type: Number }
]);

app.use(function (req, res, next) {
    console.log(req);
    if (req.url === '/') {
        console.log("Transforming response");

        var _write = res.write;

        // Rewrite the livereload port with our secure one
        res.write = function (data) {
            _write.call(res, data.toString().replace('35729', '35700'), 'utf8');
        }
    }

    proxy.web(req, res);
}
);

// Proxy for connect server to use
var proxy = httpProxy.createServer({
    target: {
        host: options['source-host'],
        port: options['source-port'],
    }
});

//https://matoski.com/article/node-express-generate-ssl/
var secureServer = https.createServer({
    key: fs.readFileSync(`${dir}/server.key`),
    cert: fs.readFileSync(`${dir}/server.crt`),
    //ca: fs.readFileSync('./ca.crt'), 
    requestCert: true,
    rejectUnauthorized: false
}, app).listen(options['proxy-port'], function () {
    console.log('Secure Express server listening on port ' + options['proxy-port']);
});