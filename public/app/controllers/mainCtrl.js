/*
    Controller written by - Pankaj tanwar
*/

angular.module('mainController', ['authServices'])

.controller('mainCtrl', function ($window,$http, auth, $timeout, $location, authToken, $rootScope, user) {

    var app = this;

    app.loadme = false;
    app.home = true;

    $rootScope.$on('$routeChangeStart', function (event, next, current) {

        //console.log($window.location.pathname);
        if(next.$$route) {
            //console.log('we are not at home page');
            app.home = false;
        } else {
            app.home = true;
        }

        if(auth.isLoggedIn()) {

            app.isLoggedIn = true;
            auth.getUser().then(function (data){
                app.name = data.data.name;
                app.mobileNumber = data.data.mobileNumber;
                app.role = data.data.role;
                app.userId = data.data._id;
                app.loadme = true;
                app.authorized = (data.data.role === 'SUPER-ADMIN');

                user.getRedeems('').then((data) => {
                    app.redeems = data.data.response.data;
                    app.todays = 0;
                    app.open = 0;
                    app.total = app.redeems.length;
                    app.prizes = 0;

                    app.redeems.forEach((redeem) => {
                        if(redeem.status === 'CREATED') {
                            app.open += 1;
                            app.prizes += redeem.prizes.length;
                        }
                    })
                }).catch((error) => {
                    app.redeems = [];
                })
            });

        } else {

            app.isLoggedIn = false;
            app.name = '';

            app.loadme = true;
        }
    });


    this.doLogin = function (logData) {
        //console.log(this.logData);
        app.successMsg = '';
        app.errorMsg = '';
        app.loading = true;
        app.expired = false;
        app.disabled = false;

        auth.login(app.logData).then(function (data) {
            if(data.data.status) {
                app.loading = false;
                app.successMsg = 'User authenticated. Logging in...';
                $timeout(function () {
                    if(data?.data?.response?.data?.user?.role === 'SUPER-ADMIN') {
                        $location.path('/settings');
                    } else {
                        $location.path('/redeem');
                    }
                    app.logData = '';
                    app.successMsg = false;
                }, 2000);
            } else {
                app.disabled = false;
                app.loading = false;
                app.errorMsg = data.data.response.message;
            }
        });
    };

    this.logout = function () {
        auth.logout();
        $location.path('/logout');
        $timeout(function () {
            $location.path('/');
        }, 1000);
    };

    this.redeemAction   = (redeemId, action) => {
        user.redeemAction(redeemId, action).then((data) => {
            app.successMsg = data.data.response.message;
            user.getRedeems('?status=CREATED').then((data) => {
                app.redeems = data.data.response.data;
            }).catch((error) => {
                app.redeems = [];
            })
        }).catch((error) => {
            app.errorMsg =data.data.response.message;
        })
    }

    app.check   = (id) => {
        app.currentRedeem = app.redeems.filter((redeem) => redeem._id === id);
    }
});
