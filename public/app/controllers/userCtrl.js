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

    app.view    = (id) => {
        app.currentRedeem = app.customers.filter((customer) => customer._id === id);
    }
})

.controller('addCustomerCtrl', function (user, $scope, uploadFile) {
    var app = this;

    // get all market
    user.getMarkets().then(function (data) {
        app.markets = data.data.response.data;
    }).catch((error) => {
        app.errorMsg = 'Something went wrong, please try again later.'
    })

    app.total = 0;
    app.prizes = [];

    // add redeem prize
    app.addRedeem = () => {
        app.total += 1;
    }

    // get all coupons 
    user.getCoupons().then(function (data) {
        app.coupons = data.data.response.data;
    }).catch((error) => {
        app.errorMsg = 'Something went wrong, please try again later.'
    })

    // selected category
    $scope.selectedCategory = (category, prizeIndex) => {
        prizes = app.coupons.filter((coupon) => {
            return coupon._id === JSON.parse(category)._id;
        })
        app.prizes[prizeIndex] = prizes[0];
    }

    app.getPrizes = (coupons, category) => {
        const data = coupons.filter((coupon) => {
            if(coupon.categoryId === category) return coupon.coupons;
        });
        console.log(coupons, category)
        console.log(data)
        return data;
    }

    // update profile
    app.addNewCustomer = function (customerData) {
        app.errorMsg = '';
        app.loading = true;

        if(app.prizeData) {
            const prizes = Object.values(app.prizeData).map((prize) => {
                if(prize.prize && prize.category) {
                    return {
                        'categoryId' : JSON.parse(prize.category)._id,
                        'category' : JSON.parse(prize.category).name,
                        'couponId' : JSON.parse(prize.prize)._id,
                        'coupon' : JSON.parse(prize.prize).name,
                        'quantity' : prize.quantity,
                        'cost': JSON.parse(prize.prize).coupon, 
                        'coupons' : JSON.parse(prize.prize).coupon * prize.quantity
                    }
                }
            })

            let prizeValues = {};
            prizes.forEach((val) => {
                let key = `${val.categoryId}_${val.couponId}`;
                if(prizeValues[key]) {
                    prizeValues[key]['quantity'] += val.quantity;
                    prizeValues[key]['cost'] += val.cost;
                    prizeValues[key]['coupons'] += val.coupons;
                } else {
                    prizeValues[key] = val;
                }
            })
            uploadFile.uploadImage($scope.file).then(function (data) {
                if(data.data.success) {
                    app.customerData.profile_pic = data.data.filename;
                    app.customerData.prizes = Object.values(prizeValues);
                    user.addCustomer(app.customerData).then(function (data) {
                        app.successMsg = 'A new customer has been added.';
                        app.loading = false;
                    }).catch((error) => {
                        app.errorMsg = error.data.response.message;
                        app.loading = false;
                    })
                }
            });
        } else {
            app.errorMsg = 'Please select coupon.';
            app.loading = false;
        }

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

.controller('redeemCtrl', function (user, $scope, uploadFile) {
    var app = this;

    app.prizes = [];
    app.redeemPrizes = [];
    app.total = 0;
    app.successMsg = false;
    app.couponsWithCategory = {}

    // get all coupons 
    user.getCoupons().then(function (data) {
        app.coupons = data.data.response.data;
        app.coupons.forEach((coupon) => {
            app.couponsWithCategory[coupon._id] = coupon;
        })
    }).catch((error) => {
        app.errorMsg = 'Something went wrong, please try again later.'
    })

    // search user
    app.search = function() {
        if(app.mobileNumber && app.mobileNumber.length === 10) {
            app.errorMsg = '';
            app.searchingCustomer = 'Searching customer...';

            user.searchCustomer(app.mobileNumber).then((data) => {
                app.searchingCustomer = '';
                if(data.data.response.data.length === 0) {
                    app.errorMsg = 'Customer not found.'
                } else {
                    app.customer = data.data.response.data[0];
                }
            }).catch((error) => {
                app.errorMsg = 'Something went wrong!'
            })
        } else {
            app.errorMsg = 'Please enter valid mobile number.'
        }
    }

    // add redeem prize
    app.addRedeem = () => {
        app.total += 1;
    }

    // selected category
    $scope.selectedCategory = (category, prizeIndex) => {
        prizes = app.coupons.filter((coupon) => {
            return coupon._id === JSON.parse(category)._id;
        })
        app.prizes[prizeIndex] = prizes[0];
    }

    // redeem
    app.redeem  = () => {
        app.redeemErrorMsg = '';
        app.loading = true;
        let total_coupons = 0;

        if(app.file) {
            if(app.customer.prizes) {
                app.customer.prizes.forEach((prize) => {
                    if(prize.quantity * prize.cost > prize.coupons) {
                        app.redeemErrorMsg = 'Coupon value exceeded. Please check.'
                    }
                })

                if(!app.redeemErrorMsg) {
                    uploadFile.uploadImage(app.file).then(function (data) {
                        if(data.data.success) {
                            user.redeem({
                                'prizes' : app.customer.prizes,
                                'customerId' : app.customer._id,
                                'signature' : data.data.filename
                            }).then((data) => {
                                app.successMsg = 'Coupon redeem request created.'
                            }).catch((error) => {
                                app.redeemErrorMsg = 'Something went wrong, please try again later.'
                            })
                        }
                    });
                }
            } else {
                app.redeemErrorMsg = 'Please select coupon.'
            }
        } else {
            app.redeemErrorMsg = 'Please upload signature.'
        }
    }
})

.controller('prizeHistoryCtrl', function(user) {
    var app = this;
    // get redeems 
    user.getRedeems('').then((data) => {
        app.redeems = data.data.response.data.filter((redeem) => redeem.status !== 'CREATED');
    }).catch((error) => {
        app.redeems = [];
    })

    // view
    app.view    = (id) => {
        app.currentRedeem = app.redeems.filter((redeem) => redeem._id === id);
    }
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
