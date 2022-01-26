var app = angular.module('userRoutes', ['ngRoute'])

    .config(function ($routeProvider, $locationProvider) {
        $routeProvider

            .when('/logout', {
                templateUrl : '/app/views/users/authentication/logout.html',
                authenticated : false
            })

            .when('/settings', {
                templateUrl : 'app/views/users/authentication/settings.html',
                authenticated : true,
                controller : 'settingsCtrl',
                controllerAs : 'settings'
            })

            // customer - admin dashboard
            .when('/add-customer', {
                templateUrl : '/app/views/dashboard/customer/add-customer.html',
                controller : 'addCustomerCtrl',
                controllerAs : 'addCustomer',
                authenticated : true,
                permission : ['ADMIN', 'SUPER-ADMIN']
            })

            .when('/customers', {
                templateUrl : '/app/views/dashboard/customer/customers.html',
                controller : 'customerCtrl',
                controllerAs : 'customer',
                authenticated : true,
                permission : ['ADMIN', 'SUPER-ADMIN']
            })

            // market - admin dashboard
            .when('/add-market', {
                templateUrl : '/app/views/dashboard/market/add-market.html',
                controller : 'addMarketCtrl',
                controllerAs : 'addMarket',
                authenticated : true,
                permission : ['ADMIN', 'SUPER-ADMIN']
            })

            .when('/markets', {
                templateUrl : '/app/views/dashboard/market/markets.html',
                controller : 'marketCtrl',
                controllerAs : 'market',
                authenticated : true,
                permission : ['ADMIN', 'SUPER-ADMIN']
            })

            // coupon - admin dashboard
            .when('/add-coupons', {
                templateUrl : '/app/views/dashboard/coupon/add-coupons.html',
                controller : 'addCouponsCtrl',
                controllerAs : 'addCoupons',
                authenticated : true,
                permission : ['ADMIN', 'SUPER-ADMIN']
            })

            .when('/add-category', {
                templateUrl : '/app/views/dashboard/coupon/add-category.html',
                controller : 'addCategoryCtrl',
                controllerAs : 'addCategory',
                authenticated : true,
                permission : ['ADMIN', 'SUPER-ADMIN']
            })

            .when('/coupons', {
                templateUrl : '/app/views/dashboard/coupon/coupons.html',
                controller : 'couponsCtrl',
                controllerAs : 'coupons',
                authenticated : true,
                permission : ['ADMIN', 'SUPER-ADMIN']
            })

            .when('/redeem', {
                templateUrl : '/app/views/dashboard/coupon/redeem.html',
                controller : 'redeemCtrl',
                controllerAs : 'redeem',
                authenticated : true,
                permission : ['ADMIN', 'SUPER-ADMIN']
            })
            // users - admin dashboard
            .when('/add-user', {
                templateUrl : '/app/views/dashboard/user/add-user.html',
                controller : 'addUserCtrl',
                controllerAs : 'addUser',
                authenticated : true,
                permission : ['SUPER-ADMIN']
            })

            .when('/users', {
                templateUrl : '/app/views/dashboard/user/users.html',
                controller : 'userCtrl',
                controllerAs : 'user',
                authenticated : true,
                permission : ['SUPER-ADMIN']
            })

            .otherwise( { redirectTo : '/'});

        $locationProvider.html5Mode({
            enabled : true,
            requireBase : false
        })
    });

app.run(['$rootScope','auth','$location', 'user', function ($rootScope,auth,$location,user) {

    $rootScope.$on('$routeChangeStart', function (event, next, current) {

        if(next.$$route) {

            if(next.$$route.authenticated === true) {

                if(!auth.isLoggedIn()) {
                    event.preventDefault();
                    $location.path('/');
                } else if(next.$$route.permission) {
                    auth.getUser().then(function (data) {
                        if(next.$$route.permission.indexOf(data.data.role.toUpperCase()) === -1) {
                            event.preventDefault();
                            $location.path('/');
                        }
                    });
                }

            } else if(next.$$route.authenticated === false) {

                if(auth.isLoggedIn()) {
                    event.preventDefault();
                    $location.path('/profile');
                }

            } /*else {
                console.log('auth doesnot matter');
            }
            */
        } /*else {
            console.log('Home route is here');
        }
*/
    })
}]);

