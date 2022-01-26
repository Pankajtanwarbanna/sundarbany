const constant              = require(__basePath + '/app/core/constant');
const config                = require(constant.path.app + 'config/index.js');
const Market                = require(constant.path.module + 'market/market.schema');
const errorHelper           = require(constant.path.app + 'util/errorHelper');

// create a market
exports.createMarket        = (payload, callback) => {

    Market.create(payload, (error, result) => {
        if(error) {
            return callback(errorHelper.findMongoError(error))
        }
        return callback(null, result);
    })
}

// get all market
exports.getMarket           = (query, callback) => {
    Market.find(query, (error, result) => {
        if(error) {
            return callback(errorHelper.findMongoError(error))
        }
        return callback(null, result);
    })
}