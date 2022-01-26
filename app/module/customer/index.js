const Passport          = require('passport');
const constant          = require(__basePath + 'app/core/constant');
const router            = require('express').Router({
    caseSensitive       : true,
    strict              : true
});

const customerController    = require(constant.path.module + 'customer/customer.controller');

/* customer Routes */ 
router.post(
    '/',
    customerController.customer
);

router.get(
    '/',
    customerController.getAll
);

module.exports = {
    router: router
};