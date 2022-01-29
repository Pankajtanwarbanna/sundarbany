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

    userFactory.searchCustomer = function (mobileNumber) {
      return $http.get("/api/customer?mobileNumber=" + mobileNumber);
    };

    userFactory.getCustomer = function ({ customerId }) {
      return $http.get("/api/customer/" + customerId);
    };

    userFactory.updateCustomer = function (customerId, payload ) {
      return $http.patch("/api/customer/" + customerId, payload);
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

    userFactory.getCoupon = function ({ couponId }) {
      return $http.get("/api/coupon/" + couponId);
    };

    userFactory.updateCoupon = function (couponId, payload ) {
      return $http.patch("/api/coupon/" + couponId, payload);
    };

    userFactory.addCoupons = function (data) {
      return $http.post("/api/coupon", data);
    };

    userFactory.redeem = function (data) {
      return $http.post("/api/redeem", data);
    };

    userFactory.getRedeems = function (filter) {
      return $http.get("/api/redeem" + filter);
    };

    userFactory.redeemAction = function (redeemId, action) {
      return $http.patch("/api/redeem/" + redeemId +"?action=" + action);
    };

    userFactory.addCategory = function (data) {
      return $http.post("/api/coupon/category", data);
    };

    userFactory.getCategory = function ({ categoryId }) {
      return $http.get("/api/coupon/category/" + categoryId);
    };

    userFactory.updateCategory = function (categoryId, payload ) {
      return $http.patch("/api/coupon/category/" + categoryId, payload);
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
