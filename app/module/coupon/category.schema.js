const mongoose      = require('mongoose');

mongoose.set('useCreateIndex', true);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
const categorySchema  = new mongoose.Schema({
    name            : {
        type        : String,
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

module.exports = mongoose.model('category',categorySchema);