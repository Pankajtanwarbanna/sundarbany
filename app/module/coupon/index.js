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

router.get(
    '/category/:categoryId',
    UserGuard,
    couponController.getCategory
);

router.patch(
    '/category/:categoryId',
    UserGuard,
    couponController.updateCategory
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

router.get(
    '/:couponId',
    UserGuard,
    couponController.getOne
);

router.patch(
    '/:couponId',
    UserGuard,
    couponController.update
);

module.exports = {
    router: router
};