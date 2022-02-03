const constant          = require(__basePath + 'app/core/constant');
const config            = require(constant.path.app + 'config/index.js');
const response          = require(constant.path.app + 'util/response');
const errorHelper       = require(constant.path.app + 'util/errorHelper');
const messages          = require(constant.path.app + 'core/response')
const customerService   = require(constant.path.app + 'module/customer/customer.service');
const Utility           = require(constant.path.app + 'util/utility');
const underscore        = require('underscore');

exports.customer        = (req, res) => {
    const body          = req.body;

    const payload       = underscore.extend(body, { marketId : Utility.toObjectId(body.marketId)})

    customerService.createCustomer(payload, (error, result) => {
        if(error) {
            return res.status(400).json(response.build('ERROR', 
                errorHelper.parseError(error) 
            ));  
        }
        return res.status(200).json(response.build('SUCCESS', { "data" : result }));
    })
}

exports.getAll          = (req, res) => {

    customerService.getCustomers(req.query, (error, result) => {
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
        customerId 
    }                   = req.params;

    const query         = {
        '_id'           : Utility.toObjectId(customerId)
    }
    customerService.getCustomers(query, (error, result) => {
        if(error) {
            return res.status(400).json(response.build('ERROR', 
                errorHelper.parseError(error) 
            ));  
        }
        return res.status(200).json(response.build('SUCCESS', { "data" : result }));
    })
}

exports.getHistory      = (req, res) => {
    const {
        customerId 
    }                   = req.params;

    const query         = {
        '_id'           : Utility.toObjectId(customerId)
    }

    customerService.getCustomerHistory(query, (error, result) => {
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
        customerId 
    }                   = req.params;

    const payload       = req.body;

    customerService.updateCustomer(customerId, payload, (error, result) => {
        if(error) {
            return res.status(400).json(response.build('ERROR', 
                errorHelper.parseError(error) 
            ));  
        }
        return res.status(200).json(response.build('SUCCESS', { "data" : result }));
    })
}