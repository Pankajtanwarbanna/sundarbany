const constant          = require(__basePath + 'app/core/constant');
const config            = require(constant.path.app + 'config/index.js');
const response          = require(constant.path.app + 'util/response');
const errorHelper       = require(constant.path.app + 'util/errorHelper');
const messages          = require(constant.path.app + 'core/response')
const couponService     = require(constant.path.app + 'module/coupon/coupon.service');
const Utility           = require(constant.path.app + 'util/utility');
const underscore        = require('underscore');

exports.category        = (req, res) => {
    const body          = req.body;
    
    const payload       = {
        'name'          : body.name
    }

    couponService.createCategory(payload, (error, result) => {
        if(error) {
            return res.status(400).json(response.build('ERROR', 
                errorHelper.parseError(error) 
            ));  
        }
        return res.status(200).json(response.build('SUCCESS', { "data" : result }));
    })
}

exports.coupon          = (req, res) => {
    const body          = req.body;
    
    const payload       = {
        'name'          : body.name,
        'category'      : Utility.toObjectId(body.category),
        'coupon'        : body.coupon
    }

    couponService.createCoupon(payload, (error, result) => {
        if(error) {
            return res.status(400).json(response.build('ERROR', 
                errorHelper.parseError(error) 
            ));  
        }
        return res.status(200).json(response.build('SUCCESS', { "data" : result }));
    })
}

exports.getAll          = (req, res) => {

    couponService.getCoupons(req.query, (error, result) => {
        if(error) {
            return res.status(400).json(response.build('ERROR', 
                errorHelper.parseError(error) 
            ));  
        }
        return res.status(200).json(response.build('SUCCESS', { "data" : result }));
    })
}

exports.getOne          = (req, res) => {
    const {
        couponId 
    }                   = req.params;

    const query         = {
        '_id'           : Utility.toObjectId(couponId)
    }
    couponService.getOneCoupon(query, (error, result) => {
        if(error) {
            return res.status(400).json(response.build('ERROR', 
                errorHelper.parseError(error) 
            ));  
        }
        return res.status(200).json(response.build('SUCCESS', { "data" : result }));
    })
}

exports.update          = (req, res) => {
    const {
        couponId 
    }                   = req.params;

    const payload       = req.body;

    couponService.updateCoupon(couponId, payload, (error, result) => {
        if(error) {
            return res.status(400).json(response.build('ERROR', 
                errorHelper.parseError(error) 
            ));  
        }
        return res.status(200).json(response.build('SUCCESS', { "data" : result }));
    })
}

exports.getCategory          = (req, res) => {
    const {
        categoryId 
    }                   = req.params;

    const query         = {
        '_id'           : Utility.toObjectId(categoryId)
    }
    couponService.getOneCategory(query, (error, result) => {
        if(error) {
            return res.status(400).json(response.build('ERROR', 
                errorHelper.parseError(error) 
            ));  
        }
        return res.status(200).json(response.build('SUCCESS', { "data" : result }));
    })
}

exports.updateCategory  = (req, res) => {
    const {
        categoryId 
    }                   = req.params;

    const payload       = req.body;

    couponService.updateCategory(categoryId, payload, (error, result) => {
        if(error) {
            return res.status(400).json(response.build('ERROR', 
                errorHelper.parseError(error) 
            ));  
        }
        return res.status(200).json(response.build('SUCCESS', { "data" : result }));
    })
}