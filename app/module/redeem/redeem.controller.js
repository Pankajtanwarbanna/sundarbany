const constant          = require(__basePath + 'app/core/constant');
const config            = require(constant.path.app + 'config/index.js');
const response          = require(constant.path.app + 'util/response');
const errorHelper       = require(constant.path.app + 'util/errorHelper');
const messages          = require(constant.path.app + 'core/response')
const redeemService     = require(constant.path.app + 'module/redeem/redeem.service');
const customerService   = require(constant.path.app + 'module/customer/customer.service');
const Utility           = require(constant.path.app + 'util/utility');
const underscore        = require('underscore');

exports.redeem          = (req, res) => {
    const body          = req.body;
    
    const payload       = {
        'prizes'        : body.prizes,
        'customerId'    : Utility.toObjectId(body.customerId),
        'author'        : req.user._id,
        'signature'     : body.signature
    }

    redeemService.createRedeem(payload, (error, result) => {
        if(error) {
            return res.status(400).json(response.build('ERROR', 
                errorHelper.parseError(error) 
            ));  
        }
        return res.status(200).json(response.build('SUCCESS', { "data" : result }));
    })
}

exports.getAll          = (req, res) => {

    redeemService.getRedeem(req.query, (error, result) => {
        if(error) {
            return res.status(400).json(response.build('ERROR', 
                errorHelper.parseError(error) 
            ));  
        }
        return res.status(200).json(response.build('SUCCESS', { "data" : result }));
    })
}

exports.redeemDone      = (req, res) => {
    const body          = req.body;
    
    const query         = {
        '_id'           : Utility.toObjectId(req.params.redeemId)
    }

    redeemService.getRedeem(query, (error, redeem) => {
        if(error) {
            return res.status(400).json(response.build('ERROR', 
                errorHelper.parseError(error) 
            ));  
        }
        if(underscore.isEmpty(redeem) || redeem[0].status !== 'CREATED') {
            return res.status(400).json(response.build('ERROR', 
                errorHelper.parseError('Invalid coupon redeem request.') 
            ));  
        } else {
            redeem = underscore.first(redeem);

            const status = req.query.action === '1' ? 'COMPLETED' : 'REJECTED';
            redeemService.updateRedeem(Utility.toObjectId(req.params.redeemId), { status },(error, result) => {
                if(error) {
                    return res.status(400).json(response.build('ERROR', 
                        errorHelper.parseError(error) 
                    ));  
                }
                if(req.query.action === '1') {
                    let totalCoupons = 0;
                    (redeem.prizes || []).forEach((prize) => {
                        totalCoupons += prize.coupons;
                    });
        
                    customerService.deductCoupons(redeem.customerId, totalCoupons, (error, data) => {
                        return res.status(200).json(response.build('SUCCESS', { "message" : "Yay, successfully approved." }));
                    })
                } else {
                    return res.status(200).json(response.build('SUCCESS', { "message" : "Yay, successfully rejected." }));
                }
            })
        }
    })
}