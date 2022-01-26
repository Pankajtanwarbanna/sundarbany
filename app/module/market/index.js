const Passport          = require('passport');
const constant          = require(__basePath + 'app/core/constant');
const router            = require('express').Router({
    caseSensitive       : true,
    strict              : true
});

const marketController    = require(constant.path.module + 'market/market.controller');

const UserGuard         = Passport.authenticate(['admin', 'super-admin'], { session : false });

/* market Routes */ 
router.post(
    '/',
    UserGuard,
    marketController.market
);

router.get(
    '/',
    UserGuard,
    marketController.getAll
);

module.exports = {
    router: router
};