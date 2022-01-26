const Passport          = require('passport');
const constant          = require(__basePath + 'app/core/constant');
const router            = require('express').Router({
    caseSensitive       : true,
    strict              : true
});

const marketController    = require(constant.path.module + 'market/market.controller');

/* market Routes */ 
router.post(
    '/',
    marketController.market
);

router.get(
    '/',
    marketController.getAll
);

module.exports = {
    router: router
};