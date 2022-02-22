const mongoose      = require('mongoose');

mongoose.set('useCreateIndex', true);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
const customerSchema  = new mongoose.Schema({
    name            : {
        type        : String,
        required    : true,
        default     : 'User'
    },
    mobileNumber    : {
        type        : String,
        unique      : true,
        required    : true,
        index       : true
    },
    address         : {
        type        : String,
        required    : true
    },
    prizes          : {
        type        : Array,
        required    : true,
        default     : []
    },
    marketId        : {
        type        : mongoose.Schema.ObjectId
    },
    profile_pic     : {
        type        : String,
        required    : false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('customer',customerSchema);