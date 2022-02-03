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

            const payload   = {
                '_id'       : redeem.customerId
            }

            if(status === 'REJECTED') {
                redeemService.updateRedeem(Utility.toObjectId(req.params.redeemId), { status },(error, result) => {
                    if(error) {
                        return res.status(400).json(response.build('ERROR', 
                            errorHelper.parseError(error) 
                        ));  
                    }
                    return res.status(200).json(response.build('SUCCESS', { "message" : "Yay, successfully rejected." }));
                })
            } else {
                customerService.getCustomers(payload, (error, data) => {
                    if(error) {
                        return res.status(400).json(response.build('ERROR', 
                            errorHelper.parseError(error) 
                        ));  
                    }
                    if(underscore.isEmpty(data)) {
                        return res.status(400).json(response.build('ERROR', 
                            errorHelper.parseError('Customer not found.') 
                        ));  
                    }
    
                    const customer      = underscore.first(data);
                    const prizes        = customer.prizes;
                    const redeemPrizes  = redeem.prizes;
    
                    let isRedeemValid   = true;
                    prizes.forEach((prize) => {

                        const category  = prize.categoryId;
                        
                        const redeem    = redeemPrizes.filter((prize) => {
                            return prize.categoryId === category;
                        })
    
                        if(underscore.isEmpty(redeem) === false) {
                            if(redeem[0].selected_quantity > (prize.quantity)) {
                                isRedeemValid   = false;
                            } else {
                                prize.quantity  -= redeem[0].selected_quantity;
                                prize.coupon     = redeem[0].coupon;
                                prize.couponId   = redeem[0].couponId;
                            }
                        }
                    })

                    if(isRedeemValid) {
                        redeemService.updateRedeem(Utility.toObjectId(req.params.redeemId), { status },(error, result) => {
                            if(error) {
                                return res.status(400).json(response.build('ERROR', 
                                    errorHelper.parseError(error) 
                                ));  
                            }

                            customerService.deductCoupons(redeem.customerId, prizes, (error, data) => {
                                if(error) {
                                    return res.status(400).json(response.build('ERROR', 
                                        errorHelper.parseError(error) 
                                    ));  
                                }
                                return res.status(200).json(response.build('SUCCESS', { "message" : "Yay, successfully approved." }));
                            })
                        })
                    } else {
                        return res.status(400).json(response.build('ERROR', 
                            errorHelper.parseError('Customer does not have sufficient coupons to redeem.') 
                        ));
                    }
                })
            }
        }
    })
}