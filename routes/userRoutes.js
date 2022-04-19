const express = require("express");
const router = express.Router();
const auth = require("../auth");

const UserController = require("../controllers/userControllers");

router.post("/checkEmail", (req, res) => {
  UserController.checkEmailExists(req.body).then((result) => res.send(result));
});

// Registration for user
// http://localhost:4000/api/users/register
router.post("/register", (req, res) => {
  UserController.registerUser(req.body).then((result) => res.send(result));
});

// retrieve all users
router.get("/all", (req, res) => {
  UserController.getUsers().then((result) => res.send(result));
});

// User Authentication(login)
router.post("/login", (req, res) => {
  UserController.loginUser(req.body).then((result) => res.send(result));
});

// User Authentication(login)
router.put("/:userId/changeToAdmin", auth.verify, (req, res) => {
  const data = {
    isAdmin: auth.decode(req.headers.authorization).isAdmin,
  };

  if (data.isAdmin) {
    UserController.changeToAdmin(req.body).then((result) => res.send(result));
  } else {
    res.send(false);
  }
});

// User Authentication(login)
router.put("/:userId/changeToUser", auth.verify, (req, res) => {
  const data = {
    isAdmin: auth.decode(req.headers.authorization).isAdmin,
  };

  if (data.isAdmin) {
    UserController.changeToAdmin(req.body).then((result) => res.send(result));
  } else {
    res.send(false);
  }
});

// retrieve all users
router.get("/:userId", (req, res) => {
  UserController.getUser(req.body.id).then((result) => res.send(result));
});

module.exports = router;
