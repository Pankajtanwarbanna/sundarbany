const constant              = require(__basePath + '/app/core/constant');
const config                = require(constant.path.app + 'config/index.js');
const Redeem                = require(constant.path.module + 'redeem/redeem.schema');
const errorHelper           = require(constant.path.app + 'util/errorHelper');

// create a redeem
exports.createRedeem        = (payload, callback) => {

    Redeem.create(payload, (error, result) => {
        if(error) {
            return callback(errorHelper.findMongoError(error))
        }
        return callback(null, result);
    })
}

// get all redeem
exports.getRedeem           = (query, callback) => {
    const pipeline          = [
        {
            $match          : query
        },
        {
            $lookup         : {
                from        : 'customers',
                localField  : 'customerId',
                foreignField: '_id',
                as          : 'customer'
            }
        },
        {
            $unwind         : '$customer'
        }
    ]
    Redeem.aggregate(pipeline).exec((error, result) => {
        if(error) {
            return callback(errorHelper.findMongoError(error))
        }
        return callback(null, result);
    })
}

exports.updateRedeem        = (redeemId, payload, callback) => {

    Redeem.findByIdAndUpdate(redeemId, payload, (error, result) => {
        if(error) {
            return callback(errorHelper.findMongoError(error, 'Mobile Number'))
        }
        return callback(null, result);
    })
}