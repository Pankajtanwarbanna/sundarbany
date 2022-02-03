const Passport          = require('passport');
const constant          = require(__basePath + 'app/core/constant');
const router            = require('express').Router({
    caseSensitive       : true,
    strict              : true
});

const customerController    = require(constant.path.module + 'customer/customer.controller');

const SuperAdminGuard   = Passport.authenticate(['super-admin'], { session : false })
const UserGuard         = Passport.authenticate(['admin', 'super-admin'], { session : false });

/* customer Routes */ 
router.post(
    '/',
    UserGuard,
    customerController.customer
);

router.get(
    '/',
    UserGuard,
    customerController.getAll
);

router.get(
    '/:customerId',
    UserGuard,
    customerController.getOne
);

router.get(
    '/:customerId/history',
    UserGuard,
    customerController.getHistory
);

router.patch(
    '/:customerId',
    UserGuard,
    customerController.update
);

module.exports = {
    router: router
};