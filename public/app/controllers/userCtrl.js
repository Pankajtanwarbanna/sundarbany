/*
    Controller written by - Pankaj tanwar
*/
angular.module('userCtrl',['userServices','fileModelDirective','uploadFileService'])

.controller('customerCtrl', function (user) {
    var app = this;

    // get all customers
    user.getCustomers().then(function (data) {
        app.customers = data.data.response.data;
    }).catch((error) => {
        app.errorMsg = 'Something went wrong, please try again later.'
    })
})

.controller('addCustomerCtrl', function (user) {
    var app = this;

    // get all market
    user.getMarkets().then(function (data) {
        app.markets = data.data.response.data;
    }).catch((error) => {
        app.errorMsg = 'Something went wrong, please try again later.'
    })

    // update profile
    app.addNewCustomer = function (customerData) {
        app.errorMsg = '';
        app.loading = true;
        user.addCustomer(app.customerData).then(function (data) {
            app.successMsg = 'A new customer has been added.';
            app.loading = false;
        }).catch((error) => {
            app.errorMsg = error.data.response.message;
            app.loading = false;
        })
    };
})

.controller('editCustomerCtrl', function (user, $routeParams) {
    var app = this;

    // get all market
    user.getMarkets().then(function (data) {
        app.markets = data.data.response.data;
    }).catch((error) => {
        app.errorMsg = 'Something went wrong, please try again later.'
    })

    // get customer
    user.getCustomer({ customerId : $routeParams.customerId }).then(function (data) {
        app.customer = data.data.response.data[0];
        app.loading = false;
    }).catch((error) => {
        app.errorMsg = error.data.response.message;
        app.loading = false;
    })

    // update profile
    app.updateCustomer = function (customer) {
        app.errorMsg = '';
        app.loading = true;
        user.updateCustomer($routeParams.customerId, app.customer).then(function (data) {
            app.successMsg = 'Customer has been updated.';
            app.loading = false;
        }).catch((error) => {
            app.errorMsg = error.data.response.message;
            app.loading = false;
        })
    };
})

.controller('marketCtrl', function (user) {
    var app = this;

    user.getMarkets().then(function (data) {
        app.markets = data.data.response.data;
    }).catch((error) => {
        app.errorMsg = 'Something went wrong, please try again later.'
    })
})

.controller('addMarketCtrl', function (user) {
    var app = this;

    app.addNewMarket = function (marketData) {
        app.errorMsg = '';
        app.loading = true;
        user.addMarket(app.marketData).then(function (data) {
            app.successMsg = 'A new market has been added.';
            app.loading = false;
        }).catch((error) => {
            app.errorMsg = error.data.response.message;
            app.loading = false;
        })
    };
})

.controller('couponsCtrl', function (user) {
    var app = this;

    user.getCoupons().then(function (data) {
        app.coupons = data.data.response.data;
    }).catch((error) => {
        app.errorMsg = 'Something went wrong, please try again later.'
    })
})

.controller('addCategoryCtrl', function (user) {
    var app = this;

    app.addNewCategory = function (categoryData) {
        app.errorMsg = '';
        app.loading = true;
        user.addCategory(app.categoryData).then(function (data) {
            app.successMsg = 'A new category has been added.';
            app.loading = false;
        }).catch((error) => {
            app.errorMsg = error.data.response.message;
            app.loading = false;
        })
    };
})

.controller('editCategoryCtrl', function (user, $routeParams) {
    var app = this;

    // get category
    user.getCategory({ categoryId : $routeParams.categoryId }).then(function (data) {
        app.category = data.data.response.data;
        app.loading = false;
    }).catch((error) => {
        app.errorMsg = error.data.response.message;
        app.loading = false;
    })

    app.updateCategory = function (category) {
        app.errorMsg = '';
        app.loading = true;
        user.updateCategory($routeParams.categoryId, app.category).then(function (data) {
            app.successMsg = 'Category has been updated.';
            app.loading = false;
        }).catch((error) => {
            app.errorMsg = error.data.response.message;
            app.loading = false;
        })
    };
})

.controller('addCouponsCtrl', function (user) {
    var app = this;

    user.getCoupons().then(function (data) {
        app.categories = data.data.response.data;
    }).catch((error) => {
        app.errorMsg = 'Something went wrong, please try again later.'
    })

    // add coupon
    app.addNewCoupon = function (couponData) {
        app.errorMsg = '';
        app.loading = true;

        user.addCoupons(app.couponData).then(function (data) {
            app.successMsg = 'A new coupon has been added.';
            app.loading = false;
        }).catch((error) => {
            app.errorMsg = error.data.response.message;
            app.loading = false;
        })
    };
})

.controller('editCouponCtrl', function (user, $routeParams) {
    var app = this;

    user.getCoupons().then(function (data) {
        app.categories = data.data.response.data;
    }).catch((error) => {
        app.errorMsg = 'Something went wrong, please try again later.'
    })

    // get coupon
    user.getCoupon({ couponId : $routeParams.couponId }).then(function (data) {
        app.coupon = data.data.response.data;
        app.loading = false;
    }).catch((error) => {
        app.errorMsg = error.data.response.message;
        app.loading = false;
    })

    // update coupon
    app.updateCoupon = function (coupon) {
        app.errorMsg = '';
        app.loading = true;
        user.updateCoupon($routeParams.couponId, app.coupon).then(function (data) {
            app.successMsg = 'Coupon has been updated.';
            app.loading = false;
        }).catch((error) => {
            app.errorMsg = error.data.response.message;
            app.loading = false;
        })
    };
})

.controller('userCtrl', function (user) {
    var app = this;

    // get all customers
    user.getUsers().then(function (data) {
        app.users = data.data.response.data;
    }).catch((error) => {
        app.errorMsg = 'Something went wrong, please try again later.'
    })
})

.controller('addUserCtrl', function (user) {
    var app = this;

    // update profile
    app.addNewUser = function (userData) {
        app.errorMsg = '';
        app.loading = true;
        user.addUser(app.userData).then(function (data) {
            app.successMsg = 'A new user has been added.';
            app.loading = false;
        }).catch((error) => {
            app.errorMsg = error.data.response.message;
            app.loading = false;
        })
    };
})

.controller('redeemCtrl', function (user) {
    var app = this;


})

.controller('settingsCtrl', function (user, $timeout) {

    var app = this;

    app.profileData = {};

    // update profile
    app.updateProfile = function (mainData) {
        app.profileData.name = mainData.name;
        user.updateProfile(app.profileData).then(function (data) {
            app.successMsg = 'Your profile has been updated.';
            $timeout(function () {
                app.successMsg = '';
            }, 2000);
        }).catch((error) => {
            app.errorMsg = 'Oops, something went wrong, please try again.';
        })
    };
});
