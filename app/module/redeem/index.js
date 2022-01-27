const Passport          = require('passport');
const constant          = require(__basePath + 'app/core/constant');
const router            = require('express').Router({
    caseSensitive       : true,
    strict              : true
});

const redeemController    = require(constant.path.module + 'redeem/redeem.controller');

const UserGuard         = Passport.authenticate(['admin', 'super-admin'], { session : false });

/* Redeem Routes */ 
router.post(
    '/',
    UserGuard,
    redeemController.redeem
);

router.get(
    '/',
    UserGuard,
    redeemController.getAll
);

router.patch(
    '/:redeemId',
    UserGuard,
    redeemController.redeemDone
);

module.exports = {
    router: router
};