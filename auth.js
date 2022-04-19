const jwt = require("jsonwebtoken");
const secret = "ThisIsASecret";

// token creation
/*
- Analogy
 pack the gift and provide a lock with the secret code as the key
*/

module.exports.createAccessToken = (user) => {
  // the data will be received from the registration form
  // when the user logs in, a token will be created with user's info
  const data = {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
  };

  // generate a JSON web token using the jwt's method (sign())
  return jwt.sign(data, secret, {});
};

// Token Verification
/*
- Analogy
	receive the gift and open the lock to verify if the sender is legitimate and the gift was not tampered.

*/
module.exports.verify = (req, res, next) => {
  // the token is retrieved from the request header
  let token = req.headers.authorization;
  // token received and is not undefined
  if (typeof token !== "undefined") {
    console.log(token);
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    // remove Bearer(including space) using slice method
    token = token.slice(7, token.length);

    // validate the token using the "verify" method decrypting the token using the secret code
    return jwt.verify(token, secret, (err, data) => {
      // if JWT is not valid
      if (err) {
        return res.send({ auth: "Token incorrect" });
      } else {
        // if JWT is valid
        next();
      }
    });
  } else {
    // token does not exist
    return res.send({ auth: "token undefined" });
  }
};

// Token decryption
/*
Analogy
	open the gift and get the content
*/

module.exports.decode = (token) => {
  // Token received and is not undefined
  if (typeof token !== "underfined") {
    // retrieves only the token and removes the 'Bearer ' prefix
    token = token.slice(7, token.length);

    return jwt.verify(token, secret, (err, data) => {
      if (err) {
        return null;
      } else {
        return jwt.decode(token, { complete: true }).payload;
      }
    });
  } else {
    // token does not exist
    return null;
  }
};
