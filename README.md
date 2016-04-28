## <a name="intro"></a>Intro
This repository contains Apigee Edge API Proxy that implements JSON Web Token
(JWT) Profile for OAuth 2.0 Client Authentication and Authorization Grants
(RFC7523). You can read more about the RFC [here](https://tools.ietf.org/html/rfc7523)

This proxy uses the JavaScript library for JWT from [here](https://kjur.github.io/jsrsasign/)

## <a name="setup"></a>Setting Up
1. Create a named cached resource called 'jwt-cert'. This resource caches the
    public cert that will be used to validate the incoming JWT
2. Create a KeyValue Map (KVM) called 'jwt-assertion-bearer'. Under the KVM,
  a. Create Key = 'trustStoreName', Value = {name of your trust store}
  b. Create Key = 'certName', Value = {name of the cert in the trust store}
  c. Create Key = 'org-creds', Value = {base64 header that can invoke Apigee's
     management API. Include the Basic prefix}
3. Create a Trust Store. Please refer [here](http://docs.apigee.com/management/apis/post/organizations/%7Borg_name%7D/environments/%7Benv_name%7D/keystores)
4. Upload a certificate to the Trust Store. Please refer  [here](http://docs.apigee.com/management/apis/post/organizations/%7Borg_name%7D/environments/%7Benv_name%7D/keystores/%7Bkeystore_name%7D/certs)

## <a name="setup"></a>About the Sample
RFC7523 supports two mechanisms for obtaining an OAuth token.

1. Using JWTs as Authorization Grants
    The following example demonstrates an access token request with a JWT
    as an authorization grant (with extra line breaks for display
    purposes only):
    ```
    POST /token.oauth2 HTTP/1.1
    Host: as.example.com
    Content-Type: application/x-www-form-urlencoded

    grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer
    &assertion=eyJhbGciOiJFUzI1NiIsImtpZCI6IjE2In0.
    eyJpc3Mi[...omitted for brevity...].
    J9l-ZhwP[...omitted for brevity...]
    ```
2. Using JWTs for Client Authentication
   The following example demonstrates an access token request (part of the 
   auth code grant flow).
   ```
    POST /token.oauth2 HTTP/1.1
    Host: as.example.com
    Content-Type: application/x-www-form-urlencoded

    grant_type=authorization_code&
    code=n0esc3NRze7LTCu7iYzS6a5acc3f0ogp4&
    client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3A
    client-assertion-type%3Ajwt-bearer&
    client_assertion=eyJhbGciOiJSUzI1NiIsImtpZCI6IjIyIn0.
    eyJpc3Mi[...omitted for brevity...].
    cC4hiUPo[...omitted for brevity...]
     ```
      
### <a name="test"></a>Testing the proxy
The test folder includes a sample node.js based program that can generate 
JWS for testing.
