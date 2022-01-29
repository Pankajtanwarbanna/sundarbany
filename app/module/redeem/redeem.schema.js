const mongoose      = require('mongoose');

mongoose.set('useCreateIndex', true);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
const redeemSchema  = new mongoose.Schema({
    customerId      : {
        type        : mongoose.Schema.ObjectId,
        required    : true
    },
    prizes          : {
        type        : Array,
        required    : true
    },
    status          : {
        type        : String,
        required    : true,
        default     : 'CREATED'
    },
    author          : {
        type        : mongoose.Schema.ObjectId,
        required    : true
    },
    signature       : {
        type        : String,
        required    : true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('redeem',redeemSchema);