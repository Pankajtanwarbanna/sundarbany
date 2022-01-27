const constant          = require(__basePath + 'app/core/constant');
const config            = require(constant.path.app + 'config/index.js');
const response          = require(constant.path.app + 'util/response');
const errorHelper       = require(constant.path.app + 'util/errorHelper');
const messages          = require(constant.path.app + 'core/response')
const userService       = require(constant.path.app + 'module/user/user.service');
const underscore        = require('underscore');

exports.user            = (req, res) => {
    const body          = req.body;
    
    const payload       = {
        'name'          : body.name,
        'mobileNumber'  : body.mobileNumber,
        'password'      : body.password
    }

    userService.createUser(payload, (error, result) => {
        if(error) {
            return res.status(400).json(response.build('ERROR', 
                errorHelper.parseError(error) 
            ));  
        }
        return res.status(200).json(response.build('SUCCESS', { "data" : result }));
    })
}

exports.getAll          = (req, res) => {

    // get all registered users
    userService.getUsers(req.query, (error, result) => {
        if(error) {
            return res.status(400).json(response.build('ERROR', 
                errorHelper.parseError(error) 
            ));  
        }
        return res.status(200).json(response.build('SUCCESS', { "data" : result }));
    })
}

exports.login           = (req, res) => {
    const body          = req.body;
    
    const payload       = {
        'mobileNumber'  : body.mobileNumber,
    }

    userService.login(payload, body.password, (error, result) => {
        if(error) {
            return res.status(400).json(response.build('ERROR', 
                errorHelper.parseError(error) 
            ));  
        }
        return res.status(200).json(response.build('SUCCESS', { "data" : result }));
    })
}

exports.me              = (req, res) => {
    return res.json(req.user);
}

exports.update          = (req, res) => {
    const body          = req.body;
    
    const payload       = {
        'name'          : body.name
    }

    userService.updateUser(req.user._id, payload, (error, result) => {
        if(error) {
            return res.status(400).json(response.build('ERROR', 
                errorHelper.parseError(error) 
            ));  
        }
        return res.status(200).json(response.build('SUCCESS', { "data" : result }));
    })
}