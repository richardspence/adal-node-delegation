# Adal delegation
This library is used for acquiring downstream tokens via delegation.

An example of which would be web client -> Web Api A -> Web Api B.

Example usage
```
var adal = require('adal-node-delegation');
var options= {
    tenant: 'mycompany.onmicrosoft.com',
    clientId: 'yourId',
    clientSecret: 'yoursecret'
}
adal.acquireToken(options, theBearerTokenFromRequest).then(r=>{
    //perform request using access token.
});
```