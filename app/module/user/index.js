const Passport          = require('passport');
const constant          = require(__basePath + 'app/core/constant');
const router            = require('express').Router({
    caseSensitive       : true,
    strict              : true
});
const userValidator     = require(constant.path.module + 'user/user.validator.js');
const userController    = require(constant.path.module + 'user/user.controller');

const SuperAdminGuard   = Passport.authenticate(['super-admin'], { session : false })
const UserGuard         = Passport.authenticate(['admin', 'super-admin'], { session : false });

/* User Routes */ 
router.post(
    '/',
    SuperAdminGuard,
    userValidator.addUser,
    userController.user
);

router.get(
    '/',
    SuperAdminGuard,
    userController.getAll
);

router.get(
    '/me',
    UserGuard,
    userController.me
);

router.patch(
    '/',
    UserGuard,
    userController.update
);

/* Authentication Routes */
router.post(
    '/login',
    userController.login
);

module.exports = {
    router: router
};