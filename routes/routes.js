const express = require('express');
const router = express.Router();
const { renderHome } = require('../api/userApi');
const { registerUser, getUsers, getUser } = require("../api/userApi");
const { loginUser } = require("../api/userApi");
const { createChallenge } = require("../api/userApi");
const { saveCredentials } = require("../api/userApi");
const { getEntries } = require("../api/userApi");
const { createHistory } = require("../api/serviceApi");

router.route('/').get(renderHome);
router.route('/saveUser').post(registerUser);
router.route("/getUsers").get(getUsers);
router.route("/getUser").post(getUser);
router.route("/login").post(loginUser);
router.route("/createChallenge").post(createChallenge);
router.route("/saveCredentials").post(saveCredentials);
router.route("/getEntries").post(getEntries);

//Service api routes
router.route("/addMedicalEntry").post(createHistory);

module.exports = router;