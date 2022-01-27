const constant              = require(__basePath + '/app/core/constant');
const config                = require(constant.path.app + 'config/index.js');
const Customer              = require(constant.path.module + 'customer/customer.schema');
const errorHelper           = require(constant.path.app + 'util/errorHelper');

// create a customer
exports.createCustomer        = (payload, callback) => {

    Customer.create(payload, (error, result) => {
        if(error) {
            return callback(errorHelper.findMongoError(error, 'Mobile Number'))
        }
        return callback(null, result);
    })
}

// get all customer
exports.getCustomers           = (query, callback) => {
    const pipeline             = [
        {
            $match              : query
        },
        {
            $lookup             : {
                from            : 'markets',
                localField      : 'marketId',
                foreignField    : '_id',
                as              : 'market'
            }
        },
        {
            $unwind             : '$market'
        }
    ]
    Customer.aggregate(pipeline).exec((error, result) => {
        if(error) {
            return callback(errorHelper.findMongoError(error))
        }
        return callback(null, result);
    })
}

exports.updateCustomer        = (customerId, payload, callback) => {

    Customer.findByIdAndUpdate(customerId, payload, (error, result) => {
        if(error) {
            return callback(errorHelper.findMongoError(error, 'Mobile Number'))
        }
        return callback(null, result);
    })
}