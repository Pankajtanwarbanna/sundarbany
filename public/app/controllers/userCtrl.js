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
        return data;
    }

    // update profile
    app.addNewCustomer = function (customerData) {
        app.errorMsg = '';
        app.loading = true;

        if(app.prizeData) {
            const prizes = Object.values(app.prizeData).map((prize) => {
                if(prize.category) {
                    return {
                        'categoryId' : JSON.parse(prize.category)._id,
                        'category' : JSON.parse(prize.category).name,
                        'quantity' : prize.quantity
                    }
                }
            })

            let prizeValues = {};
            prizes.forEach((val) => {
                if(prizeValues[val.categoryId]) {
                    prizeValues[val.categoryId]['quantity'] += val.quantity;
                } else {
                    prizeValues[val.categoryId] = val;
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
                } else {
                    app.errorMsg = data.data.message;
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

    // add redeem prize
    app.giftCoupon = () => {
        if(app.customer.prizes) {
            app.customer.prizes.push({
                'category' : null,
                'quantity' : null
            })
        } else {
            app.customer.prizes = [{
                'category' : null,
                'quantity' : null
            }]
        }
    }

    // get all coupons 
    user.getCoupons().then(function (data) {
        app.coupons = data.data.response.data;
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

        // dont allow multiple categories
        let prizesData = {};
        app.customer.prizes.forEach((val) => {
            if(prizesData[val.categoryId]) {
                app.errorMsg = 'You can not select a category twice.';
                app.loading = false;
            } else {
                prizesData[val.categoryId] = val;
            }
        })

        if(!app.errorMsg) {
            // format the data
            app.customer.prizes.forEach((prize) => {
                app.coupons.forEach((coupon) => {
                    if(coupon._id === prize.categoryId) {
                        prize.category = coupon.name;
                    }
                })
            })

            let prizeValues = {};
            app.customer.prizes.forEach((val) => {
                if(prizeValues[val.categoryId]) {
                    prizeValues[val.categoryId]['quantity'] += val.quantity;
                } else {
                    prizeValues[val.categoryId] = val;
                }
            })

            app.customer.prizes = Object.values(prizeValues);
            user.updateCustomer($routeParams.customerId, app.customer).then(function (data) {
                app.successMsg = 'Customer has been updated.';
                app.loading = false;
            }).catch((error) => {
                app.errorMsg = error.data.response.message;
                app.loading = false;
            })
        }
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

    // add gift coupon
    app.addGiftCoupon   = (category) => {
        app.customer.prizes.forEach((prize) => {
            if(prize.categoryId === category) {
                if(prize.coupons) {
                    let size = Object.keys(prize.coupons).length;
                    prize.coupons[size] = {
                        'coupon' : null,
                        'selected_quantity' : null
                    }
                } else {
                    prize.coupons = {
                        '0' : {
                            'coupon' : null,
                            'selected_quantity' : null    
                        }
                    }
                }
            }
        })
    }

    // redeem
    app.redeem  = () => {
        app.redeemErrorMsg = '';
        app.loading = true;
        let total_coupons = 0;

        if(app.file) {
            if(app.customer.prizes) {
                console.log(app.customer.prizes)
                // check if quantity exceeded
                app.customer.prizes.forEach((prize) => {
                    let total_given_coupons = 0;
                    if(!prize.coupons) prize.coupons = {}
                    Object.values(prize.coupons).forEach((coupon) => {
                        if(coupon.coupon && coupon.selected_quantity) {
                            total_given_coupons += JSON.parse(coupon.coupon).coupon * coupon.selected_quantity;
                        }
                    })

                    if(total_given_coupons > prize.quantity) {
                        app.redeemErrorMsg = 'Coupon value exceeded. Please check.'
                    }
                })

                if(!app.redeemErrorMsg) {
                    // filter empty data
                    let prizes = app.customer.prizes.filter((prize) => {
                        return prize.coupons;
                    })

                    prizes.forEach((prize) => {
                        let allCoupons = {};

                        Object.values(prize.coupons || {}).forEach((coupon) => {
                            couponData = JSON.parse(coupon.coupon);
                            if(couponData && coupon.selected_quantity) {
                                if(allCoupons[couponData._id]) {
                                    allCoupons[couponData._id].selected_quantity  += coupon.selected_quantity;
                                } else {
                                    allCoupons[couponData._id] = {
                                        selected_quantity  : coupon.selected_quantity,
                                        couponId  : couponData._id,
                                        coupon  : couponData.name,
                                        cost : couponData.coupon
                                    }
                                }
                            }
                        })
                        prize.coupons = Object.values(allCoupons);
                    })

                    // filter empty data
                    prizes = app.customer.prizes.filter((prize) => {
                        return prize.coupons.length > 0;
                    })

                    uploadFile.uploadImage(app.file).then(function (data) {
                        if(data.data.success) {
                            user.redeem({
                                'prizes' : prizes,
                                'customerId' : app.customer._id,
                                'signature' : data.data.filename
                            }).then((data) => {
                                app.successMsg = 'Coupon redeem request created.'
                            }).catch((error) => {
                                app.redeemErrorMsg = 'Something went wrong, refresh and please try again later.'
                            })
                        } else {
                            app.redeemErrorMsg = data.data.message;
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

.controller('customerHistoryCtrl', function(user, $routeParams) {
    var app = this;

    // get customer history
    user.getHistory({ customerId : $routeParams.customerId }).then((data) => {
        app.customer        = data.data.response.data[0];
        app.total_prizes    = 0;
        app.all_prizes      = {};

        app.customer.history.forEach((data) => {
            data.prizes.forEach((prize) => {

                if(!app.all_prizes[prize.categoryId]) {
                    app.all_prizes[prize.categoryId] = {
                        'category'      : prize.category,
                        'coupons'       : {}
                    };
                } 

                // total coupons 
                prize.coupons.forEach((coupon) => {
                    app.total_prizes += coupon.selected_quantity;
                    if(app.all_prizes[prize.categoryId]['coupons'][coupon.couponId]) {
                        app.all_prizes[prize.categoryId][coupon.couponId].selected_quantity += coupon.selected_quantity;
                    } else {
                        app.all_prizes[prize.categoryId]['coupons'][coupon.couponId] = {
                            'coupon'            : coupon.coupon,
                            'selected_quantity' : coupon.selected_quantity
                        }
                    }
                })
            })
        })
        console.log(app.all_prizes)
    }).catch((error) => {
        app.customer = {};
    })

    // view
    app.view    = (data) => {
        app.current = data;
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
