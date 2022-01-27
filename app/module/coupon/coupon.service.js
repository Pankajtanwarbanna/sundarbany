const constant              = require(__basePath + '/app/core/constant');
const config                = require(constant.path.app + 'config/index.js');
const Coupon                = require(constant.path.module + 'coupon/coupon.schema');
const Category              = require(constant.path.module + 'coupon/category.schema');
const errorHelper           = require(constant.path.app + 'util/errorHelper');

exports.createCategory      = (payload, callback) => {

    Category.create(payload, (error, result) => {
        if(error) {
            return callback(errorHelper.findMongoError(error))
        }
        return callback(null, result);
    })
}

exports.createCoupon       = (payload, callback) => {

    Coupon.create(payload, (error, result) => {
        if(error) {
            return callback(errorHelper.findMongoError(error))
        }
        return callback(null, result);
    })
}

// get all coupon
exports.getCoupons           = (query, callback) => {
    const pipeline             = [
        {
            $match              : query
        },
        {
            $lookup             : {
                from            : 'coupons',
                localField      : '_id',
                foreignField    : 'category',
                as              : 'coupons'
            }
        }
    ]
    Category.aggregate(pipeline).exec((error, result) => {
        if(error) {
            return callback(errorHelper.findMongoError(error))
        }
        return callback(null, result);
    })
}

exports.updateCoupon        = (couponId, payload, callback) => {

    Coupon.findByIdAndUpdate(couponId, payload, (error, result) => {
        if(error) {
            return callback(errorHelper.findMongoError(error, 'Mobile Number'))
        }
        return callback(null, result);
    })
}

exports.getOneCoupon        = (query, callback) => {

    Coupon.findOne(query, (error, result) => {
        if(error) {
            return callback(errorHelper.findMongoError(error, 'Mobile Number'))
        }
        return callback(null, result);
    })
}

// category
exports.updateCategory      = (categoryId, payload, callback) => {

    Category.findByIdAndUpdate(categoryId, payload, (error, result) => {
        if(error) {
            return callback(errorHelper.findMongoError(error, 'Mobile Number'))
        }
        return callback(null, result);
    })
}

exports.getOneCategory      = (query, callback) => {

    Category.findOne(query, (error, result) => {
        if(error) {
            return callback(errorHelper.findMongoError(error, 'Mobile Number'))
        }
        return callback(null, result);
    })
}