const constant      = require(__basePath + 'app/core/constant');
const mongoose      = require('mongoose');
const { uuid }      = require('uuidv4');

// convert to objectIds
exports.toObjectId  = (value) => {
    if(!value) return null;
    return mongoose.Types.ObjectId(value.toString());
}

exports.UUID        = () => {
    return uuid();
}