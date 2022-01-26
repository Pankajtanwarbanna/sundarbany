/*
    Services written by - Pankaj tanwar
*/
angular
  .module("userServices", [])

  .factory("user", function ($http) {
    var userFactory = {};

    // get customers
    userFactory.getCustomers = function () {
      return $http.get("/api/customer");
    };

    userFactory.addCustomer = function (data) {
      return $http.post("/api/customer", data);
    };

    // get markets
    userFactory.getMarkets = function () {
      return $http.get("/api/market");
    };

    userFactory.addMarket = function (data) {
      return $http.post("/api/market", data);
    };

    // coupon thing
    userFactory.getCoupons = function () {
      return $http.get("/api/coupon");
    };

    userFactory.addCoupons = function (data) {
      return $http.post("/api/coupon", data);
    };

    userFactory.addCategory = function (data) {
      return $http.post("/api/coupon/category", data);
    };

    // get users
    userFactory.getUsers = function () {
      return $http.get("/api/user");
    };

    userFactory.addUser = function (data) {
      return $http.post("/api/user", data);
    };

    // update user details
    userFactory.updateProfile = function (profileData) {
      return $http.patch("/api/user", profileData);
    };

    return userFactory;
  });
