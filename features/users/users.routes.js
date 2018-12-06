const express = require('express');
const router = require('express-promise-router')();
const UserCtrl = require('./users.controller');
const AuthCtrl = require('../auth/auth.controller');
const passport = require('passport');
const passportConfig = require('../../services/passport');



router.route('/').get(UserCtrl.getUserDetails);
router.route('/facebook/unlink').get(UserCtrl.unlinkFacebook);
router.route('/google/unlink').get(UserCtrl.unlinkGoogle)

module.exports = router;