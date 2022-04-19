const User = require("../models/User");

// encrypted password
const bcrypt = require("bcrypt");

const auth = require("../auth");

module.exports.checkEmailExists = (reqBody) => {
  return User.find({ email: reqBody.email }).then((result) => {
    if (result.length > 0) {
      return `Email already registered`;
    } else {
      return `${reqBody.email} not yet registered`;
    }
  });
};

// User Registration
/*
1. create a new User object
2. make sure that the password is encrypted
3. save the new User to db
*/

/*
Function parameters from routes to controllers

Routes (argument)
*/
module.exports.registerUser = (reqBody) => {
  // creates a new User Object
  let newUser = new User({
    firstName: reqBody.firstName,
    lastName: reqBody.lastName,
    mobileNo: reqBody.mobileNo,
    email: reqBody.email,
    // password: reqBody.password
    // 10 is the value provided as the number of 'salt' round that the bcrypt algo will run in order to encrypt the password
    password: bcrypt.hashSync(reqBody.password, 10),
  });

  // saves the created object to db
  return newUser.save().then((user, error) => {
    if (error) {
      return false;
    } else {
      // user registration is success
      return `User ${newUser.firstName} successfully registered.`;
    }
  });
};

// retrieving users
module.exports.getUsers = () => {
  return User.find({}).then((result) => {
    return result;
  });
};

// User authentication
/*
Steps:
1. check the db if the user email existssasdasd
2. compare password provided in the login form with the password stored in db.
3. generate/return a JSON web token if user successfully logged in and return false if not.

*/

module.exports.loginUser = (reqBody) => {
  return User.findOne({ email: reqBody.email }).then((result) => {
    // user does not exist
    if (result == null) {
      return `Email/password is incorrect`;
    } else {
      // user exists
      // the 'compareSync' method is used to compare a non-encrypted password from the login form to the encrypted password retrieved from the databse and returns 'true' or 'false'
      const isPasswordCorrect = bcrypt.compareSync(
        reqBody.password,
        result.password
      );
      // if the password match
      if (isPasswordCorrect) {
        // generate an access token
        return { accessToken: auth.createAccessToken(result.toObject()) };
      } else {
        // password does not match
        return `Email/password is incorrect`;
      }
    }
  });
};

module.exports.changeToAdmin = (reqBody) => {
  // change the user to admin
  return User.findByIdAndUpdate(reqBody.userId, { isAdmin: true }).then(
    (user, error) => {
      if (error) {
        return false;
      } else {
        return `User ${user.firstName} successfully changed to admin.`;
      }
    }
  );
};

// create a function to changeBackToUser
module.exports.changeBackToUser = (reqBody) => {
  // change the user to admin
  return User.findByIdAndUpdate(reqBody.userId, { isAdmin: false }).then(
    (user, error) => {
      if (error) {
        return false;
      } else {
        return `User ${user.firstName} successfully changed to user.`;
      }
    }
  );
};
