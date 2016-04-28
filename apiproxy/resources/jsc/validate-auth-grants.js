 var cert = context.getVariable("cert");
 var jwtAssertion = context.getVariable("assertion");
 var options = {
   alg: ["RS256"], 
   iss: 'http://foo.com',
   sub: 'mailto:john@foo.com',
   aud: 'http://foo.com',
   jti: 'id123456' //TODO: can confirm against cache to see if JTI is reused
 };
 
 var isValid = false;
 var errDesc = '';
 
 if (cert === null) {
    cert = context.getVariable("publiccert.content");
 }
 
 if (jwtAssertion !== null || jwtAssertion !== '') {
    var result = KJUR.jws.JWS.verifyJWT(jwtAssertion, cert, options);
    if (result === false) {
        isValid = false;
        errDesc = 'invalid json web token';
    } else {
        var a = jwtAssertion.split(".");
        var uHeader = b64utos(a[0]);
        var uClaim = b64utos(a[1]);
        
        var pHeader = KJUR.jws.JWS.readSafeJSONString(uHeader);
        var pClaim = KJUR.jws.JWS.readSafeJSONString(uClaim);
        
        context.setVariable("iss", pClaim.iss);
        context.setVariable("sub", pClaim.sub);
        context.setVariable("aud", pClaim.aud);
        
        //TODO: nbf not being checked.
        //TODO: exp can have some leeway. no leeway implemented.
        
        //check for token expiry
        if (pClaim.exp === null) { //exp is a mandatory field in the rfc
            isValid = false;
            errDesc = 'expiration not set.';
        } else {
            //jwt expiry is set as seconds from epoch 
            var d = new Date(0);
            d.setUTCSeconds(pClaim.exp);
            
            var currdt = new Date(); //obtain current datetime.
            
            //JWT has expired
            if (d < currdt) {
                isValid = false;
                errDesc = 'JWT has expired';
            } else {
                isValid = true;
            }
        }
    }
    
 } else {
    isValid = false;
    errDesc = 'assertion empty or not sent';
 }
 
 context.setVariable("isValid", isValid);
 context.setVariable("errDesc", errDesc);