const process = require('child_process');
const fs = require('fs');
const path = require('path');
var dir = path.dirname(fs.realpathSync(__filename));

var proxies = [
    ['localhost', '5005', '5006'],
    ['localhost', '8100', '8101'],
];

proxies.forEach((proxy) => {
    processProxy(proxy);
});

function processProxy(proxy) {
    var child = process.spawn('node', [`${dir}\\proxy.js`, '-h', proxy[0], '-s', proxy[1], '-p', proxy[2]]);
    child.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });

    child.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });

    child.on('close', function (code) {
        console.log('child process exited with code ' + code);
        //restart the proxy
        processProxy(proxy);
    });
}