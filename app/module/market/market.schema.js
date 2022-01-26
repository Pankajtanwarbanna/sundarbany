const mongoose      = require('mongoose');

mongoose.set('useCreateIndex', true);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
const marketSchema  = new mongoose.Schema({
    name            : {
        type        : String,
        required    : true,
        default     : 'User'
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

module.exports = mongoose.model('market',marketSchema);