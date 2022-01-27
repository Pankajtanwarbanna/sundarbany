var app = angular.module('userFilters', [])

.filter('range', function() {
    return function(input, total) {
        total = parseInt(total);
        for (var i=0; i<total; i++)
            input.push(i);
        return input;
    };
})

.filter('prizeFilter', function() {
    return function(input, total) {
        return input ? JSON.parse(input).name : '';
    };
})

.filter('quantityFilter', function() {
    return function(input, total) {
        return input ? `${JSON.parse(input).coupon} coupons x` : '';
    };
})

.filter('prizes', function() {
    return function(input, total) {
        let output = '';
        input.forEach((prize) => {
            output += `${prize.coupon} - ${prize.quantity} (${prize.coupons} coupons). `
        })
        return output;
    };
})