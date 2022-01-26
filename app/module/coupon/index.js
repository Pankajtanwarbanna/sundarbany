const Passport          = require('passport');
const constant          = require(__basePath + 'app/core/constant');
const router            = require('express').Router({
    caseSensitive       : true,
    strict              : true
});

const couponController    = require(constant.path.module + 'coupon/coupon.controller');

const SuperAdminGuard   = Passport.authenticate(['super-admin'], { session : false })
const UserGuard         = Passport.authenticate(['admin', 'super-admin'], { session : false });

/* coupon category Routes */ 
router.post(
    '/category',
    UserGuard,
    couponController.category
);

/* coupon Routes */ 
router.post(
    '/',
    UserGuard,
    couponController.coupon
);

router.get(
    '/',
    UserGuard,
    couponController.getAll
);

module.exports = {
    router: router
};