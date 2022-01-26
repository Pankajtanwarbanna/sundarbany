const mongoose      = require('mongoose');

mongoose.set('useCreateIndex', true);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
const couponSchema  = new mongoose.Schema({
    name            : {
        type        : String,
        required    : true
    },
    category        : {
        type        : mongoose.Schema.ObjectId,
        required    : true
    },
    coupon          : {
        type        : Number,
        required    : true
    },
    active          : {
        type        : Boolean,
        required    : true,
        default     : true
    },
    priority        : {
        type        : Number,
        required    : true,
        default     : 1
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('coupon',couponSchema);