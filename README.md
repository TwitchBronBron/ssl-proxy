# ssl-proxy

Use this when you need to run ssl on localhost for services that don't provide it (like .net core kestral).

**WARNING**: DO NOT use the server.crt and server.key files for anything other than localhost SSL. 

## Installation

1. `git clone https://github.com/TwitchBronBron/ssl-proxy.git`
2. `cd ssl-proxy`
3. `npm install`
4. Configure run-proxy.js to suit your needs
5. `node run-proxy.js`