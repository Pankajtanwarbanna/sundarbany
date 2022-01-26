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
    coupon          : {
        type        : Number,
        required    : true,
        default     : 0
    },
    marketId        : {
        type        : mongoose.Schema.ObjectId
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('customer',customerSchema);