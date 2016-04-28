// sign with default (HMAC SHA256)
var jwt = require('jsonwebtoken');
var fs = require('fs');

// sign with RSA SHA256
var cert = fs.readFileSync('privateKey.pem');  // get private key
var cert_pub = fs.readFileSync('publicKey.pem');

var json      = {
   iss: 'http://foo.com',
   sub: 'nhN1S9OFTw8ahZtU1TA5Vv8ESKEAISjl',
   aud: 'http://foo.com',
   exp: (new Date()).getTime(),
   jti: 'id123456'
};

//var json = { foo: 'bar'};
//var token = jwt.sign(json, cert, { algorithm: 'RS256'});

var token = jwt.sign(json, cert, { algorithm: 'RS256'});
console.log(token);

console.log(jwt.verify(token, cert_pub));
