const express = require('express');
const router = require('express-promise-router')();
const TransactionCtrl = require('./transations.controller');



router.route('/create').post(TransactionCtrl.createTransaction);
router.route('/').post(TransactionCtrl.getUserTransactions);
router.route('/update').post(TransactionCtrl.updateUserTransactions);
router.route('/delete').get(TransactionCtrl.deleteUserTransactions);

module.exports = router;