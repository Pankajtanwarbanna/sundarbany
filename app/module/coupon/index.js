const Passport          = require('passport');
const constant          = require(__basePath + 'app/core/constant');
const router            = require('express').Router({
    caseSensitive       : true,
    strict              : true
});

const couponController    = require(constant.path.module + 'coupon/coupon.controller');

/* coupon category Routes */ 
router.post(
    '/category',
    couponController.category
);

/* coupon Routes */ 
router.post(
    '/',
    couponController.coupon
);

router.get(
    '/',
    couponController.getAll
);

module.exports = {
    router: router
};